/**
 * DIGITAL TECHNIQUES VIRTUAL TRAINER KIT SIMULATOR
 * Board View & Interactive Overlays Engine
 * Renders switches, LEDs, ZIF sockets, seated IC chips, 7-segment displays & Zoom/Pan
 */

class BoardView {
  constructor(containerEl, boardCoords, onSwitchToggled, onHoleClicked, onSocketClicked) {
    this.container = containerEl;
    this.coords = boardCoords;
    this.onSwitchToggled = onSwitchToggled;
    this.onHoleClicked = onHoleClicked;
    this.onSocketClicked = onSocketClicked;

    // Zoom and pan state
    this.zoom = 1.0;
    this.panX = 0;
    this.panY = 0;
    this.isPanning = false;
    this.startPan = { x: 0, y: 0 };

    // Hovered and highlighted holes
    this.highlightedHoles = new Set();
    this.activeSourceHole = null;

    // DOM references
    this.boardWrapper = null;
    this.boardImage = null;
    this.svgLayer = null;
    this.elementsLayer = null;

    this.initDOM();
    this.initZoomPanEvents();
  }

  initDOM() {
    this.container.innerHTML = `
      <div id="board-viewport" class="board-viewport">
        <div id="board-stage" class="board-stage">
          <!-- Background reference image of physical DTA-09 kit -->
          <img id="board-bg" src="assets/trainer-kit-board.jpg" alt="DTA-09 Digital Trainer Kit" class="board-bg-img" />

          <!-- Interactive DOM Elements Layer (Switches, LEDs, Chips, Displays) -->
          <div id="board-elements" class="board-elements-layer"></div>

          <!-- SVG Vector Layer for Wires, Plugs & Selection Highlights -->
          <svg id="board-svg" class="board-svg-layer" viewBox="0 0 1024 768" preserveAspectRatio="none"></svg>
        </div>
      </div>
    `;

    this.viewport = this.container.querySelector('#board-viewport');
    this.stage = this.container.querySelector('#board-stage');
    this.boardBg = this.container.querySelector('#board-bg');
    this.elementsLayer = this.container.querySelector('#board-elements');
    this.svgLayer = this.container.querySelector('#board-svg');

    this.renderStaticOverlays();
  }

