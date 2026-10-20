# Digital Techniques Virtual Trainer Kit Simulator (DTA-09)

A comprehensive, high-fidelity digital electronics laboratory simulator built for polytechnic and engineering students studying **Digital Techniques (DTE / MSBTE)**. It faithfully reproduces the physical **DTA-09 Digital Trainer Kit** from direct overhead perspective with interactive wiring, real digital logic engine, all 17 syllabus experiments, and **exact hand-drawn circuit diagrams from the laboratory manual**.

---

## 🌟 Key Features

1. **Exact Reproduction of the Physical DTA-09 Trainer Kit**
   - Direct overhead top-down view matching the reference hardware.
   - **16 Logic Level Inputs ($S_0$ to $S_{15}$)** with toggle switches, status LEDs, and terminal sockets ($I_0$ to $I_{15}$).
   - **16 Logic Level Indicators ($L_0$ to $L_{15}$)** with red indicator LEDs and input sockets.
   - **Dual Zero-Insertion-Force (ZIF) sockets**: **16-Pin ZIF Socket** and **20-Pin ZIF Socket** with animated lever locking and authentic DIP IC packages (epoxy notch, pin 1 dot, silver leads, part labels).
   - **Fixed DC Power Supply** ($+12\text{V}$, $-12\text{V}$, $\text{GND}$, $+5\text{V}$).
   - **Fixed Clock Generators** ($1\text{Hz}$, $10\text{Hz}$, $100\text{Hz}$, $1\text{kHz}$, $10\text{kHz}$, $1\text{MHz}$, $\text{EXT}$).
   - **Manual Pulser button** with normal ($T_1$) and inverted ($T_2$) outputs and $L_{12}/L_{13}$ LEDs.
   - **BCD to 7-Segment display section** with $A, B, C, D$ inputs, DIP sockets, and 7-segment outputs ($a..g$) driving dual 7-segment LED displays ($\text{DSP-1}$ & $\text{DSP-2}$).

