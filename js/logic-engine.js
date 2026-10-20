/**
 * DIGITAL TECHNIQUES VIRTUAL TRAINER KIT SIMULATOR
 * Real Digital Logic Simulation & Netlist Engine
 * Handles power verification, gate propagation, stateful flip-flops & counters
 */

let _IC_LIB = (typeof IC_LIBRARY !== 'undefined') ? IC_LIBRARY : null;
let _HOLE_MAP = (typeof HOLE_LOOKUP !== 'undefined') ? HOLE_LOOKUP : null;

if (typeof require !== 'undefined' && typeof window === 'undefined') {
  if (!_IC_LIB) _IC_LIB = require('./ic-library.js').IC_LIBRARY;
  if (!_HOLE_MAP) _HOLE_MAP = require('./board-coords.js').HOLE_LOOKUP;
}

class DigitalLogicEngine {
  constructor() {
    // Sockets state: socketId -> { icId: '7400', state: {...} }
    this.socketChips = {
      zif16: null,
      zif20: null,
      dip_ic1: null,
      dip_ic2: null
    };

    // Input switches state: sw_0 to sw_15 (0 = LOW / 0V, 1 = HIGH / +5V)
    this.switchStates = {};
    for (let i = 0; i < 16; i++) {
      this.switchStates[`sw_${i}`] = 0;
    }

    // Clocks and pulser state
    this.clockStates = {
      clk_1hz: 0,
      clk_10hz: 0,
      clk_100hz: 0,
      clk_1khz: 0,
      clk_10khz: 0,
      clk_1mhz: 0,
      clk_ext: 0
    };
    this.pulserPressed = false;

    // Sequential states for ICs (keyed by socketId)
    this.icInternalStates = {
      zif16: {},
      zif20: {},
      dip_ic1: {},
      dip_ic2: {}
    };

    // Diagnostics / warnings list
    this.diagnostics = [];

    // Indicator LED states: ind_0 to ind_15 -> 0 or 1
    this.indicatorStates = {};
    for (let i = 0; i < 16; i++) {
      this.indicatorStates[`ind_${i}`] = 0;
    }

    // Logic probe state: { isConnected: bool, isHigh: bool, isLow: bool }
    this.probeState = { isConnected: false, isHigh: false, isLow: false };

    // 7-Segment display states: segments { a, b, c, d, e, f, g }
    this.displays = {
      disp_3: { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, char: ' ' },
      dsp_1:  { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, char: ' ' },
      dsp_2:  { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, char: ' ' }
    };

    // Net voltages lookup: holeId -> 0, 1, or undefined
    this.holeVoltages = {};
  }

  /**
   * Set IC chip into a socket
   */
  insertChip(socketId, icId) {
    if (!this.socketChips[socketId] !== undefined) {
      this.socketChips[socketId] = icId;
      this.resetChipState(socketId, icId);
    }
  }

  /**
   * Remove IC chip from socket
   */
  removeChip(socketId) {
    this.socketChips[socketId] = null;
    this.icInternalStates[socketId] = {};
  }

  /**
   * Initialize stateful registers/flip-flops for an IC
   */
  resetChipState(socketId, icId) {
    const s = {};
    if (icId === '7476') {
      s.q1 = 0; s.q1_bar = 1;
      s.q2 = 0; s.q2_bar = 1;
      s.prevClk1 = 0; s.prevClk2 = 0;
    } else if (icId === '7474') {
      s.q1 = 0; s.q1_bar = 1;
      s.q2 = 0; s.q2_bar = 1;
      s.prevClk1 = 0; s.prevClk2 = 0;
    } else if (icId === '7490') {
      s.count = 0; // 0 to 9
      s.prevClkA = 0; s.prevClkB = 0;
    } else if (icId === '7493') {
      s.count = 0; // 0 to 15
      s.prevClkA = 0; s.prevClkB = 0;
    } else if (icId === '7495') {
      s.bits = [0, 0, 0, 0]; // QA, QB, QC, QD
      s.prevClk1 = 0; s.prevClk2 = 0;
    } else if (icId === '74193') {
      s.count = 0;
      s.prevUp = 1; s.prevDown = 1;
    }
    this.icInternalStates[socketId] = s;
  }

  /**
   * Toggle or set switch state
   */
  setSwitch(switchId, value) {
    this.switchStates[switchId] = value ? 1 : 0;
  }