  /**
   * Render all interactive holes, switches, LEDs, and sockets
   */
  renderStaticOverlays() {
    let html = '';

    // 1. Logic Input Switches (S0 to S15) & LEDs & Holes
    this.coords.logicInputs.forEach(inp => {
      // Switch lever (Up = 1 / HIGH, Down = 0 / LOW)
      html += `
        <div id="${inp.switchId}" class="trainer-switch switch-down"
             style="left: ${inp.switchX - 12}px; top: ${inp.switchY - 18}px;"
             data-switch-id="${inp.switchId}" title="Switch ${inp.name} (Click to toggle)">
          <div class="switch-bezel">
            <div class="switch-toggle-lever"></div>
          </div>
        </div>
      `;

      // Input Status LED
      html += `
        <div id="led_${inp.id}" class="trainer-led led-red led-off"
             style="left: ${inp.ledX - 7}px; top: ${inp.ledY - 7}px;"
             title="Input ${inp.name} LED"></div>
      `;

      // Input Terminal Socket Hole
      html += `
        <div id="hole_${inp.holeId}" class="trainer-hole"
             style="left: ${inp.holeX - 10}px; top: ${inp.holeY - 10}px;"
             data-hole-id="${inp.holeId}" title="Terminal ${inp.name}">
          <div class="hole-target"></div>
        </div>
      `;
    });

    // 2. Logic Indicators (L0 to L15) LEDs & Sockets
    this.coords.logicIndicators.forEach(ind => {
      // Indicator LED
      html += `
        <div id="led_${ind.id}" class="trainer-led led-red led-off"
             style="left: ${ind.ledX - 7}px; top: ${ind.ledY - 7}px;"
             title="Indicator ${ind.name} LED"></div>
      `;

      // Indicator Input Socket Hole
      html += `
        <div id="hole_${ind.holeId}" class="trainer-hole"
             style="left: ${ind.holeX - 10}px; top: ${ind.holeY - 10}px;"
             data-hole-id="${ind.holeId}" title="Indicator Socket ${ind.name}">
          <div class="hole-target"></div>
        </div>
      `;
    });

    // 3. Power Supply Terminals
    this.coords.powerSupply.terminals.forEach(t => {
      html += `
        <div id="hole_${t.id}" class="trainer-hole power-hole"
             style="left: ${t.x - 11}px; top: ${t.y - 11}px;"
             data-hole-id="${t.id}" title="${t.name} (${t.voltage}V)">
          <div class="hole-target"></div>
        </div>
      `;
    });

    // 4. Fixed Clock Terminals
    this.coords.fixedClock.terminals.forEach(c => {
      html += `
        <div id="hole_${c.id}" class="trainer-hole clock-hole"
             style="left: ${c.x - 10}px; top: ${c.y - 10}px;"
             data-hole-id="${c.id}" title="${c.name} (${c.freq > 0 ? c.freq + 'Hz' : 'External'})">
          <div class="hole-target"></div>
        </div>
      `;
    });

    // 5. Manual Pulser Button, LEDs, and Terminals
    const puls = this.coords.manualPulser;
    html += `
      <div id="btn-pulser-widget" class="manual-pulser-btn"
           style="left: ${puls.button.x - 22}px; top: ${puls.button.y - 22}px;"
           title="Push to pulse clock">
        <div class="pulser-inner-cap"></div>
      </div>
      <div id="led-l13" class="trainer-led led-red led-on"
           style="left: ${puls.leds[0].x - 7}px; top: ${puls.leds[0].y - 7}px;" title="L13 (Inverted Pulse)"></div>
      <div id="led-l12" class="trainer-led led-red led-off"
           style="left: ${puls.leds[1].x - 7}px; top: ${puls.leds[1].y - 7}px;" title="L12 (Normal Pulse)"></div>
    `;
    puls.terminals.forEach(t => {
      html += `
        <div id="hole_${t.id}" class="trainer-hole"
             style="left: ${t.x - 10}px; top: ${t.y - 10}px;"
             data-hole-id="${t.id}" title="${t.name}">
          <div class="hole-target"></div>
        </div>
      `;
    });

    // 6. Logic Probe & DISP-3
    const prb = this.coords.logicProbe;
    html += `
      <div id="hole_${prb.probeHole.holeId}" class="trainer-hole probe-hole"
           style="left: ${prb.probeHole.x - 10}px; top: ${prb.probeHole.y - 10}px;"
           data-hole-id="${prb.probeHole.holeId}" title="Logic Probe Input">
        <div class="hole-target"></div>
      </div>
      <div id="probe-led-high" class="trainer-led led-green led-off"
           style="left: ${prb.ledHigh.x - 7}px; top: ${prb.ledHigh.y - 7}px;" title="Logic High (+)"></div>
      <div id="probe-led-low" class="trainer-led led-red led-off"
           style="left: ${prb.ledLow.x - 7}px; top: ${prb.ledLow.y - 7}px;" title="Logic Low (-)"></div>
      <div id="hole_${prb.disp3Input.holeId}" class="trainer-hole"
           style="left: ${prb.disp3Input.x - 10}px; top: ${prb.disp3Input.y - 10}px;"
           data-hole-id="${prb.disp3Input.holeId}" title="DISP-3 Input">
        <div class="hole-target"></div>
      </div>
      <div id="disp-3-display" class="seven-segment-display mini-seg"
           style="left: ${prb.disp3.x - 18}px; top: ${prb.disp3.y - 27}px;">
        ${this.generate7SegmentSvg('disp3')}
      </div>
    `;

    // 7. BCD Section Terminals & Displays
    const bcd = this.coords.bcdSection;
    bcd.inputs.forEach(i => {
      html += `
        <div id="hole_${i.holeId}" class="trainer-hole"
             style="left: ${i.x - 10}px; top: ${i.y - 10}px;"
             data-hole-id="${i.holeId}" title="${i.name}">
          <div class="hole-target"></div>
        </div>
      `;
    });
    bcd.outputs.forEach(o => {
      html += `
        <div id="hole_${o.holeId}" class="trainer-hole"
             style="left: ${o.x - 10}px; top: ${o.y - 10}px;"
             data-hole-id="${o.holeId}" title="${o.name}">
          <div class="hole-target"></div>
        </div>
      `;
    });
    // DSP-1 & DSP-2 7-segment displays
    html += `
      <div id="dsp-1-display" class="seven-segment-display large-seg"
           style="left: ${bcd.displays[0].x - 22}px; top: ${bcd.displays[0].y - 32}px;">
        ${this.generate7SegmentSvg('dsp1')}
      </div>
      <div id="dsp-2-display" class="seven-segment-display large-seg"
           style="left: ${bcd.displays[1].x - 22}px; top: ${bcd.displays[1].y - 32}px;">
        ${this.generate7SegmentSvg('dsp2')}
      </div>
    `;

    // 8. 16-PIN ZIF Socket and Holes
    const z16 = this.coords.zif16;
    html += `
      <div id="socket-zif16" class="zif-socket-overlay"
           style="left: ${z16.x}px; top: ${z16.y}px; width: ${z16.width}px; height: ${z16.height}px;"
           data-socket-id="zif16" title="16-Pin ZIF Socket (Click to place or remove IC)">
        <div class="zif-lever lever-locked" id="zif16-lever"></div>
        <div class="zif-chip-slot" id="zif16-chip-slot"></div>
      </div>
    `;
    z16.pins.forEach(p => {
      html += `
        <div id="hole_${p.holeId}" class="trainer-hole ic-pin-hole"
             style="left: ${p.x - 10}px; top: ${p.y - 10}px;"
             data-hole-id="${p.holeId}" title="Pin ${p.pin} (16-Pin Socket)">
          <div class="hole-target"></div>
        </div>
      `;
    });

    // 9. 20-PIN ZIF Socket and Holes
    const z20 = this.coords.zif20;
    html += `
      <div id="socket-zif20" class="zif-socket-overlay"
           style="left: ${z20.x}px; top: ${z20.y}px; width: ${z20.width}px; height: ${z20.height}px;"
           data-socket-id="zif20" title="20-Pin ZIF Socket (Click to place or remove IC)">
        <div class="zif-lever lever-locked" id="zif20-lever"></div>
        <div class="zif-chip-slot" id="zif20-chip-slot"></div>
      </div>
    `;
    z20.pins.forEach(p => {
      html += `
        <div id="hole_${p.holeId}" class="trainer-hole ic-pin-hole"
             style="left: ${p.x - 10}px; top: ${p.y - 10}px;"
             data-hole-id="${p.holeId}" title="Pin ${p.pin} (20-Pin Socket)">
          <div class="hole-target"></div>
        </div>
      `;
    });

    this.elementsLayer.innerHTML = html;
    this.attachElementListeners();
  }

