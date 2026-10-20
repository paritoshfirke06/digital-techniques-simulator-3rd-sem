/**
 * DIGITAL TECHNIQUES VIRTUAL TRAINER KIT SIMULATOR
 * Pixel-Perfect Verified Board Coordinates Map (DTA-09)
 * Dimensions: 1024 x 768 px
 */

const BOARD_WIDTH = 1024;
const BOARD_HEIGHT = 768;

const BOARD_COORDS = {
  // 16-PIN ZIF SOCKET (Verified Hole Centers)
  zif16: {
    id: 'zif16',
    name: '16-Pin ZIF Socket',
    type: 'socket_zif',
    pinCount: 16,
    x: 326,
    y: 628,
    width: 200,
    height: 60,
    lever: { x: 524, y: 636 },
    pins: [
      // Top row: Pins 1 to 8 (Verified dead-center in black socket holes)
      { pin: 1,  holeId: 'z16_p1',  x: 333, y: 609, label: '1' },
      { pin: 2,  holeId: 'z16_p2',  x: 360, y: 609, label: '2' },
      { pin: 3,  holeId: 'z16_p3',  x: 388, y: 609, label: '3' },
      { pin: 4,  holeId: 'z16_p4',  x: 416, y: 610, label: '4' },
      { pin: 5,  holeId: 'z16_p5',  x: 441, y: 609, label: '5' },
      { pin: 6,  holeId: 'z16_p6',  x: 466, y: 609, label: '6' },
      { pin: 7,  holeId: 'z16_p7',  x: 492, y: 609, label: '7' },
      { pin: 8,  holeId: 'z16_p8',  x: 518, y: 609, label: '8' },
      // Bottom row: Pins 9 to 16
      { pin: 9,  holeId: 'z16_p9',  x: 333, y: 711, label: '9' },
      { pin: 10, holeId: 'z16_p10', x: 360, y: 711, label: '10' },
      { pin: 11, holeId: 'z16_p11', x: 388, y: 711, label: '11' },
      { pin: 12, holeId: 'z16_p12', x: 416, y: 711, label: '12' },
      { pin: 13, holeId: 'z16_p13', x: 441, y: 711, label: '13' },
      { pin: 14, holeId: 'z16_p14', x: 466, y: 711, label: '14' },
      { pin: 15, holeId: 'z16_p15', x: 492, y: 711, label: '15' },
      { pin: 16, holeId: 'z16_p16', x: 518, y: 711, label: '16' }
    ]
  },

  // 20-PIN ZIF SOCKET (Verified Hole Centers)
  zif20: {
    id: 'zif20',
    name: '20-Pin ZIF Socket',
    type: 'socket_zif',
    pinCount: 20,
    x: 70,
    y: 628,
    width: 220,
    height: 60,
    lever: { x: 286, y: 636 },
    pins: [
      // Top row: Pins 1 to 10
      { pin: 1,  holeId: 'z20_p1',  x: 82,  y: 609, label: '1' },
      { pin: 2,  holeId: 'z20_p2',  x: 104, y: 609, label: '2' },
      { pin: 3,  holeId: 'z20_p3',  x: 126, y: 609, label: '3' },
      { pin: 4,  holeId: 'z20_p4',  x: 148, y: 609, label: '4' },
      { pin: 5,  holeId: 'z20_p5',  x: 170, y: 609, label: '5' },
      { pin: 6,  holeId: 'z20_p6',  x: 192, y: 609, label: '6' },
      { pin: 7,  holeId: 'z20_p7',  x: 214, y: 609, label: '7' },
      { pin: 8,  holeId: 'z20_p8',  x: 236, y: 609, label: '8' },
      { pin: 9,  holeId: 'z20_p9',  x: 258, y: 609, label: '9' },
      { pin: 10, holeId: 'z20_p10', x: 280, y: 609, label: '10' },
      // Bottom row: Pins 11 to 20
      { pin: 11, holeId: 'z20_p11', x: 82,  y: 711, label: '11' },
      { pin: 12, holeId: 'z20_p12', x: 104, y: 711, label: '12' },
      { pin: 13, holeId: 'z20_p13', x: 126, y: 711, label: '13' },
      { pin: 14, holeId: 'z20_p14', x: 148, y: 711, label: '14' },
      { pin: 15, holeId: 'z20_p15', x: 170, y: 711, label: '15' },
      { pin: 16, holeId: 'z20_p16', x: 192, y: 711, label: '16' },
      { pin: 17, holeId: 'z20_p17', x: 214, y: 711, label: '17' },
      { pin: 18, holeId: 'z20_p18', x: 236, y: 711, label: '18' },
      { pin: 19, holeId: 'z20_p19', x: 258, y: 711, label: '19' },
      { pin: 20, holeId: 'z20_p20', x: 280, y: 711, label: '20' }
    ]
  },

  // FIXED DC POWER SUPPLY (Verified Hole Centers)
  powerSupply: {
    terminals: [
      { id: 'pwr_p12_1', name: '+12V (Top)', type: 'pwr_p12', x: 541, y: 76,  voltage: 12 },
      { id: 'pwr_p12_2', name: '+12V (Bot)', type: 'pwr_p12', x: 541, y: 104, voltage: 12 },
      { id: 'pwr_m12_1', name: '-12V (Top)', type: 'pwr_m12', x: 591, y: 76,  voltage: -12 },
      { id: 'pwr_m12_2', name: '-12V (Bot)', type: 'pwr_m12', x: 591, y: 104, voltage: -12 },
      { id: 'pwr_gnd_1', name: 'GND (Top)',  type: 'gnd',     x: 641, y: 76,  voltage: 0 },
      { id: 'pwr_gnd_2', name: 'GND (Bot)',  type: 'gnd',     x: 641, y: 104, voltage: 0 },
      { id: 'pwr_p5_1',  name: '+5V (Top)',  type: 'vcc',     x: 693, y: 76,  voltage: 5 },
      { id: 'pwr_p5_2',  name: '+5V (Bot)',  type: 'vcc',     x: 693, y: 104, voltage: 5 }
    ]
  },

  // 16 LOGIC LEVEL INPUTS (Switches S0 to S15, LEDs, Sockets I0 to I15)
  logicInputs: [
    // Top block: I0 to I9
    { id: 'in_0',  switchId: 'sw_0',  name: 'I0 (S0)',  switchX: 95, switchY: 64,  ledX: 145, ledY: 64,  holeX: 194, holeY: 64,  holeId: 'inp_0' },
    { id: 'in_1',  switchId: 'sw_1',  name: 'I1 (S1)',  switchX: 95, switchY: 94,  ledX: 145, ledY: 94,  holeX: 194, holeY: 94,  holeId: 'inp_1' },
    { id: 'in_2',  switchId: 'sw_2',  name: 'I2 (S2)',  switchX: 95, switchY: 124, ledX: 145, ledY: 124, holeX: 194, holeY: 124, holeId: 'inp_2' },
    { id: 'in_3',  switchId: 'sw_3',  name: 'I3 (S3)',  switchX: 95, switchY: 153, ledX: 145, ledY: 153, holeX: 194, holeY: 153, holeId: 'inp_3' },
    { id: 'in_4',  switchId: 'sw_4',  name: 'I4 (S4)',  switchX: 95, switchY: 182, ledX: 145, ledY: 182, holeX: 194, holeY: 182, holeId: 'inp_4' },
    { id: 'in_5',  switchId: 'sw_5',  name: 'I5 (S5)',  switchX: 95, switchY: 212, ledX: 145, ledY: 212, holeX: 194, holeY: 212, holeId: 'inp_5' },
    { id: 'in_6',  switchId: 'sw_6',  name: 'I6 (S6)',  switchX: 95, switchY: 242, ledX: 145, ledY: 242, holeX: 194, holeY: 242, holeId: 'inp_6' },
    { id: 'in_7',  switchId: 'sw_7',  name: 'I7 (S7)',  switchX: 95, switchY: 272, ledX: 145, ledY: 272, holeX: 194, holeY: 272, holeId: 'inp_7' },
    { id: 'in_8',  switchId: 'sw_8',  name: 'I8 (S8)',  switchX: 95, switchY: 302, ledX: 145, ledY: 302, holeX: 194, holeY: 302, holeId: 'inp_8' },
    { id: 'in_9',  switchId: 'sw_9',  name: 'I9 (S9)',  switchX: 95, switchY: 333, ledX: 145, ledY: 333, holeX: 194, holeY: 333, holeId: 'inp_9' },
    // Bottom block: I10 to I15
    { id: 'in_10', switchId: 'sw_10', name: 'I10 (S10)', switchX: 95, switchY: 374, ledX: 145, ledY: 374, holeX: 194, holeY: 374, holeId: 'inp_10' },
    { id: 'in_11', switchId: 'sw_11', name: 'I11 (S11)', switchX: 95, switchY: 404, ledX: 145, ledY: 404, holeX: 194, holeY: 404, holeId: 'inp_11' },
    { id: 'in_12', switchId: 'sw_12', name: 'I12 (S12)', switchX: 95, switchY: 435, ledX: 145, ledY: 435, holeX: 194, holeY: 435, holeId: 'inp_12' },
    { id: 'in_13', switchId: 'sw_13', name: 'I13 (S13)', switchX: 95, switchY: 466, ledX: 145, ledY: 466, holeX: 194, holeY: 466, holeId: 'inp_13' },
    { id: 'in_14', switchId: 'sw_14', name: 'I14 (S14)', switchX: 95, switchY: 497, ledX: 145, ledY: 497, holeX: 194, holeY: 497, holeId: 'inp_14' },
    { id: 'in_15', switchId: 'sw_15', name: 'I15 (S15)', switchX: 95, switchY: 527, ledX: 145, ledY: 527, holeX: 194, holeY: 527, holeId: 'inp_15' }
  ],

  // 16 LOGIC LEVEL INDICATORS (LEDs L0 to L15 and Input Sockets)
  logicIndicators: [
    // Left column: L0 to L7
    { id: 'out_0', name: 'L0', ledX: 836, ledY: 345, holeX: 791, holeY: 345, holeId: 'ind_0' },
    { id: 'out_1', name: 'L1', ledX: 836, ledY: 372, holeX: 791, holeY: 372, holeId: 'ind_1' },
    { id: 'out_2', name: 'L2', ledX: 836, ledY: 405, holeX: 791, holeY: 405, holeId: 'ind_2' },
    { id: 'out_3', name: 'L3', ledX: 836, ledY: 441, holeX: 791, holeY: 441, holeId: 'ind_3' },
    { id: 'out_4', name: 'L4', ledX: 836, ledY: 473, holeX: 791, holeY: 473, holeId: 'ind_4' },
    { id: 'out_5', name: 'L5', ledX: 836, ledY: 508, holeX: 791, holeY: 508, holeId: 'ind_5' },
    { id: 'out_6', name: 'L6', ledX: 836, ledY: 540, holeX: 791, holeY: 540, holeId: 'ind_6' },
    { id: 'out_7', name: 'L7', ledX: 836, ledY: 574, holeX: 791, holeY: 574, holeId: 'ind_7' },
    // Right column: L8 to L15
    { id: 'out_8',  name: 'L8',  ledX: 942, ledY: 345, holeX: 900, holeY: 345, holeId: 'ind_8' },
    { id: 'out_9',  name: 'L9',  ledX: 942, ledY: 372, holeX: 900, holeY: 372, holeId: 'ind_9' },
    { id: 'out_10', name: 'L10', ledX: 942, ledY: 405, holeX: 900, holeY: 405, holeId: 'ind_10' },
    { id: 'out_11', name: 'L11', ledX: 942, ledY: 441, holeX: 900, holeY: 441, holeId: 'ind_11' },
    { id: 'out_12', name: 'L12', ledX: 942, ledY: 473, holeX: 900, holeY: 473, holeId: 'ind_12' },
    { id: 'out_13', name: 'L13', ledX: 942, ledY: 508, holeX: 900, holeY: 508, holeId: 'ind_13' },
    { id: 'out_14', name: 'L14', ledX: 942, ledY: 540, holeX: 900, holeY: 540, holeId: 'ind_14' },
    { id: 'out_15', name: 'L15', ledX: 942, ledY: 574, holeX: 900, holeY: 574, holeId: 'ind_15' }
  ],

  // FIXED CLOCK SOURCES
  fixedClock: {
    terminals: [
      { id: 'clk_1hz',   name: 'Clock 1Hz',   freq: 1,       x: 753, y: 80,  holeId: 'clk_1hz' },
      { id: 'clk_10hz',  name: 'Clock 10Hz',  freq: 10,      x: 813, y: 80,  holeId: 'clk_10hz' },
      { id: 'clk_100hz', name: 'Clock 100Hz', freq: 100,     x: 868, y: 80,  holeId: 'clk_100hz' },
      { id: 'clk_1khz',  name: 'Clock 1kHz',  freq: 1000,    x: 926, y: 80,  holeId: 'clk_1khz' },
      { id: 'clk_10khz', name: 'Clock 10kHz', freq: 10000,   x: 981, y: 80,  holeId: 'clk_10khz' },
      { id: 'clk_ext',   name: 'Clock EXT',   freq: 0,       x: 981, y: 125, holeId: 'clk_ext' }
    ]
  },

  // MANUAL PULSER
  manualPulser: {
    button: { id: 'btn_pulser', name: 'Manual Pulser Button', x: 354, y: 108, r: 22 },
    leds: [
      { id: 'led_l13', name: 'L13 (Inverted)', x: 425, y: 85 },
      { id: 'led_l12', name: 'L12 (Normal)',   x: 470, y: 85 }
    ],
    terminals: [
      { id: 'puls_t2', name: 'T2 (Pulse Inverted)', x: 425, y: 135, holeId: 'puls_t2' },
      { id: 'puls_t1', name: 'T1 (Pulse Normal)',   x: 470, y: 135, holeId: 'puls_t1' }
    ]
  },

  // LOGIC PROBE & DISPLAY-3
  logicProbe: {
    probeHole: { id: 'probe_in', name: 'Logic Probe Input', x: 758, y: 238, holeId: 'probe_in' },
    ledHigh: { id: 'probe_high', name: 'L7 (+) High', color: '#00ff44', x: 812, y: 226 },
    ledLow:  { id: 'probe_low',  name: 'L8 (-) Low',  color: '#ff2222', x: 812, y: 262 },
    disp3Input: { id: 'disp3_in', name: 'DISP-3 Input', x: 872, y: 238, holeId: 'disp3_in' },
    disp3: { id: 'disp_3', name: 'DISP-3 7-Segment', x: 920, y: 240, width: 36, height: 55 }
  },

  // BCD TO 7-SEGMENT DISPLAY SECTION (Verified Hole Centers)
  bcdSection: {
    inputs: [
      { id: 'bcd_in_a', name: 'BCD A', x: 589, y: 609, holeId: 'bcd_in_a', bit: 0 },
      { id: 'bcd_in_b', name: 'BCD B', x: 589, y: 642, holeId: 'bcd_in_b', bit: 1 },
      { id: 'bcd_in_c', name: 'BCD C', x: 589, y: 676, holeId: 'bcd_in_c', bit: 2 },
      { id: 'bcd_in_d', name: 'BCD D', x: 589, y: 710, holeId: 'bcd_in_d', bit: 3 }
    ],
    dipSockets: [
      { id: 'dip_ic1', name: 'IC1 (BCD Decoder)', x: 638, y: 645, width: 22, height: 80, pinCount: 16 },
      { id: 'dip_ic2', name: 'IC2 (Aux Socket)',  x: 693, y: 645, width: 22, height: 80, pinCount: 16 }
    ],
    outputs: [
      { id: 'bcd_out_a', name: 'Segment a', x: 766, y: 602, holeId: 'bcd_out_a', seg: 'a' },
      { id: 'bcd_out_b', name: 'Segment b', x: 766, y: 620, holeId: 'bcd_out_b', seg: 'b' },
      { id: 'bcd_out_c', name: 'Segment c', x: 766, y: 638, holeId: 'bcd_out_c', seg: 'c' },
      { id: 'bcd_out_d', name: 'Segment d', x: 766, y: 656, holeId: 'bcd_out_d', seg: 'd' },
      { id: 'bcd_out_e', name: 'Segment e', x: 766, y: 674, holeId: 'bcd_out_e', seg: 'e' },
      { id: 'bcd_out_f', name: 'Segment f', x: 766, y: 692, holeId: 'bcd_out_f', seg: 'f' },
      { id: 'bcd_out_g', name: 'Segment g', x: 766, y: 712, holeId: 'bcd_out_g', seg: 'g' }
    ],
    displays: [
      { id: 'dsp_1', name: 'DSP-1 (7-Segment)', x: 898, y: 605, width: 45, height: 65 },
      { id: 'dsp_2', name: 'DSP-2 (7-Segment)', x: 898, y: 695, width: 45, height: 65 }
    ]
  }
};