  /**
   * Set manual pulser button state
   */
  setPulser(isPressed) {
    this.pulserPressed = isPressed;
  }

  /**
   * Build electrical nets (connected components of holes)
   */
  buildNets(wires) {
    const adj = {};
    const addEdge = (u, v) => {
      if (!adj[u]) adj[u] = new Set();
      if (!adj[v]) adj[v] = new Set();
      adj[u].add(v);
      adj[v].add(u);
    };

    wires.forEach(w => {
      if (w.fromHole && w.toHole) {
        addEdge(w.fromHole, w.toHole);
      }
    });

    const visited = new Set();
    const nets = [];

    // For every known hole that has wires
    Object.keys(adj).forEach(node => {
      if (!visited.has(node)) {
        const net = new Set();
        const queue = [node];
        visited.add(node);

        while (queue.length > 0) {
          const curr = queue.shift();
          net.add(curr);
          adj[curr].forEach(neighbor => {
            if (!visited.has(neighbor)) {
              visited.add(neighbor);
              queue.push(neighbor);
            }
          });
        }
        nets.push(net);
      }
    });

    return nets;
  }

  /**
   * Solve circuit state given current wires
   */
  simulate(wires) {
    this.diagnostics = [];
    const nets = this.buildNets(wires);

    // Map each hole to its Net index
    const holeToNetIdx = {};
    nets.forEach((net, idx) => {
      net.forEach(holeId => {
        holeToNetIdx[holeId] = idx;
      });
    });

    // Check power for all seated ICs
    const chipPower = {};
    ['zif16', 'zif20', 'dip_ic1', 'dip_ic2'].forEach(socketId => {
      const icId = this.socketChips[socketId];
      if (icId) {
        chipPower[socketId] = this.verifyChipPower(socketId, icId, holeToNetIdx, nets);
      }
    });

    // Multi-pass iterative logic solver (handles cascading & feedback)
    const MAX_PASSES = 8;
    let netValues = new Array(nets.length).fill(undefined);
    let netDrivers = new Array(nets.length).fill(null).map(() => []);

    for (let pass = 0; pass < MAX_PASSES; pass++) {
      let changed = false;
      const nextNetValues = [...netValues];

      // 1. Evaluate external power and input sources into nets
      nets.forEach((net, idx) => {
        let hasVcc = false;
        let hasGnd = false;
        let switchHigh = false;
        let switchLow = false;
        let clockHigh = false;
        let clockLow = false;
        let pulserHigh = false;
        let pulserLow = false;

        net.forEach(holeId => {
          // Power supply terminals
          if (holeId === 'pwr_p5_1' || holeId === 'pwr_p5_2') hasVcc = true;
          if (holeId === 'pwr_gnd_1' || holeId === 'pwr_gnd_2') hasGnd = true;
          if (holeId === 'pwr_p12_1' || holeId === 'pwr_p12_2') {
            this.diagnostics.push({ level: 'warning', msg: 'Connected to +12V! Standard 74LS ICs operate at +5V.' });
          }

          // Logic input switches (inp_0 to inp_15)
          if (holeId.startsWith('inp_')) {
            const num = parseInt(holeId.replace('inp_', ''), 10);
            if (this.switchStates[`sw_${num}`] === 1) {
              switchHigh = true;
            } else {
              switchLow = true;
            }
          }

          // Fixed clock terminals
          if (holeId.startsWith('clk_')) {
            if (this.clockStates[holeId] === 1) clockHigh = true;
            else clockLow = true;
          }

          // Manual pulser terminals
          if (holeId === 'puls_t1') {
            if (this.pulserPressed) pulserHigh = true;
            else pulserLow = true;
          }
          if (holeId === 'puls_t2') {
            if (this.pulserPressed) pulserLow = true;
            else pulserHigh = true;
          }
        });

        // Detect short circuit (VCC connected directly to GND)
        if (hasVcc && hasGnd) {
          this.diagnostics.push({ level: 'error', msg: 'Short Circuit Detected! +5V is connected directly to GND.' });
          nextNetValues[idx] = undefined;
          return;
        }

        // Determine net level from direct sources
        if (hasVcc) nextNetValues[idx] = 1;
        else if (hasGnd) nextNetValues[idx] = 0;
        else if (switchHigh && !switchLow) nextNetValues[idx] = 1;
        else if (switchLow && !switchHigh) nextNetValues[idx] = 0;
        else if (clockHigh && !clockLow) nextNetValues[idx] = 1;
        else if (clockLow && !clockHigh) nextNetValues[idx] = 0;
        else if (pulserHigh && !pulserLow) nextNetValues[idx] = 1;
        else if (pulserLow && !pulserHigh) nextNetValues[idx] = 0;
      });

      // 2. Evaluate IC outputs based on their input pin net values
      ['zif16', 'zif20', 'dip_ic1', 'dip_ic2'].forEach(socketId => {
        const icId = this.socketChips[socketId];
        if (icId && chipPower[socketId]?.isPowered) {
          const pinOutputs = this.evaluateChipLogic(socketId, icId, holeToNetIdx, nextNetValues);
          Object.keys(pinOutputs).forEach(pinNum => {
            const holeId = this.getSocketHoleId(socketId, parseInt(pinNum, 10));
            const netIdx = holeToNetIdx[holeId];
            if (netIdx !== undefined) {
              const outVal = pinOutputs[pinNum];
              if (outVal !== undefined && nextNetValues[netIdx] !== outVal) {
                nextNetValues[netIdx] = outVal;
                changed = true;
              }
            }
          });
        }
      });

      // Check for convergence
      for (let i = 0; i < nets.length; i++) {
        if (netValues[i] !== nextNetValues[i]) {
          changed = true;
          break;
        }
      }
      netValues = nextNetValues;
      if (!changed) break;
    }

    // Record voltages for all holes
    this.holeVoltages = {};
    nets.forEach((net, idx) => {
      const val = netValues[idx];
      net.forEach(hId => {
        this.holeVoltages[hId] = val;
      });
    });

    // 3. Update Indicator LEDs (ind_0 to ind_15)
    for (let i = 0; i < 16; i++) {
      const holeId = `ind_${i}`;
      const val = this.holeVoltages[holeId];
      this.indicatorStates[holeId] = (val === 1) ? 1 : 0;
    }

    // 4. Update Logic Probe
    const probeVal = this.holeVoltages['probe_in'];
    if (probeVal === 1) {
      this.probeState = { isConnected: true, isHigh: true, isLow: false };
    } else if (probeVal === 0) {
      this.probeState = { isConnected: true, isHigh: false, isLow: true };
    } else {
      this.probeState = { isConnected: false, isHigh: false, isLow: false };
    }

    // 5. Update 7-Segment Displays
    this.update7SegmentDisplays();

    return {
      holeVoltages: this.holeVoltages,
      indicatorStates: this.indicatorStates,
      probeState: this.probeState,
      displays: this.displays,
      diagnostics: this.diagnostics,
      chipPower: chipPower
    };
  }