  generate7SegmentSvg(prefix) {
    // Standard 7-segment display layout (a, b, c, d, e, f, g)
    return `
      <svg viewBox="0 0 44 64" class="seg-svg">
        <path id="${prefix}_seg_a" d="M 8 6 L 36 6 L 32 12 L 12 12 Z" class="seg-bar seg-off" />
        <path id="${prefix}_seg_b" d="M 37 7 L 37 30 L 31 27 L 31 13 Z" class="seg-bar seg-off" />
        <path id="${prefix}_seg_c" d="M 37 34 L 37 57 L 31 51 L 31 37 Z" class="seg-bar seg-off" />
        <path id="${prefix}_seg_d" d="M 12 52 L 32 52 L 36 58 L 8 58 Z" class="seg-bar seg-off" />
        <path id="${prefix}_seg_e" d="M 13 37 L 13 51 L 7 57 L 7 34 Z" class="seg-bar seg-off" />
        <path id="${prefix}_seg_f" d="M 13 13 L 13 27 L 7 30 L 7 7 Z" class="seg-bar seg-off" />
        <path id="${prefix}_seg_g" d="M 12 30 L 32 30 L 35 32 L 32 34 L 12 34 L 9 32 Z" class="seg-bar seg-off" />
      </svg>
    `;
  }

