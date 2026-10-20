/**
 * DIGITAL TECHNIQUES VIRTUAL TRAINER KIT SIMULATOR
 * Automated Playback & Timeline Engine
 * Supports Play, Pause, Resume, Restart, Rewind 10s, Forward 10s, and 6 Speeds (0.2x to 2x)
 */

class PlaybackController {
  constructor(app) {
    this.app = app;
    this.state = 'idle'; // 'idle', 'playing', 'paused', 'completed'
    this.speed = 1.0; // Default speed 1.0x
    this.speeds = [0.2, 0.5, 0.7, 1.0, 1.5, 2.0];

    this.steps = []; // List of executable timeline steps
    this.currentStepIdx = 0;
    this.timer = null;
    this.stepStartTime = 0;
    this.remainingStepDuration = 0;

    this.elapsedTime = 0; // seconds
    this.totalDuration = 0; // seconds
    this.clockInterval = null;

    // Callbacks
    this.onStateChanged = null;
    this.onProgressUpdate = null;
    this.onStepChanged = null;
  }

  setExperiment(experiment, part) {
    this.stop();
    this.currentExperiment = experiment;
    this.currentPart = part;
    this.buildTimelineSteps(experiment, part);
    this.reset();
  }

  buildTimelineSteps(experiment, part) {
    this.steps = [];
    if (!part) return;

    // Step 1: Select IC from Library
    this.steps.push({
      type: 'SELECT_IC',
      stepNumber: 1,
      title: 'Select Component',
      details: `Select ${part.icId} (${IC_LIBRARY[part.icId]?.name || ''}) from Component Library`,
      duration: 1800,
      run: (app) => {
        app.highlightSocket(part.socketId);
      }
    });

    // Step 2: Place IC into Socket
    this.steps.push({
      type: 'PLACE_IC',
      stepNumber: 2,
      title: 'Seat IC into Socket',
      details: `Insert IC ${part.icId} into ${part.socketId === 'zif16' ? '16-Pin' : '20-Pin'} Socket and lock lever`,
      duration: 2000,
      run: (app) => {
        app.insertChip(part.socketId, part.icId);
      }
    });

    // Wire connection steps
    part.connections.forEach((conn, idx) => {
      this.steps.push({
        type: 'CONNECT_WIRE',
        stepNumber: 3 + idx,
        title: `Connect Wire: ${conn.label}`,
        details: conn.label,
        duration: 2200,
        connection: conn,
        run: (app, onDone) => {
          app.animateWireConnection(conn.from, conn.to, conn.color, onDone);
        }
      });
    });

    const nextStepNum = 3 + part.connections.length;

    // Truth table verification test steps (toggle switches through rows)
    if (part.truthTable && part.truthTable.rows) {
      part.truthTable.rows.forEach((row, rIdx) => {
        this.steps.push({
          type: 'TEST_INPUTS',
          stepNumber: nextStepNum + rIdx,
          title: `Test Input Vector ${rIdx + 1}`,
          details: `Apply inputs and observe logic indicators`,
          duration: 2500,
          row: row,
          run: (app) => {
            if (row.inputs) {
              Object.keys(row.inputs).forEach(swKey => {
                app.setSwitchState(swKey, row.inputs[swKey]);
              });
            }
            if (row.pulse) {
              app.triggerPulse();
            }
          }
        });
      });
    }

    // Step Final: Conclusion & Pass
    this.steps.push({
      type: 'COMPLETE',
      stepNumber: this.steps.length + 1,
      title: 'Experiment Completed',
      details: 'All truth table observations matched theoretical values.',
      duration: 1000,
      run: (app) => {
        app.showExperimentSuccessBanner();
      }
    });

    // Calculate total duration in seconds at 1x
    const totalMs = this.steps.reduce((acc, s) => acc + s.duration, 0);
    this.totalDuration = Math.round(totalMs / 1000);
  }

  setSpeed(speedVal) {
    if (this.speeds.includes(speedVal)) {
      this.speed = speedVal;
      if (this.state === 'playing') {
        // Recalculate current step timer with new speed
        clearTimeout(this.timer);
        this.executeCurrentStep();
      }
    }
  }

  start() {
    if (this.steps.length === 0) return;
    this.currentStepIdx = 0;
    this.elapsedTime = 0;
    this.state = 'playing';
    this.notifyState();
    this.startClock();
    this.executeCurrentStep();
  }

  resume() {
    if (this.state === 'paused') {
      this.state = 'playing';
      this.notifyState();
      this.startClock();
      this.executeCurrentStep(true); // resume with remaining duration
    }
  }