  /**
   * Verify power pins for an IC chip in a socket
   */
  verifyChipPower(socketId, icId, holeToNetIdx, nets) {
    const lib = _IC_LIB || (typeof IC_LIBRARY !== 'undefined' ? IC_LIBRARY : {});
    const ic = lib[icId];
    if (!ic) return { isPowered: false, missing: 'Unknown IC' };

    const vccPinHole = this.getSocketHoleId(socketId, ic.powerPins.vcc);
    const gndPinHole = this.getSocketHoleId(socketId, ic.powerPins.gnd);

    const vccNetIdx = holeToNetIdx[vccPinHole];
    const gndNetIdx = holeToNetIdx[gndPinHole];

    const hasVcc = (vccNetIdx !== undefined && (nets[vccNetIdx]?.has('pwr_p5_1') || nets[vccNetIdx]?.has('pwr_p5_2')));
    const hasGnd = (gndNetIdx !== undefined && (nets[gndNetIdx]?.has('pwr_gnd_1') || nets[gndNetIdx]?.has('pwr_gnd_2')));

    if (!hasVcc || !hasGnd) {
      const socketName = (socketId === 'zif16') ? '16-Pin Socket' :
                         (socketId === 'zif20') ? '20-Pin Socket' : 'DIP Socket';
      let msg = `${ic.partNumber} in ${socketName} is not powered. `;
      if (!hasVcc && !hasGnd) {
        msg += `Connect Pin ${ic.powerPins.vcc} to +5V and Pin ${ic.powerPins.gnd} to GND.`;
      } else if (!hasVcc) {
        msg += `Connect Pin ${ic.powerPins.vcc} to +5V.`;
      } else {
        msg += `Connect Pin ${ic.powerPins.gnd} to GND.`;
      }
      this.diagnostics.push({ level: 'warning', msg: msg });
      return { isPowered: false, hasVcc, hasGnd };
    }

    return { isPowered: true, hasVcc: true, hasGnd: true };
  }