  attachElementListeners() {
    // 1. Toggle switches
    this.elementsLayer.querySelectorAll('.trainer-switch').forEach(swEl => {
      swEl.addEventListener('click', (e) => {
        e.stopPropagation();
        const swId = swEl.getAttribute('data-switch-id');
        const isUp = swEl.classList.contains('switch-up');
        const nextState = isUp ? 0 : 1;
        this.updateSwitchVisual(swId, nextState);
        if (this.onSwitchToggled) {
          this.onSwitchToggled(swId, nextState);
        }
      });
    });

    // 2. Socket holes
    this.elementsLayer.querySelectorAll('.trainer-hole').forEach(holeEl => {
      holeEl.addEventListener('click', (e) => {
        e.stopPropagation();
        const holeId = holeEl.getAttribute('data-hole-id');
        if (this.onHoleClicked) {
          this.onHoleClicked(holeId);
        }
      });
    });

    // 3. Sockets for IC placement
    this.elementsLayer.querySelectorAll('.zif-socket-overlay').forEach(sockEl => {
      sockEl.addEventListener('click', (e) => {
        // Only trigger if clicked outside individual pin holes
        if (e.target.classList.contains('trainer-hole') || e.target.closest('.trainer-hole')) return;
        const sockId = sockEl.getAttribute('data-socket-id');
        if (this.onSocketClicked) {
          this.onSocketClicked(sockId);
        }
      });
    });

    // 4. Pulser button
    const pulserEl = this.elementsLayer.querySelector('#btn-pulser-widget');
    if (pulserEl) {
      const handlePulse = (isPressed) => {
        if (isPressed) {
          pulserEl.classList.add('pulser-pressed');
        } else {
          pulserEl.classList.remove('pulser-pressed');
        }
        if (this.onPulserAction) {
          this.onPulserAction(isPressed);
        }
      };

      pulserEl.addEventListener('mousedown', () => handlePulse(true));
      window.addEventListener('mouseup', () => {
        if (pulserEl.classList.contains('pulser-pressed')) handlePulse(false);
      });
      pulserEl.addEventListener('touchstart', (e) => { e.preventDefault(); handlePulse(true); });
      pulserEl.addEventListener('touchend', (e) => { e.preventDefault(); handlePulse(false); });
    }
  }

  /**
   * Update visual state of a switch lever and LED
   */
  updateSwitchVisual(switchId, state) {
    const swEl = this.elementsLayer.querySelector(`#${switchId}`);
    const num = switchId.replace('sw_', '');
    const ledEl = this.elementsLayer.querySelector(`#led_in_${num}`);

    if (swEl) {
      if (state === 1) {
        swEl.classList.remove('switch-down');
        swEl.classList.add('switch-up');
      } else {
        swEl.classList.remove('switch-up');
        swEl.classList.add('switch-down');
      }
    }

    if (ledEl) {
      if (state === 1) {
        ledEl.classList.remove('led-off');
        ledEl.classList.add('led-on');
      } else {
        ledEl.classList.remove('led-on');
        ledEl.classList.add('led-off');
      }
    }
  }

  /**
   * Update all logic indicators (L0 to L15)
   */
  updateIndicatorLeds(indicatorStates) {
    for (let i = 0; i < 16; i++) {
      const ledEl = this.elementsLayer.querySelector(`#led_out_${i}`);
      if (ledEl) {
        const val = indicatorStates[`ind_${i}`];
        if (val === 1) {
          ledEl.classList.remove('led-off');
          ledEl.classList.add('led-on');
        } else {
          ledEl.classList.remove('led-on');
          ledEl.classList.add('led-off');
        }
      }
    }
  }