  pause() {
    if (this.state === 'playing') {
      this.state = 'paused';
      clearTimeout(this.timer);
      this.stopClock();
      const elapsedInStep = (Date.now() - this.stepStartTime) * this.speed;
      const stepDuration = this.steps[this.currentStepIdx]?.duration || 1000;
      this.remainingStepDuration = Math.max(200, stepDuration - elapsedInStep);
      this.notifyState();
    }
  }

  restart() {
    this.stop();
    this.app.resetCircuitToInitial();
    this.start();
  }

  stop() {
    clearTimeout(this.timer);
    this.stopClock();
    this.state = 'idle';
    this.notifyState();
  }

  reset() {
    this.stop();
    this.currentStepIdx = 0;
    this.elapsedTime = 0;
    this.remainingStepDuration = 0;
    this.notifyProgress();
    if (this.onStepChanged) {
      this.onStepChanged(0, this.steps);
    }
  }

  rewind(seconds = 10) {
    this.seek(Math.max(0, this.elapsedTime - seconds));
  }

  forward(seconds = 10) {
    this.seek(Math.min(this.totalDuration, this.elapsedTime + seconds));
  }

  seek(targetTime) {
    const wasPlaying = (this.state === 'playing');
    this.pause();

    // Find step corresponding to targetTime
    let accumulated = 0;
    let targetStepIdx = 0;
    for (let i = 0; i < this.steps.length; i++) {
      const stepSec = this.steps[i].duration / 1000;
      if (accumulated + stepSec >= targetTime) {
        targetStepIdx = i;
        break;
      }
      accumulated += stepSec;
    }

    this.jumpToStep(targetStepIdx);
    this.elapsedTime = targetTime;
    this.notifyProgress();

    if (wasPlaying) {
      this.resume();
    }
  }

  jumpToStep(targetStepIdx) {
    if (targetStepIdx < 0 || targetStepIdx >= this.steps.length) return;

    // Reset circuit and fast-forward execute up to targetStepIdx
    this.app.resetCircuitToInitial();
    for (let i = 0; i < targetStepIdx; i++) {
      const s = this.steps[i];
      if (s.type === 'PLACE_IC') {
        this.app.insertChip(this.currentPart.socketId, this.currentPart.icId);
      } else if (s.type === 'CONNECT_WIRE') {
        this.app.addWireInstant(s.connection.from, s.connection.to, s.connection.color);
      } else if (s.type === 'TEST_INPUTS' && s.row.inputs) {
        Object.keys(s.row.inputs).forEach(swKey => {
          this.app.setSwitchState(swKey, s.row.inputs[swKey]);
        });
      }
    }

    this.currentStepIdx = targetStepIdx;
    this.remainingStepDuration = 0;
    if (this.onStepChanged) {
      this.onStepChanged(this.currentStepIdx, this.steps);
    }
  }

  executeCurrentStep(isResume = false) {
    if (this.currentStepIdx >= this.steps.length) {
      this.state = 'completed';
      this.notifyState();
      this.stopClock();
      return;
    }

    const step = this.steps[this.currentStepIdx];
    this.stepStartTime = Date.now();
    const duration = isResume && this.remainingStepDuration > 0
      ? this.remainingStepDuration
      : step.duration;
    this.remainingStepDuration = 0;

    const scaledDuration = duration / this.speed;

    if (this.onStepChanged) {
      this.onStepChanged(this.currentStepIdx, this.steps);
    }

    // Run step action
    if (step.run) {
      step.run(this.app, () => {
        // Async completion callback (if any)
      });
    }

    // Schedule next step
    this.timer = setTimeout(() => {
      this.currentStepIdx++;
      if (this.currentStepIdx < this.steps.length) {
        this.executeCurrentStep();
      } else {
        this.state = 'completed';
        this.notifyState();
        this.stopClock();
        if (this.onStepChanged) {
          this.onStepChanged(this.steps.length, this.steps);
        }
      }
    }, scaledDuration);
  }

  startClock() {
    this.stopClock();
    this.clockInterval = setInterval(() => {
      if (this.state === 'playing') {
        this.elapsedTime += 0.25;
        if (this.elapsedTime > this.totalDuration) {
          this.elapsedTime = this.totalDuration;
        }
        this.notifyProgress();
      }
    }, 250);
  }

  stopClock() {
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
      this.clockInterval = null;
    }
  }

  notifyState() {
    if (this.onStateChanged) {
      this.onStateChanged(this.state, this.speed);
    }
  }

  notifyProgress() {
    if (this.onProgressUpdate) {
      const progress = (this.totalDuration > 0)
        ? Math.min(1.0, this.elapsedTime / this.totalDuration)
        : 0;
      this.onProgressUpdate(this.elapsedTime, this.totalDuration, progress);
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PlaybackController };
}