  /**
   * Evaluate digital logic for an IC chip
   */
  evaluateChipLogic(socketId, icId, holeToNetIdx, netValues) {
    const lib = _IC_LIB || (typeof IC_LIBRARY !== 'undefined' ? IC_LIBRARY : {});
    const ic = lib[icId];
    const outputs = {};
    if (!ic) return outputs;

    // Helper to read pin logic level (default to 1 for TTL floating inputs, but warn)
    const readPin = (pinNum) => {
      const hId = this.getSocketHoleId(socketId, pinNum);
      const nIdx = holeToNetIdx[hId];
      if (nIdx === undefined) return 1; // Unconnected TTL input floats HIGH
      const v = netValues[nIdx];
      return (v === undefined) ? 1 : v;
    };

    // Evaluate basic gates (7400, 7402, 7404, 7408, 7432, 7486, 74266)
    if (ic.gates) {
      ic.gates.forEach(g => {
        const inVals = g.inputs.map(p => readPin(p));
        let outVal = 0;
        if (g.type === 'NAND') {
          outVal = (inVals[0] === 1 && inVals[1] === 1) ? 0 : 1;
        } else if (g.type === 'NOR') {
          outVal = (inVals[0] === 0 && inVals[1] === 0) ? 1 : 0;
        } else if (g.type === 'NOT') {
          outVal = (inVals[0] === 1) ? 0 : 1;
        } else if (g.type === 'AND') {
          outVal = (inVals[0] === 1 && inVals[1] === 1) ? 1 : 0;
        } else if (g.type === 'OR') {
          outVal = (inVals[0] === 1 || inVals[1] === 1) ? 1 : 0;
        } else if (g.type === 'XOR') {
          outVal = (inVals[0] !== inVals[1]) ? 1 : 0;
        } else if (g.type === 'XNOR') {
          outVal = (inVals[0] === inVals[1]) ? 1 : 0;
        }
        outputs[g.output] = outVal;
      });
    }

    // 7447 BCD Decoder
    else if (icId === '7447') {
      const a = readPin(7);
      const b = readPin(1);
      const c = readPin(2);
      const d = readPin(6);
      const lt = readPin(3); // Lamp test (active low)
      const rbi = readPin(5); // Ripple blanking (active low)

      if (lt === 0) {
        // Lamp test: all segments lit (active low: all 0)
        [13, 12, 11, 10, 9, 15, 14].forEach(p => outputs[p] = 0);
      } else {
        const bcd = (d << 3) | (c << 2) | (b << 1) | a;
        if (bcd === 0 && rbi === 0) {
          // Ripple blanking
          [13, 12, 11, 10, 9, 15, 14].forEach(p => outputs[p] = 1);
        } else if (bcd >= 0 && bcd <= 9) {
          const segs = ic.segmentMap[bcd];
          outputs[13] = segs.a;
          outputs[12] = segs.b;
          outputs[11] = segs.c;
          outputs[10] = segs.d;
          outputs[9]  = segs.e;
          outputs[15] = segs.f;
          outputs[14] = segs.g;
        } else {
          // BCD > 9 invalid
          [13, 12, 11, 10, 9, 15, 14].forEach(p => outputs[p] = 1);
        }
      }
    }

    // 7485 4-Bit Magnitude Comparator
    else if (icId === '7485') {
      const a = (readPin(15) << 3) | (readPin(13) << 2) | (readPin(12) << 1) | readPin(10);
      const b = (readPin(1) << 3)  | (readPin(14) << 2) | (readPin(11) << 1) | readPin(9);
      const ia_lt_b = readPin(2);
      const ia_eq_b = readPin(3);
      const ia_gt_b = readPin(4);

      let o_lt = 0, o_eq = 0, o_gt = 0;
      if (a > b) {
        o_gt = 1;
      } else if (a < b) {
        o_lt = 1;
      } else {
        // Equal: check cascading inputs
        if (ia_eq_b === 1) o_eq = 1;
        else if (ia_gt_b === 1) o_gt = 1;
        else if (ia_lt_b === 1) o_lt = 1;
        else o_eq = 1;
      }
      outputs[5] = o_gt;
      outputs[6] = o_eq;
      outputs[7] = o_lt;
    }

    // 74151 8:1 Multiplexer
    else if (icId === '74151') {
      const g_bar = readPin(7);
      if (g_bar === 1) {
        outputs[5] = 0; // Y = 0
        outputs[6] = 1; // W = 1
      } else {
        const s = (readPin(9) << 2) | (readPin(10) << 1) | readPin(11);
        const dataPins = [4, 3, 2, 1, 15, 14, 13, 12]; // D0 to D7
        const val = readPin(dataPins[s]);
        outputs[5] = val;
        outputs[6] = (val === 1) ? 0 : 1;
      }
    }

    // 74155 Dual 1:4 / 1:8 Demultiplexer
    else if (icId === '74155') {
      const a = readPin(13); // S0
      const b = readPin(3);  // S1
      const sel = (b << 1) | a;

      // Section 1: 1C (pin 1), 1G' (pin 2)
      const c1 = readPin(1);
      const g1 = readPin(2);
      const outPins1 = [7, 6, 5, 4]; // 1Y0 to 1Y3
      outPins1.forEach((p, idx) => {
        if (g1 === 0 && c1 === 1 && idx === sel) outputs[p] = 0;
        else outputs[p] = 1;
      });

      // Section 2: 2C' (pin 14), 2G' (pin 15)
      const c2 = readPin(14);
      const g2 = readPin(15);
      const outPins2 = [9, 10, 11, 12]; // 2Y0 to 2Y3
      outPins2.forEach((p, idx) => {
        if (g2 === 0 && c2 === 0 && idx === sel) outputs[p] = 0;
        else outputs[p] = 1;
      });
    }

    // 7476 Dual JK Flip-Flop
    else if (icId === '7476') {
      const st = this.icInternalStates[socketId];
      // FF1: CLK 1, PRE' 2, CLR' 3, J 4, K 16, Q 15, Q' 14
      const clk1 = readPin(1);
      const pre1 = readPin(2);
      const clr1 = readPin(3);
      const j1 = readPin(4);
      const k1 = readPin(16);

      // Asynchronous Clear & Preset
      if (pre1 === 0 && clr1 === 1) {
        st.q1 = 1; st.q1_bar = 0;
      } else if (pre1 === 1 && clr1 === 0) {
        st.q1 = 0; st.q1_bar = 1;
      } else if (pre1 === 0 && clr1 === 0) {
        st.q1 = 1; st.q1_bar = 1; // Unstable / forbidden
      } else {
        // Clocked pulse trigger on falling edge (1 -> 0)
        if (st.prevClk1 === 1 && clk1 === 0) {
          if (j1 === 0 && k1 === 1) {
            st.q1 = 0; st.q1_bar = 1;
          } else if (j1 === 1 && k1 === 0) {
            st.q1 = 1; st.q1_bar = 0;
          } else if (j1 === 1 && k1 === 1) {
            st.q1 = (st.q1 === 1) ? 0 : 1;
            st.q1_bar = (st.q1 === 1) ? 0 : 1;
          }
        }
      }
      st.prevClk1 = clk1;
      outputs[15] = st.q1;
      outputs[14] = st.q1_bar;

      // FF2: CLK 6, PRE' 7, CLR' 8, J 9, K 10, Q 11, Q' 12
      const clk2 = readPin(6);
      const pre2 = readPin(7);
      const clr2 = readPin(8);
      const j2 = readPin(9);
      const k2 = readPin(10);

      if (pre2 === 0 && clr2 === 1) {
        st.q2 = 1; st.q2_bar = 0;
      } else if (pre2 === 1 && clr2 === 0) {
        st.q2 = 0; st.q2_bar = 1;
      } else if (pre2 === 0 && clr2 === 0) {
        st.q2 = 1; st.q2_bar = 1;
      } else {
        if (st.prevClk2 === 1 && clk2 === 0) {
          if (j2 === 0 && k2 === 1) {
            st.q2 = 0; st.q2_bar = 1;
          } else if (j2 === 1 && k2 === 0) {
            st.q2 = 1; st.q2_bar = 0;
          } else if (j2 === 1 && k2 === 1) {
            st.q2 = (st.q2 === 1) ? 0 : 1;
            st.q2_bar = (st.q2 === 1) ? 0 : 1;
          }
        }
      }
      st.prevClk2 = clk2;
      outputs[11] = st.q2;
      outputs[12] = st.q2_bar;
    }

    // 7490 Decade Counter
    else if (icId === '7490') {
      const st = this.icInternalStates[socketId];
      const clkA = readPin(14);
      const clkB = readPin(1);
      const r0_1 = readPin(2);
      const r0_2 = readPin(3);
      const r9_1 = readPin(6);
      const r9_2 = readPin(7);

      // Reset to 0 (R0(1) & R0(2) HIGH)
      if (r0_1 === 1 && r0_2 === 1) {
        st.count = 0;
      }
      // Reset to 9 (R9(1) & R9(2) HIGH)
      else if (r9_1 === 1 && r9_2 === 1) {
        st.count = 9;
      }
      else {
        // Counting on negative edge of CLKA
        if (st.prevClkA === 1 && clkA === 0) {
          st.count = (st.count + 1) % 10;
        }
      }
      st.prevClkA = clkA;
      st.prevClkB = clkB;

      // QA = bit 0, QB = bit 1, QC = bit 2, QD = bit 3
      outputs[12] = (st.count & 1) ? 1 : 0;
      outputs[9]  = (st.count & 2) ? 1 : 0;
      outputs[8]  = (st.count & 4) ? 1 : 0;
      outputs[11] = (st.count & 8) ? 1 : 0;
    }

    // 7493 4-Bit Binary Counter
    else if (icId === '7493') {
      const st = this.icInternalStates[socketId];
      const clkA = readPin(14);
      const r0_1 = readPin(2);
      const r0_2 = readPin(3);

      if (r0_1 === 1 && r0_2 === 1) {
        st.count = 0;
      } else if (st.prevClkA === 1 && clkA === 0) {
        st.count = (st.count + 1) % 16;
      }
      st.prevClkA = clkA;

      outputs[12] = (st.count & 1) ? 1 : 0;
      outputs[9]  = (st.count & 2) ? 1 : 0;
      outputs[8]  = (st.count & 4) ? 1 : 0;
      outputs[11] = (st.count & 8) ? 1 : 0;
    }

    // 7495 4-Bit Shift Register
    else if (icId === '7495') {
      const st = this.icInternalStates[socketId];
      const mode = readPin(6);
      const ser = readPin(1);
      const clk1 = readPin(9);
      const clk2 = readPin(8);

      // Mode 0: Shift right on CLK1 falling edge
      if (mode === 0 && st.prevClk1 === 1 && clk1 === 0) {
        st.bits = [ser, st.bits[0], st.bits[1], st.bits[2]];
      }
      // Mode 1: Parallel load on CLK2 falling edge
      else if (mode === 1 && st.prevClk2 === 1 && clk2 === 0) {
        st.bits = [readPin(2), readPin(3), readPin(4), readPin(5)];
      }
      st.prevClk1 = clk1;
      st.prevClk2 = clk2;

      outputs[13] = st.bits[0]; // QA
      outputs[12] = st.bits[1]; // QB
      outputs[11] = st.bits[2]; // QC
      outputs[10] = st.bits[3]; // QD
    }

    return outputs;
  }