  /**
   * Update Logic Probe display
   */
  updateProbeVisual(probeState) {
    const highLed = this.elementsLayer.querySelector('#probe-led-high');
    const lowLed = this.elementsLayer.querySelector('#probe-led-low');
    if (highLed) {
      if (probeState.isHigh) highLed.classList.add('led-on');
      else highLed.classList.remove('led-on');
    }
    if (lowLed) {
      if (probeState.isLow) lowLed.classList.add('led-on');
      else lowLed.classList.remove('led-on');
    }
  }

  /**
   * Update 7-segment display segments
   */
  update7SegmentDisplay(prefix, segments) {
    ['a', 'b', 'c', 'd', 'e', 'f', 'g'].forEach(seg => {
      const segEl = this.elementsLayer.querySelector(`#${prefix}_seg_${seg}`);
      if (segEl) {
        if (segments[seg] === 1) {
          segEl.classList.remove('seg-off');
          segEl.classList.add('seg-on');
        } else {
          segEl.classList.remove('seg-on');
          segEl.classList.add('seg-off');
        }
      }
    });
  }

  /**
   * Render seated IC Chip in a socket
   */
  renderSeatedChip(socketId, icId) {
    const slotEl = this.elementsLayer.querySelector(`#${socketId}-chip-slot`);
    const leverEl = this.elementsLayer.querySelector(`#${socketId}-lever`);
    if (!slotEl) return;

    if (!icId) {
      slotEl.innerHTML = '';
      if (leverEl) {
        leverEl.classList.remove('lever-locked');
        leverEl.classList.add('lever-unlocked');
      }
      return;
    }

    const ic = IC_LIBRARY[icId];
    const is14Pin = (ic && ic.pinCount === 14);

    // Realistic DIP IC package
    slotEl.innerHTML = `
      <div class="seated-ic-package ${is14Pin ? 'ic-14pin' : 'ic-16pin'}">
        <div class="ic-notch"></div>
        <div class="ic-pin1-dot"></div>
        <div class="ic-label-text">
          <span class="ic-brand">TI</span>
          <span class="ic-part-number">SN${icId}N</span>
        </div>
      </div>
    `;

    if (leverEl) {
      leverEl.classList.remove('lever-unlocked');
      leverEl.classList.add('lever-locked');
    }
  }

  /**
   * Highlight terminal holes (e.g. for step guidance or pending wire)
   */
  highlightHoles(holeIds, activeSourceId = null) {
    // Clear previous highlights
    this.elementsLayer.querySelectorAll('.hole-highlight').forEach(el => {
      el.classList.remove('hole-highlight', 'hole-source', 'hole-dest');
    });

    if (holeIds) {
      holeIds.forEach(hId => {
        const el = this.elementsLayer.querySelector(`#hole_${hId}`);
        if (el) {
          el.classList.add('hole-highlight');
          if (hId === activeSourceId) {
            el.classList.add('hole-source');
          } else {
            el.classList.add('hole-dest');
          }
        }
      });
    }
  }