2. **Accurate Lab Manual Circuit Diagrams (Redrawn from Student's Manual)**
   - **Exp 1**: Exact 4-diagram sheet showing **IC 7408 (AND)**, **IC 7432 (OR)**, **IC 7486 (Ex-OR)**, and **IC 74266 (Ex-NOR) / 7404 (NOT)** drawn as horizontal DIP-14 IC packages with orientation notch, pins 1..14, $V_{\text{CC}}$ (Pin 14), $\text{GND}$ (Pin 7), and **all 4 internal logic gates** inside the chip.
   - **Exp 2**: Exact DIP-14 packages for **IC 7400 (NAND)** and **IC 7402 (NOR)** with internal gates and inverted pinout.
   - **Exp 3 to 17**: Redrawn schematics matching all 31 pages of the laboratory manual.
   - **Live Signal Propagation**: Input pins and output pins dynamically glow green (`#10b981`) and amber (`#f59e0b`) when logic levels change.
   - **Manual Page Scan Toggle (`[Manual Pg]`)**: View the original scanned handwritten lab manual page right inside the viewport.
   - **High-Resolution Zoom Modal**: Enlarge any circuit schematic with one click.

3. **Interactive Observation Table Rewind / Fast-Seek**
   - Click **ANY row** in the Truth Table / Observation Table to immediately rewind or fast-forward the trainer kit to that exact test condition.
   - The switches toggle automatically, the netlist evaluates, the corresponding LEDs light up, and the active step highlights.

4. **Stackable Banana Plug Patch Cord Wires**
   - Wires accurately seat into the center hole of the sockets with multi-layer terminal sleeve rings and banana plug pin depth.
   - Natural catenary sag / droop curves.
   - Multi-color palette (Red for $+5\text{V}$, Black for $\text{GND}$, Blue, Green, Yellow, Orange, Purple, White).

5. **Real-Time Client-Side Digital Logic Engine**
   - Netlist extractor and multi-pass propagation solver running 100% in the browser.
   - Zero backend server or database required.
   - Stateful flip-flops ($\text{JK}$, $\text{D}$, $\text{T}$, $\text{RS}$) and asynchronous/synchronous counters ($\text{MOD-10}$ decade, $\text{MOD-16}$ binary, 4-bit shift registers).

6. **All 17 Syllabus Experiments Implemented**
   - **Exp 1**: Functionality of Basic Logic Gates (7408, 7432, 7486, 7404, 74266).
   - **Exp 2**: Functionality of Universal Gates (7400 NAND, 7402 NOR).
   - **Exp 3**: Basic Gates using Universal Gates (NOT, AND, OR).
   - **Exp 4**: Exclusive Gates using Universal Gates (XOR & XNOR using 4 NAND/NOR).
   - **Exp 5**: De-Morgan's Theorems ($1^{\text{st}}$ and $2^{\text{nd}}$ Theorems).
   - **Exp 6**: 2-Input & 3-Input Adder Circuits (Half Adder & Full Adder).
   - **Exp 7**: 2-Input & 3-Input Subtractor Circuits (Half Subtractor & Full Subtractor).
   - **Exp 8**: BCD to 7-Segment Decoder (IC 7447 with Common Anode Display).
   - **Exp 9**: 4-Bit Magnitude Comparator (IC 7485).
   - **Exp 10**: 8-to-1 Multiplexer (IC 74151).
   - **Exp 11**: 1:4 / 1:8 Demultiplexer (IC 74155).
   - **Exp 12**: Clocked RS Flip-Flop using IC 7400.
   - **Exp 13**: Master-Slave JK Flip-Flop (IC 7476).
   - **Exp 14**: D and T Flip-Flops using Digital IC (7476).
   - **Exp 15**: 4-Bit Binary Ripple Counter (IC 7493).
   - **Exp 16**: 4-Bit Shift Register (SISO / SIPO using IC 7495).
   - **Exp 17**: Decade Counter using Digital IC (IC 7490 BCD Counter).

---

## 🚀 How to Publish on Vercel (Hobby Free Plan)

This project is a pure, zero-dependency static web application. It requires **no backend server**, **no database**, and **no build step**.

### Method A: Deploy via GitHub (Recommended)

1. **Create a GitHub Repository**:
   - Push this project folder to your GitHub account (e.g. `https://github.com/your-username/digital-techniques-trainer`).

2. **Import into Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
   - Click **"Add New..."** $\to$ **"Project"**.
   - Select your `digital-techniques-trainer` repository and click **"Import"**.

3. **Configure Project Settings in Vercel**:
   - **Framework Preset**: Select **`Other`** (or leave default).
   - **Root Directory**: `./` (leave default).
   - **Build Command**: Leave empty (or `npm run build`).
   - **Output Directory**: Leave empty (default `./`).
   - **Environment Variables**: None required.

4. **Click Deploy**:
   - Vercel will instantly deploy the simulator to a public URL (e.g., `https://digital-techniques-trainer.vercel.app`).
   - You can share this single link with your classmates and teachers—they can use it on PC, Mac, tablet, or phone without installing anything!

---

### Method B: Deploy using Vercel CLI (Direct Terminal)

If you have Node.js installed on your computer:

```bash
# 1. Install Vercel CLI globally (one-time)
npm install -g vercel

# 2. Navigate to this project folder
cd digital-trainer-simulator

# 3. Deploy to production
vercel --prod
```

Follow the quick prompts in your terminal:
- *Set up and deploy?* **`y`**
- *Which scope?* **(Select your Vercel account)**
- *Link to existing project?* **`n`**
- *What's your project's name?* **`dte-simulator`**
- *In which directory is your code located?* **`./`**

Within 15 seconds, Vercel will output your live public URL!

---

## 💻 Local Running & Development

### Option 1: Built-in Lightweight Local Server
```bash
# Start local server
node server.js
```
Then open your browser at:
`http://localhost:3000`

### Option 2: Open Directly in Browser
Double-click `index.html` or drag it into any modern web browser (Edge, Chrome, Firefox, Safari).

### Syntax & Integrity Validation
```bash
# Validate syntax of all 11 JS engine modules
node check-syntax.js
```

---

## 📁 Project Directory Structure

```text
digital-trainer-simulator/
├── index.html               # Main simulator application & responsive layout
├── package.json             # NPM project descriptor & test/build scripts
├── vercel.json              # Vercel deployment configuration & asset caching
├── .vercelignore            # Excludes dev scratch files from production upload
├── .gitignore               # Git version control ignore rules
├── server.js                # Zero-dependency local Node.js HTTP server
├── README.md                # Project documentation & deployment guide
├── assets/
│   ├── trainer-kit-board.jpg # Photorealistic 1024x768 DTA-09 board texture
│   └── pdf_images/          # All 31 scanned lab manual reference pages
├── css/
│   ├── style.css            # Global theme variables, reset & typography
│   ├── board.css            # DTA-09 hardware layout, sockets, LEDs & switches
│   └── components.css       # Circuit diagrams, procedure table, modals & tools
└── js/
    ├── app.js               # Application coordinator & state controller
    ├── board-coords.js      # Precision millimeter terminal coordinates
    ├── board-view.js        # Zoom/pan viewport, SVG layer & interaction
    ├── circuit-diagrams.js  # Manual-redrawn DIP IC package schematics
    ├── experiments-data.js  # Complete syllabus for all 17 practicals
    ├── ic-library.js        # Digital IC database (pinouts, families, ratings)
    ├── logic-engine.js      # Real-time multi-pass digital propagation solver
    ├── playback-controller.js # Automated demonstration & 6-speed playback
    ├── procedure-table.js   # Step-by-step procedure & target halo lighting
    ├── results-panel.js     # Truth table verification & row rewind/fast-seek
    └── wiring-system.js     # Stackable banana plug patch cords & catenary wires
```

---

## 📜 Syllabus & Educational Standards
- **Course**: Digital Techniques (MSBTE Syllabus)
- **Laboratory Reference**: Vidyalankar Polytechnic Lab Manual
- **Target Hardware**: Scientech DTA-09 Digital Logic Trainer Kit
- **License**: MIT