  /**
   * Update 7-segment display widgets
   */
  update7SegmentDisplays() {
    // DSP-1 / DSP-2 connected to bcd_out_a..g
    const bcdSegs = {};
    ['a', 'b', 'c', 'd', 'e', 'f', 'g'].forEach(seg => {
      const v = this.holeVoltages[`bcd_out_${seg}`];
      // In common anode displays, 0V (LOW) lights the segment
      bcdSegs[seg] = (v === 0) ? 1 : 0;
    });

    this.displays.dsp_1 = { ...bcdSegs };

    // DISP-3 in logic probe section
    const d3_val = this.holeVoltages['disp3_in'];
    if (d3_val === 1) {
      this.displays.disp_3 = { a: 0, b: 1, c: 1, d: 0, e: 0, f: 0, g: 0, char: 'H' };
    } else if (d3_val === 0) {
      this.displays.disp_3 = { a: 0, b: 0, c: 0, d: 1, e: 1, f: 1, g: 0, char: 'L' };
    } else {
      this.displays.disp_3 = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, char: ' ' };
    }
  }

  /**
   * Helper to map socket + pin to holeId
   */
  getSocketHoleId(socketId, pinNum) {
    if (socketId === 'zif16') return `z16_p${pinNum}`;
    if (socketId === 'zif20') return `z20_p${pinNum}`;
    return `${socketId}_p${pinNum}`;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DigitalLogicEngine };
}