  /**
   * Initialize smooth Zoom and Pan
   */
  initZoomPanEvents() {
    // Mouse wheel zoom centered on cursor
    this.viewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      const rect = this.viewport.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
      this.applyZoom(zoomFactor, mouseX, mouseY);
    }, { passive: false });

    // Panning with drag
    this.viewport.addEventListener('mousedown', (e) => {
      // Pan when clicking background or using middle click / space drag
      if (e.target === this.boardBg || e.button === 1 || e.target.id === 'board-viewport' || e.target.id === 'board-stage') {
        this.isPanning = true;
        this.startPan = { x: e.clientX - this.panX, y: e.clientY - this.panY };
        this.viewport.style.cursor = 'grabbing';
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isPanning) {
        this.panX = e.clientX - this.startPan.x;
        this.panY = e.clientY - this.startPan.y;
        this.updateTransform();
      } else if (window.trainerApp?.wiringSystem?.pendingFromHole) {
        const boardPt = this.clientToBoardCoords(e.clientX, e.clientY);
        window.trainerApp.wiringSystem.updatePreview(boardPt.x, boardPt.y);
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        if (window.trainerApp?.wiringSystem?.pendingFromHole) {
          window.trainerApp.wiringSystem.cancelWiring();
          this.highlightHoles(null);
        }
      }
    });

    this.viewport.addEventListener('contextmenu', (e) => {
      if (window.trainerApp?.wiringSystem?.pendingFromHole) {
        e.preventDefault();
        window.trainerApp.wiringSystem.cancelWiring();
        this.highlightHoles(null);
      }
    });

    window.addEventListener('mouseup', () => {
      if (this.isPanning) {
        this.isPanning = false;
        this.viewport.style.cursor = 'default';
      }
    });

    // Touch gesture pinch-to-zoom & two-finger pan
    let initialDistance = null;
    let initialZoom = 1.0;

    this.viewport.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        initialDistance = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        initialZoom = this.zoom;
      } else if (e.touches.length === 1 && (e.target === this.boardBg || e.target.id === 'board-viewport')) {
        this.isPanning = true;
        this.startPan = { x: e.touches[0].clientX - this.panX, y: e.touches[0].clientY - this.panY };
      }
    }, { passive: false });

    this.viewport.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2 && initialDistance) {
        e.preventDefault();
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const currentDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        const factor = currentDist / initialDistance;
        this.setZoom(initialZoom * factor);
      } else if (e.touches.length === 1 && this.isPanning) {
        this.panX = e.touches[0].clientX - this.startPan.x;
        this.panY = e.touches[0].clientY - this.startPan.y;
        this.updateTransform();
      }
    }, { passive: false });

    this.viewport.addEventListener('touchend', () => {
      initialDistance = null;
      this.isPanning = false;
    });
  }

  applyZoom(factor, centerX, centerY) {
    const newZoom = Math.min(3.2, Math.max(0.4, this.zoom * factor));
    // Zoom centered around mouse coordinate
    this.panX = centerX - (centerX - this.panX) * (newZoom / this.zoom);
    this.panY = centerY - (centerY - this.panY) * (newZoom / this.zoom);
    this.zoom = newZoom;
    this.updateTransform();
  }

  setZoom(value) {
    this.zoom = Math.min(3.2, Math.max(0.4, value));
    this.updateTransform();
  }

  resetZoom() {
    this.zoom = 1.0;
    this.panX = 0;
    this.panY = 0;
    this.updateTransform();
  }

  fitToScreen() {
    const rect = this.viewport.getBoundingClientRect();
    const scaleX = rect.width / BOARD_WIDTH;
    const scaleY = rect.height / BOARD_HEIGHT;
    this.zoom = Math.min(scaleX, scaleY) * 0.96;
    this.panX = (rect.width - BOARD_WIDTH * this.zoom) / 2;
    this.panY = (rect.height - BOARD_HEIGHT * this.zoom) / 2;
    this.updateTransform();
  }

  updateTransform() {
    this.stage.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.zoom})`;
    if (this.onZoomChanged) {
      this.onZoomChanged(Math.round(this.zoom * 100));
    }
  }

  /**
   * Convert client (screen) mouse coordinate to board coordinate space (0..1024, 0..768)
   */
  screenToBoardCoords(screenX, screenY) {
    const stageRect = this.stage.getBoundingClientRect();
    const x = (screenX - stageRect.left) / this.zoom;
    const y = (screenY - stageRect.top) / this.zoom;
    return {
      x: Math.max(0, Math.min(1024, x)),
      y: Math.max(0, Math.min(768, y))
    };
  }

  clientToBoardCoords(screenX, screenY) {
    return this.screenToBoardCoords(screenX, screenY);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BoardView };
}