/**
 * Fast lookup map for any holeId on the trainer kit
 */
const HOLE_LOOKUP = {};

function initHoleLookup() {
  // 16-pin ZIF
  BOARD_COORDS.zif16.pins.forEach(p => {
    HOLE_LOOKUP[p.holeId] = {
      ...p,
      socketId: 'zif16',
      section: '16-Pin ZIF Socket',
      type: 'ic_pin'
    };
  });

  // 20-pin ZIF
  BOARD_COORDS.zif20.pins.forEach(p => {
    HOLE_LOOKUP[p.holeId] = {
      ...p,
      socketId: 'zif20',
      section: '20-Pin ZIF Socket',
      type: 'ic_pin'
    };
  });

  // Power Supply
  BOARD_COORDS.powerSupply.terminals.forEach(t => {
    HOLE_LOOKUP[t.id] = {
      ...t,
      holeId: t.id,
      section: 'Fixed DC Supply',
      type: 'power'
    };
  });

  // Logic Inputs
  BOARD_COORDS.logicInputs.forEach(i => {
    HOLE_LOOKUP[i.holeId] = {
      holeId: i.holeId,
      name: i.name,
      x: i.holeX,
      y: i.holeY,
      switchId: i.switchId,
      section: 'Logic Level Input',
      type: 'input'
    };
  });

  // Logic Indicators
  BOARD_COORDS.logicIndicators.forEach(o => {
    HOLE_LOOKUP[o.holeId] = {
      holeId: o.holeId,
      name: o.name,
      x: o.holeX,
      y: o.holeY,
      section: 'Logic Level Indicator',
      type: 'indicator'
    };
  });

  // Fixed Clock
  BOARD_COORDS.fixedClock.terminals.forEach(c => {
    HOLE_LOOKUP[c.holeId] = {
      ...c,
      section: 'Fixed Clock',
      type: 'clock'
    };
  });

  // Manual Pulser
  BOARD_COORDS.manualPulser.terminals.forEach(p => {
    HOLE_LOOKUP[p.holeId] = {
      ...p,
      section: 'Manual Pulser',
      type: 'pulser'
    };
  });

  // Probe & Disp 3
  HOLE_LOOKUP[BOARD_COORDS.logicProbe.probeHole.holeId] = {
    ...BOARD_COORDS.logicProbe.probeHole,
    section: 'Logic Probe',
    type: 'probe'
  };
  HOLE_LOOKUP[BOARD_COORDS.logicProbe.disp3Input.holeId] = {
    ...BOARD_COORDS.logicProbe.disp3Input,
    section: 'DISP-3 Input',
    type: 'display'
  };

  // BCD Section
  BOARD_COORDS.bcdSection.inputs.forEach(b => {
    HOLE_LOOKUP[b.holeId] = {
      ...b,
      section: 'BCD to 7-Segment Display (Input)',
      type: 'bcd_in'
    };
  });
  BOARD_COORDS.bcdSection.outputs.forEach(s => {
    HOLE_LOOKUP[s.holeId] = {
      ...s,
      section: 'BCD to 7-Segment Display (Output)',
      type: 'bcd_out'
    };
  });
}

initHoleLookup();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BOARD_WIDTH, BOARD_HEIGHT, BOARD_COORDS, HOLE_LOOKUP };
}
