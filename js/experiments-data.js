/**
 * DIGITAL TECHNIQUES VIRTUAL TRAINER KIT SIMULATOR
 * Complete Experiments Database (1 to 17)
 * Extracted directly from Vidyalankar Polytechnic practical lab manual & MSBTE syllabus
 */

const EXPERIMENTS = [
  // ==========================================
  // EXPERIMENT 1: Test the functionality of Logic gates
  // ==========================================
  {
    id: 'exp1',
    number: 1,
    title: 'Test the Functionality of Basic Logic Gates',
    aim: 'To verify the truth tables of standard digital logic gates (AND, OR, XOR, NOT, XNOR) using 74 series TTL ICs.',
    parts: [
      {
        id: 'exp1_and',
        name: 'Part A: 7408 Quad 2-Input AND Gate',
        icId: '7408',
        socketId: 'zif16',
        description: 'Verify 2-input AND gate truth table using IC 7408.',
        connections: [
          { from: 'z16_p14', to: 'pwr_p5_1', color: '#ff2222', label: 'Pin 14 (VCC) -> +5V' },
          { from: 'z16_p7',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 7 (GND) -> GND' },
          { from: 'z16_p1',  to: 'inp_0',     color: '#2277ff', label: 'Pin 1 (1A) -> Switch S0 (Input A)' },
          { from: 'z16_p2',  to: 'inp_1',     color: '#22cc88', label: 'Pin 2 (1B) -> Switch S1 (Input B)' },
          { from: 'z16_p3',  to: 'ind_0',     color: '#ffaa00', label: 'Pin 3 (1Y) -> Indicator L0 (Output Y)' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 7408 (Quad 2-Input AND Gate) from the Component Library.' },
          { step: 2, action: 'Place IC', details: 'Insert IC 7408 into the 16-Pin ZIF Socket and lock the lever.' },
          { step: 3, action: 'Connect Power (VCC)', details: 'Connect Pin 14 of IC 7408 to the +5V supply terminal.' },
          { step: 4, action: 'Connect Ground (GND)', details: 'Connect Pin 7 of IC 7408 to the GND terminal.' },
          { step: 5, action: 'Connect Input A', details: 'Connect Pin 1 (Gate 1 Input A) to Logic Switch S0 (I0).' },
          { step: 6, action: 'Connect Input B', details: 'Connect Pin 2 (Gate 1 Input B) to Logic Switch S1 (I1).' },
          { step: 7, action: 'Connect Output Y', details: 'Connect Pin 3 (Gate 1 Output 1Y) to Logic Level Indicator L0.' },
          { step: 8, action: 'Verify Truth Table', details: 'Toggle switches S0 and S1 through all 4 combinations and observe LED L0.' }
        ],
        truthTable: {
          headers: ['Input A (S0)', 'Input B (S1)', 'Expected Y', 'Observed LED (L0)', 'Status'],
          rows: [
            { inputs: { sw_0: 0, sw_1: 0 }, expected: 0 },
            { inputs: { sw_0: 0, sw_1: 1 }, expected: 0 },
            { inputs: { sw_0: 1, sw_1: 0 }, expected: 0 },
            { inputs: { sw_0: 1, sw_1: 1 }, expected: 1 }
          ]
        }
      },
      {
        id: 'exp1_or',
        name: 'Part B: 7432 Quad 2-Input OR Gate',
        icId: '7432',
        socketId: 'zif16',
        description: 'Verify 2-input OR gate truth table using IC 7432.',
        connections: [
          { from: 'z16_p14', to: 'pwr_p5_1', color: '#ff2222', label: 'Pin 14 (VCC) -> +5V' },
          { from: 'z16_p7',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 7 (GND) -> GND' },
          { from: 'z16_p1',  to: 'inp_0',     color: '#2277ff', label: 'Pin 1 (1A) -> Switch S0 (Input A)' },
          { from: 'z16_p2',  to: 'inp_1',     color: '#22cc88', label: 'Pin 2 (1B) -> Switch S1 (Input B)' },
          { from: 'z16_p3',  to: 'ind_0',     color: '#ffaa00', label: 'Pin 3 (1Y) -> Indicator L0 (Output Y)' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 7432 (Quad 2-Input OR Gate) from the Component Library.' },
          { step: 2, action: 'Place IC', details: 'Insert IC 7432 into the 16-Pin ZIF Socket.' },
          { step: 3, action: 'Connect Power (VCC)', details: 'Connect Pin 14 to +5V.' },
          { step: 4, action: 'Connect Ground (GND)', details: 'Connect Pin 7 to GND.' },
          { step: 5, action: 'Connect Input A', details: 'Connect Pin 1 (1A) to Switch S0.' },
          { step: 6, action: 'Connect Input B', details: 'Connect Pin 2 (1B) to Switch S1.' },
          { step: 7, action: 'Connect Output Y', details: 'Connect Pin 3 (1Y) to Indicator L0.' },
          { step: 8, action: 'Verify Truth Table', details: 'Test inputs (0,0), (0,1), (1,0), (1,1).' }
        ],
        truthTable: {
          headers: ['Input A (S0)', 'Input B (S1)', 'Expected Y', 'Observed LED (L0)', 'Status'],
          rows: [
            { inputs: { sw_0: 0, sw_1: 0 }, expected: 0 },
            { inputs: { sw_0: 0, sw_1: 1 }, expected: 1 },
            { inputs: { sw_0: 1, sw_1: 0 }, expected: 1 },
            { inputs: { sw_0: 1, sw_1: 1 }, expected: 1 }
          ]
        }
      },
      {
        id: 'exp1_xor',
        name: 'Part C: 7486 Quad 2-Input XOR Gate',
        icId: '7486',
        socketId: 'zif16',
        description: 'Verify 2-input XOR gate truth table using IC 7486.',
        connections: [
          { from: 'z16_p14', to: 'pwr_p5_1', color: '#ff2222', label: 'Pin 14 (VCC) -> +5V' },
          { from: 'z16_p7',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 7 (GND) -> GND' },
          { from: 'z16_p1',  to: 'inp_0',     color: '#2277ff', label: 'Pin 1 (1A) -> Switch S0 (Input A)' },
          { from: 'z16_p2',  to: 'inp_1',     color: '#22cc88', label: 'Pin 2 (1B) -> Switch S1 (Input B)' },
          { from: 'z16_p3',  to: 'ind_0',     color: '#ffaa00', label: 'Pin 3 (1Y) -> Indicator L0 (Output Y)' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 7486 (Quad 2-Input XOR Gate).' },
          { step: 2, action: 'Place IC', details: 'Insert IC 7486 into the 16-Pin Socket.' },
          { step: 3, action: 'Connect Power', details: 'Connect Pin 14 to +5V and Pin 7 to GND.' },
          { step: 4, action: 'Connect Inputs', details: 'Connect Pin 1 to S0 and Pin 2 to S1.' },
          { step: 5, action: 'Connect Output', details: 'Connect Pin 3 to Indicator L0.' },
          { step: 6, action: 'Verify Truth Table', details: 'Test all 4 input combinations.' }
        ],
        truthTable: {
          headers: ['Input A (S0)', 'Input B (S1)', 'Expected Y', 'Observed LED (L0)', 'Status'],
          rows: [
            { inputs: { sw_0: 0, sw_1: 0 }, expected: 0 },
            { inputs: { sw_0: 0, sw_1: 1 }, expected: 1 },
            { inputs: { sw_0: 1, sw_1: 0 }, expected: 1 },
            { inputs: { sw_0: 1, sw_1: 1 }, expected: 0 }
          ]
        }
      },
      {
        id: 'exp1_not',
        name: 'Part D: 7404 Hex Inverter (NOT Gate)',
        icId: '7404',
        socketId: 'zif16',
        description: 'Verify NOT gate truth table using IC 7404.',
        connections: [
          { from: 'z16_p14', to: 'pwr_p5_1', color: '#ff2222', label: 'Pin 14 (VCC) -> +5V' },
          { from: 'z16_p7',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 7 (GND) -> GND' },
          { from: 'z16_p1',  to: 'inp_0',     color: '#2277ff', label: 'Pin 1 (1A) -> Switch S0 (Input A)' },
          { from: 'z16_p2',  to: 'ind_0',     color: '#ffaa00', label: 'Pin 2 (1Y) -> Indicator L0 (Output Y)' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 7404 (Hex Inverter).' },
          { step: 2, action: 'Place IC', details: 'Insert IC 7404 into 16-Pin Socket.' },
          { step: 3, action: 'Connect Power', details: 'Connect Pin 14 to +5V and Pin 7 to GND.' },
          { step: 4, action: 'Connect Input', details: 'Connect Pin 1 to Switch S0.' },
          { step: 5, action: 'Connect Output', details: 'Connect Pin 2 to Indicator L0.' },
          { step: 6, action: 'Verify Truth Table', details: 'Observe inversion (0 -> 1, 1 -> 0).' }
        ],
        truthTable: {
          headers: ['Input A (S0)', 'Expected Y', 'Observed LED (L0)', 'Status'],
          rows: [
            { inputs: { sw_0: 0 }, expected: 1 },
            { inputs: { sw_0: 1 }, expected: 0 }
          ]
        }
      },
      {
        id: 'exp1_xnor',
        name: 'Part E: 74266 Quad 2-Input XNOR Gate',
        icId: '74266',
        socketId: 'zif16',
        description: 'Verify 2-input XNOR gate truth table using IC 74266.',
        connections: [
          { from: 'z16_p14', to: 'pwr_p5_1', color: '#ff2222', label: 'Pin 14 (VCC) -> +5V' },
          { from: 'z16_p7',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 7 (GND) -> GND' },
          { from: 'z16_p1',  to: 'inp_0',     color: '#2277ff', label: 'Pin 1 (1A) -> Switch S0 (Input A)' },
          { from: 'z16_p2',  to: 'inp_1',     color: '#22cc88', label: 'Pin 2 (1B) -> Switch S1 (Input B)' },
          { from: 'z16_p3',  to: 'ind_0',     color: '#ffaa00', label: 'Pin 3 (1Y) -> Indicator L0 (Output Y)' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 74266 (Quad 2-Input XNOR Gate).' },
          { step: 2, action: 'Place IC', details: 'Insert IC 74266 into the 16-Pin Socket.' },
          { step: 3, action: 'Connect Power', details: 'Connect Pin 14 to +5V and Pin 7 to GND.' },
          { step: 4, action: 'Connect Inputs', details: 'Connect Pin 1 to S0 and Pin 2 to S1.' },
          { step: 5, action: 'Connect Output', details: 'Connect Pin 3 to Indicator L0.' },
          { step: 6, action: 'Verify Truth Table', details: 'Test all 4 input combinations.' }
        ],
        truthTable: {
          headers: ['Input A (S0)', 'Input B (S1)', 'Expected Y', 'Observed LED (L0)', 'Status'],
          rows: [
            { inputs: { sw_0: 0, sw_1: 0 }, expected: 1 },
            { inputs: { sw_0: 0, sw_1: 1 }, expected: 0 },
            { inputs: { sw_0: 1, sw_1: 0 }, expected: 0 },
            { inputs: { sw_0: 1, sw_1: 1 }, expected: 1 }
          ]
        }
      }
    ]
  },

  // ==========================================
  // EXPERIMENT 2: Test the functionality of Universal Gates
  // ==========================================
  {
    id: 'exp2',
    number: 2,
    title: 'Test Functionality of Universal Gates (NAND & NOR)',
    aim: 'To verify the truth tables of Universal logic gates: 7400 NAND gate and 7402 NOR gate.',
    parts: [
      {
        id: 'exp2_nand',
        name: 'Part A: 7400 Quad 2-Input NAND Gate',
        icId: '7400',
        socketId: 'zif16',
        description: 'Verify 2-input NAND gate truth table using IC 7400.',
        connections: [
          { from: 'z16_p14', to: 'pwr_p5_1', color: '#ff2222', label: 'Pin 14 (VCC) -> +5V' },
          { from: 'z16_p7',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 7 (GND) -> GND' },
          { from: 'z16_p1',  to: 'inp_0',     color: '#2277ff', label: 'Pin 1 (1A) -> Switch S0 (Input A)' },
          { from: 'z16_p2',  to: 'inp_1',     color: '#22cc88', label: 'Pin 2 (1B) -> Switch S1 (Input B)' },
          { from: 'z16_p3',  to: 'ind_0',     color: '#ffaa00', label: 'Pin 3 (1Y) -> Indicator L0 (Output Y)' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 7400 (Quad 2-Input NAND Gate).' },
          { step: 2, action: 'Place IC', details: 'Insert IC 7400 into 16-Pin Socket.' },
          { step: 3, action: 'Connect Power', details: 'Connect Pin 14 to +5V and Pin 7 to GND.' },
          { step: 4, action: 'Connect Inputs', details: 'Connect Pin 1 to S0 and Pin 2 to S1.' },
          { step: 5, action: 'Connect Output', details: 'Connect Pin 3 to Indicator L0.' },
          { step: 6, action: 'Verify Truth Table', details: 'Observe NAND behavior: Low only when both inputs are High.' }
        ],
        truthTable: {
          headers: ['Input A (S0)', 'Input B (S1)', 'Expected Y', 'Observed LED (L0)', 'Status'],
          rows: [
            { inputs: { sw_0: 0, sw_1: 0 }, expected: 1 },
            { inputs: { sw_0: 0, sw_1: 1 }, expected: 1 },
            { inputs: { sw_0: 1, sw_1: 0 }, expected: 1 },
            { inputs: { sw_0: 1, sw_1: 1 }, expected: 0 }
          ]
        }
      },
      {
        id: 'exp2_nor',
        name: 'Part B: 7402 Quad 2-Input NOR Gate',
        icId: '7402',
        socketId: 'zif16',
        description: 'Verify 2-input NOR gate truth table using IC 7402. (Note: Pin 1 is Output, Pins 2 & 3 are Inputs!)',
        connections: [
          { from: 'z16_p14', to: 'pwr_p5_1', color: '#ff2222', label: 'Pin 14 (VCC) -> +5V' },
          { from: 'z16_p7',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 7 (GND) -> GND' },
          { from: 'z16_p2',  to: 'inp_0',     color: '#2277ff', label: 'Pin 2 (1A) -> Switch S0 (Input A)' },
          { from: 'z16_p3',  to: 'inp_1',     color: '#22cc88', label: 'Pin 3 (1B) -> Switch S1 (Input B)' },
          { from: 'z16_p1',  to: 'ind_0',     color: '#ffaa00', label: 'Pin 1 (1Y) -> Indicator L0 (Output Y)' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 7402 (Quad 2-Input NOR Gate).' },
          { step: 2, action: 'Place IC', details: 'Insert IC 7402 into 16-Pin Socket.' },
          { step: 3, action: 'Connect Power', details: 'Connect Pin 14 to +5V and Pin 7 to GND.' },
          { step: 4, action: 'Connect Inputs', details: 'Connect Pin 2 (1A) to S0 and Pin 3 (1B) to S1.' },
          { step: 5, action: 'Connect Output', details: 'Connect Pin 1 (1Y) to Indicator L0.' },
          { step: 6, action: 'Verify Truth Table', details: 'Observe NOR behavior: High only when both inputs are Low.' }
        ],
        truthTable: {
          headers: ['Input A (S0)', 'Input B (S1)', 'Expected Y', 'Observed LED (L0)', 'Status'],
          rows: [
            { inputs: { sw_0: 0, sw_1: 0 }, expected: 1 },
            { inputs: { sw_0: 0, sw_1: 1 }, expected: 0 },
            { inputs: { sw_0: 1, sw_1: 0 }, expected: 0 },
            { inputs: { sw_0: 1, sw_1: 1 }, expected: 0 }
          ]
        }
      }
    ]
  },

  // ==========================================
  // EXPERIMENT 3: Design basic gates using Universal gates
  // ==========================================
  {
    id: 'exp3',
    number: 3,
    title: 'Design Basic Gates (NOT, AND, OR) using Universal Gates',
    aim: 'To implement NOT, AND, and OR logic operations using only NAND gates (7400) and only NOR gates (7402).',
    parts: [
      {
        id: 'exp3_not_nand',
        name: 'Part A: NOT Gate using NAND (7400)',
        icId: '7400',
        socketId: 'zif16',
        description: 'Tie both inputs of a NAND gate together to form an Inverter (NOT gate).',
        connections: [
          { from: 'z16_p14', to: 'pwr_p5_1', color: '#ff2222', label: 'Pin 14 (VCC) -> +5V' },
          { from: 'z16_p7',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 7 (GND) -> GND' },
          { from: 'z16_p1',  to: 'inp_0',     color: '#2277ff', label: 'Pin 1 (1A) -> Switch S0' },
          { from: 'z16_p1',  to: 'z16_p2',    color: '#2277ff', label: 'Pin 1 jumpered to Pin 2 (1A & 1B tied)' },
          { from: 'z16_p3',  to: 'ind_0',     color: '#ffaa00', label: 'Pin 3 (1Y) -> Indicator L0' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 7400 (Quad NAND).' },
          { step: 2, action: 'Place IC', details: 'Insert IC 7400 into 16-Pin Socket.' },
          { step: 3, action: 'Connect Power', details: 'Connect Pin 14 to +5V and Pin 7 to GND.' },
          { step: 4, action: 'Tie Inputs Together', details: 'Connect Pin 1 to Switch S0 and tie Pin 2 to Pin 1.' },
          { step: 5, action: 'Connect Output', details: 'Connect Pin 3 to Indicator L0.' },
          { step: 6, action: 'Verify NOT Function', details: 'Verify that Y = ~A.' }
        ],
        truthTable: {
          headers: ['Input A (S0)', 'Expected NOT A', 'Observed LED (L0)', 'Status'],
          rows: [
            { inputs: { sw_0: 0 }, expected: 1 },
            { inputs: { sw_0: 1 }, expected: 0 }
          ]
        }
      },
      {
        id: 'exp3_and_nand',
        name: 'Part B: AND Gate using NAND (7400)',
        icId: '7400',
        socketId: 'zif16',
        description: 'Connect NAND gate output into a second NAND inverter: ~((A & B))\' = A & B.',
        connections: [
          { from: 'z16_p14', to: 'pwr_p5_1', color: '#ff2222', label: 'Pin 14 (VCC) -> +5V' },
          { from: 'z16_p7',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 7 (GND) -> GND' },
          { from: 'z16_p1',  to: 'inp_0',     color: '#2277ff', label: 'Pin 1 (1A) -> Switch S0 (Input A)' },
          { from: 'z16_p2',  to: 'inp_1',     color: '#22cc88', label: 'Pin 2 (1B) -> Switch S1 (Input B)' },
          { from: 'z16_p3',  to: 'z16_p4',    color: '#aa44cc', label: 'Pin 3 (1Y) -> Pin 4 (2A)' },
          { from: 'z16_p4',  to: 'z16_p5',    color: '#aa44cc', label: 'Pin 4 (2A) jumpered to Pin 5 (2B)' },
          { from: 'z16_p6',  to: 'ind_0',     color: '#ffaa00', label: 'Pin 6 (2Y) -> Indicator L0 (Output Y)' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 7400.' },
          { step: 2, action: 'Connect Power', details: 'Pin 14 to +5V, Pin 7 to GND.' },
          { step: 3, action: 'Inputs to Gate 1', details: 'Connect Pin 1 to S0 and Pin 2 to S1.' },
          { step: 4, action: 'Cascade to Gate 2', details: 'Connect Pin 3 (1Y) to Pins 4 and 5 (tied together as inverter).' },
          { step: 5, action: 'Connect Output', details: 'Connect Pin 6 (2Y) to Indicator L0.' },
          { step: 6, action: 'Verify AND Function', details: 'Verify Y = A & B.' }
        ],
        truthTable: {
          headers: ['Input A (S0)', 'Input B (S1)', 'Expected AND (Y)', 'Observed LED (L0)', 'Status'],
          rows: [
            { inputs: { sw_0: 0, sw_1: 0 }, expected: 0 },
            { inputs: { sw_0: 0, sw_1: 1 }, expected: 0 },
            { inputs: { sw_0: 1, sw_1: 0 }, expected: 0 },
            { inputs: { sw_0: 1, sw_1: 1 }, expected: 1 }
          ]
        }
      },
      {
        id: 'exp3_or_nand',
        name: 'Part C: OR Gate using NAND (7400)',
        icId: '7400',
        socketId: 'zif16',
        description: 'Using De-Morgan\'s Law: A + B = ~(~A & ~B). Uses 3 NAND gates.',
        connections: [
          { from: 'z16_p14', to: 'pwr_p5_1', color: '#ff2222', label: 'Pin 14 (VCC) -> +5V' },
          { from: 'z16_p7',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 7 (GND) -> GND' },
          { from: 'z16_p1',  to: 'inp_0',     color: '#2277ff', label: 'Input A -> Pin 1 (1A)' },
          { from: 'z16_p1',  to: 'z16_p2',    color: '#2277ff', label: 'Pin 1 jumpered to Pin 2' },
          { from: 'z16_p4',  to: 'inp_1',     color: '#22cc88', label: 'Input B -> Pin 4 (2A)' },
          { from: 'z16_p4',  to: 'z16_p5',    color: '#22cc88', label: 'Pin 4 jumpered to Pin 5' },
          { from: 'z16_p3',  to: 'z16_p9',    color: '#ff8800', label: 'Pin 3 (~A) -> Pin 9 (3A)' },
          { from: 'z16_p6',  to: 'z16_p10',   color: '#ff8800', label: 'Pin 6 (~B) -> Pin 10 (3B)' },
          { from: 'z16_p8',  to: 'ind_0',     color: '#ffaa00', label: 'Pin 8 (3Y) -> Indicator L0' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 7400.' },
          { step: 2, action: 'Connect Power', details: 'Pin 14 to +5V, Pin 7 to GND.' },
          { step: 3, action: 'Invert Input A', details: 'Connect S0 to Pins 1 & 2 (Gate 1).' },
          { step: 4, action: 'Invert Input B', details: 'Connect S1 to Pins 4 & 5 (Gate 2).' },
          { step: 5, action: 'Combine with Gate 3', details: 'Connect Pin 3 to Pin 9, Pin 6 to Pin 10.' },
          { step: 6, action: 'Connect Output', details: 'Connect Pin 8 (3Y) to Indicator L0.' },
          { step: 7, action: 'Verify OR Function', details: 'Verify Y = A + B.' }
        ],
        truthTable: {
          headers: ['Input A (S0)', 'Input B (S1)', 'Expected OR (Y)', 'Observed LED (L0)', 'Status'],
          rows: [
            { inputs: { sw_0: 0, sw_1: 0 }, expected: 0 },
            { inputs: { sw_0: 0, sw_1: 1 }, expected: 1 },
            { inputs: { sw_0: 1, sw_1: 0 }, expected: 1 },
            { inputs: { sw_0: 1, sw_1: 1 }, expected: 1 }
          ]
        }
      },
      {
        id: 'exp3_not_nor',
        name: 'Part D: NOT Gate using NOR (7402)',
        icId: '7402',
        socketId: 'zif16',
        description: 'Tie both inputs of NOR gate together: ~(A | A) = ~A. Note: Pin 1 is Output, Pins 2 & 3 are Inputs.',
        connections: [
          { from: 'z16_p14', to: 'pwr_p5_1', color: '#ff2222', label: 'Pin 14 (VCC) -> +5V' },
          { from: 'z16_p7',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 7 (GND) -> GND' },
          { from: 'z16_p2',  to: 'inp_0',     color: '#2277ff', label: 'Pin 2 (1A) -> Switch S0' },
          { from: 'z16_p2',  to: 'z16_p3',    color: '#2277ff', label: 'Pin 2 jumpered to Pin 3 (1B)' },
          { from: 'z16_p1',  to: 'ind_0',     color: '#ffaa00', label: 'Pin 1 (1Y) -> Indicator L0' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 7402.' },
          { step: 2, action: 'Connect Power', details: 'Pin 14 to +5V, Pin 7 to GND.' },
          { step: 3, action: 'Tie Inputs', details: 'Connect S0 to Pin 2 and tie Pin 3 to Pin 2.' },
          { step: 4, action: 'Connect Output', details: 'Connect Pin 1 to Indicator L0.' },
          { step: 5, action: 'Verify NOT Function', details: 'Verify inversion Y = ~A.' }
        ],
        truthTable: {
          headers: ['Input A (S0)', 'Expected NOT A', 'Observed LED (L0)', 'Status'],
          rows: [
            { inputs: { sw_0: 0 }, expected: 1 },
            { inputs: { sw_0: 1 }, expected: 0 }
          ]
        }
      },
      {
        id: 'exp3_or_nor',
        name: 'Part E: OR Gate using NOR (7402)',
        icId: '7402',
        socketId: 'zif16',
        description: 'Connect NOR gate output into a second NOR inverter: ~(~(A | B)) = A | B.',
        connections: [
          { from: 'z16_p14', to: 'pwr_p5_1', color: '#ff2222', label: 'Pin 14 (VCC) -> +5V' },
          { from: 'z16_p7',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 7 (GND) -> GND' },
          { from: 'z16_p2',  to: 'inp_0',     color: '#2277ff', label: 'Pin 2 (1A) -> Switch S0' },
          { from: 'z16_p3',  to: 'inp_1',     color: '#22cc88', label: 'Pin 3 (1B) -> Switch S1' },
          { from: 'z16_p1',  to: 'z16_p5',    color: '#aa44cc', label: 'Pin 1 (1Y) -> Pin 5 (2A)' },
          { from: 'z16_p5',  to: 'z16_p6',    color: '#aa44cc', label: 'Pin 5 jumpered to Pin 6 (2B)' },
          { from: 'z16_p4',  to: 'ind_0',     color: '#ffaa00', label: 'Pin 4 (2Y) -> Indicator L0' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 7402.' },
          { step: 2, action: 'Connect Power', details: 'Pin 14 to +5V, Pin 7 to GND.' },
          { step: 3, action: 'Inputs to Gate 1', details: 'Pin 2 to S0, Pin 3 to S1.' },
          { step: 4, action: 'Cascade to Inverter', details: 'Pin 1 (1Y) to Pins 5 & 6 (Gate 2 tied).' },
          { step: 5, action: 'Connect Output', details: 'Pin 4 (2Y) to Indicator L0.' },
          { step: 6, action: 'Verify OR Function', details: 'Verify Y = A + B.' }
        ],
        truthTable: {
          headers: ['Input A (S0)', 'Input B (S1)', 'Expected OR (Y)', 'Observed LED (L0)', 'Status'],
          rows: [
            { inputs: { sw_0: 0, sw_1: 0 }, expected: 0 },
            { inputs: { sw_0: 0, sw_1: 1 }, expected: 1 },
            { inputs: { sw_0: 1, sw_1: 0 }, expected: 1 },
            { inputs: { sw_0: 1, sw_1: 1 }, expected: 1 }
          ]
        }
      },
      {
        id: 'exp3_and_nor',
        name: 'Part F: AND Gate using NOR (7402)',
        icId: '7402',
        socketId: 'zif16',
        description: 'Using De-Morgan\'s Law: A . B = ~(~A | ~B). Uses 3 NOR gates.',
        connections: [
          { from: 'z16_p14', to: 'pwr_p5_1', color: '#ff2222', label: 'Pin 14 (VCC) -> +5V' },
          { from: 'z16_p7',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 7 (GND) -> GND' },
          { from: 'z16_p2',  to: 'inp_0',     color: '#2277ff', label: 'Input A -> Pin 2 (1A)' },
          { from: 'z16_p2',  to: 'z16_p3',    color: '#2277ff', label: 'Pin 2 jumpered to Pin 3' },
          { from: 'z16_p5',  to: 'inp_1',     color: '#22cc88', label: 'Input B -> Pin 5 (2A)' },
          { from: 'z16_p5',  to: 'z16_p6',    color: '#22cc88', label: 'Pin 5 jumpered to Pin 6' },
          { from: 'z16_p1',  to: 'z16_p8',    color: '#ff8800', label: 'Pin 1 (~A) -> Pin 8 (3A)' },
          { from: 'z16_p4',  to: 'z16_p9',    color: '#ff8800', label: 'Pin 4 (~B) -> Pin 9 (3B)' },
          { from: 'z16_p10', to: 'ind_0',     color: '#ffaa00', label: 'Pin 10 (3Y) -> Indicator L0' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 7402.' },
          { step: 2, action: 'Connect Power', details: 'Pin 14 to +5V, Pin 7 to GND.' },
          { step: 3, action: 'Invert Input A', details: 'Connect S0 to Pins 2 & 3 (Gate 1).' },
          { step: 4, action: 'Invert Input B', details: 'Connect S1 to Pins 5 & 6 (Gate 2).' },
          { step: 5, action: 'Combine with Gate 3', details: 'Connect Pin 1 to Pin 8, Pin 4 to Pin 9.' },
          { step: 6, action: 'Connect Output', details: 'Connect Pin 10 (3Y) to Indicator L0.' },
          { step: 7, action: 'Verify AND Function', details: 'Verify Y = A . B.' }
        ],
        truthTable: {
          headers: ['Input A (S0)', 'Input B (S1)', 'Expected AND (Y)', 'Observed LED (L0)', 'Status'],
          rows: [
            { inputs: { sw_0: 0, sw_1: 0 }, expected: 0 },
            { inputs: { sw_0: 0, sw_1: 1 }, expected: 0 },
            { inputs: { sw_0: 1, sw_1: 0 }, expected: 0 },
            { inputs: { sw_0: 1, sw_1: 1 }, expected: 1 }
          ]
        }
      }
    ]
  },

  // ==========================================
  // EXPERIMENT 4: Construct Exclusive Gates using Universal Gates
  // ==========================================
  {
    id: 'exp4',
    number: 4,
    title: 'Construct Exclusive Gates using Universal Gates',
    aim: 'To construct and test Exclusive-OR (XOR) and Exclusive-NOR (XNOR) logic gates using 4 NAND gates (7400) and 4 NOR gates (7402).',
    parts: [
      {
        id: 'exp4_xor_nand',
        name: 'Part A: XOR Gate using 4 NAND Gates (7400)',
        icId: '7400',
        socketId: 'zif16',
        description: 'Construct XOR using standard 4-NAND gate configuration: Y = A ^ B.',
        connections: [
          { from: 'z16_p14', to: 'pwr_p5_1', color: '#ff2222', label: 'Pin 14 (VCC) -> +5V' },
          { from: 'z16_p7',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 7 (GND) -> GND' },
          // Gate 1: inputs A (p1) & B (p2), out p3
          { from: 'z16_p1',  to: 'inp_0',     color: '#2277ff', label: 'Input A -> Pin 1 (1A)' },
          { from: 'z16_p2',  to: 'inp_1',     color: '#22cc88', label: 'Input B -> Pin 2 (1B)' },
          // Gate 2: inputs A (p4) & p3 (p5), out p6
          { from: 'z16_p1',  to: 'z16_p4',    color: '#2277ff', label: 'Input A jumpered to Pin 4 (2A)' },
          { from: 'z16_p3',  to: 'z16_p5',    color: '#aa44cc', label: 'Pin 3 (1Y) -> Pin 5 (2B)' },
          // Gate 3: inputs p3 (p9) & B (p10), out p8
          { from: 'z16_p3',  to: 'z16_p9',    color: '#aa44cc', label: 'Pin 3 (1Y) -> Pin 9 (3A)' },
          { from: 'z16_p2',  to: 'z16_p10',   color: '#22cc88', label: 'Input B jumpered to Pin 10 (3B)' },
          // Gate 4: inputs p6 (p12) & p8 (p13), out p11
          { from: 'z16_p6',  to: 'z16_p12',   color: '#ff8800', label: 'Pin 6 (2Y) -> Pin 12 (4A)' },
          { from: 'z16_p8',  to: 'z16_p13',   color: '#ff8800', label: 'Pin 8 (3Y) -> Pin 13 (4B)' },
          { from: 'z16_p11', to: 'ind_0',     color: '#ffaa00', label: 'Pin 11 (4Y) -> Indicator L0' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 7400 (Quad 2-Input NAND).' },
          { step: 2, action: 'Connect Power', details: 'Pin 14 to +5V, Pin 7 to GND.' },
          { step: 3, action: 'Gate 1 (Central NAND)', details: 'Connect A to Pin 1, B to Pin 2.' },
          { step: 4, action: 'Gate 2 (Upper NAND)', details: 'Connect A to Pin 4, Pin 3 to Pin 5.' },
          { step: 5, action: 'Gate 3 (Lower NAND)', details: 'Connect Pin 3 to Pin 9, B to Pin 10.' },
          { step: 6, action: 'Gate 4 (Output NAND)', details: 'Connect Pin 6 to Pin 12, Pin 8 to Pin 13.' },
          { step: 7, action: 'Connect Output', details: 'Connect Pin 11 to Indicator L0.' },
          { step: 8, action: 'Verify XOR Function', details: 'Output High when inputs differ (01 or 10).' }
        ],
        truthTable: {
          headers: ['Input A (S0)', 'Input B (S1)', 'Expected XOR', 'Observed LED (L0)', 'Status'],
          rows: [
            { inputs: { sw_0: 0, sw_1: 0 }, expected: 0 },
            { inputs: { sw_0: 0, sw_1: 1 }, expected: 1 },
            { inputs: { sw_0: 1, sw_1: 0 }, expected: 1 },
            { inputs: { sw_0: 1, sw_1: 1 }, expected: 0 }
          ]
        }
      },
      {
        id: 'exp4_xnor_nor',
        name: 'Part B: XNOR Gate using 4 NOR Gates (7402)',
        icId: '7402',
        socketId: 'zif16',
        description: 'Construct XNOR using 4 NOR gates: Y = ~(A ^ B). Output is High when inputs are identical.',
        connections: [
          { from: 'z16_p14', to: 'pwr_p5_1', color: '#ff2222', label: 'Pin 14 (VCC) -> +5V' },
          { from: 'z16_p7',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 7 (GND) -> GND' },
          // Gate 1: inputs A (p2) & B (p3), out p1
          { from: 'z16_p2',  to: 'inp_0',     color: '#2277ff', label: 'Input A -> Pin 2 (1A)' },
          { from: 'z16_p3',  to: 'inp_1',     color: '#22cc88', label: 'Input B -> Pin 3 (1B)' },
          // Gate 2: inputs A (p5) & p1 (p6), out p4
          { from: 'z16_p2',  to: 'z16_p5',    color: '#2277ff', label: 'Input A jumpered to Pin 5 (2A)' },
          { from: 'z16_p1',  to: 'z16_p6',    color: '#aa44cc', label: 'Pin 1 (1Y) -> Pin 6 (2B)' },
          // Gate 3: inputs p1 (p8) & B (p9), out p10
          { from: 'z16_p1',  to: 'z16_p8',    color: '#aa44cc', label: 'Pin 1 (1Y) -> Pin 8 (3A)' },
          { from: 'z16_p3',  to: 'z16_p9',    color: '#22cc88', label: 'Input B jumpered to Pin 9 (3B)' },
          // Gate 4: inputs p4 (p11) & p10 (p12), out p13
          { from: 'z16_p4',  to: 'z16_p11',   color: '#ff8800', label: 'Pin 4 (2Y) -> Pin 11 (4A)' },
          { from: 'z16_p10', to: 'z16_p12',   color: '#ff8800', label: 'Pin 10 (3Y) -> Pin 12 (4B)' },
          { from: 'z16_p13', to: 'ind_0',     color: '#ffaa00', label: 'Pin 13 (4Y) -> Indicator L0' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 7402 (Quad 2-Input NOR).' },
          { step: 2, action: 'Connect Power', details: 'Pin 14 to +5V, Pin 7 to GND.' },
          { step: 3, action: 'Gate 1 (Central NOR)', details: 'Connect A to Pin 2, B to Pin 3.' },
          { step: 4, action: 'Gate 2 (Upper NOR)', details: 'Connect A to Pin 5, Pin 1 to Pin 6.' },
          { step: 5, action: 'Gate 3 (Lower NOR)', details: 'Connect Pin 1 to Pin 8, B to Pin 9.' },
          { step: 6, action: 'Gate 4 (Output NOR)', details: 'Connect Pin 4 to Pin 11, Pin 10 to Pin 12.' },
          { step: 7, action: 'Connect Output', details: 'Connect Pin 13 to Indicator L0.' },
          { step: 8, action: 'Verify XNOR Function', details: 'Output High when inputs match (00 or 11).' }
        ],
        truthTable: {
          headers: ['Input A (S0)', 'Input B (S1)', 'Expected XNOR', 'Observed LED (L0)', 'Status'],
          rows: [
            { inputs: { sw_0: 0, sw_1: 0 }, expected: 1 },
            { inputs: { sw_0: 0, sw_1: 1 }, expected: 0 },
            { inputs: { sw_0: 1, sw_1: 0 }, expected: 0 },
            { inputs: { sw_0: 1, sw_1: 1 }, expected: 1 }
          ]
        }
      }
    ]
  },

  // ==========================================
  // EXPERIMENT 5: Verify De-Morgan's Theorem
  // ==========================================
  {
    id: 'exp5',
    number: 5,
    title: 'Verify De-Morgan\'s Theorems (Theorem 1 & 2)',
    aim: 'To verify De-Morgan\'s First Theorem: (A+B)\' = A\'.B\' and Second Theorem: (A.B)\' = A\' + B\'.',
    parts: [
      {
        id: 'exp5_thm1',
        name: 'Part A: De-Morgan\'s First Theorem: (A + B)\' = A\' . B\'',
        icId: '7402',
        socketId: 'zif16',
        description: 'Verify LHS using NOR gate (7402), comparing output against RHS truth table values.',
        connections: [
          { from: 'z16_p14', to: 'pwr_p5_1', color: '#ff2222', label: 'Pin 14 (VCC) -> +5V' },
          { from: 'z16_p7',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 7 (GND) -> GND' },
          { from: 'z16_p2',  to: 'inp_0',     color: '#2277ff', label: 'Input A -> Pin 2 (1A)' },
          { from: 'z16_p3',  to: 'inp_1',     color: '#22cc88', label: 'Input B -> Pin 3 (1B)' },
          { from: 'z16_p1',  to: 'ind_0',     color: '#ffaa00', label: 'Pin 1 (1Y) -> Indicator L0 (LHS: (A+B)\')' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 7402 (NOR Gate for LHS).' },
          { step: 2, action: 'Connect Power', details: 'Pin 14 to +5V, Pin 7 to GND.' },
          { step: 3, action: 'Connect Inputs', details: 'Pin 2 to S0 (A) and Pin 3 to S1 (B).' },
          { step: 4, action: 'Connect Output', details: 'Pin 1 to Indicator L0.' },
          { step: 5, action: 'Verify Theorem 1', details: 'Verify (A+B)\' equals A\'.B\' for all 4 states.' }
        ],
        truthTable: {
          headers: ['Input A (S0)', 'Input B (S1)', 'LHS: (A+B)\'', 'RHS: A\'.B\'', 'Match Status'],
          rows: [
            { inputs: { sw_0: 0, sw_1: 0 }, expected: 1 },
            { inputs: { sw_0: 0, sw_1: 1 }, expected: 0 },
            { inputs: { sw_0: 1, sw_1: 0 }, expected: 0 },
            { inputs: { sw_0: 1, sw_1: 1 }, expected: 0 }
          ]
        }
      },
      {
        id: 'exp5_thm2',
        name: 'Part B: De-Morgan\'s Second Theorem: (A . B)\' = A\' + B\'',
        icId: '7400',
        socketId: 'zif16',
        description: 'Verify LHS using NAND gate (7400), comparing output against RHS truth table values.',
        connections: [
          { from: 'z16_p14', to: 'pwr_p5_1', color: '#ff2222', label: 'Pin 14 (VCC) -> +5V' },
          { from: 'z16_p7',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 7 (GND) -> GND' },
          { from: 'z16_p1',  to: 'inp_0',     color: '#2277ff', label: 'Input A -> Pin 1 (1A)' },
          { from: 'z16_p2',  to: 'inp_1',     color: '#22cc88', label: 'Input B -> Pin 2 (1B)' },
          { from: 'z16_p3',  to: 'ind_0',     color: '#ffaa00', label: 'Pin 3 (1Y) -> Indicator L0 (LHS: (A.B)\')' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 7400 (NAND Gate for LHS).' },
          { step: 2, action: 'Connect Power', details: 'Pin 14 to +5V, Pin 7 to GND.' },
          { step: 3, action: 'Connect Inputs', details: 'Pin 1 to S0 (A) and Pin 2 to S1 (B).' },
          { step: 4, action: 'Connect Output', details: 'Pin 3 to Indicator L0.' },
          { step: 5, action: 'Verify Theorem 2', details: 'Verify (A.B)\' equals A\' + B\' for all 4 states.' }
        ],
        truthTable: {
          headers: ['Input A (S0)', 'Input B (S1)', 'LHS: (A.B)\'', 'RHS: A\'+B\'', 'Match Status'],
          rows: [
            { inputs: { sw_0: 0, sw_1: 0 }, expected: 1 },
            { inputs: { sw_0: 0, sw_1: 1 }, expected: 1 },
            { inputs: { sw_0: 1, sw_1: 0 }, expected: 1 },
            { inputs: { sw_0: 1, sw_1: 1 }, expected: 0 }
          ]
        }
      }
    ]
  },

  // ==========================================
  // EXPERIMENT 6: Implement Adder Circuits
  // ==========================================
  {
    id: 'exp6',
    number: 6,
    title: 'Implement 2-Input & 3-Input Adder Circuits (Half & Full Adder)',
    aim: 'To design and implement Half Adder (Sum = A ^ B, Carry = A . B) and Full Adder (Sum = A ^ B ^ Cin, Carry = AB + BC + AC) circuits.',
    parts: [
      {
        id: 'exp6_half',
        name: 'Part A: Half Adder (2-Input Adder)',
        icId: '7486',
        socketId: 'zif16',
        description: 'Half Adder implementation using XOR gate (7486) for Sum and AND gate (7408) for Carry.',
        connections: [
          { from: 'z16_p14', to: 'pwr_p5_1', color: '#ff2222', label: 'Pin 14 (VCC) -> +5V' },
          { from: 'z16_p7',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 7 (GND) -> GND' },
          { from: 'z16_p1',  to: 'inp_0',     color: '#2277ff', label: 'Input A -> Pin 1 (1A)' },
          { from: 'z16_p2',  to: 'inp_1',     color: '#22cc88', label: 'Input B -> Pin 2 (1B)' },
          { from: 'z16_p3',  to: 'ind_0',     color: '#ffaa00', label: 'Pin 3 (1Y) -> Indicator L0 (SUM)' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 7486 (Quad XOR Gate).' },
          { step: 2, action: 'Connect Power', details: 'Pin 14 to +5V, Pin 7 to GND.' },
          { step: 3, action: 'Connect Inputs', details: 'Connect Pin 1 to S0 (A) and Pin 2 to S1 (B).' },
          { step: 4, action: 'Connect Sum Output', details: 'Connect Pin 3 (1Y) to Indicator L0 (Sum = A ^ B).' },
          { step: 5, action: 'Verify Half Adder', details: 'Verify Sum and Carry outputs across all 4 combinations.' }
        ],
        truthTable: {
          headers: ['Input A (S0)', 'Input B (S1)', 'Sum (L0)', 'Carry (L1)', 'Status'],
          rows: [
            { inputs: { sw_0: 0, sw_1: 0 }, expected: 0, carry: 0 },
            { inputs: { sw_0: 0, sw_1: 1 }, expected: 1, carry: 0 },
            { inputs: { sw_0: 1, sw_1: 0 }, expected: 1, carry: 0 },
            { inputs: { sw_0: 1, sw_1: 1 }, expected: 0, carry: 1 }
          ]
        }
      },
      {
        id: 'exp6_full',
        name: 'Part B: Full Adder (3-Input Adder)',
        icId: '7486',
        socketId: 'zif16',
        description: 'Full Adder evaluates 3 binary inputs (A, B, Cin) to produce Sum and Carry out.',
        connections: [
          { from: 'z16_p14', to: 'pwr_p5_1', color: '#ff2222', label: 'Pin 14 (VCC) -> +5V' },
          { from: 'z16_p7',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 7 (GND) -> GND' },
          { from: 'z16_p1',  to: 'inp_0',     color: '#2277ff', label: 'Input A -> Pin 1 (1A)' },
          { from: 'z16_p2',  to: 'inp_1',     color: '#22cc88', label: 'Input B -> Pin 2 (1B)' },
          { from: 'z16_p3',  to: 'z16_p4',    color: '#aa44cc', label: 'Pin 3 (1Y) -> Pin 4 (2A)' },
          { from: 'z16_p5',  to: 'inp_2',     color: '#ffbb00', label: 'Input Cin -> Pin 5 (2B, S2)' },
          { from: 'z16_p6',  to: 'ind_0',     color: '#ffaa00', label: 'Pin 6 (2Y) -> Indicator L0 (SUM)' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 7486 (Quad XOR).' },
          { step: 2, action: 'Connect Power', details: 'Pin 14 to +5V, Pin 7 to GND.' },
          { step: 3, action: 'First XOR Gate', details: 'Inputs A (S0) and B (S1) to Pins 1 & 2.' },
          { step: 4, action: 'Second XOR Gate', details: 'Pin 3 to Pin 4, Cin (S2) to Pin 5.' },
          { step: 5, action: 'Connect Sum Output', details: 'Pin 6 (2Y) to Indicator L0 (Sum = A ^ B ^ Cin).' },
          { step: 6, action: 'Verify Full Adder', details: 'Test all 8 input combinations.' }
        ],
        truthTable: {
          headers: ['A (S0)', 'B (S1)', 'Cin (S2)', 'Sum (L0)', 'Carry (L1)', 'Status'],
          rows: [
            { inputs: { sw_0: 0, sw_1: 0, sw_2: 0 }, expected: 0, carry: 0 },
            { inputs: { sw_0: 0, sw_1: 0, sw_2: 1 }, expected: 1, carry: 0 },
            { inputs: { sw_0: 0, sw_1: 1, sw_2: 0 }, expected: 1, carry: 0 },
            { inputs: { sw_0: 0, sw_1: 1, sw_2: 1 }, expected: 0, carry: 1 },
            { inputs: { sw_0: 1, sw_1: 0, sw_2: 0 }, expected: 1, carry: 0 },
            { inputs: { sw_0: 1, sw_1: 0, sw_2: 1 }, expected: 0, carry: 1 },
            { inputs: { sw_0: 1, sw_1: 1, sw_2: 0 }, expected: 0, carry: 1 },
            { inputs: { sw_0: 1, sw_1: 1, sw_2: 1 }, expected: 1, carry: 1 }
          ]
        }
      }
    ]
  },

  // ==========================================
  // EXPERIMENT 7: Implement Subtractor Circuits
  // ==========================================
  {
    id: 'exp7',
    number: 7,
    title: 'Implement 2-Input & 3-Input Subtractor Circuits (Half & Full Subtractor)',
    aim: 'To design and implement Half Subtractor (Diff = A ^ B, Borrow = A\' . B) and Full Subtractor circuits.',
    parts: [
      {
        id: 'exp7_half',
        name: 'Part A: Half Subtractor',
        icId: '7486',
        socketId: 'zif16',
        description: 'Half Subtractor evaluates Difference (A ^ B) and Borrow (A\' . B).',
        connections: [
          { from: 'z16_p14', to: 'pwr_p5_1', color: '#ff2222', label: 'Pin 14 (VCC) -> +5V' },
          { from: 'z16_p7',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 7 (GND) -> GND' },
          { from: 'z16_p1',  to: 'inp_0',     color: '#2277ff', label: 'Input A -> Pin 1 (1A)' },
          { from: 'z16_p2',  to: 'inp_1',     color: '#22cc88', label: 'Input B -> Pin 2 (1B)' },
          { from: 'z16_p3',  to: 'ind_0',     color: '#ffaa00', label: 'Pin 3 (1Y) -> Indicator L0 (Difference)' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 7486 (Quad XOR).' },
          { step: 2, action: 'Connect Power', details: 'Pin 14 to +5V, Pin 7 to GND.' },
          { step: 3, action: 'Connect Inputs', details: 'Pin 1 to S0 (A) and Pin 2 to S1 (B).' },
          { step: 4, action: 'Connect Difference', details: 'Pin 3 (1Y) to Indicator L0.' },
          { step: 5, action: 'Verify Half Subtractor', details: 'Test all 4 input combinations.' }
        ],
        truthTable: {
          headers: ['Input A (S0)', 'Input B (S1)', 'Diff (L0)', 'Borrow (L1)', 'Status'],
          rows: [
            { inputs: { sw_0: 0, sw_1: 0 }, expected: 0, borrow: 0 },
            { inputs: { sw_0: 0, sw_1: 1 }, expected: 1, borrow: 1 },
            { inputs: { sw_0: 1, sw_1: 0 }, expected: 1, borrow: 0 },
            { inputs: { sw_0: 1, sw_1: 1 }, expected: 0, borrow: 0 }
          ]
        }
      },
      {
        id: 'exp7_full',
        name: 'Part B: Full Subtractor (3-Input Subtractor)',
        icId: '7486',
        socketId: 'zif16',
        description: 'Full Subtractor computes Difference = A ^ B ^ Bin and Borrow = A\'B + A\'Bin + BBin.',
        connections: [
          { from: 'z16_p14', to: 'pwr_p5_1', color: '#ff2222', label: 'Pin 14 (VCC) -> +5V' },
          { from: 'z16_p7',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 7 (GND) -> GND' },
          { from: 'z16_p1',  to: 'inp_0',     color: '#2277ff', label: 'Input A -> Pin 1 (1A)' },
          { from: 'z16_p2',  to: 'inp_1',     color: '#22cc88', label: 'Input B -> Pin 2 (1B)' },
          { from: 'z16_p3',  to: 'z16_p4',    color: '#aa44cc', label: 'Pin 3 (1Y) -> Pin 4 (2A)' },
          { from: 'z16_p5',  to: 'inp_2',     color: '#ffbb00', label: 'Input Bin -> Pin 5 (2B, S2)' },
          { from: 'z16_p6',  to: 'ind_0',     color: '#ffaa00', label: 'Pin 6 (2Y) -> Indicator L0 (Difference)' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 7486.' },
          { step: 2, action: 'Connect Power', details: 'Pin 14 to +5V, Pin 7 to GND.' },
          { step: 3, action: 'First Difference XOR', details: 'A (S0) and B (S1) to Pins 1 & 2.' },
          { step: 4, action: 'Second Difference XOR', details: 'Pin 3 to Pin 4, Bin (S2) to Pin 5.' },
          { step: 5, action: 'Connect Output', details: 'Pin 6 to Indicator L0.' },
          { step: 6, action: 'Verify Full Subtractor', details: 'Verify all 8 combinations.' }
        ],
        truthTable: {
          headers: ['A (S0)', 'B (S1)', 'Bin (S2)', 'Diff (L0)', 'Borrow (L1)', 'Status'],
          rows: [
            { inputs: { sw_0: 0, sw_1: 0, sw_2: 0 }, expected: 0, borrow: 0 },
            { inputs: { sw_0: 0, sw_1: 0, sw_2: 1 }, expected: 1, borrow: 1 },
            { inputs: { sw_0: 0, sw_1: 1, sw_2: 0 }, expected: 1, borrow: 1 },
            { inputs: { sw_0: 0, sw_1: 1, sw_2: 1 }, expected: 0, borrow: 1 },
            { inputs: { sw_0: 1, sw_1: 0, sw_2: 0 }, expected: 1, borrow: 0 },
            { inputs: { sw_0: 1, sw_1: 0, sw_2: 1 }, expected: 0, borrow: 0 },
            { inputs: { sw_0: 1, sw_1: 1, sw_2: 0 }, expected: 0, borrow: 0 },
            { inputs: { sw_0: 1, sw_1: 1, sw_2: 1 }, expected: 1, borrow: 1 }
          ]
        }
      }
    ]
  },

  // ==========================================
  // EXPERIMENT 8: BCD to 7-Segment Decoder
  // ==========================================
  {
    id: 'exp8',
    number: 8,
    title: 'BCD to 7-Segment Decoder (IC 7447)',
    aim: 'To test the output of BCD to 7-Segment Decoder using IC 7447 and observe decimal digits 0 to 9 on common anode display.',
    parts: [
      {
        id: 'exp8_main',
        name: 'IC 7447 BCD Decoder with 7-Segment Display',
        icId: '7447',
        socketId: 'zif16',
        description: 'Decodes 4-bit binary inputs D, C, B, A into 7-segment lines a, b, c, d, e, f, g driving DSP-1.',
        connections: [
          { from: 'z16_p16', to: 'pwr_p5_1',  color: '#ff2222', label: 'Pin 16 (VCC) -> +5V' },
          { from: 'z16_p8',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 8 (GND) -> GND' },
          { from: 'z16_p3',  to: 'pwr_p5_1',  color: '#ff2222', label: 'Pin 3 (LT\') -> +5V (Lamp Test Disabled)' },
          { from: 'z16_p4',  to: 'pwr_p5_1',  color: '#ff2222', label: 'Pin 4 (BI/RBO\') -> +5V' },
          { from: 'z16_p5',  to: 'pwr_p5_1',  color: '#ff2222', label: 'Pin 5 (RBI\') -> +5V' },
          { from: 'z16_p7',  to: 'inp_0',     color: '#2277ff', label: 'Pin 7 (A, LSB) -> Switch S0' },
          { from: 'z16_p1',  to: 'inp_1',     color: '#22cc88', label: 'Pin 1 (B) -> Switch S1' },
          { from: 'z16_p2',  to: 'inp_2',     color: '#ffbb00', label: 'Pin 2 (C) -> Switch S2' },
          { from: 'z16_p6',  to: 'inp_3',     color: '#aa44cc', label: 'Pin 6 (D, MSB) -> Switch S3' },
          { from: 'z16_p13', to: 'bcd_out_a', color: '#ff4444', label: 'Pin 13 (a) -> Segment a' },
          { from: 'z16_p12', to: 'bcd_out_b', color: '#ff4444', label: 'Pin 12 (b) -> Segment b' },
          { from: 'z16_p11', to: 'bcd_out_c', color: '#ff4444', label: 'Pin 11 (c) -> Segment c' },
          { from: 'z16_p10', to: 'bcd_out_d', color: '#ff4444', label: 'Pin 10 (d) -> Segment d' },
          { from: 'z16_p9',  to: 'bcd_out_e', color: '#ff4444', label: 'Pin 9 (e) -> Segment e' },
          { from: 'z16_p15', to: 'bcd_out_f', color: '#ff4444', label: 'Pin 15 (f) -> Segment f' },
          { from: 'z16_p14', to: 'bcd_out_g', color: '#ff4444', label: 'Pin 14 (g) -> Segment g' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 7447 (BCD to 7-Segment Decoder).' },
          { step: 2, action: 'Place IC', details: 'Insert IC 7447 into 16-Pin Socket.' },
          { step: 3, action: 'Connect Power', details: 'Pin 16 to +5V and Pin 8 to GND.' },
          { step: 4, action: 'Set Control Pins', details: 'Connect Pins 3, 4, 5 (LT\', BI\', RBI\') to +5V.' },
          { step: 5, action: 'Connect BCD Inputs', details: 'Pin 7 to S0 (A), Pin 1 to S1 (B), Pin 2 to S2 (C), Pin 6 to S3 (D).' },
          { step: 6, action: 'Connect Segment Outputs', details: 'Pins 13, 12, 11, 10, 9, 15, 14 to Segments a..g on trainer display.' },
          { step: 7, action: 'Observe Display', details: 'Test BCD inputs 0000 to 1001 and observe digits 0 to 9.' }
        ],
        truthTable: {
          headers: ['D (S3)', 'C (S2)', 'B (S1)', 'A (S0)', 'Decimal Digit', 'DSP-1 Output', 'Status'],
          rows: [
            { inputs: { sw_3: 0, sw_2: 0, sw_1: 0, sw_0: 0 }, digit: 0 },
            { inputs: { sw_3: 0, sw_2: 0, sw_1: 0, sw_0: 1 }, digit: 1 },
            { inputs: { sw_3: 0, sw_2: 0, sw_1: 1, sw_0: 0 }, digit: 2 },
            { inputs: { sw_3: 0, sw_2: 0, sw_1: 1, sw_0: 1 }, digit: 3 },
            { inputs: { sw_3: 0, sw_2: 1, sw_1: 0, sw_0: 0 }, digit: 4 },
            { inputs: { sw_3: 0, sw_2: 1, sw_1: 0, sw_0: 1 }, digit: 5 },
            { inputs: { sw_3: 0, sw_2: 1, sw_1: 1, sw_0: 0 }, digit: 6 },
            { inputs: { sw_3: 0, sw_2: 1, sw_1: 1, sw_0: 1 }, digit: 7 },
            { inputs: { sw_3: 1, sw_2: 0, sw_1: 0, sw_0: 0 }, digit: 8 },
            { inputs: { sw_3: 1, sw_2: 0, sw_1: 0, sw_0: 1 }, digit: 9 }
          ]
        }
      }
    ]
  },

  // ==========================================
  // EXPERIMENT 9: 4-Bit Magnitude Comparator (IC 7485)
  // ==========================================
  {
    id: 'exp9',
    number: 9,
    title: 'Check Output of Comparator Circuit (IC 7485)',
    aim: 'To compare two 4-bit binary numbers A (A3..A0) and B (B3..B0) using IC 7485 and verify A < B, A = B, A > B outputs.',
    parts: [
      {
        id: 'exp9_main',
        name: 'IC 7485 4-Bit Magnitude Comparator',
        icId: '7485',
        socketId: 'zif16',
        description: 'Word A on switches S3..S0, Word B on switches S7..S4. Outputs on L0 (A<B), L1 (A=B), L2 (A>B).',
        connections: [
          { from: 'z16_p16', to: 'pwr_p5_1',  color: '#ff2222', label: 'Pin 16 (VCC) -> +5V' },
          { from: 'z16_p8',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 8 (GND) -> GND' },
          // Cascading inputs for single IC: IA=B = 1 (+5V), IA<B = 0 (GND), IA>B = 0 (GND)
          { from: 'z16_p3',  to: 'pwr_p5_1',  color: '#ff2222', label: 'Pin 3 (IA=B) -> +5V' },
          { from: 'z16_p2',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 2 (IA<B) -> GND' },
          { from: 'z16_p4',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 4 (IA>B) -> GND' },
          // Word A: A0 (p10), A1 (p12), A2 (p13), A3 (p15) -> S0..S3
          { from: 'z16_p10', to: 'inp_0',     color: '#2277ff', label: 'Pin 10 (A0) -> Switch S0' },
          { from: 'z16_p12', to: 'inp_1',     color: '#2277ff', label: 'Pin 12 (A1) -> Switch S1' },
          { from: 'z16_p13', to: 'inp_2',     color: '#2277ff', label: 'Pin 13 (A2) -> Switch S2' },
          { from: 'z16_p15', to: 'inp_3',     color: '#2277ff', label: 'Pin 15 (A3) -> Switch S3' },
          // Word B: B0 (p9), B1 (p11), B2 (p14), B3 (p1) -> S4..S7
          { from: 'z16_p9',  to: 'inp_4',     color: '#22cc88', label: 'Pin 9 (B0) -> Switch S4' },
          { from: 'z16_p11', to: 'inp_5',     color: '#22cc88', label: 'Pin 11 (B1) -> Switch S5' },
          { from: 'z16_p14', to: 'inp_6',     color: '#22cc88', label: 'Pin 14 (B2) -> Switch S6' },
          { from: 'z16_p1',  to: 'inp_7',     color: '#22cc88', label: 'Pin 1 (B3) -> Switch S7' },
          // Outputs: A<B (p7), A=B (p6), A>B (p5)
          { from: 'z16_p7',  to: 'ind_0',     color: '#ffaa00', label: 'Pin 7 (A<B) -> Indicator L0' },
          { from: 'z16_p6',  to: 'ind_1',     color: '#ffaa00', label: 'Pin 6 (A=B) -> Indicator L1' },
          { from: 'z16_p5',  to: 'ind_2',     color: '#ffaa00', label: 'Pin 5 (A>B) -> Indicator L2' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 7485 (4-Bit Magnitude Comparator).' },
          { step: 2, action: 'Connect Power', details: 'Pin 16 to +5V, Pin 8 to GND.' },
          { step: 3, action: 'Cascading Pins', details: 'Pin 3 (IA=B) to +5V, Pins 2 & 4 to GND.' },
          { step: 4, action: 'Connect Word A', details: 'Connect Pins 10, 12, 13, 15 to Switches S0..S3.' },
          { step: 5, action: 'Connect Word B', details: 'Connect Pins 9, 11, 14, 1 to Switches S4..S7.' },
          { step: 6, action: 'Connect Outputs', details: 'Pin 7 to L0 (A<B), Pin 6 to L1 (A=B), Pin 5 to L2 (A>B).' },
          { step: 7, action: 'Test Comparisons', details: 'Test conditions A < B, A = B, and A > B.' }
        ],
        truthTable: {
          headers: ['Word A (S3-S0)', 'Word B (S7-S4)', 'A < B (L0)', 'A = B (L1)', 'A > B (L2)', 'Status'],
          rows: [
            { inputs: { sw_0: 1, sw_1: 0, sw_2: 0, sw_3: 0, sw_4: 1, sw_5: 1, sw_6: 0, sw_7: 0 }, expLt: 1, expEq: 0, expGt: 0 }, // 1 < 3
            { inputs: { sw_0: 0, sw_1: 0, sw_2: 0, sw_3: 1, sw_4: 0, sw_5: 0, sw_6: 0, sw_7: 1 }, expLt: 0, expEq: 1, expGt: 0 }, // 8 == 8
            { inputs: { sw_0: 1, sw_1: 1, sw_2: 0, sw_3: 0, sw_4: 0, sw_5: 1, sw_6: 0, sw_7: 0 }, expLt: 0, expEq: 0, expGt: 1 }  // 3 > 2
          ]
        }
      }
    ]
  },

  // ==========================================
  // EXPERIMENT 10: 8:1 Multiplexer (IC 74151)
  // ==========================================
  {
    id: 'exp10',
    number: 10,
    title: 'Build and Test Functionality of 8:1 Multiplexer (IC 74151)',
    aim: 'To route selected data lines D0 to D7 to output Y using 3 select lines S2, S1, S0 and enable strobe G\'.',
    parts: [
      {
        id: 'exp10_main',
        name: 'IC 74151 8-to-1 Multiplexer',
        icId: '74151',
        socketId: 'zif16',
        description: 'Select inputs S0 (p11), S1 (p10), S2 (p9) connected to S0..S2. Strobe G\' (p7) connected to GND. True output Y (p5) to L0.',
        connections: [
          { from: 'z16_p16', to: 'pwr_p5_1',  color: '#ff2222', label: 'Pin 16 (VCC) -> +5V' },
          { from: 'z16_p8',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 8 (GND) -> GND' },
          { from: 'z16_p7',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 7 (G\') -> GND (Strobe Enabled)' },
          { from: 'z16_p11', to: 'inp_0',     color: '#2277ff', label: 'Pin 11 (S0) -> Switch S0' },
          { from: 'z16_p10', to: 'inp_1',     color: '#22cc88', label: 'Pin 10 (S1) -> Switch S1' },
          { from: 'z16_p9',  to: 'inp_2',     color: '#ffbb00', label: 'Pin 9 (S2) -> Switch S2' },
          // Data inputs D0..D3 to alternating patterns for testing
          { from: 'z16_p4',  to: 'inp_3',     color: '#aa44cc', label: 'Pin 4 (D0) -> Switch S3' },
          { from: 'z16_p3',  to: 'inp_4',     color: '#aa44cc', label: 'Pin 3 (D1) -> Switch S4' },
          { from: 'z16_p2',  to: 'inp_5',     color: '#aa44cc', label: 'Pin 2 (D2) -> Switch S5' },
          { from: 'z16_p1',  to: 'inp_6',     color: '#aa44cc', label: 'Pin 1 (D3) -> Switch S6' },
          { from: 'z16_p5',  to: 'ind_0',     color: '#ffaa00', label: 'Pin 5 (Y) -> Indicator L0' },
          { from: 'z16_p6',  to: 'ind_1',     color: '#ff8800', label: 'Pin 6 (W) -> Indicator L1 (Inverted)' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 74151 (8:1 Multiplexer).' },
          { step: 2, action: 'Connect Power', details: 'Pin 16 to +5V, Pin 8 to GND.' },
          { step: 3, action: 'Enable Strobe', details: 'Connect Pin 7 (G\') to GND.' },
          { step: 4, action: 'Connect Select Lines', details: 'Pins 11, 10, 9 (S0, S1, S2) to Switches S0, S1, S2.' },
          { step: 5, action: 'Connect Data Lines', details: 'Pins 4, 3, 2, 1 (D0-D3) to Switches S3-S6.' },
          { step: 6, action: 'Connect Outputs', details: 'Pin 5 (Y) to L0, Pin 6 (W) to L1.' },
          { step: 7, action: 'Verify Multiplexer', details: 'Observe that Y matches selected data input Dn.' }
        ],
        truthTable: {
          headers: ['Strobe G\'', 'S2', 'S1', 'S0', 'Selected Channel', 'Output Y (L0)', 'Status'],
          rows: [
            { inputs: { sw_0: 0, sw_1: 0, sw_2: 0, sw_3: 1 }, ch: 'D0', expected: 1 },
            { inputs: { sw_0: 1, sw_1: 0, sw_2: 0, sw_4: 1 }, ch: 'D1', expected: 1 },
            { inputs: { sw_0: 0, sw_1: 1, sw_2: 0, sw_5: 1 }, ch: 'D2', expected: 1 },
            { inputs: { sw_0: 1, sw_1: 1, sw_2: 0, sw_6: 1 }, ch: 'D3', expected: 1 }
          ]
        }
      }
    ]
  },

  // ==========================================
  // EXPERIMENT 11: 1:4 / 1:8 Demultiplexer (IC 74155)
  // ==========================================
  {
    id: 'exp11',
    number: 11,
    title: 'Build and Test Functionality of Demultiplexer (IC 74155)',
    aim: 'To verify the 1:4 demultiplexing / 2-to-4 decoding operation of IC 74155.',
    parts: [
      {
        id: 'exp11_main',
        name: 'IC 74155 1:4 Demultiplexer',
        icId: '74155',
        socketId: 'zif16',
        description: 'Routes data input 1C (Pin 1) to selected active-low output 1Y0..1Y3 using address lines A & B.',
        connections: [
          { from: 'z16_p16', to: 'pwr_p5_1',  color: '#ff2222', label: 'Pin 16 (VCC) -> +5V' },
          { from: 'z16_p8',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 8 (GND) -> GND' },
          { from: 'z16_p1',  to: 'pwr_p5_1',  color: '#ff2222', label: 'Pin 1 (1C, Data) -> +5V (Data = 1)' },
          { from: 'z16_p2',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 2 (1G\') -> GND (Strobe Enabled)' },
          { from: 'z16_p13', to: 'inp_0',     color: '#2277ff', label: 'Pin 13 (A, S0) -> Switch S0' },
          { from: 'z16_p3',  to: 'inp_1',     color: '#22cc88', label: 'Pin 3 (B, S1) -> Switch S1' },
          { from: 'z16_p7',  to: 'ind_0',     color: '#ffaa00', label: 'Pin 7 (1Y0) -> Indicator L0' },
          { from: 'z16_p6',  to: 'ind_1',     color: '#ffaa00', label: 'Pin 6 (1Y1) -> Indicator L1' },
          { from: 'z16_p5',  to: 'ind_2',     color: '#ffaa00', label: 'Pin 5 (1Y2) -> Indicator L2' },
          { from: 'z16_p4',  to: 'ind_3',     color: '#ffaa00', label: 'Pin 4 (1Y3) -> Indicator L3' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 74155 (Dual 2:4 / 1:4 Demux).' },
          { step: 2, action: 'Connect Power', details: 'Pin 16 to +5V, Pin 8 to GND.' },
          { step: 3, action: 'Data & Strobe', details: 'Pin 1 (1C) to +5V (Data=1), Pin 2 (1G\') to GND.' },
          { step: 4, action: 'Connect Select Lines', details: 'Pin 13 (A) to S0, Pin 3 (B) to S1.' },
          { step: 5, action: 'Connect Outputs', details: 'Pins 7, 6, 5, 4 (1Y0-1Y3) to Indicators L0-L3.' },
          { step: 6, action: 'Verify Demux', details: 'Observe active-low output routing (selected output goes Low).' }
        ],
        truthTable: {
          headers: ['Select B (S1)', 'Select A (S0)', '1Y0 (L0)', '1Y1 (L1)', '1Y2 (L2)', '1Y3 (L3)', 'Status'],
          rows: [
            { inputs: { sw_1: 0, sw_0: 0 }, y0: 0, y1: 1, y2: 1, y3: 1 },
            { inputs: { sw_1: 0, sw_0: 1 }, y0: 1, y1: 0, y2: 1, y3: 1 },
            { inputs: { sw_1: 1, sw_0: 0 }, y0: 1, y1: 1, y2: 0, y3: 1 },
            { inputs: { sw_1: 1, sw_0: 1 }, y0: 1, y1: 1, y2: 1, y3: 0 }
          ]
        }
      }
    ]
  },

  // ==========================================
  // EXPERIMENT 12: RS Flip-Flop (NAND Latch)
  // ==========================================
  {
    id: 'exp12',
    number: 12,
    title: 'Implement & Verify Truth Table of RS Flip-Flop (IC 7400)',
    aim: 'To construct a clocked RS Flip-Flop using 4 NAND gates of IC 7400 and verify Set, Reset, Memory, and Prohibited states.',
    parts: [
      {
        id: 'exp12_main',
        name: 'Clocked RS Flip-Flop using IC 7400',
        icId: '7400',
        socketId: 'zif16',
        description: 'Constructed using 4 NAND gates. Input S on S0, Input R on S1, Clock from Pulser T1. Outputs Q (L0) and Q\' (L1).',
        connections: [
          { from: 'z16_p14', to: 'pwr_p5_1',  color: '#ff2222', label: 'Pin 14 (VCC) -> +5V' },
          { from: 'z16_p7',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 7 (GND) -> GND' },
          // Gate 1: S (p1) & CLK (p2), out p3
          { from: 'z16_p1',  to: 'inp_0',     color: '#2277ff', label: 'Pin 1 (S) -> Switch S0' },
          { from: 'z16_p2',  to: 'pwr_p5_1',  color: '#ff2222', label: 'Pin 2 (CLK) -> +5V (Clock Enabled)' },
          // Gate 2: CLK (p4) & R (p5), out p6
          { from: 'z16_p4',  to: 'z16_p2',    color: '#ff2222', label: 'Pin 4 jumpered to Pin 2 (CLK)' },
          { from: 'z16_p5',  to: 'inp_1',     color: '#22cc88', label: 'Pin 5 (R) -> Switch S1' },
          // Cross-coupled latch: Gate 3 (pins 9,10 -> 8 Q) & Gate 4 (pins 12,13 -> 11 Q\')
          { from: 'z16_p3',  to: 'z16_p9',    color: '#aa44cc', label: 'Pin 3 (S\') -> Pin 9' },
          { from: 'z16_p6',  to: 'z16_p12',   color: '#aa44cc', label: 'Pin 6 (R\') -> Pin 12' },
          { from: 'z16_p8',  to: 'z16_p13',   color: '#ff8800', label: 'Pin 8 (Q) cross-coupled to Pin 13' },
          { from: 'z16_p11', to: 'z16_p10',   color: '#ff8800', label: 'Pin 11 (Q\') cross-coupled to Pin 10' },
          { from: 'z16_p8',  to: 'ind_0',     color: '#ffaa00', label: 'Pin 8 (Q) -> Indicator L0' },
          { from: 'z16_p11', to: 'ind_1',     color: '#ffaa00', label: 'Pin 11 (Q\') -> Indicator L1' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 7400 (Quad NAND).' },
          { step: 2, action: 'Connect Power', details: 'Pin 14 to +5V, Pin 7 to GND.' },
          { step: 3, action: 'Steering Gates', details: 'Inputs S (S0) and R (S1) to Pins 1 and 5; Clock to Pins 2 & 4.' },
          { step: 4, action: 'Cross-Coupled Latch', details: 'Cross-couple Gate 3 (Pins 8, 9, 10) and Gate 4 (Pins 11, 12, 13).' },
          { step: 5, action: 'Connect Outputs', details: 'Pin 8 (Q) to L0, Pin 11 (Q\') to L1.' },
          { step: 6, action: 'Verify States', details: 'Test Set (1,0), Reset (0,1), Hold (0,0), and Prohibited (1,1).' }
        ],
        truthTable: {
          headers: ['S (S0)', 'R (S1)', 'Q (L0)', 'Q\' (L1)', 'Operating State', 'Status'],
          rows: [
            { inputs: { sw_0: 0, sw_1: 0 }, q: 'Qn', q_bar: 'Qn\'', state: 'No Change (Memory)' },
            { inputs: { sw_0: 1, sw_1: 0 }, q: 1,    q_bar: 0,     state: 'Set State' },
            { inputs: { sw_0: 0, sw_1: 1 }, q: 0,    q_bar: 1,     state: 'Reset State' },
            { inputs: { sw_0: 1, sw_1: 1 }, q: 1,    q_bar: 1,     state: 'Prohibited / Invalid' }
          ]
        }
      }
    ]
  },

  // ==========================================
  // EXPERIMENT 13: Master-Slave JK Flip-Flop (IC 7476)
  // ==========================================
  {
    id: 'exp13',
    number: 13,
    title: 'Master-Slave JK Flip-Flop Functionality (IC 7476)',
    aim: 'To verify the truth table of Master-Slave JK Flip-Flop using IC 7476 including Hold, Reset, Set, and Toggle modes.',
    parts: [
      {
        id: 'exp13_main',
        name: 'IC 7476 Dual JK Flip-Flop with Preset & Clear',
        icId: '7476',
        socketId: 'zif16',
        description: 'Notice special power pins: Pin 5 is VCC (+5V), Pin 13 is GND! Input J on S0, K on S1, CLK from Pulser T1.',
        connections: [
          { from: 'z16_p5',  to: 'pwr_p5_1',  color: '#ff2222', label: 'Pin 5 (VCC) -> +5V' },
          { from: 'z16_p13', to: 'pwr_gnd_1', color: '#111111', label: 'Pin 13 (GND) -> GND' },
          { from: 'z16_p2',  to: 'pwr_p5_1',  color: '#ff2222', label: 'Pin 2 (PRE\') -> +5V (Inactive)' },
          { from: 'z16_p3',  to: 'pwr_p5_1',  color: '#ff2222', label: 'Pin 3 (CLR\') -> +5V (Inactive)' },
          { from: 'z16_p4',  to: 'inp_0',     color: '#2277ff', label: 'Pin 4 (1J) -> Switch S0' },
          { from: 'z16_p16', to: 'inp_1',     color: '#22cc88', label: 'Pin 16 (1K) -> Switch S1' },
          { from: 'z16_p1',  to: 'puls_t1',   color: '#aa44cc', label: 'Pin 1 (1CLK) -> Manual Pulser T1' },
          { from: 'z16_p15', to: 'ind_0',     color: '#ffaa00', label: 'Pin 15 (1Q) -> Indicator L0' },
          { from: 'z16_p14', to: 'ind_1',     color: '#ffaa00', label: 'Pin 14 (1Q\') -> Indicator L1' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 7476 (Dual JK Flip-Flop).' },
          { step: 2, action: 'Connect Special Power', details: 'Pin 5 to +5V, Pin 13 to GND.' },
          { step: 3, action: 'Disable Preset & Clear', details: 'Connect Pin 2 (PRE\') and Pin 3 (CLR\') to +5V.' },
          { step: 4, action: 'Connect J & K Inputs', details: 'Pin 4 (1J) to S0, Pin 16 (1K) to S1.' },
          { step: 5, action: 'Connect Clock', details: 'Pin 1 (1CLK) to Manual Pulser T1.' },
          { step: 6, action: 'Connect Outputs', details: 'Pin 15 (1Q) to L0, Pin 14 (1Q\') to L1.' },
          { step: 7, action: 'Test Modes', details: 'Test Hold (0,0), Reset (0,1), Set (1,0), and Toggle (1,1) on clock pulse.' }
        ],
        truthTable: {
          headers: ['J (S0)', 'K (S1)', 'Clock Pulse', 'Q (L0)', 'Q\' (L1)', 'Operation', 'Status'],
          rows: [
            { inputs: { sw_0: 0, sw_1: 0 }, clk: 'Pulse', q: 'Qn',   q_bar: 'Qn\'',  mode: 'No Change (Hold)' },
            { inputs: { sw_0: 0, sw_1: 1 }, clk: 'Pulse', q: 0,      q_bar: 1,      mode: 'Reset (Clear)' },
            { inputs: { sw_0: 1, sw_1: 0 }, clk: 'Pulse', q: 1,      q_bar: 0,      mode: 'Set' },
            { inputs: { sw_0: 1, sw_1: 1 }, clk: 'Pulse', q: 'Qn\'', q_bar: 'Qn',   mode: 'Toggle' }
          ]
        }
      }
    ]
  },

  // ==========================================
  // EXPERIMENT 14: D & T Flip-Flops
  // ==========================================
  {
    id: 'exp14',
    number: 14,
    title: 'Construct and Test D and T Flip-Flops',
    aim: 'To construct D Flip-Flop (Data) and T Flip-Flop (Toggle) from Master-Slave JK Flip-Flop (IC 7476).',
    parts: [
      {
        id: 'exp14_d',
        name: 'Part A: D Flip-Flop using IC 7476',
        icId: '7476',
        socketId: 'zif16',
        description: 'D input drives J directly and K inverted. Transfer data input D to Q upon clock pulse.',
        connections: [
          { from: 'z16_p5',  to: 'pwr_p5_1',  color: '#ff2222', label: 'Pin 5 (VCC) -> +5V' },
          { from: 'z16_p13', to: 'pwr_gnd_1', color: '#111111', label: 'Pin 13 (GND) -> GND' },
          { from: 'z16_p2',  to: 'pwr_p5_1',  color: '#ff2222', label: 'Pin 2 (PRE\') -> +5V' },
          { from: 'z16_p3',  to: 'pwr_p5_1',  color: '#ff2222', label: 'Pin 3 (CLR\') -> +5V' },
          { from: 'z16_p4',  to: 'inp_0',     color: '#2277ff', label: 'Pin 4 (1J, D) -> Switch S0' },
          { from: 'z16_p1',  to: 'puls_t1',   color: '#aa44cc', label: 'Pin 1 (1CLK) -> Manual Pulser T1' },
          { from: 'z16_p15', to: 'ind_0',     color: '#ffaa00', label: 'Pin 15 (1Q) -> Indicator L0' },
          { from: 'z16_p14', to: 'ind_1',     color: '#ffaa00', label: 'Pin 14 (1Q\') -> Indicator L1' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 7476.' },
          { step: 2, action: 'Connect Power', details: 'Pin 5 to +5V, Pin 13 to GND.' },
          { step: 3, action: 'Connect D Input', details: 'Connect Pin 4 (1J) to S0.' },
          { step: 4, action: 'Connect Clock', details: 'Connect Pin 1 to Manual Pulser T1.' },
          { step: 5, action: 'Connect Outputs', details: 'Pin 15 (1Q) to L0, Pin 14 (1Q\') to L1.' },
          { step: 6, action: 'Verify Data Transfer', details: 'Set D = 0 or 1, trigger clock pulse, verify Q = D.' }
        ],
        truthTable: {
          headers: ['D Input (S0)', 'Clock Pulse', 'Q (next)', 'Status'],
          rows: [
            { inputs: { sw_0: 0 }, clk: 'Pulse', expected: 0 },
            { inputs: { sw_0: 1 }, clk: 'Pulse', expected: 1 }
          ]
        }
      },
      {
        id: 'exp14_t',
        name: 'Part B: T Flip-Flop using IC 7476',
        icId: '7476',
        socketId: 'zif16',
        description: 'Tie J and K inputs together to form Toggle (T) Flip-Flop: toggles when T=1, holds when T=0.',
        connections: [
          { from: 'z16_p5',  to: 'pwr_p5_1',  color: '#ff2222', label: 'Pin 5 (VCC) -> +5V' },
          { from: 'z16_p13', to: 'pwr_gnd_1', color: '#111111', label: 'Pin 13 (GND) -> GND' },
          { from: 'z16_p2',  to: 'pwr_p5_1',  color: '#ff2222', label: 'Pin 2 (PRE\') -> +5V' },
          { from: 'z16_p3',  to: 'pwr_p5_1',  color: '#ff2222', label: 'Pin 3 (CLR\') -> +5V' },
          { from: 'z16_p4',  to: 'inp_0',     color: '#2277ff', label: 'Pin 4 (1J, T) -> Switch S0' },
          { from: 'z16_p4',  to: 'z16_p16',   color: '#2277ff', label: 'Pin 4 jumpered to Pin 16 (1K)' },
          { from: 'z16_p1',  to: 'puls_t1',   color: '#aa44cc', label: 'Pin 1 (1CLK) -> Manual Pulser T1' },
          { from: 'z16_p15', to: 'ind_0',     color: '#ffaa00', label: 'Pin 15 (1Q) -> Indicator L0' },
          { from: 'z16_p14', to: 'ind_1',     color: '#ffaa00', label: 'Pin 14 (1Q\') -> Indicator L1' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 7476.' },
          { step: 2, action: 'Connect Power', details: 'Pin 5 to +5V, Pin 13 to GND.' },
          { step: 3, action: 'Tie J & K to T', details: 'Connect Pin 4 to S0 and jumper Pin 4 to Pin 16.' },
          { step: 4, action: 'Connect Clock', details: 'Connect Pin 1 to Manual Pulser T1.' },
          { step: 5, action: 'Connect Outputs', details: 'Pin 15 to L0, Pin 14 to L1.' },
          { step: 6, action: 'Verify Toggle Mode', details: 'When T=1, state toggles on each pulse. When T=0, state holds.' }
        ],
        truthTable: {
          headers: ['T Input (S0)', 'Clock Pulse', 'Q (next)', 'Operation', 'Status'],
          rows: [
            { inputs: { sw_0: 0 }, clk: 'Pulse', expected: 'Qn',   mode: 'Hold (No change)' },
            { inputs: { sw_0: 1 }, clk: 'Pulse', expected: 'Qn\'', mode: 'Toggle' }
          ]
        }
      }
    ]
  },

  // ==========================================
  // EXPERIMENT 15: 4-Bit Binary Ripple Counter (IC 7493)
  // ==========================================
  {
    id: 'exp15',
    number: 15,
    title: '4-Bit Binary Ripple Counter (IC 7493)',
    aim: 'To construct and test a 4-bit asynchronous binary ripple counter counting 0000 to 1111 (0 to 15 in binary).',
    parts: [
      {
        id: 'exp15_main',
        name: 'IC 7493 4-Bit Binary Ripple Counter',
        icId: '7493',
        socketId: 'zif16',
        description: 'Pin 5 is VCC, Pin 10 is GND. Connect QA (Pin 12) to CLKB (Pin 1) to form 4-bit mod-16 counter.',
        connections: [
          { from: 'z16_p5',  to: 'pwr_p5_1',  color: '#ff2222', label: 'Pin 5 (VCC) -> +5V' },
          { from: 'z16_p10', to: 'pwr_gnd_1', color: '#111111', label: 'Pin 10 (GND) -> GND' },
          { from: 'z16_p2',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 2 (R0(1)) -> GND' },
          { from: 'z16_p3',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 3 (R0(2)) -> GND' },
          { from: 'z16_p14', to: 'puls_t1',   color: '#aa44cc', label: 'Pin 14 (CLKA) -> Manual Pulser T1' },
          { from: 'z16_p12', to: 'z16_p1',    color: '#22cc88', label: 'Pin 12 (QA) -> Pin 1 (CLKB)' },
          { from: 'z16_p12', to: 'ind_0',     color: '#ffaa00', label: 'Pin 12 (QA, LSB) -> Indicator L0' },
          { from: 'z16_p9',  to: 'ind_1',     color: '#ffaa00', label: 'Pin 9 (QB) -> Indicator L1' },
          { from: 'z16_p8',  to: 'ind_2',     color: '#ffaa00', label: 'Pin 8 (QC) -> Indicator L2' },
          { from: 'z16_p11', to: 'ind_3',     color: '#ffaa00', label: 'Pin 11 (QD, MSB) -> Indicator L3' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 7493 (4-Bit Binary Counter).' },
          { step: 2, action: 'Connect Power', details: 'Pin 5 to +5V, Pin 10 to GND.' },
          { step: 3, action: 'Ground Resets', details: 'Connect Pins 2 & 3 (R0(1), R0(2)) to GND.' },
          { step: 4, action: 'Cascade Sections', details: 'Connect Pin 12 (QA) to Pin 1 (CLKB).' },
          { step: 5, action: 'Connect Clock', details: 'Connect Pin 14 (CLKA) to Manual Pulser T1.' },
          { step: 6, action: 'Connect 4-Bit Outputs', details: 'Pins 12, 9, 8, 11 (QA-QD) to Indicators L0-L3.' },
          { step: 7, action: 'Observe Binary Count', details: 'Press Pulser button to count from 0 (0000) to 15 (1111).' }
        ],
        truthTable: {
          headers: ['Clock Pulse', 'QD (L3)', 'QC (L2)', 'QB (L1)', 'QA (L0)', 'Decimal Value', 'Status'],
          rows: [
            { pulse: 0, qd: 0, qc: 0, qb: 0, qa: 0, dec: 0 },
            { pulse: 1, qd: 0, qc: 0, qb: 0, qa: 1, dec: 1 },
            { pulse: 2, qd: 0, qc: 0, qb: 1, qa: 0, dec: 2 },
            { pulse: 3, qd: 0, qc: 0, qb: 1, qa: 1, dec: 3 },
            { pulse: 4, qd: 0, qc: 1, qb: 0, qa: 0, dec: 4 },
            { pulse: 5, qd: 0, qc: 1, qb: 0, qa: 1, dec: 5 },
            { pulse: 6, qd: 0, qc: 1, qb: 1, qa: 0, dec: 6 },
            { pulse: 7, qd: 0, qc: 1, qb: 1, qa: 1, dec: 7 },
            { pulse: 8, qd: 1, qc: 0, qb: 0, qa: 0, dec: 8 }
          ]
        }
      }
    ]
  },

  // ==========================================
  // EXPERIMENT 16: 4-Bit Shift Register (IC 7495)
  // ==========================================
  {
    id: 'exp16',
    number: 16,
    title: '4-Bit Shift Register (SISO / SIPO) (IC 7495)',
    aim: 'To verify Serial-In Serial-Out (SISO) and Serial-In Parallel-Out (SIPO) shift register operation using IC 7495.',
    parts: [
      {
        id: 'exp16_main',
        name: 'IC 7495 4-Bit Shift Register',
        icId: '7495',
        socketId: 'zif16',
        description: 'Serial data from S0, Shift Clock from Pulser T1, Mode = 0 (Shift Right). Outputs QA..QD on L0..L3.',
        connections: [
          { from: 'z16_p14', to: 'pwr_p5_1',  color: '#ff2222', label: 'Pin 14 (VCC) -> +5V' },
          { from: 'z16_p7',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 7 (GND) -> GND' },
          { from: 'z16_p6',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 6 (MODE) -> GND (Shift Right Mode)' },
          { from: 'z16_p1',  to: 'inp_0',     color: '#2277ff', label: 'Pin 1 (SER) -> Switch S0 (Data In)' },
          { from: 'z16_p9',  to: 'puls_t1',   color: '#aa44cc', label: 'Pin 9 (CLK1) -> Manual Pulser T1' },
          { from: 'z16_p13', to: 'ind_0',     color: '#ffaa00', label: 'Pin 13 (QA) -> Indicator L0' },
          { from: 'z16_p12', to: 'ind_1',     color: '#ffaa00', label: 'Pin 12 (QB) -> Indicator L1' },
          { from: 'z16_p11', to: 'ind_2',     color: '#ffaa00', label: 'Pin 11 (QC) -> Indicator L2' },
          { from: 'z16_p10', to: 'ind_3',     color: '#ffaa00', label: 'Pin 10 (QD) -> Indicator L3' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 7495 (4-Bit Shift Register).' },
          { step: 2, action: 'Connect Power', details: 'Pin 14 to +5V, Pin 7 to GND.' },
          { step: 3, action: 'Set Mode', details: 'Connect Pin 6 (MODE) to GND for shift-right operation.' },
          { step: 4, action: 'Connect Serial Input', details: 'Connect Pin 1 (SER) to Switch S0.' },
          { step: 5, action: 'Connect Shift Clock', details: 'Connect Pin 9 (CLK1) to Manual Pulser T1.' },
          { step: 6, action: 'Connect Outputs', details: 'Pins 13, 12, 11, 10 (QA-QD) to Indicators L0-L3.' },
          { step: 7, action: 'Shift Data', details: 'Set S0 = 1, clock 4 pulses, observe bits propagate across L0..L3.' }
        ],
        truthTable: {
          headers: ['Clock Pulse', 'Serial In (S0)', 'QA (L0)', 'QB (L1)', 'QC (L2)', 'QD (L3)', 'Status'],
          rows: [
            { pulse: 0, ser: 1, qa: 0, qb: 0, qc: 0, qd: 0 },
            { pulse: 1, ser: 1, qa: 1, qb: 0, qc: 0, qd: 0 },
            { pulse: 2, ser: 0, qa: 0, qb: 1, qc: 0, qd: 0 },
            { pulse: 3, ser: 1, qa: 1, qb: 0, qc: 1, qd: 0 },
            { pulse: 4, ser: 0, qa: 0, qb: 1, qc: 0, qd: 1 }
          ]
        }
      }
    ]
  },

  // ==========================================
  // EXPERIMENT 17: Decade Counter (IC 7490)
  // ==========================================
  {
    id: 'exp17',
    number: 17,
    title: 'Implement Decade Counter using Digital IC (IC 7490)',
    aim: 'To construct and test a BCD Decade Counter (MOD-10) using IC 7490 counting from 0000 to 1001 (0 to 9 decimal).',
    parts: [
      {
        id: 'exp17_main',
        name: 'IC 7490 BCD Decade Counter (MOD-10)',
        icId: '7490',
        socketId: 'zif16',
        description: 'Special power pins: Pin 5 is VCC (+5V), Pin 10 is GND! Connect QA (Pin 12) to CLKB (Pin 1) to enable Mod-10 count.',
        connections: [
          { from: 'z16_p5',  to: 'pwr_p5_1',  color: '#ff2222', label: 'Pin 5 (VCC) -> +5V' },
          { from: 'z16_p10', to: 'pwr_gnd_1', color: '#111111', label: 'Pin 10 (GND) -> GND' },
          { from: 'z16_p2',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 2 (R0(1)) -> GND' },
          { from: 'z16_p3',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 3 (R0(2)) -> GND' },
          { from: 'z16_p6',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 6 (R9(1)) -> GND' },
          { from: 'z16_p7',  to: 'pwr_gnd_1', color: '#111111', label: 'Pin 7 (R9(2)) -> GND' },
          { from: 'z16_p14', to: 'puls_t1',   color: '#aa44cc', label: 'Pin 14 (CLKA) -> Manual Pulser T1' },
          { from: 'z16_p12', to: 'z16_p1',    color: '#22cc88', label: 'Pin 12 (QA) -> Pin 1 (CLKB)' },
          { from: 'z16_p12', to: 'ind_0',     color: '#ffaa00', label: 'Pin 12 (QA, LSB) -> Indicator L0' },
          { from: 'z16_p9',  to: 'ind_1',     color: '#ffaa00', label: 'Pin 9 (QB) -> Indicator L1' },
          { from: 'z16_p8',  to: 'ind_2',     color: '#ffaa00', label: 'Pin 8 (QC) -> Indicator L2' },
          { from: 'z16_p11', to: 'ind_3',     color: '#ffaa00', label: 'Pin 11 (QD, MSB) -> Indicator L3' }
        ],
        steps: [
          { step: 1, action: 'Select IC', details: 'Select IC 7490 (Decade Counter).' },
          { step: 2, action: 'Connect Special Power', details: 'Pin 5 to +5V, Pin 10 to GND.' },
          { step: 3, action: 'Ground Reset Pins', details: 'Connect Pins 2, 3, 6, 7 (R0 & R9 resets) to GND.' },
          { step: 4, action: 'Cascade Mod-2 and Mod-5', details: 'Connect Pin 12 (QA) to Pin 1 (CLKB).' },
          { step: 5, action: 'Connect Clock Input', details: 'Connect Pin 14 (CLKA) to Manual Pulser T1 (or Fixed Clock 1Hz).' },
          { step: 6, action: 'Connect 4-Bit Outputs', details: 'Pins 12, 9, 8, 11 (QA-QD) to Indicators L0-L3.' },
          { step: 7, action: 'Observe Decade Count', details: 'Press Pulser to observe 0 to 9 in BCD, then reset to 0 on 10th pulse.' }
        ],
        truthTable: {
          headers: ['Clock Pulses', 'QD (L3)', 'QC (L2)', 'QB (L1)', 'QA (L0)', 'Decimal Equivalent', 'Status'],
          rows: [
            { pulse: 0,  qd: 0, qc: 0, qb: 0, qa: 0, dec: 0 },
            { pulse: 1,  qd: 0, qc: 0, qb: 0, qa: 1, dec: 1 },
            { pulse: 2,  qd: 0, qc: 0, qb: 1, qa: 0, dec: 2 },
            { pulse: 3,  qd: 0, qc: 0, qb: 1, qa: 1, dec: 3 },
            { pulse: 4,  qd: 0, qc: 1, qb: 0, qa: 0, dec: 4 },
            { pulse: 5,  qd: 0, qc: 1, qb: 0, qa: 1, dec: 5 },
            { pulse: 6,  qd: 0, qc: 1, qb: 1, qa: 0, dec: 6 },
            { pulse: 7,  qd: 0, qc: 1, qb: 1, qa: 1, dec: 7 },
            { pulse: 8,  qd: 1, qc: 0, qb: 0, qa: 0, dec: 8 },
            { pulse: 9,  qd: 1, qc: 0, qb: 0, qa: 1, dec: 9 },
            { pulse: 10, qd: 0, qc: 0, qb: 0, qa: 0, dec: 0 }
          ]
        }
      }
    ]
  }
];

function getExperiment(id) {
  return EXPERIMENTS.find(e => e.id === id) || null;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EXPERIMENTS, getExperiment };
}
