/**
 * DIGITAL TECHNIQUES VIRTUAL TRAINER KIT SIMULATOR
 * Master Application Coordinator
 */

class TrainerApp {
  constructor() {
    this.mode = 'learning'; // 'learning' (demo) or 'manual' (independent lab)
    this.currentExperiment = null;
    this.currentPart = null;

    // Sub-systems
    this.logicEngine = new DigitalLogicEngine();
    this.boardView = null;
    this.wiringSystem = null;
    this.playback = null;
    this.procedureTable = null;
    this.resultsPanel = null;

    // Clock generator interval for fixed clock frequencies
    this.clockTimer = null;
    this.clockFreqIndex = 0;

    // Make globally accessible
    window.trainerApp = this;
  }

  init() {
    console.log('Initializing Digital Techniques Virtual Trainer Kit Simulator...');

    // 1. Initialize Board View
    const boardContainer = document.getElementById('board-container');
    this.boardView = new BoardView(
      boardContainer,
      BOARD_COORDS,
      (switchId, state) => this.onSwitchToggled(switchId, state),
      (holeId) => this.onHoleClicked(holeId),
      (socketId) => this.onSocketClicked(socketId)
    );

    // 2. Initialize Wiring System
    const svgLayer = document.getElementById('board-svg');
    this.wiringSystem = new WiringSystem(svgLayer, BOARD_COORDS, (wires) => {
      this.onCircuitUpdated();
    });

    // 3. Initialize Procedure Table
    const procContainer = document.getElementById('procedure-panel-body');
    this.procedureTable = new ProcedureTable(procContainer, (stepIdx) => {
      if (this.playback) {
        this.playback.jumpToStep(stepIdx);
      }
    });

    // 4. Initialize Results Panel
    const resultsContainer = document.getElementById('results-panel-body');
    this.resultsPanel = new ResultsPanel(resultsContainer, (rowIdx, rowData) => {
      this.onTruthTableRowClicked(rowIdx, rowData);
    });

    // 4B. Initialize On-Front Circuit Diagram Renderer
    const circuitViewport = document.getElementById('circuit-diagram-viewport');
    if (circuitViewport && typeof CircuitDiagramRenderer !== 'undefined') {
      this.circuitDiagram = new CircuitDiagramRenderer(circuitViewport);
    }
    window.appInstance = this;

    // 5. Initialize Playback Controller
    this.playback = new PlaybackController(this);
    this.setupPlaybackCallbacks();

    // 6. Bind UI Controls & Event Listeners
    this.bindUIControls();

    // 7. Initialize Simulated Clock Generator
    this.startClockPulseGenerator();

    // 8. Populate Experiments Dropdown & Select Default (Experiment 1A: 7408 AND Gate)
    this.populateExperimentSelector();
    this.selectExperiment('exp1', 'exp1_and');

    // 9. Initial Fit to Screen
    setTimeout(() => {
      this.boardView.fitToScreen();
    }, 150);

    // 10. Handle URL parameters for direct testing / auto-wiring
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const expParam = urlParams.get('exp');
      const partParam = urlParams.get('part');
      if (expParam) {
        this.selectExperiment(expParam, partParam);
      }
      const autoWire = urlParams.get('autowire');
      if (autoWire && this.currentPart) {
        this.insertChip(this.currentPart.socketId, this.currentPart.icId);
        if (this.currentPart.connections) {
          this.currentPart.connections.forEach(conn => {
            this.addWireInstant(conn.from, conn.to, conn.color);
          });
        }
      }

      // Allow testing switch inputs via URL params (e.g. ?sw0=1&sw1=1)
      for (let i = 0; i < 16; i++) {
        const swVal = urlParams.get(`sw${i}`);
        if (swVal !== null) {
          this.setSwitchState(`sw_${i}`, parseInt(swVal, 10));
        }
      }

      // Switch tab if requested (?tab=results or ?tab=schematic)
      const tabParam = urlParams.get('tab');
      if (tabParam && typeof window.switchSidebarTab === 'function') {
        window.switchSidebarTab(tabParam);
      }

      // Click observation table row if requested (?clickrow=3)
      const clickRow = urlParams.get('clickrow');
      if (clickRow !== null && this.currentPart?.truthTable?.rows) {
        const rowIdx = parseInt(clickRow, 10);
        const rowData = this.currentPart.truthTable.rows[rowIdx];
        if (rowData) {
          this.onTruthTableRowClicked(rowIdx, rowData);
        }
      }

      // Open Zoom Modal if requested (?zoom=1)
      if (urlParams.get('zoom') === '1') {
        setTimeout(() => this.openDiagramZoomModal(), 50);
      }
    } catch (e) {
      console.warn('URL param parse error:', e);
    }

