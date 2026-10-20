/**
 * DIGITAL TECHNIQUES VIRTUAL TRAINER KIT SIMULATOR
 * Comprehensive IC & Digital Logic Component Library
 * Verified against Texas Instruments / Fairchild 74LS series datasheets
 */

const IC_LIBRARY = {
  // 7400: Quad 2-input NAND Gate
  '7400': {
    id: '7400',
    partNumber: '7400',
    name: 'Quad 2-Input NAND Gate',
    category: 'Universal Gates',
    family: '74LS',
    pinCount: 14,
    packageType: 'DIP-14',
    description: 'Contains four independent 2-input NAND gates. Universal logic building block: any combinational logic can be constructed using only NAND gates.',
    powerPins: { vcc: 14, gnd: 7, ratedVoltage: 5.0, maxVoltage: 5.5 },
    pins: [
      { pin: 1,  name: '1A',  type: 'input',  desc: 'Gate 1 Input A' },
      { pin: 2,  name: '1B',  type: 'input',  desc: 'Gate 1 Input B' },
      { pin: 3,  name: '1Y',  type: 'output', desc: 'Gate 1 Output: ~(1A & 1B)' },
      { pin: 4,  name: '2A',  type: 'input',  desc: 'Gate 2 Input A' },
      { pin: 5,  name: '2B',  type: 'input',  desc: 'Gate 2 Input B' },
      { pin: 6,  name: '2Y',  type: 'output', desc: 'Gate 2 Output: ~(2A & 2B)' },
      { pin: 7,  name: 'GND', type: 'gnd',    desc: 'Ground (0V)' },
      { pin: 8,  name: '3Y',  type: 'output', desc: 'Gate 3 Output: ~(3A & 3B)' },
      { pin: 9,  name: '3A',  type: 'input',  desc: 'Gate 3 Input A' },
      { pin: 10, name: '3B',  type: 'input',  desc: 'Gate 3 Input B' },
      { pin: 11, name: '4Y',  type: 'output', desc: 'Gate 4 Output: ~(4A & 4B)' },
      { pin: 12, name: '4A',  type: 'input',  desc: 'Gate 4 Input A' },
      { pin: 13, name: '4B',  type: 'input',  desc: 'Gate 4 Input B' },
      { pin: 14, name: 'VCC', type: 'vcc',    desc: 'Supply Voltage (+5V)' }
    ],
    gates: [
      { id: 'G1', type: 'NAND', inputs: [1, 2], output: 3 },
      { id: 'G2', type: 'NAND', inputs: [4, 5], output: 6 },
      { id: 'G3', type: 'NAND', inputs: [9, 10], output: 8 },
      { id: 'G4', type: 'NAND', inputs: [12, 13], output: 11 }
    ],
    truthTable: [
      { inputs: { A: 0, B: 0 }, output: { Y: 1 } },
      { inputs: { A: 0, B: 1 }, output: { Y: 1 } },
      { inputs: { A: 1, B: 0 }, output: { Y: 1 } },
      { inputs: { A: 1, B: 1 }, output: { Y: 0 } }
    ]
  },

  // 7402: Quad 2-input NOR Gate (SPECIAL PINOUT!)
  '7402': {
    id: '7402',
    partNumber: '7402',
    name: 'Quad 2-Input NOR Gate',
    category: 'Universal Gates',
    family: '74LS',
    pinCount: 14,
    packageType: 'DIP-14',
    description: 'Contains four independent 2-input NOR gates. Note unique pinout: output is on pin 1, inputs on pins 2 & 3; output on pin 4, inputs on pins 5 & 6.',
    powerPins: { vcc: 14, gnd: 7, ratedVoltage: 5.0, maxVoltage: 5.5 },
    pins: [
      { pin: 1,  name: '1Y',  type: 'output', desc: 'Gate 1 Output: ~(1A | 1B)' },
      { pin: 2,  name: '1A',  type: 'input',  desc: 'Gate 1 Input A' },
      { pin: 3,  name: '1B',  type: 'input',  desc: 'Gate 1 Input B' },
      { pin: 4,  name: '2Y',  type: 'output', desc: 'Gate 2 Output: ~(2A | 2B)' },
      { pin: 5,  name: '2A',  type: 'input',  desc: 'Gate 2 Input A' },
      { pin: 6,  name: '2B',  type: 'input',  desc: 'Gate 2 Input B' },
      { pin: 7,  name: 'GND', type: 'gnd',    desc: 'Ground (0V)' },
      { pin: 8,  name: '3A',  type: 'input',  desc: 'Gate 3 Input A' },
      { pin: 9,  name: '3B',  type: 'input',  desc: 'Gate 3 Input B' },
      { pin: 10, name: '3Y',  type: 'output', desc: 'Gate 3 Output: ~(3A | 3B)' },
      { pin: 11, name: '4A',  type: 'input',  desc: 'Gate 4 Input A' },
      { pin: 12, name: '4B',  type: 'input',  desc: 'Gate 4 Input B' },
      { pin: 13, name: '4Y',  type: 'output', desc: 'Gate 4 Output: ~(4A | 4B)' },
      { pin: 14, name: 'VCC', type: 'vcc',    desc: 'Supply Voltage (+5V)' }
    ],
    gates: [
      { id: 'G1', type: 'NOR', inputs: [2, 3], output: 1 },
      { id: 'G2', type: 'NOR', inputs: [5, 6], output: 4 },
      { id: 'G3', type: 'NOR', inputs: [8, 9], output: 10 },
      { id: 'G4', type: 'NOR', inputs: [11, 12], output: 13 }
    ],
    truthTable: [
      { inputs: { A: 0, B: 0 }, output: { Y: 1 } },
      { inputs: { A: 0, B: 1 }, output: { Y: 0 } },
      { inputs: { A: 1, B: 0 }, output: { Y: 0 } },
      { inputs: { A: 1, B: 1 }, output: { Y: 0 } }
    ]
  },

  // 7404: Hex Inverter / NOT Gate
  '7404': {
    id: '7404',
    partNumber: '7404',
    name: 'Hex Inverter (NOT Gates)',
    category: 'Basic Logic Gates',
    family: '74LS',
    pinCount: 14,
    packageType: 'DIP-14',
    description: 'Contains six independent inverter (NOT) gates. Outputs are the logical complement of their respective inputs.',
    powerPins: { vcc: 14, gnd: 7, ratedVoltage: 5.0, maxVoltage: 5.5 },
    pins: [
      { pin: 1,  name: '1A',  type: 'input',  desc: 'Inverter 1 Input' },
      { pin: 2,  name: '1Y',  type: 'output', desc: 'Inverter 1 Output: ~1A' },
      { pin: 3,  name: '2A',  type: 'input',  desc: 'Inverter 2 Input' },
      { pin: 4,  name: '2Y',  type: 'output', desc: 'Inverter 2 Output: ~2A' },
      { pin: 5,  name: '3A',  type: 'input',  desc: 'Inverter 3 Input' },
      { pin: 6,  name: '3Y',  type: 'output', desc: 'Inverter 3 Output: ~3A' },
      { pin: 7,  name: 'GND', type: 'gnd',    desc: 'Ground (0V)' },
      { pin: 8,  name: '4Y',  type: 'output', desc: 'Inverter 4 Output: ~4A' },
      { pin: 9,  name: '4A',  type: 'input',  desc: 'Inverter 4 Input' },
      { pin: 10, name: '5Y',  type: 'output', desc: 'Inverter 5 Output: ~5A' },
      { pin: 11, name: '5A',  type: 'input',  desc: 'Inverter 5 Input' },
      { pin: 12, name: '6Y',  type: 'output', desc: 'Inverter 6 Output: ~6A' },
      { pin: 13, name: '6A',  type: 'input',  desc: 'Inverter 6 Input' },
      { pin: 14, name: 'VCC', type: 'vcc',    desc: 'Supply Voltage (+5V)' }
    ],
    gates: [
      { id: 'G1', type: 'NOT', inputs: [1], output: 2 },
      { id: 'G2', type: 'NOT', inputs: [3], output: 4 },
      { id: 'G3', type: 'NOT', inputs: [5], output: 6 },
      { id: 'G4', type: 'NOT', inputs: [9], output: 8 },
      { id: 'G5', type: 'NOT', inputs: [11], output: 10 },
      { id: 'G6', type: 'NOT', inputs: [13], output: 12 }
    ],
    truthTable: [
      { inputs: { A: 0 }, output: { Y: 1 } },
      { inputs: { A: 1 }, output: { Y: 0 } }
    ]
  },

  // 7408: Quad 2-input AND Gate
  '7408': {
    id: '7408',
    partNumber: '7408',
    name: 'Quad 2-Input AND Gate',
    category: 'Basic Logic Gates',
    family: '74LS',
    pinCount: 14,
    packageType: 'DIP-14',
    description: 'Contains four independent 2-input AND gates. Outputs are High only when both inputs are High.',
    powerPins: { vcc: 14, gnd: 7, ratedVoltage: 5.0, maxVoltage: 5.5 },
    pins: [
      { pin: 1,  name: '1A',  type: 'input',  desc: 'Gate 1 Input A' },
      { pin: 2,  name: '1B',  type: 'input',  desc: 'Gate 1 Input B' },
      { pin: 3,  name: '1Y',  type: 'output', desc: 'Gate 1 Output: 1A & 1B' },
      { pin: 4,  name: '2A',  type: 'input',  desc: 'Gate 2 Input A' },
      { pin: 5,  name: '2B',  type: 'input',  desc: 'Gate 2 Input B' },
      { pin: 6,  name: '2Y',  type: 'output', desc: 'Gate 2 Output: 2A & 2B' },
      { pin: 7,  name: 'GND', type: 'gnd',    desc: 'Ground (0V)' },
      { pin: 8,  name: '3Y',  type: 'output', desc: 'Gate 3 Output: 3A & 3B' },
      { pin: 9,  name: '3A',  type: 'input',  desc: 'Gate 3 Input A' },
      { pin: 10, name: '3B',  type: 'input',  desc: 'Gate 3 Input B' },
      { pin: 11, name: '4Y',  type: 'output', desc: 'Gate 4 Output: 4A & 4B' },
      { pin: 12, name: '4A',  type: 'input',  desc: 'Gate 4 Input A' },
      { pin: 13, name: '4B',  type: 'input',  desc: 'Gate 4 Input B' },
      { pin: 14, name: 'VCC', type: 'vcc',    desc: 'Supply Voltage (+5V)' }
    ],
    gates: [
      { id: 'G1', type: 'AND', inputs: [1, 2], output: 3 },
      { id: 'G2', type: 'AND', inputs: [4, 5], output: 6 },
      { id: 'G3', type: 'AND', inputs: [9, 10], output: 8 },
      { id: 'G4', type: 'AND', inputs: [12, 13], output: 11 }
    ],
    truthTable: [
      { inputs: { A: 0, B: 0 }, output: { Y: 0 } },
      { inputs: { A: 0, B: 1 }, output: { Y: 0 } },
      { inputs: { A: 1, B: 0 }, output: { Y: 0 } },
      { inputs: { A: 1, B: 1 }, output: { Y: 1 } }
    ]
  },

  // 7432: Quad 2-input OR Gate
  '7432': {
    id: '7432',
    partNumber: '7432',
    name: 'Quad 2-Input OR Gate',
    category: 'Basic Logic Gates',
    family: '74LS',
    pinCount: 14,
    packageType: 'DIP-14',
    description: 'Contains four independent 2-input OR gates. Outputs are High if either input A or input B is High.',
    powerPins: { vcc: 14, gnd: 7, ratedVoltage: 5.0, maxVoltage: 5.5 },
    pins: [
      { pin: 1,  name: '1A',  type: 'input',  desc: 'Gate 1 Input A' },
      { pin: 2,  name: '1B',  type: 'input',  desc: 'Gate 1 Input B' },
      { pin: 3,  name: '1Y',  type: 'output', desc: 'Gate 1 Output: 1A | 1B' },
      { pin: 4,  name: '2A',  type: 'input',  desc: 'Gate 2 Input A' },
      { pin: 5,  name: '2B',  type: 'input',  desc: 'Gate 2 Input B' },
      { pin: 6,  name: '2Y',  type: 'output', desc: 'Gate 2 Output: 2A | 2B' },
      { pin: 7,  name: 'GND', type: 'gnd',    desc: 'Ground (0V)' },
      { pin: 8,  name: '3Y',  type: 'output', desc: 'Gate 3 Output: 3A | 3B' },
      { pin: 9,  name: '3A',  type: 'input',  desc: 'Gate 3 Input A' },
      { pin: 10, name: '3B',  type: 'input',  desc: 'Gate 3 Input B' },
      { pin: 11, name: '4Y',  type: 'output', desc: 'Gate 4 Output: 4A | 4B' },
      { pin: 12, name: '4A',  type: 'input',  desc: 'Gate 4 Input A' },
      { pin: 13, name: '4B',  type: 'input',  desc: 'Gate 4 Input B' },
      { pin: 14, name: 'VCC', type: 'vcc',    desc: 'Supply Voltage (+5V)' }
    ],
    gates: [
      { id: 'G1', type: 'OR', inputs: [1, 2], output: 3 },
      { id: 'G2', type: 'OR', inputs: [4, 5], output: 6 },
      { id: 'G3', type: 'OR', inputs: [9, 10], output: 8 },
      { id: 'G4', type: 'OR', inputs: [12, 13], output: 11 }
    ],
    truthTable: [
      { inputs: { A: 0, B: 0 }, output: { Y: 0 } },
      { inputs: { A: 0, B: 1 }, output: { Y: 1 } },
      { inputs: { A: 1, B: 0 }, output: { Y: 1 } },
      { inputs: { A: 1, B: 1 }, output: { Y: 1 } }
    ]
  },

  // 7486: Quad 2-input XOR Gate
  '7486': {
    id: '7486',
    partNumber: '7486',
    name: 'Quad 2-Input Exclusive-OR (XOR) Gate',
    category: 'Exclusive Gates',
    family: '74LS',
    pinCount: 14,
    packageType: 'DIP-14',
    description: 'Contains four independent 2-input XOR gates. Output is High when inputs are different; Low when inputs are identical.',
    powerPins: { vcc: 14, gnd: 7, ratedVoltage: 5.0, maxVoltage: 5.5 },
    pins: [
      { pin: 1,  name: '1A',  type: 'input',  desc: 'Gate 1 Input A' },
      { pin: 2,  name: '1B',  type: 'input',  desc: 'Gate 1 Input B' },
      { pin: 3,  name: '1Y',  type: 'output', desc: 'Gate 1 Output: 1A ^ 1B' },
      { pin: 4,  name: '2A',  type: 'input',  desc: 'Gate 2 Input A' },
      { pin: 5,  name: '2B',  type: 'input',  desc: 'Gate 2 Input B' },
      { pin: 6,  name: '2Y',  type: 'output', desc: 'Gate 2 Output: 2A ^ 2B' },
      { pin: 7,  name: 'GND', type: 'gnd',    desc: 'Ground (0V)' },
      { pin: 8,  name: '3Y',  type: 'output', desc: 'Gate 3 Output: 3A ^ 3B' },
      { pin: 9,  name: '3A',  type: 'input',  desc: 'Gate 3 Input A' },
      { pin: 10, name: '3B',  type: 'input',  desc: 'Gate 3 Input B' },
      { pin: 11, name: '4Y',  type: 'output', desc: 'Gate 4 Output: 4A ^ 4B' },
      { pin: 12, name: '4A',  type: 'input',  desc: 'Gate 4 Input A' },
      { pin: 13, name: '4B',  type: 'input',  desc: 'Gate 4 Input B' },
      { pin: 14, name: 'VCC', type: 'vcc',    desc: 'Supply Voltage (+5V)' }
    ],
    gates: [
      { id: 'G1', type: 'XOR', inputs: [1, 2], output: 3 },
      { id: 'G2', type: 'XOR', inputs: [4, 5], output: 6 },
      { id: 'G3', type: 'XOR', inputs: [9, 10], output: 8 },
      { id: 'G4', type: 'XOR', inputs: [12, 13], output: 11 }
    ],
    truthTable: [
      { inputs: { A: 0, B: 0 }, output: { Y: 0 } },
      { inputs: { A: 0, B: 1 }, output: { Y: 1 } },
      { inputs: { A: 1, B: 0 }, output: { Y: 1 } },
      { inputs: { A: 1, B: 1 }, output: { Y: 0 } }
    ]
  },

  // 74266: Quad 2-input XNOR Gate
  '74266': {
    id: '74266',
    partNumber: '74266',
    name: 'Quad 2-Input Exclusive-NOR (XNOR) Gate',
    category: 'Exclusive Gates',
    family: '74LS',
    pinCount: 14,
    packageType: 'DIP-14',
    description: 'Contains four independent 2-input XNOR gates. Output is High when inputs are equal; Low when inputs differ.',
    powerPins: { vcc: 14, gnd: 7, ratedVoltage: 5.0, maxVoltage: 5.5 },
    pins: [
      { pin: 1,  name: '1A',  type: 'input',  desc: 'Gate 1 Input A' },
      { pin: 2,  name: '1B',  type: 'input',  desc: 'Gate 1 Input B' },
      { pin: 3,  name: '1Y',  type: 'output', desc: 'Gate 1 Output: ~(1A ^ 1B)' },
      { pin: 4,  name: '2A',  type: 'input',  desc: 'Gate 2 Input A' },
      { pin: 5,  name: '2B',  type: 'input',  desc: 'Gate 2 Input B' },
      { pin: 6,  name: '2Y',  type: 'output', desc: 'Gate 2 Output: ~(2A ^ 2B)' },
      { pin: 7,  name: 'GND', type: 'gnd',    desc: 'Ground (0V)' },
      { pin: 8,  name: '3Y',  type: 'output', desc: 'Gate 3 Output: ~(3A ^ 3B)' },
      { pin: 9,  name: '3A',  type: 'input',  desc: 'Gate 3 Input A' },
      { pin: 10, name: '3B',  type: 'input',  desc: 'Gate 3 Input B' },
      { pin: 11, name: '4Y',  type: 'output', desc: 'Gate 4 Output: ~(4A ^ 4B)' },
      { pin: 12, name: '4A',  type: 'input',  desc: 'Gate 4 Input A' },
      { pin: 13, name: '4B',  type: 'input',  desc: 'Gate 4 Input B' },
      { pin: 14, name: 'VCC', type: 'vcc',    desc: 'Supply Voltage (+5V)' }
    ],
    gates: [
      { id: 'G1', type: 'XNOR', inputs: [1, 2], output: 3 },
      { id: 'G2', type: 'XNOR', inputs: [4, 5], output: 6 },
      { id: 'G3', type: 'XNOR', inputs: [9, 10], output: 8 },
      { id: 'G4', type: 'XNOR', inputs: [12, 13], output: 11 }
    ],
    truthTable: [
      { inputs: { A: 0, B: 0 }, output: { Y: 1 } },
      { inputs: { A: 0, B: 1 }, output: { Y: 0 } },
      { inputs: { A: 1, B: 0 }, output: { Y: 0 } },
      { inputs: { A: 1, B: 1 }, output: { Y: 1 } }
    ]
  },

  // 7447: BCD to 7-Segment Decoder / Driver
  '7447': {
    id: '7447',
    partNumber: '7447',
    name: 'BCD to 7-Segment Decoder / Driver',
    category: 'Decoders & Displays',
    family: '74LS',
    pinCount: 16,
    packageType: 'DIP-16',
    description: 'Decodes 4-bit Binary Coded Decimal (BCD) inputs into active-low outputs for driving common anode 7-segment displays (0-9).',
    powerPins: { vcc: 16, gnd: 8, ratedVoltage: 5.0, maxVoltage: 5.5 },
    pins: [
      { pin: 1,  name: 'B',      type: 'input',   desc: 'BCD Input Bit 1 (Weight 2)' },
      { pin: 2,  name: 'C',      type: 'input',   desc: 'BCD Input Bit 2 (Weight 4)' },
      { pin: 3,  name: 'LT\'',   type: 'control', desc: 'Lamp Test (Active Low, tie to +5V)' },
      { pin: 4,  name: 'BI/RBO', type: 'control', desc: 'Blanking Input / Ripple Blanking Output' },
      { pin: 5,  name: 'RBI\'',  type: 'control', desc: 'Ripple Blanking Input (Active Low)' },
      { pin: 6,  name: 'D',      type: 'input',   desc: 'BCD Input Bit 3 (MSB, Weight 8)' },
      { pin: 7,  name: 'A',      type: 'input',   desc: 'BCD Input Bit 0 (LSB, Weight 1)' },
      { pin: 8,  name: 'GND',    type: 'gnd',     desc: 'Ground (0V)' },
      { pin: 9,  name: 'e',      type: 'output',  desc: 'Segment e (Active Low)' },
      { pin: 10, name: 'd',      type: 'output',  desc: 'Segment d (Active Low)' },
      { pin: 11, name: 'c',      type: 'output',  desc: 'Segment c (Active Low)' },
      { pin: 12, name: 'b',      type: 'output',  desc: 'Segment b (Active Low)' },
      { pin: 13, name: 'a',      type: 'output',  desc: 'Segment a (Active Low)' },
      { pin: 14, name: 'g',      type: 'output',  desc: 'Segment g (Active Low)' },
      { pin: 15, name: 'f',      type: 'output',  desc: 'Segment f (Active Low)' },
      { pin: 16, name: 'VCC',    type: 'vcc',     desc: 'Supply Voltage (+5V)' }
    ],
    // Segment mapping for digits 0-9 (0 = lit segment for common anode / active-low)
    segmentMap: {
      0: { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 1 },
      1: { a: 1, b: 0, c: 0, d: 1, e: 1, f: 1, g: 1 },
      2: { a: 0, b: 0, c: 1, d: 0, e: 0, f: 1, g: 0 },
      3: { a: 0, b: 0, c: 0, d: 0, e: 1, f: 1, g: 0 },
      4: { a: 1, b: 0, c: 0, d: 1, e: 1, f: 0, g: 0 },
      5: { a: 0, b: 1, c: 0, d: 0, e: 1, f: 0, g: 0 },
      6: { a: 0, b: 1, c: 0, d: 0, e: 0, f: 0, g: 0 },
      7: { a: 0, b: 0, c: 0, d: 1, e: 1, f: 1, g: 1 },
      8: { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0 },
      9: { a: 0, b: 0, c: 0, d: 0, e: 1, f: 0, g: 0 }
    }
  },

  // 7485: 4-bit Magnitude Comparator
  '7485': {
    id: '7485',
    partNumber: '7485',
    name: '4-Bit Magnitude Comparator',
    category: 'Arithmetic & Comparators',
    family: '74LS',
    pinCount: 16,
    packageType: 'DIP-16',
    description: 'Compares two 4-bit binary numbers (A3..A0 and B3..B0) and determines whether A < B, A = B, or A > B.',
    powerPins: { vcc: 16, gnd: 8, ratedVoltage: 5.0, maxVoltage: 5.5 },
    pins: [
      { pin: 1,  name: 'B3',       type: 'input',   desc: 'Word B Bit 3 (MSB)' },
      { pin: 2,  name: 'IA<B',     type: 'control', desc: 'Cascading Input A < B (tie to GND for single IC)' },
      { pin: 3,  name: 'IA=B',     type: 'control', desc: 'Cascading Input A = B (tie to +5V for single IC)' },
      { pin: 4,  name: 'IA>B',     type: 'control', desc: 'Cascading Input A > B (tie to GND for single IC)' },
      { pin: 5,  name: 'OA>B',     type: 'output',  desc: 'Output: High when Word A > Word B' },
      { pin: 6,  name: 'OA=B',     type: 'output',  desc: 'Output: High when Word A == Word B' },
      { pin: 7,  name: 'OA<B',     type: 'output',  desc: 'Output: High when Word A < Word B' },
      { pin: 8,  name: 'GND',      type: 'gnd',     desc: 'Ground (0V)' },
      { pin: 9,  name: 'B0',       type: 'input',   desc: 'Word B Bit 0 (LSB)' },
      { pin: 10, name: 'A0',       type: 'input',   desc: 'Word A Bit 0 (LSB)' },
      { pin: 11, name: 'B1',       type: 'input',   desc: 'Word B Bit 1' },
      { pin: 12, name: 'A1',       type: 'input',   desc: 'Word A Bit 1' },
      { pin: 13, name: 'A2',       type: 'input',   desc: 'Word A Bit 2' },
      { pin: 14, name: 'B2',       type: 'input',   desc: 'Word B Bit 2' },
      { pin: 15, name: 'A3',       type: 'input',   desc: 'Word A Bit 3 (MSB)' },
      { pin: 16, name: 'VCC',      type: 'vcc',     desc: 'Supply Voltage (+5V)' }
    ]
  },

  // 74151: 8-to-1 Multiplexer
  '74151': {
    id: '74151',
    partNumber: '74151',
    name: '8-to-1 Data Selector / Multiplexer',
    category: 'Multiplexers',
    family: '74LS',
    pinCount: 16,
    packageType: 'DIP-16',
    description: 'Selects one of eight data inputs (D0-D7) according to a 3-bit binary code on select lines S2, S1, S0, and routes it to true output Y and complementary output W.',
    powerPins: { vcc: 16, gnd: 8, ratedVoltage: 5.0, maxVoltage: 5.5 },
    pins: [
      { pin: 1,  name: 'D3',  type: 'input',   desc: 'Data Input 3' },
      { pin: 2,  name: 'D2',  type: 'input',   desc: 'Data Input 2' },
      { pin: 3,  name: 'D1',  type: 'input',   desc: 'Data Input 1' },
      { pin: 4,  name: 'D0',  type: 'input',   desc: 'Data Input 0' },
      { pin: 5,  name: 'Y',   type: 'output',  desc: 'True Data Output' },
      { pin: 6,  name: 'W',   type: 'output',  desc: 'Inverted Data Output (~Y)' },
      { pin: 7,  name: 'G\'', type: 'control', desc: 'Strobe / Enable (Active Low, 0=Enabled)' },
      { pin: 8,  name: 'GND', type: 'gnd',     desc: 'Ground (0V)' },
      { pin: 9,  name: 'S2',  type: 'input',   desc: 'Select Line 2 (MSB)' },
      { pin: 10, name: 'S1',  type: 'input',   desc: 'Select Line 1' },
      { pin: 11, name: 'S0',  type: 'input',   desc: 'Select Line 0 (LSB)' },
      { pin: 12, name: 'D7',  type: 'input',   desc: 'Data Input 7' },
      { pin: 13, name: 'D6',  type: 'input',   desc: 'Data Input 6' },
      { pin: 14, name: 'D5',  type: 'input',   desc: 'Data Input 5' },
      { pin: 15, name: 'D4',  type: 'input',   desc: 'Data Input 4' },
      { pin: 16, name: 'VCC', type: 'vcc',     desc: 'Supply Voltage (+5V)' }
    ]
  },

  // 74155: Dual 2-to-4 / 1-to-8 Demultiplexer
  '74155': {
    id: '74155',
    partNumber: '74155',
    name: 'Dual 2-to-4 / 1-to-8 Demultiplexer',
    category: 'Demultiplexers',
    family: '74LS',
    pinCount: 16,
    packageType: 'DIP-16',
    description: 'Dual 2-to-4 line decoder/demultiplexer with individual strobes and common binary address inputs. Outputs are active-low.',
    powerPins: { vcc: 16, gnd: 8, ratedVoltage: 5.0, maxVoltage: 5.5 },
    pins: [
      { pin: 1,  name: '1C',   type: 'input',   desc: 'Section 1 Data Input (Active High)' },
      { pin: 2,  name: '1G\'', type: 'control', desc: 'Section 1 Strobe (Active Low)' },
      { pin: 3,  name: 'B',    type: 'input',   desc: 'Common Address Select B (Bit 1)' },
      { pin: 4,  name: '1Y3',  type: 'output',  desc: 'Section 1 Output 3 (Active Low)' },
      { pin: 5,  name: '1Y2',  type: 'output',  desc: 'Section 1 Output 2 (Active Low)' },
      { pin: 6,  name: '1Y1',  type: 'output',  desc: 'Section 1 Output 1 (Active Low)' },
      { pin: 7,  name: '1Y0',  type: 'output',  desc: 'Section 1 Output 0 (Active Low)' },
      { pin: 8,  name: 'GND',  type: 'gnd',     desc: 'Ground (0V)' },
      { pin: 9,  name: '2Y0',  type: 'output',  desc: 'Section 2 Output 0 (Active Low)' },
      { pin: 10, name: '2Y1',  type: 'output',  desc: 'Section 2 Output 1 (Active Low)' },
      { pin: 11, name: '2Y2',  type: 'output',  desc: 'Section 2 Output 2 (Active Low)' },
      { pin: 12, name: '2Y3',  type: 'output',  desc: 'Section 2 Output 3 (Active Low)' },
      { pin: 13, name: 'A',    type: 'input',   desc: 'Common Address Select A (Bit 0, LSB)' },
      { pin: 14, name: '2C\'', type: 'input',   desc: 'Section 2 Data Input (Active Low)' },
      { pin: 15, name: '2G\'', type: 'control', desc: 'Section 2 Strobe (Active Low)' },
      { pin: 16, name: 'VCC',  type: 'vcc',     desc: 'Supply Voltage (+5V)' }
    ]
  },

  // 7476: Dual Master-Slave JK Flip-Flop with Preset & Clear
  // SPECIAL POWER PINS: Pin 5 = VCC, Pin 13 = GND
  '7476': {
    id: '7476',
    partNumber: '7476',
    name: 'Dual JK Flip-Flop with Preset & Clear',
    category: 'Sequential Logic & Flip-Flops',
    family: '74LS',
    pinCount: 16,
    packageType: 'DIP-16',
    description: 'Dual pulse-triggered master-slave JK flip-flops with asynchronous active-low Preset and Clear. Note distinct power pins: Pin 5 is VCC (+5V), Pin 13 is GND.',
    powerPins: { vcc: 5, gnd: 13, ratedVoltage: 5.0, maxVoltage: 5.5 },
    pins: [
      { pin: 1,  name: '1CLK',  type: 'clock',   desc: 'FF1 Clock Input' },
      { pin: 2,  name: '1PRE\'', type: 'control', desc: 'FF1 Preset (Active Low)' },
      { pin: 3,  name: '1CLR\'', type: 'control', desc: 'FF1 Clear (Active Low)' },
      { pin: 4,  name: '1J',    type: 'input',   desc: 'FF1 J Input' },
      { pin: 5,  name: 'VCC',   type: 'vcc',     desc: 'Supply Voltage (+5V)' },
      { pin: 6,  name: '2CLK',  type: 'clock',   desc: 'FF2 Clock Input' },
      { pin: 7,  name: '2PRE\'', type: 'control', desc: 'FF2 Preset (Active Low)' },
      { pin: 8,  name: '2CLR\'', type: 'control', desc: 'FF2 Clear (Active Low)' },
      { pin: 9,  name: '2J',    type: 'input',   desc: 'FF2 J Input' },
      { pin: 10, name: '2K',    type: 'input',   desc: 'FF2 K Input' },
      { pin: 11, name: '2Q',    type: 'output',  desc: 'FF2 Q Output' },
      { pin: 12, name: '2Q\'',  type: 'output',  desc: 'FF2 Complementary Output Q\'' },
      { pin: 13, name: 'GND',   type: 'gnd',     desc: 'Ground (0V)' },
      { pin: 14, name: '1Q\'',  type: 'output',  desc: 'FF1 Complementary Output Q\'' },
      { pin: 15, name: '1Q',    type: 'output',  desc: 'FF1 Q Output' },
      { pin: 16, name: '1K',    type: 'input',   desc: 'FF1 K Input' }
    ]
  },

  // 7474: Dual D-Type Flip-Flop
  '7474': {
    id: '7474',
    partNumber: '7474',
    name: 'Dual D-Type Positive-Edge-Triggered Flip-Flop',
    category: 'Sequential Logic & Flip-Flops',
    family: '74LS',
    pinCount: 14,
    packageType: 'DIP-14',
    description: 'Dual edge-triggered D flip-flops with asynchronous preset and clear.',
    powerPins: { vcc: 14, gnd: 7, ratedVoltage: 5.0, maxVoltage: 5.5 },
    pins: [
      { pin: 1,  name: '1CLR\'', type: 'control', desc: 'FF1 Clear (Active Low)' },
      { pin: 2,  name: '1D',    type: 'input',   desc: 'FF1 Data Input' },
      { pin: 3,  name: '1CLK',  type: 'clock',   desc: 'FF1 Clock Input' },
      { pin: 4,  name: '1PRE\'', type: 'control', desc: 'FF1 Preset (Active Low)' },
      { pin: 5,  name: '1Q',    type: 'output',  desc: 'FF1 Q Output' },
      { pin: 6,  name: '1Q\'',  type: 'output',  desc: 'FF1 Complementary Q\'' },
      { pin: 7,  name: 'GND',   type: 'gnd',     desc: 'Ground (0V)' },
      { pin: 8,  name: '2Q\'',  type: 'output',  desc: 'FF2 Complementary Q\'' },
      { pin: 9,  name: '2Q',    type: 'output',  desc: 'FF2 Q Output' },
      { pin: 10, name: '2PRE\'', type: 'control', desc: 'FF2 Preset (Active Low)' },
      { pin: 11, name: '2CLK',  type: 'clock',   desc: 'FF2 Clock Input' },
      { pin: 12, name: '2D',    type: 'input',   desc: 'FF2 Data Input' },
      { pin: 13, name: '2CLR\'', type: 'control', desc: 'FF2 Clear (Active Low)' },
      { pin: 14, name: 'VCC',   type: 'vcc',     desc: 'Supply Voltage (+5V)' }
    ]
  },

  // 7490: Decade Counter (MOD-10)
  // SPECIAL POWER PINS: Pin 5 = VCC, Pin 10 = GND
  '7490': {
    id: '7490',
    partNumber: '7490',
    name: 'Decade / BCD Counter (MOD-10)',
    category: 'Counters',
    family: '74LS',
    pinCount: 14,
    packageType: 'DIP-14',
    description: 'Asynchronous decade counter containing divide-by-2 and divide-by-5 sections. Special power pins: Pin 5 is VCC (+5V), Pin 10 is GND. Pin 14 is CLKA, Pin 1 is CLKB.',
    powerPins: { vcc: 5, gnd: 10, ratedVoltage: 5.0, maxVoltage: 5.5 },
    pins: [
      { pin: 1,  name: 'CLKB',  type: 'clock',   desc: 'Clock Input B (drives Mod-5 section)' },
      { pin: 2,  name: 'R0(1)', type: 'control', desc: 'Reset to 0 Input 1' },
      { pin: 3,  name: 'R0(2)', type: 'control', desc: 'Reset to 0 Input 2 (Pins 2 & 3 High = Reset 0000)' },
      { pin: 4,  name: 'NC',    type: 'nc',      desc: 'No Internal Connection' },
      { pin: 5,  name: 'VCC',   type: 'vcc',     desc: 'Supply Voltage (+5V)' },
      { pin: 6,  name: 'R9(1)', type: 'control', desc: 'Reset to 9 Input 1' },
      { pin: 7,  name: 'R9(2)', type: 'control', desc: 'Reset to 9 Input 2 (Pins 6 & 7 High = Set 1001)' },
      { pin: 8,  name: 'QC',    type: 'output',  desc: 'Output Bit C (Weight 4)' },
      { pin: 9,  name: 'QB',    type: 'output',  desc: 'Output Bit B (Weight 2)' },
      { pin: 10, name: 'GND',   type: 'gnd',     desc: 'Ground (0V)' },
      { pin: 11, name: 'QD',    type: 'output',  desc: 'Output Bit D (MSB, Weight 8)' },
      { pin: 12, name: 'QA',    type: 'output',  desc: 'Output Bit A (LSB, Weight 1)' },
      { pin: 13, name: 'NC',    type: 'nc',      desc: 'No Internal Connection' },
      { pin: 14, name: 'CLKA',  type: 'clock',   desc: 'Clock Input A (drives Mod-2 section)' }
    ]
  },

  // 7493: 4-Bit Binary Counter (MOD-16)
  // SPECIAL POWER PINS: Pin 5 = VCC, Pin 10 = GND
  '7493': {
    id: '7493',
    partNumber: '7493',
    name: '4-Bit Binary Ripple Counter (MOD-16)',
    category: 'Counters',
    family: '74LS',
    pinCount: 14,
    packageType: 'DIP-14',
    description: '4-bit binary ripple counter. Counts from 0 to 15 in binary when QA is connected to CLKB. Pin 5 = VCC, Pin 10 = GND.',
    powerPins: { vcc: 5, gnd: 10, ratedVoltage: 5.0, maxVoltage: 5.5 },
    pins: [
      { pin: 1,  name: 'CLKB',  type: 'clock',   desc: 'Clock Input B (Mod-8 section)' },
      { pin: 2,  name: 'R0(1)', type: 'control', desc: 'Reset Input 1' },
      { pin: 3,  name: 'R0(2)', type: 'control', desc: 'Reset Input 2 (Both High resets to 0000)' },
      { pin: 4,  name: 'NC',    type: 'nc',      desc: 'No Connection' },
      { pin: 5,  name: 'VCC',   type: 'vcc',     desc: 'Supply Voltage (+5V)' },
      { pin: 6,  name: 'NC',    type: 'nc',      desc: 'No Connection' },
      { pin: 7,  name: 'NC',    type: 'nc',      desc: 'No Connection' },
      { pin: 8,  name: 'QC',    type: 'output',  desc: 'Output Bit C' },
      { pin: 9,  name: 'QB',    type: 'output',  desc: 'Output Bit B' },
      { pin: 10, name: 'GND',   type: 'gnd',     desc: 'Ground (0V)' },
      { pin: 11, name: 'QD',    type: 'output',  desc: 'Output Bit D (MSB)' },
      { pin: 12, name: 'QA',    type: 'output',  desc: 'Output Bit A (LSB)' },
      { pin: 13, name: 'NC',    type: 'nc',      desc: 'No Connection' },
      { pin: 14, name: 'CLKA',  type: 'clock',   desc: 'Clock Input A (Mod-2 section)' }
    ]
  },

  // 7495: 4-Bit Parallel-Access Shift Register
  '7495': {
    id: '7495',
    partNumber: '7495',
    name: '4-Bit Parallel-Access Shift Register',
    category: 'Shift Registers',
    family: '74LS',
    pinCount: 14,
    packageType: 'DIP-14',
    description: '4-bit shift register supporting Serial-In Serial-Out (SISO), Serial-In Parallel-Out (SIPO), Parallel-In Serial-Out (PISO), and Parallel-In Parallel-Out (PIPO).',
    powerPins: { vcc: 14, gnd: 7, ratedVoltage: 5.0, maxVoltage: 5.5 },
    pins: [
      { pin: 1,  name: 'SER',   type: 'input',   desc: 'Serial Data Input' },
      { pin: 2,  name: 'A',     type: 'input',   desc: 'Parallel Input A' },
      { pin: 3,  name: 'B',     type: 'input',   desc: 'Parallel Input B' },
      { pin: 4,  name: 'C',     type: 'input',   desc: 'Parallel Input C' },
      { pin: 5,  name: 'D',     type: 'input',   desc: 'Parallel Input D' },
      { pin: 6,  name: 'MODE',  type: 'control', desc: 'Mode Control (0=Shift Right, 1=Parallel Load)' },
      { pin: 7,  name: 'GND',   type: 'gnd',     desc: 'Ground (0V)' },
      { pin: 8,  name: 'CLK2',  type: 'clock',   desc: 'Clock 2 (Parallel Load)' },
      { pin: 9,  name: 'CLK1',  type: 'clock',   desc: 'Clock 1 (Shift Right)' },
      { pin: 10, name: 'QD',    type: 'output',  desc: 'Parallel Output D' },
      { pin: 11, name: 'QC',    type: 'output',  desc: 'Parallel Output C' },
      { pin: 12, name: 'QB',    type: 'output',  desc: 'Parallel Output B' },
      { pin: 13, name: 'QA',    type: 'output',  desc: 'Parallel Output A' },
      { pin: 14, name: 'VCC',   type: 'vcc',     desc: 'Supply Voltage (+5V)' }
    ]
  },

  // 74193: Synchronous 4-bit Up/Down Binary Counter
  '74193': {
    id: '74193',
    partNumber: '74193',
    name: 'Synchronous 4-Bit Up/Down Binary Counter',
    category: 'Counters',
    family: '74LS',
    pinCount: 16,
    packageType: 'DIP-16',
    description: 'Synchronous 4-bit reversible up/down binary counter with separate count up and count down clocks.',
    powerPins: { vcc: 16, gnd: 8, ratedVoltage: 5.0, maxVoltage: 5.5 },
    pins: [
      { pin: 1,  name: 'B',       type: 'input',   desc: 'Parallel Data Input B' },
      { pin: 2,  name: 'QB',      type: 'output',  desc: 'Flip-Flop Output B' },
      { pin: 3,  name: 'QA',      type: 'output',  desc: 'Flip-Flop Output A' },
      { pin: 4,  name: 'DOWN',    type: 'clock',   desc: 'Count Down Clock Input' },
      { pin: 5,  name: 'UP',      type: 'clock',   desc: 'Count Up Clock Input' },
      { pin: 6,  name: 'QC',      type: 'output',  desc: 'Flip-Flop Output C' },
      { pin: 7,  name: 'QD',      type: 'output',  desc: 'Flip-Flop Output D' },
      { pin: 8,  name: 'GND',     type: 'gnd',     desc: 'Ground (0V)' },
      { pin: 9,  name: 'D',       type: 'input',   desc: 'Parallel Data Input D' },
      { pin: 10, name: 'C',       type: 'input',   desc: 'Parallel Data Input C' },
      { pin: 11, name: 'LOAD\'',  type: 'control', desc: 'Parallel Load Input (Active Low)' },
      { pin: 12, name: 'CARRY\'', type: 'output',  desc: 'Terminal Count Up Output (Active Low)' },
      { pin: 13, name: 'BORR\'',  type: 'output',  desc: 'Terminal Count Down Output (Active Low)' },
      { pin: 14, name: 'CLR',     type: 'control', desc: 'Clear Input (Active High)' },
      { pin: 15, name: 'A',       type: 'input',   desc: 'Parallel Data Input A' },
      { pin: 16, name: 'VCC',     type: 'vcc',     desc: 'Supply Voltage (+5V)' }
    ]
  }
};

/**
 * Helper to get list of all ICs sorted by part number
 */
function getAllICs() {
  return Object.values(IC_LIBRARY);
}

/**
 * Search ICs by query (matches part number, name, category, or description)
 */
function searchICs(query) {
  if (!query || !query.trim()) return getAllICs();
  const q = query.toLowerCase().trim();
  return getAllICs().filter(ic => {
    return ic.partNumber.toLowerCase().includes(q) ||
           ic.name.toLowerCase().includes(q) ||
           ic.category.toLowerCase().includes(q) ||
           ic.description.toLowerCase().includes(q);
  });
}

/**
 * Get IC by part number
 */
function getIC(partNumber) {
  return IC_LIBRARY[partNumber] || null;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { IC_LIBRARY, getAllICs, searchICs, getIC };
}