    console.log('Trainer Kit Simulator ready.');
  }

  setupPlaybackCallbacks() {
    this.playback.onStateChanged = (state, speed) => {
      this.updatePlaybackButtons(state, speed);
    };

    this.playback.onProgressUpdate = (currentSec, totalSec, progress) => {
      this.updateProgressBar(currentSec, totalSec, progress);
    };

    this.playback.onStepChanged = (stepIdx, steps) => {
      this.procedureTable.updateActiveStep(stepIdx);
      // Highlight active endpoints on board for this step
      const step = steps[stepIdx];
      if (step && step.connection) {
        this.boardView.highlightHoles([step.connection.from, step.connection.to], step.connection.from);
      } else {
        this.boardView.highlightHoles(null);
      }
    };
  }

  bindUIControls() {
    // Mode toggle (Learning Mode vs Manual Lab Mode)
    const btnLearning = document.getElementById('btn-mode-learning');
    const btnManual = document.getElementById('btn-mode-manual');
    if (btnLearning && btnManual) {
      btnLearning.addEventListener('click', () => this.setMode('learning'));
      btnManual.addEventListener('click', () => this.setMode('manual'));
    }

    // Playback control buttons
    const btnPlay = document.getElementById('btn-play-pause');
    const btnRestart = document.getElementById('btn-restart');
    const btnRewind = document.getElementById('btn-rewind-10');
    const btnForward = document.getElementById('btn-forward-10');
    const speedSelect = document.getElementById('playback-speed-select');

    if (btnPlay) {
      btnPlay.addEventListener('click', () => {
        if (this.playback.state === 'playing') {
          this.playback.pause();
        } else if (this.playback.state === 'paused') {
          this.playback.resume();
        } else {
          this.playback.start();
        }
      });
    }

    if (btnRestart) {
      btnRestart.addEventListener('click', () => this.playback.restart());
    }
    if (btnRewind) {
      btnRewind.addEventListener('click', () => this.playback.rewind(10));
    }
    if (btnForward) {
      btnForward.addEventListener('click', () => this.playback.forward(10));
    }
    if (speedSelect) {
      speedSelect.addEventListener('change', (e) => {
        this.playback.setSpeed(parseFloat(e.target.value));
      });
    }

    // Timeline scrub bar
    const progressTrack = document.getElementById('playback-progress-track');
    if (progressTrack) {
      progressTrack.addEventListener('click', (e) => {
        const rect = progressTrack.getBoundingClientRect();
        const ratio = (e.clientX - rect.left) / rect.width;
        this.playback.seek(ratio * this.playback.totalDuration);
      });
    }

    // Zoom and pan buttons
    document.getElementById('btn-zoom-in')?.addEventListener('click', () => this.boardView.applyZoom(1.2, 512, 384));
    document.getElementById('btn-zoom-out')?.addEventListener('click', () => this.boardView.applyZoom(0.83, 512, 384));
    document.getElementById('btn-zoom-reset')?.addEventListener('click', () => this.boardView.resetZoom());
    document.getElementById('btn-zoom-fit')?.addEventListener('click', () => this.boardView.fitToScreen());

    this.boardView.onZoomChanged = (pct) => {
      const zoomLabel = document.getElementById('zoom-percentage-text');
      if (zoomLabel) zoomLabel.textContent = `${pct}%`;
    };

    // Wire Color Palette
    document.querySelectorAll('.wire-color-swatch').forEach(swatch => {
      swatch.addEventListener('click', () => {
        document.querySelectorAll('.wire-color-swatch').forEach(s => s.classList.remove('active-color'));
        swatch.classList.add('active-color');
        const color = swatch.getAttribute('data-color');
        this.wiringSystem.setColor(color);
      });
    });

    // Delete selected wire button
    document.getElementById('btn-delete-wire')?.addEventListener('click', () => {
      this.wiringSystem.deleteSelected();
    });

    // Clear all wires button
    document.getElementById('btn-clear-wires')?.addEventListener('click', () => {
      if (confirm('Clear all connecting wires on the trainer kit?')) {
        this.wiringSystem.clearAllWires();
      }
    });

    // Reset circuit button
    document.getElementById('btn-reset-circuit')?.addEventListener('click', () => {
      this.resetCircuitToInitial();
    });

    // Component Search Modal & Drawer
    const btnOpenLib = document.getElementById('btn-open-ic-library');
    const modalLib = document.getElementById('ic-library-modal');
    const btnCloseLib = document.getElementById('btn-close-ic-modal');
    const inputSearch = document.getElementById('ic-search-input');

    if (btnOpenLib && modalLib) {
      btnOpenLib.addEventListener('click', () => {
        modalLib.classList.add('modal-visible');
        this.renderICLibraryList();
        inputSearch?.focus();
      });
    }
    if (btnCloseLib && modalLib) {
      btnCloseLib.addEventListener('click', () => modalLib.classList.remove('modal-visible'));
    }
    if (inputSearch) {
      inputSearch.addEventListener('input', (e) => {
        this.renderICLibraryList(e.target.value);
      });
    }

    // Keyboard Shortcuts: Space = Play/Pause, Del = Delete Wire, Esc = Cancel Wiring
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.code === 'Space') {
        e.preventDefault();
        document.getElementById('btn-play-pause')?.click();
      } else if (e.code === 'Delete' || e.code === 'Backspace') {
        this.wiringSystem.deleteSelected();
      } else if (e.code === 'Escape') {
        this.wiringSystem.cancelWiring();
        document.getElementById('ic-library-modal')?.classList.remove('modal-visible');
      }
    });

    // Manual Pulser action
    this.boardView.onPulserAction = (isPressed) => {
      this.logicEngine.setPulser(isPressed);
      this.onCircuitUpdated();
    };

    // On-Front Circuit Diagram Controls
    document.getElementById('btn-toggle-diagram-mode')?.addEventListener('click', () => {
      this.circuitDiagram?.toggleViewMode();
    });

    document.getElementById('btn-collapse-circuit-card')?.addEventListener('click', () => {
      this.circuitDiagram?.toggleCollapse();
    });

    document.getElementById('btn-zoom-diagram')?.addEventListener('click', () => {
      this.openDiagramZoomModal();
    });

    document.getElementById('btn-close-zoom-modal')?.addEventListener('click', () => {
      document.getElementById('diagram-zoom-modal')?.classList.remove('modal-visible');
    });

    document.getElementById('btn-zoom-toggle-mode')?.addEventListener('click', () => {
      this.circuitDiagram?.toggleViewMode();
      this.openDiagramZoomModal();
    });
  }

  setMode(mode) {
    this.mode = mode;
    const btnLearning = document.getElementById('btn-mode-learning');
    const btnManual = document.getElementById('btn-mode-manual');
    const playbackControls = document.getElementById('top-playback-bar');

    if (mode === 'learning') {
      btnLearning?.classList.add('active');
      btnManual?.classList.remove('active');
      if (playbackControls) playbackControls.style.display = 'flex';
      this.showToast('Learning Mode: Automatic demonstration with synchronized steps.');
    } else {
      btnManual?.classList.add('active');
      btnLearning?.classList.remove('active');
      if (playbackControls) playbackControls.style.display = 'none';
      this.playback.pause();
      this.showToast('Manual Mode: Build circuits, connect pins and test inputs independently.');
    }
  }

  populateExperimentSelector() {
    const selector = document.getElementById('experiment-selector');
    if (!selector) return;

    let html = '';
    EXPERIMENTS.forEach(exp => {
      if (exp.parts && exp.parts.length > 1) {
        html += `<optgroup label="Exp ${exp.number}: ${exp.title}">`;
        exp.parts.forEach(part => {
          html += `<option value="${exp.id}::${part.id}">Exp ${exp.number}: ${part.name}</option>`;
        });
        html += `</optgroup>`;
      } else {
        html += `<option value="${exp.id}::${exp.parts[0].id}">Exp ${exp.number}: ${exp.title}</option>`;
      }
    });

    selector.innerHTML = html;
    selector.addEventListener('change', (e) => {
      const [expId, partId] = e.target.value.split('::');
      this.selectExperiment(expId, partId);
    });
  }

  selectExperiment(expId, partId) {
    const exp = getExperiment(expId);
    if (!exp) return;
    const part = exp.parts.find(p => p.id === partId) || exp.parts[0];

    this.currentExperiment = exp;
    this.currentPart = part;

    // Reset circuit
    this.resetCircuitToInitial();

    // Setup playback timeline and procedure table
    this.playback.setExperiment(exp, part);
    this.procedureTable.setSteps(this.playback.steps, 0);
    this.resultsPanel.setPart(part);

    // Update document title and info badge
    const titleEl = document.getElementById('active-exp-title');
    if (titleEl) {
      titleEl.textContent = `Exp ${exp.number}: ${part.name}`;
    }

    const aimEl = document.getElementById('active-exp-aim');
    if (aimEl) {
      aimEl.textContent = exp.aim;
    }

    // Update On-Front Circuit Diagram & Full Schematic
    if (this.circuitDiagram) {
      this.circuitDiagram.setExperiment(exp, part);
      this.updateFullSchematicTab();
    }

    this.onCircuitUpdated();
  }

  resetCircuitToInitial() {
    this.wiringSystem.clearAllWires();
    this.logicEngine.removeChip('zif16');
    this.logicEngine.removeChip('zif20');
    this.boardView.renderSeatedChip('zif16', null);
    this.boardView.renderSeatedChip('zif20', null);

    // Reset all 16 switches to 0 (LOW)
    for (let i = 0; i < 16; i++) {
      this.logicEngine.setSwitch(`sw_${i}`, 0);
      this.boardView.updateSwitchVisual(`sw_${i}`, 0);
    }

    this.boardView.highlightHoles(null);
    this.onCircuitUpdated();
  }

  insertChip(socketId, icId) {
    this.logicEngine.insertChip(socketId, icId);
    this.boardView.renderSeatedChip(socketId, icId);
    this.onCircuitUpdated();
    this.showToast(`Inserted IC ${icId} into ${socketId === 'zif16' ? '16-Pin' : '20-Pin'} Socket.`);
  }

  highlightSocket(socketId) {
    const el = document.getElementById(`socket-${socketId}`);
    if (el) {
      el.classList.add('socket-highlight-pulse');
      setTimeout(() => el.classList.remove('socket-highlight-pulse'), 1500);
    }
  }

  animateWireConnection(fromHoleId, toHoleId, color, onDone) {
    this.wiringSystem.animateWire(fromHoleId, toHoleId, color, () => {
      this.onCircuitUpdated();
      if (onDone) onDone();
    });
  }

  addWireInstant(fromHoleId, toHoleId, color) {
    this.wiringSystem.addWire(fromHoleId, toHoleId, color);
    this.onCircuitUpdated();
  }

  setSwitchState(switchId, val) {
    this.logicEngine.setSwitch(switchId, val);
    this.boardView.updateSwitchVisual(switchId, val);
    this.onCircuitUpdated();
  }

  triggerPulse() {
    this.logicEngine.setPulser(true);
    this.onCircuitUpdated();
    setTimeout(() => {
      this.logicEngine.setPulser(false);
      this.onCircuitUpdated();
    }, 250);
  }

  onSwitchToggled(switchId, state) {
    this.logicEngine.setSwitch(switchId, state);
    this.onCircuitUpdated();
  }

  onHoleClicked(holeId) {
    if (!this.wiringSystem.pendingFromHole) {
      // Start wiring from this hole
      this.wiringSystem.startWiring(holeId);
      this.boardView.highlightHoles([holeId], holeId);
    } else {
      // Complete wire connection
      const destHole = holeId;
      this.wiringSystem.completeWiring(destHole);
      this.boardView.highlightHoles(null);
    }
  }

  onSocketClicked(socketId) {
    // Open IC selector to seat an IC into this socket
    const modal = document.getElementById('ic-library-modal');
    modal?.classList.add('modal-visible');
    this.renderICLibraryList('', socketId);
  }

  /**
   * Handle student clicking any row in the Observation / Truth Table
   * Immediately rewinds and configures the kit to that exact observation state!
   */
  onTruthTableRowClicked(rowIdx, rowData) {
    if (!this.currentPart) return;

    // 1. Ensure IC is seated in socket
    if (!this.logicEngine.socketChips || !this.logicEngine.socketChips[this.currentPart.socketId]) {
      this.insertChip(this.currentPart.socketId, this.currentPart.icId);
    }

    // 2. If circuit is unrouted or has fewer wires than required, auto-wire so student can see the working circuit
    if (this.wiringSystem.wires.length === 0 && this.currentPart.connections) {
      this.currentPart.connections.forEach(conn => {
        this.addWireInstant(conn.from, conn.to, conn.color);
      });
    }

    // 3. Pause automated playback if playing so user can examine state
    if (this.playback) {
      this.playback.pause();

      // Find step corresponding to this test vector in timeline and jump to it
      if (this.playback.steps) {
        const testStepIdx = this.playback.steps.findIndex(
          s => s.type === 'TEST_INPUTS' && s.row === rowData
        );
        if (testStepIdx !== -1) {
          this.playback.currentStepIdx = testStepIdx;
          if (this.procedureTable) {
            this.procedureTable.updateActiveStep(testStepIdx);
          }
          this.playback.notifyProgress();
        }
      }
    }

    // 4. Apply input switch states to kit
    if (rowData.inputs) {
      Object.keys(rowData.inputs).forEach(swKey => {
        this.setSwitchState(swKey, rowData.inputs[swKey]);
      });
    }

    // 5. If pulse row (sequential circuits), trigger pulse
    if (rowData.pulse) {
      this.triggerPulse();
    }

    // 6. Update results panel active row
    this.resultsPanel.setActiveRow(rowIdx);

    // 7. Update circuit simulation and indicators
    this.onCircuitUpdated();

    // 8. User feedback toast
    const inputDesc = rowData.inputs 
      ? Object.entries(rowData.inputs).map(([k, v]) => `${k.replace('sw_', 'S')}=${v}`).join(', ')
      : `Pulse ${rowData.pulse}`;
    const resultDesc = rowData.expected !== undefined 
      ? ` → Output Y=${rowData.expected}`
      : (rowData.digit !== undefined ? ` → Digit ${rowData.digit}` : '');
    this.showToast(`Rewound kit to Row #${rowIdx + 1} (${inputDesc}${resultDesc})`);
  }

  onCircuitUpdated() {
    // 1. Run digital logic simulation
    const simResult = this.logicEngine.simulate(this.wiringSystem.wires);

    // 2. Update visual indicators
    this.boardView.updateIndicatorLeds(simResult.indicatorStates);
    this.boardView.updateProbeVisual(simResult.probeState);

    // 3. Update 7-segment displays
    if (simResult.displays) {
      this.boardView.update7SegmentDisplay('dsp1', simResult.displays.dsp_1);
      this.boardView.update7SegmentDisplay('disp3', simResult.displays.disp_3);
    }

    // 4. Update Results Panel
    this.resultsPanel.updateSimulation(simResult);

    // 5. Update live states in On-Front Circuit Diagram
    if (this.circuitDiagram) {
      this.circuitDiagram.updateLiveStates(this.logicEngine.switchStates, simResult.indicatorStates);
    }
  }

  openDiagramZoomModal() {
    const modal = document.getElementById('diagram-zoom-modal');
    const viewport = document.getElementById('zoom-modal-viewport');
    const titleEl = document.getElementById('zoom-modal-title');
    const subtitleEl = document.getElementById('zoom-modal-subtitle');
    if (!modal || !viewport || !this.circuitDiagram || !this.currentPart) return;

    modal.classList.add('modal-visible');
    const mode = this.circuitDiagram.viewMode;
    const expId = this.currentExperiment?.id || 'exp1';
    const isExp1 = expId === 'exp1';

    if (titleEl) {
      if (mode === 'sheet') {
        titleEl.textContent = isExp1 ? 'Experiment 1: All 4 Logic Gate Manual Circuit Diagrams' : 'Experiment 2: Universal Gates Manual Diagrams';
      } else if (mode === 'manual_scan') {
        titleEl.textContent = `Physical Lab Manual Scanned Page (Page ${this.circuitDiagram.manualPageMap[expId] || 1})`;
      } else if (mode === 'pinout') {
        titleEl.textContent = `IC ${this.currentPart.icId} Package Pinout Diagram (Top View)`;
      } else {
        titleEl.textContent = `Circuit Schematic: ${this.currentPart.name} (Manual Redrawn)`;
      }
    }
    if (subtitleEl) {
      subtitleEl.textContent = `Experiment ${this.currentExperiment?.number || 1}: ${this.currentPart.description || ''}`;
    }

    if (mode === 'manual_scan') {
      const pageNum = this.circuitDiagram.manualPageMap[expId] || 1;
      viewport.innerHTML = `
        <div style="width:100%; height:100%; overflow:auto; text-align:center; padding:10px;">
          <img src="assets/pdf_images/page_${pageNum}.jpg" alt="Lab Manual Page ${pageNum}" style="max-width:100%; border-radius:6px; box-shadow:0 6px 20px rgba(0,0,0,0.7);" />
        </div>
      `;
    } else if (mode === 'sheet') {
      viewport.innerHTML = isExp1 ? this.circuitDiagram.renderExp1AllFourDiagrams() : this.circuitDiagram.renderExp2BothUniversalGates();
    } else if (mode === 'pinout') {
      viewport.innerHTML = this.circuitDiagram.renderPinoutDiagram(this.currentPart);
    } else {
      viewport.innerHTML = this.circuitDiagram.renderSchematicDiagram(this.currentPart, this.currentExperiment);
    }
  }

  updateFullSchematicTab() {
    const canvas = document.getElementById('schematic-full-canvas');
    const detailsCard = document.getElementById('schematic-details-card');
    if (!this.circuitDiagram || !this.currentPart) return;

    if (canvas) {
      const expId = this.currentExperiment?.id || 'exp1';
      if (expId === 'exp1') {
        canvas.innerHTML = this.circuitDiagram.renderExp1AllFourDiagrams();
      } else if (expId === 'exp2') {
        canvas.innerHTML = this.circuitDiagram.renderExp2BothUniversalGates();
      } else {
        canvas.innerHTML = this.circuitDiagram.renderSchematicDiagram(this.currentPart, this.currentExperiment);
      }
    }

    if (detailsCard) {
      const icId = this.currentPart.icId;
      const icData = (typeof IC_LIBRARY !== 'undefined') ? IC_LIBRARY[icId] : null;
      detailsCard.innerHTML = `
        <h4><i class="fa-solid fa-circle-info text-cyan"></i> Experiment Circuit Specifications</h4>
        <div class="schematic-info-details">
          <div><strong>Part Title:</strong> ${this.currentPart.name}</div>
          <div><strong>IC Required:</strong> IC ${icId} (${icData?.name || 'Digital Logic'})</div>
          <div><strong>Package & Family:</strong> ${icData?.packageType || 'DIP-14'} (${icData?.family || '74LS TTL'})</div>
          <div><strong>Supply Voltage:</strong> Pin ${icData?.powerPins?.vcc || 14} = +5.0V, Pin ${icData?.powerPins?.gnd || 7} = GND (0V)</div>
          <div><strong>Description:</strong> ${this.currentPart.description || icData?.description || ''}</div>
          <div style="margin-top: 6px; padding: 6px 10px; background: rgba(59,130,246,0.1); border-radius: 4px; border: 1px solid rgba(59,130,246,0.3);">
            <i class="fa-solid fa-graduation-cap"></i> <strong>Syllabus Reference:</strong> MSBTE Digital Techniques & Vidyalankar Polytechnic Lab Manual.
          </div>
        </div>
      `;
    }
  }

  startClockPulseGenerator() {
    // Periodic pulse generator to animate 1Hz to 1MHz clock lines
    let clkState = 0;
    setInterval(() => {
      clkState = (clkState === 0) ? 1 : 0;
      this.logicEngine.clockStates['clk_1hz'] = clkState;
      this.logicEngine.clockStates['clk_10hz'] = clkState;
      this.logicEngine.clockStates['clk_100hz'] = clkState;
      this.onCircuitUpdated();
    }, 500); // 1Hz clock half-period
  }

  updatePlaybackButtons(state, speed) {
    const btnPlay = document.getElementById('btn-play-pause');
    if (!btnPlay) return;

    if (state === 'playing') {
      btnPlay.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
      btnPlay.classList.add('btn-playing');
    } else if (state === 'paused') {
      btnPlay.innerHTML = '<i class="fa-solid fa-play"></i> Resume';
      btnPlay.classList.remove('btn-playing');
    } else {
      btnPlay.innerHTML = '<i class="fa-solid fa-play"></i> Start';
      btnPlay.classList.remove('btn-playing');
    }
  }

  updateProgressBar(currentSec, totalSec, progress) {
    const barEl = document.getElementById('playback-progress-bar');
    const timeText = document.getElementById('playback-time-text');

    if (barEl) {
      barEl.style.width = `${progress * 100}%`;
    }

    if (timeText) {
      const curM = Math.floor(currentSec / 60).toString().padStart(2, '0');
      const curS = Math.floor(currentSec % 60).toString().padStart(2, '0');
      const totM = Math.floor(totalSec / 60).toString().padStart(2, '0');
      const totS = Math.floor(totalSec % 60).toString().padStart(2, '0');
      timeText.textContent = `${curM}:${curS} / ${totM}:${totS}`;
    }
  }

  renderICLibraryList(query = '', targetSocket = 'zif16') {
    const listContainer = document.getElementById('ic-cards-grid');
    if (!listContainer) return;

    const ics = searchICs(query);
    if (ics.length === 0) {
      listContainer.innerHTML = `<p class="no-results">No IC components matching "${query}".</p>`;
      return;
    }

    let html = '';
    ics.forEach(ic => {
      html += `
        <div class="ic-card">
          <div class="ic-card-header">
            <span class="ic-part-badge">${ic.partNumber}</span>
            <span class="ic-category-badge">${ic.category}</span>
          </div>
          <h4 class="ic-card-title">${ic.name}</h4>
          <p class="ic-card-desc">${ic.description}</p>
          <div class="ic-card-meta">
            <span><i class="fa-solid fa-microchip"></i> ${ic.packageType} (${ic.pinCount} pins)</span>
            <span><i class="fa-solid fa-bolt"></i> VCC: Pin ${ic.powerPins.vcc}, GND: Pin ${ic.powerPins.gnd}</span>
          </div>
          <div class="ic-card-actions">
            <button class="btn btn-sm btn-primary btn-insert-ic" data-ic-id="${ic.id}" data-socket="zif16">
              <i class="fa-solid fa-arrow-down-to-bracket"></i> Place in 16-Pin Socket
            </button>
            <button class="btn btn-sm btn-outline btn-insert-ic" data-ic-id="${ic.id}" data-socket="zif20">
              Place in 20-Pin Socket
            </button>
          </div>
        </div>
      `;
    });

    listContainer.innerHTML = html;

    listContainer.querySelectorAll('.btn-insert-ic').forEach(btn => {
      btn.addEventListener('click', () => {
        const icId = btn.getAttribute('data-ic-id');
        const sock = btn.getAttribute('data-socket');
        this.insertChip(sock, icId);
        document.getElementById('ic-library-modal')?.classList.remove('modal-visible');
      });
    });
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `trainer-toast toast-${type}`;
    toast.innerHTML = `<i class="fa-solid fa-circle-info"></i> <span>${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('toast-show'), 10);
    setTimeout(() => {
      toast.classList.remove('toast-show');
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }

  showExperimentSuccessBanner() {
    this.showToast('Experiment Verified! Output matches theoretical truth table.', 'success');
  }
}

// Instantiate and initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new TrainerApp();
  app.init();
});
