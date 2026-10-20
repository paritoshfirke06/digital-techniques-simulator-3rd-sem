/**
 * DIGITAL TECHNIQUES VIRTUAL TRAINER KIT SIMULATOR
 * Circuit Diagram & Manual Schematic Renderer
 * 
 * Accurately redraws the circuit diagrams directly from the student's
 * physical laboratory manual (Vidyalankar Polytechnic / MSBTE syllabus).
 * 
 * Features:
 * - Exp 1: Exact 4-diagram sheet (7408 AND, 7432 OR, 7486 Ex-OR, 74266 Ex-NOR/7404 NOT)
 *          drawn as DIP-14 IC packages with notch, pins 1..14, VCC (14), GND (7),
 *          and all 4 internal gates drawn inside!
 * - Exp 2: Exact DIP-14 drawings of 7400 NAND and 7402 NOR with all internal gates.
 * - Exp 3 to 17: Redrawn schematics matching the manual pages (Universal gates,
 *                De-Morgan theorems, Adders, Subtractors, 7447 BCD display,
 *                7485 Comparator, 74151 MUX, 74155 DEMUX, 7400 Latch,
 *                7476 JK/D/T Flip-Flops, 7490 Decade Counter).
 * - Live signal propagation: Input switches SW0/SW1 and outputs glow live!
 * - Multi-view support: 'schematic' (Single IC with live signals),
 *                       'sheet' (All manual diagrams for that exp),
 *                       'pinout' (Top-down package),
 *                       'manual_scan' (Actual handwritten manual page).
 */

class CircuitDiagramRenderer {
  constructor(containerEl) {
    this.container = containerEl;
    this.currentPart = null;
    this.currentExp = null;
    this.viewMode = 'schematic'; // 'schematic' | 'sheet' | 'pinout' | 'manual_scan'
    this.isCollapsed = false;
    this.cachedStates = { inputs: {}, outputs: {} };

    // Manual page mapping for all 17 experiments
    this.manualPageMap = {
      exp1: 1,
      exp2: 3,
      exp3: 5,
      exp4: 8,
      exp5: 10,
      exp6: 12,
      exp7: 14,
      exp8: 16,
      exp9: 18,
      exp10: 20,
      exp11: 22,
      exp12: 24,
      exp13: 26,
      exp14: 28,
      exp15: 29,
      exp16: 29,
      exp17: 30
    };
  }

  setExperiment(exp, part) {
    const isNewExp = !this.currentExp || this.currentExp.id !== exp?.id;
    this.currentExp = exp;
    this.currentPart = part;
    if (isNewExp && this.viewMode === 'sheet' && exp?.id !== 'exp1' && exp?.id !== 'exp2') {
      this.viewMode = 'schematic';
    }
    this.updateHeaderControls();
    this.render();
  }

  updateLiveStates(inputs = {}, outputs = {}) {
    this.cachedStates.inputs = { ...this.cachedStates.inputs, ...inputs };
    this.cachedStates.outputs = { ...this.cachedStates.outputs, ...outputs };
    if (!this.isCollapsed && this.viewMode !== 'manual_scan') {
      this.render();
    }
  }

  setViewMode(mode) {
    this.viewMode = mode;
    this.updateHeaderControls();
    this.render();
  }

  toggleViewMode() {
    if (this.viewMode === 'schematic') {
      this.viewMode = 'pinout';
    } else {
      this.viewMode = 'schematic';
    }
    this.updateHeaderControls();
    this.render();
  }

  toggleSheetMode() {
    this.viewMode = this.viewMode === 'sheet' ? 'schematic' : 'sheet';
    this.updateHeaderControls();
    this.render();
  }

  toggleManualScan() {
    this.viewMode = this.viewMode === 'manual_scan' ? 'schematic' : 'manual_scan';
    this.updateHeaderControls();
    this.render();
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    const card = document.getElementById('front-circuit-card');
    const btnIcon = document.querySelector('#btn-collapse-circuit-card i');
    if (card) {
      card.classList.toggle('circuit-card-collapsed', this.isCollapsed);
    }
    if (btnIcon) {
      btnIcon.className = this.isCollapsed ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-up';
    }
  }

  updateHeaderControls() {
    const expId = this.currentExp?.id || 'exp1';
    const isExp1 = expId === 'exp1';
    const isExp2 = expId === 'exp2';

    // Update IC Pill badge in card header
    const badgeEl = document.getElementById('circuit-ic-badge');
    if (badgeEl) {
      if (this.viewMode === 'sheet') {
        badgeEl.textContent = isExp1 ? 'All 4 Manual Diagrams' : 'All Universal Gates';
      } else if (this.viewMode === 'manual_scan') {
        badgeEl.textContent = `Manual Page ${this.manualPageMap[expId] || 1}`;
      } else {
        const icId = this.currentPart?.icId || 'IC';
        badgeEl.textContent = `IC ${icId}`;
      }
    }

    // Ensure specialized toggle buttons exist in the header
    const actionsGroup = document.querySelector('.circuit-actions-group');
    if (actionsGroup) {
      // 1. Sheet button (for Exp 1 and Exp 2)
      let sheetBtn = document.getElementById('btn-toggle-diagram-sheet');
      if (isExp1 || isExp2) {
        if (!sheetBtn) {
          sheetBtn = document.createElement('button');
          sheetBtn.id = 'btn-toggle-diagram-sheet';
          sheetBtn.className = 'circuit-action-btn';
          sheetBtn.title = isExp1 ? 'View all 4 diagrams from Page 1 of Lab Manual' : 'View both 7400 & 7402 from Page 3';
          actionsGroup.insertBefore(sheetBtn, actionsGroup.firstChild);
          sheetBtn.addEventListener('click', () => this.toggleSheetMode());
        }
        sheetBtn.style.display = 'inline-flex';
        sheetBtn.innerHTML = this.viewMode === 'sheet'
          ? `<i class="fa-solid fa-microchip"></i> <span>Single IC</span>`
          : `<i class="fa-solid fa-table-cells"></i> <span>${isExp1 ? '4 Diagrams' : 'Both Gates'}</span>`;
        if (this.viewMode === 'sheet') {
          sheetBtn.classList.add('active-btn-highlight');
        } else {
          sheetBtn.classList.remove('active-btn-highlight');
        }
      } else if (sheetBtn) {
        sheetBtn.style.display = 'none';
      }

      // 2. Manual Scan Button
      let manualScanBtn = document.getElementById('btn-view-manual-page');
      if (!manualScanBtn) {
        manualScanBtn = document.createElement('button');
        manualScanBtn.id = 'btn-view-manual-page';
        manualScanBtn.className = 'circuit-action-btn';
        manualScanBtn.title = 'View original scanned Lab Manual page';
        const zoomBtn = document.getElementById('btn-zoom-diagram');
        actionsGroup.insertBefore(manualScanBtn, zoomBtn);
        manualScanBtn.addEventListener('click', () => this.toggleManualScan());
      }
      manualScanBtn.innerHTML = this.viewMode === 'manual_scan'
        ? `<i class="fa-solid fa-diagram-project"></i> <span>Schematic</span>`
        : `<i class="fa-solid fa-book-open"></i> <span>Manual Pg</span>`;
      if (this.viewMode === 'manual_scan') {
        manualScanBtn.classList.add('active-btn-highlight');
      } else {
        manualScanBtn.classList.remove('active-btn-highlight');
      }
    }

    // Update standard mode button text
    const modeBtnText = document.getElementById('diagram-mode-text');
    if (modeBtnText) {
      modeBtnText.textContent = this.viewMode === 'pinout' ? 'Schematic' : 'Pinout';
    }
    const modeBtnIcon = document.querySelector('#btn-toggle-diagram-mode i');
    if (modeBtnIcon) {
      modeBtnIcon.className = this.viewMode === 'pinout' ? 'fa-solid fa-diagram-project' : 'fa-solid fa-microchip';
    }
  }

  render() {
    if (!this.container || !this.currentPart) return;

    if (this.viewMode === 'manual_scan') {
      const pageNum = this.manualPageMap[this.currentExp?.id || 'exp1'] || 1;
      this.container.innerHTML = `
        <div class="manual-scan-viewport" style="width:100%; height:100%; overflow:auto; background:#18181b; display:flex; flex-direction:column; align-items:center; padding:8px;">
          <div style="font-size:11px; color:#38bdf8; margin-bottom:6px; font-weight:700;">
            <i class="fa-solid fa-book-bookmark"></i> Lab Manual Drawing (Page ${pageNum} of 31)
          </div>
          <img src="assets/pdf_images/page_${pageNum}.jpg" alt="Lab Manual Page ${pageNum}" style="max-width:100%; border-radius:4px; box-shadow:0 4px 12px rgba(0,0,0,0.6);" />
        </div>
      `;
      return;
    }

    if (this.viewMode === 'sheet') {
      if (this.currentExp?.id === 'exp1') {
        this.container.innerHTML = this.renderExp1AllFourDiagrams();
      } else if (this.currentExp?.id === 'exp2') {
        this.container.innerHTML = this.renderExp2BothUniversalGates();
      } else {
        this.container.innerHTML = this.renderSchematicDiagram(this.currentPart, this.currentExp);
      }
      return;
    }

    if (this.viewMode === 'pinout') {
      this.container.innerHTML = this.renderPinoutDiagram(this.currentPart);
    } else {
      this.container.innerHTML = this.renderSchematicDiagram(this.currentPart, this.currentExp);
    }
  }

  // ========================================================
  // 1. PINOUT DIAGRAM GENERATOR (Standard Vertical Package)
  // ========================================================
  renderPinoutDiagram(part) {
    const icId = part.icId;
    const icData = (typeof IC_LIBRARY !== 'undefined') ? IC_LIBRARY[icId] : null;
    const pinCount = icData ? icData.pinCount : (part.socketId === 'zif20' ? 20 : 14);

    const activePins = new Set();
    if (part.connections) {
      part.connections.forEach(conn => {
        const matchFrom = conn.from.match(/_p(\d+)/);
        const matchTo = conn.to.match(/_p(\d+)/);
        if (matchFrom) activePins.add(parseInt(matchFrom[1], 10));
        if (matchTo) activePins.add(parseInt(matchTo[1], 10));
      });
    }

    const half = pinCount / 2;
    const width = 440;
    const height = 190;
    const chipW = 160;
    const chipH = 150;
    const chipX = (width - chipW) / 2;
    const chipY = 20;

    let pinsSvg = '';
    const spacing = (chipH - 24) / (half - 1);

    // Left side: Pins 1 to half
    for (let i = 1; i <= half; i++) {
      const py = chipY + 12 + (i - 1) * spacing;
      const isActive = activePins.has(i);
      const pinObj = icData?.pins?.find(p => p.pin === i);
      const pinName = pinObj ? pinObj.name : `P${i}`;

      pinsSvg += `
        <rect x="${chipX - 16}" y="${py - 4}" width="16" height="8" rx="2" fill="${isActive ? '#34d399' : '#64748b'}" />
        <circle cx="${chipX - 22}" cy="${py}" r="7" fill="${isActive ? '#10b981' : '#334155'}" stroke="#1e293b" stroke-width="1.5" />
        <text x="${chipX - 22}" y="${py + 3}" text-anchor="middle" font-size="8" font-weight="700" fill="#fff">${i}</text>
        <text x="${chipX + 8}" y="${py + 3.5}" text-anchor="start" font-size="9" font-weight="600" fill="${isActive ? '#38bdf8' : '#94a3b8'}">${pinName}</text>
      `;
    }

    // Right side: Pins pinCount down to half + 1
    for (let i = 1; i <= half; i++) {
      const pinNum = pinCount - i + 1;
      const py = chipY + 12 + (i - 1) * spacing;
      const isActive = activePins.has(pinNum);
      const pinObj = icData?.pins?.find(p => p.pin === pinNum);
      const pinName = pinObj ? pinObj.name : `P${pinNum}`;

      pinsSvg += `
        <rect x="${chipX + chipW}" y="${py - 4}" width="16" height="8" rx="2" fill="${isActive ? '#34d399' : '#64748b'}" />
        <circle cx="${chipX + chipW + 22}" cy="${py}" r="7" fill="${isActive ? '#10b981' : '#334155'}" stroke="#1e293b" stroke-width="1.5" />
        <text x="${chipX + chipW + 22}" y="${py + 3}" text-anchor="middle" font-size="8" font-weight="700" fill="#fff">${pinNum}</text>
        <text x="${chipX + chipW - 8}" y="${py + 3.5}" text-anchor="end" font-size="9" font-weight="600" fill="${isActive ? '#38bdf8' : '#94a3b8'}">${pinName}</text>
      `;
    }

    return `
      <svg class="circuit-svg-canvas" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="pinoutChipGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#2a303c"/>
            <stop offset="50%" stop-color="#1e232d"/>
            <stop offset="100%" stop-color="#171b22"/>
          </linearGradient>
        </defs>

        <rect width="${width}" height="${height}" fill="#11141a" rx="6"/>
        <path d="M 0 45 H ${width} M 0 95 H ${width} M 0 145 H ${width} M 110 0 V ${height} M 220 0 V ${height} M 330 0 V ${height}" stroke="#1d232e" stroke-width="0.8" stroke-dasharray="2 4"/>

        <!-- DIP IC Chip Body -->
        <rect x="${chipX}" y="${chipY}" width="${chipW}" height="${chipH}" rx="6" fill="url(#pinoutChipGrad)" stroke="#374151" stroke-width="1.5"/>
        
        <!-- Top Orientation Notch -->
        <path d="M ${chipX + chipW / 2 - 10} ${chipY} A 10 10 0 0 0 ${chipX + chipW / 2 + 10} ${chipY}" fill="#11141a" stroke="#374151" stroke-width="1.2"/>
        <circle cx="${chipX + 14}" cy="${chipY + 12}" r="3" fill="#64748b"/>

        <text x="${chipX + chipW / 2}" y="${chipY + 50}" text-anchor="middle" font-size="13" font-weight="800" fill="#f8fafc" letter-spacing="1.5">IC ${icId}</text>
        <text x="${chipX + chipW / 2}" y="${chipY + 68}" text-anchor="middle" font-size="9" font-weight="600" fill="#94a3b8">${icData?.name || 'DIGITAL IC'}</text>
        <text x="${chipX + chipW / 2}" y="${chipY + 84}" text-anchor="middle" font-size="8" font-weight="700" fill="#38bdf8">DIP-${pinCount} PACKAGE</text>

        ${pinsSvg}
      </svg>
    `;
  }

  // =========================================================================
  // 2. EXP 1 ALL 4 MANUAL CIRCUIT DIAGRAMS (EXACT REDRAWING FROM MANUAL PG 1)
  // =========================================================================
  renderExp1AllFourDiagrams() {
    const inputs = this.cachedStates.inputs || {};
    const sw0 = inputs.sw_0 ?? 0;
    const sw1 = inputs.sw_1 ?? 0;
    const activePartId = this.currentPart?.id || 'exp1_and';

    // Renders the 2x2 grid exactly as drawn on Page 1 of the student's manual
    return `
      <div class="exp1-four-diagrams-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:8px; padding:6px; background:#0b0f17; height:100%; box-sizing:border-box; overflow-y:auto;">
        
        <!-- 1. Top-Left: IC 7408 (AND Gate) -->
        <div class="manual-diagram-card ${activePartId === 'exp1_and' ? 'active-diagram-card' : ''}" 
             onclick="window.trainerApp?.selectPart('exp1_and')" 
             style="background:#131822; border:1px solid ${activePartId === 'exp1_and' ? '#38bdf8' : '#273142'}; border-radius:6px; padding:6px; cursor:pointer; position:relative;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <span style="font-size:11px; font-weight:700; color:#f8fafc;">1. IC 7408 (AND Gate)</span>
            ${activePartId === 'exp1_and' ? '<span style="font-size:9px; background:#0284c7; color:#fff; padding:1px 5px; border-radius:3px; font-weight:700;">ACTIVE</span>' : ''}
          </div>
          ${this.getManualChipInternalSvg('AND', '7408', sw0, sw1, sw0 && sw1, activePartId === 'exp1_and', 360, 150)}
        </div>

        <!-- 2. Top-Right: IC 7432 (OR Gate) -->
        <div class="manual-diagram-card ${activePartId === 'exp1_or' ? 'active-diagram-card' : ''}" 
             onclick="window.trainerApp?.selectPart('exp1_or')" 
             style="background:#131822; border:1px solid ${activePartId === 'exp1_or' ? '#38bdf8' : '#273142'}; border-radius:6px; padding:6px; cursor:pointer; position:relative;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <span style="font-size:11px; font-weight:700; color:#f8fafc;">2. IC 7432 (OR Gate)</span>
            ${activePartId === 'exp1_or' ? '<span style="font-size:9px; background:#0284c7; color:#fff; padding:1px 5px; border-radius:3px; font-weight:700;">ACTIVE</span>' : ''}
          </div>
          ${this.getManualChipInternalSvg('OR', '7432', sw0, sw1, sw0 || sw1, activePartId === 'exp1_or', 360, 150)}
        </div>

        <!-- 3. Bottom-Left: IC 7486 (Ex-OR Gate) -->
        <div class="manual-diagram-card ${activePartId === 'exp1_xor' ? 'active-diagram-card' : ''}" 
             onclick="window.trainerApp?.selectPart('exp1_xor')" 
             style="background:#131822; border:1px solid ${activePartId === 'exp1_xor' ? '#38bdf8' : '#273142'}; border-radius:6px; padding:6px; cursor:pointer; position:relative;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <span style="font-size:11px; font-weight:700; color:#f8fafc;">3. IC 7486 (Ex-OR Gate)</span>
            ${activePartId === 'exp1_xor' ? '<span style="font-size:9px; background:#0284c7; color:#fff; padding:1px 5px; border-radius:3px; font-weight:700;">ACTIVE</span>' : ''}
          </div>
          ${this.getManualChipInternalSvg('XOR', '7486', sw0, sw1, sw0 ^ sw1, activePartId === 'exp1_xor', 360, 150)}
        </div>

        <!-- 4. Bottom-Right: IC 74266 (Ex-NOR Gate) / IC 7404 (NOT) -->
        <div class="manual-diagram-card ${activePartId === 'exp1_xnor' || activePartId === 'exp1_not' ? 'active-diagram-card' : ''}" 
             onclick="window.trainerApp?.selectPart('exp1_xnor')" 
             style="background:#131822; border:1px solid ${activePartId === 'exp1_xnor' || activePartId === 'exp1_not' ? '#38bdf8' : '#273142'}; border-radius:6px; padding:6px; cursor:pointer; position:relative;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <span style="font-size:11px; font-weight:700; color:#f8fafc;">4. IC 74266 (Ex-NOR Gate) / 7404</span>
            ${activePartId === 'exp1_xnor' || activePartId === 'exp1_not' ? '<span style="font-size:9px; background:#0284c7; color:#fff; padding:1px 5px; border-radius:3px; font-weight:700;">ACTIVE</span>' : ''}
          </div>
          ${this.getManualChipInternalSvg('XNOR', '74266', sw0, sw1, (sw0 ^ sw1) ? 0 : 1, activePartId === 'exp1_xnor', 360, 150)}
        </div>

      </div>
    `;
  }

  // =========================================================================
  // 3. EXP 2 BOTH UNIVERSAL GATES SHEET (EXACT REDRAWING FROM MANUAL PG 3)
  // =========================================================================
  renderExp2BothUniversalGates() {
    const inputs = this.cachedStates.inputs || {};
    const sw0 = inputs.sw_0 ?? 0;
    const sw1 = inputs.sw_1 ?? 0;
    const activePartId = this.currentPart?.id || 'exp2_nand';

    return `
      <div class="exp2-two-diagrams-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:10px; padding:8px; background:#0b0f17; height:100%; box-sizing:border-box;">
        
        <!-- IC 7400 (NAND Gate) -->
        <div class="manual-diagram-card ${activePartId === 'exp2_nand' ? 'active-diagram-card' : ''}" 
             onclick="window.trainerApp?.selectPart('exp2_nand')" 
             style="background:#131822; border:1px solid ${activePartId === 'exp2_nand' ? '#38bdf8' : '#273142'}; border-radius:6px; padding:8px; cursor:pointer;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <span style="font-size:12px; font-weight:700; color:#f8fafc;">1. IC 7400: Quad 2-Input NAND Gate</span>
            ${activePartId === 'exp2_nand' ? '<span style="font-size:9px; background:#0284c7; color:#fff; padding:1px 5px; border-radius:3px; font-weight:700;">ACTIVE</span>' : ''}
          </div>
          ${this.getManualChipInternalSvg('NAND', '7400', sw0, sw1, !(sw0 && sw1) ? 1 : 0, activePartId === 'exp2_nand', 370, 150)}
        </div>

        <!-- IC 7402 (NOR Gate) -->
        <div class="manual-diagram-card ${activePartId === 'exp2_nor' ? 'active-diagram-card' : ''}" 
             onclick="window.trainerApp?.selectPart('exp2_nor')" 
             style="background:#131822; border:1px solid ${activePartId === 'exp2_nor' ? '#38bdf8' : '#273142'}; border-radius:6px; padding:8px; cursor:pointer;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <span style="font-size:12px; font-weight:700; color:#f8fafc;">2. IC 7402: Quad 2-Input NOR Gate</span>
            ${activePartId === 'exp2_nor' ? '<span style="font-size:9px; background:#0284c7; color:#fff; padding:1px 5px; border-radius:3px; font-weight:700;">ACTIVE</span>' : ''}
          </div>
          ${this.getManualChipInternalSvg('NOR', '7402', sw0, sw1, !(sw0 || sw1) ? 1 : 0, activePartId === 'exp2_nor', 370, 150)}
        </div>

      </div>
    `;
  }

  // =========================================================================
  // 4. CORE MANUAL CHIP WITH INTERNAL GATES GENERATOR (DIP-14 HORIZONTAL)
  // =========================================================================
  getManualChipInternalSvg(gateType, icNumber, sw0 = 0, sw1 = 0, valY = 0, isActiveKit = true, width = 500, height = 210) {
    const isNor = gateType === 'NOR';
    const isNot = gateType === 'NOT';

    const cA = (isActiveKit && sw0) ? '#10b981' : '#64748b';
    const cB = (isActiveKit && sw1) ? '#10b981' : '#64748b';
    const cY = (isActiveKit && valY) ? '#f59e0b' : '#64748b';

    // Helper to draw standard gate symbol
    function makeGate(type, cx, cy, active = false) {
      const stroke = active ? '#38bdf8' : '#64748b';
      const fill = active ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.04)';
      const sw = active ? '1.8' : '1.3';

      let d = '';
      if (type === 'AND' || type === 'NAND') {
        d = `M ${cx - 10} ${cy - 9} H ${cx} A 9 9 0 0 1 ${cx} ${cy + 9} H ${cx - 10} Z`;
      } else if (type === 'OR' || type === 'NOR') {
        d = `M ${cx - 10} ${cy - 9} Q ${cx - 2} ${cy} ${cx - 10} ${cy + 9} Q ${cx + 3} ${cy + 9} ${cx + 10} ${cy} Q ${cx + 3} ${cy - 9} ${cx - 10} ${cy - 9} Z`;
      } else if (type === 'XOR' || type === 'XNOR') {
        d = `M ${cx - 8} ${cy - 9} Q ${cx} ${cy} ${cx - 8} ${cy + 9} Q ${cx + 3} ${cy + 9} ${cx + 10} ${cy} Q ${cx + 3} ${cy - 9} ${cx - 8} ${cy - 9} Z`;
      } else if (type === 'NOT') {
        d = `M ${cx - 8} ${cy - 8} L ${cx + 6} ${cy} L ${cx - 8} ${cy + 8} Z`;
      }

      const bubble = (type === 'NAND' || type === 'NOR' || type === 'XNOR' || type === 'NOT')
        ? `<circle cx="${cx + (type === 'NOT' ? 9 : 12)}" cy="${cy}" r="2.2" fill="#1e232d" stroke="${stroke}" stroke-width="${sw}"/>`
        : '';

      const xorBack = (type === 'XOR' || type === 'XNOR')
        ? `<path d="M ${cx - 11} ${cy - 9} Q ${cx - 3} ${cy} ${cx - 11} ${cy + 9}" fill="none" stroke="${stroke}" stroke-width="${sw}" />`
        : '';

      return `<g>${xorBack}<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>${bubble}</g>`;
    }

    // Geometry of horizontal DIP-14 chip
    const chipX = 50;
    const chipY = 40;
    const chipW = width - 100;
    const chipH = height - 80;
    const pinSpacing = chipW / 8;

    // Pin coordinates
    // Bottom: 1 to 7 (left to right)
    // Top: 14 down to 8 (left to right)
    const getPinX = (p) => {
      if (p <= 7) return chipX + p * pinSpacing;
      return chipX + (15 - p) * pinSpacing;
    };

    // Render Bottom Pins (1 to 7)
    let bottomPins = '';
    for (let p = 1; p <= 7; p++) {
      const px = getPinX(p);
      const isP1 = p === 1;
      const isP2 = p === 2;
      const isP3 = p === 3;
      const isGnd = p === 7;

      let pinColor = '#64748b';
      if (isGnd) pinColor = '#94a3b8';
      else if (isActiveKit && isP1) pinColor = cA;
      else if (isActiveKit && isP2) pinColor = cB;
      else if (isActiveKit && isP3) pinColor = cY;

      bottomPins += `
        <!-- Lead -->
        <rect x="${px - 3}" y="${chipY + chipH}" width="6" height="12" fill="#94a3b8" rx="1"/>
        <!-- Pin Dot & Number -->
        <circle cx="${px}" cy="${chipY + chipH + 18}" r="6.5" fill="${(isP1&&sw0)||(isP2&&sw1)||(isP3&&valY)?'#047857':'#1e293b'}" stroke="${pinColor}" stroke-width="1.2"/>
        <text x="${px}" y="${chipY + chipH + 21}" text-anchor="middle" font-size="7.5" font-weight="700" fill="#fff">${p}</text>
        ${isGnd ? `<text x="${px}" y="${chipY + chipH + 32}" text-anchor="middle" font-size="8" font-weight="700" fill="#94a3b8">GND</text>` : ''}
        ${isP1 && isActiveKit ? `<text x="${px}" y="${chipY + chipH + 32}" text-anchor="middle" font-size="8" font-weight="700" fill="${cA}">A=${sw0}</text>` : ''}
        ${isP2 && isActiveKit ? `<text x="${px}" y="${chipY + chipH + 32}" text-anchor="middle" font-size="8" font-weight="700" fill="${cB}">B=${sw1}</text>` : ''}
        ${isP3 && isActiveKit ? `<text x="${px}" y="${chipY + chipH + 32}" text-anchor="middle" font-size="8" font-weight="700" fill="${cY}">Y=${valY}</text>` : ''}
      `;
    }

    // Render Top Pins (14 down to 8)
    let topPins = '';
    for (let p = 14; p >= 8; p--) {
      const px = getPinX(p);
      const isVcc = p === 14;

      topPins += `
        <!-- Lead -->
        <rect x="${px - 3}" y="${chipY - 12}" width="6" height="12" fill="#94a3b8" rx="1"/>
        <!-- Pin Dot & Number -->
        <circle cx="${px}" cy="${chipY - 18}" r="6.5" fill="${isVcc ? '#450a0a' : '#1e293b'}" stroke="${isVcc ? '#ef4444' : '#64748b'}" stroke-width="1.2"/>
        <text x="${px}" y="${chipY - 15}" text-anchor="middle" font-size="7.5" font-weight="700" fill="${isVcc ? '#fca5a5' : '#cbd5e1'}">${p}</text>
        ${isVcc ? `<text x="${px}" y="${chipY - 28}" text-anchor="middle" font-size="8" font-weight="700" fill="#ef4444">VCC (+5V)</text>` : ''}
      `;
    }

    // Internal gate wiring based on standard pinout
    let internalGatesSvg = '';
    if (!isNor && !isNot) {
      // Standard Quad Gate (7408, 7432, 7486, 7400, 74266):
      // Gate 1: 1, 2 -> 3
      // Gate 2: 4, 5 -> 6
      // Gate 3: 9, 10 -> 8
      // Gate 4: 12, 13 -> 11
      const g1X = (getPinX(1) + getPinX(2)) / 2;
      const g2X = (getPinX(4) + getPinX(5)) / 2;
      const g3X = (getPinX(9) + getPinX(10)) / 2;
      const g4X = (getPinX(12) + getPinX(13)) / 2;

      const gY_bot = chipY + chipH - 30;
      const gY_top = chipY + 30;

      internalGatesSvg = `
        <!-- Gate 1 (Pins 1, 2 -> 3) [Active] -->
        <path d="M ${getPinX(1)} ${chipY + chipH} V ${gY_bot - 4} H ${g1X - 8}" fill="none" stroke="${cA}" stroke-width="${isActiveKit ? 1.8 : 1.2}"/>
        <path d="M ${getPinX(2)} ${chipY + chipH} V ${gY_bot + 4} H ${g1X - 8}" fill="none" stroke="${cB}" stroke-width="${isActiveKit ? 1.8 : 1.2}"/>
        ${makeGate(gateType, g1X, gY_bot, isActiveKit)}
        <path d="M ${g1X + 13} ${gY_bot} H ${getPinX(3) - 6} V ${chipY + chipH - 8} H ${getPinX(3)} V ${chipY + chipH}" fill="none" stroke="${cY}" stroke-width="${isActiveKit ? 1.8 : 1.2}"/>

        <!-- Gate 2 (Pins 4, 5 -> 6) -->
        <path d="M ${getPinX(4)} ${chipY + chipH} V ${gY_bot - 4} H ${g2X - 8}" fill="none" stroke="#475569" stroke-width="1.2"/>
        <path d="M ${getPinX(5)} ${chipY + chipH} V ${gY_bot + 4} H ${g2X - 8}" fill="none" stroke="#475569" stroke-width="1.2"/>
        ${makeGate(gateType, g2X, gY_bot, false)}
        <path d="M ${g2X + 13} ${gY_bot} H ${getPinX(6) - 6} V ${chipY + chipH - 8} H ${getPinX(6)} V ${chipY + chipH}" fill="none" stroke="#475569" stroke-width="1.2"/>

        <!-- Gate 3 (Pins 9, 10 -> 8) -->
        <path d="M ${getPinX(9)} ${chipY} V ${gY_top - 4} H ${g3X - 8}" fill="none" stroke="#475569" stroke-width="1.2"/>
        <path d="M ${getPinX(10)} ${chipY} V ${gY_top + 4} H ${g3X - 8}" fill="none" stroke="#475569" stroke-width="1.2"/>
        ${makeGate(gateType, g3X, gY_top, false)}
        <path d="M ${g3X + 13} ${gY_top} H ${getPinX(8) - 6} V ${chipY + 8} H ${getPinX(8)} V ${chipY}" fill="none" stroke="#475569" stroke-width="1.2"/>

        <!-- Gate 4 (Pins 12, 13 -> 11) -->
        <path d="M ${getPinX(12)} ${chipY} V ${gY_top - 4} H ${g4X - 8}" fill="none" stroke="#475569" stroke-width="1.2"/>
        <path d="M ${getPinX(13)} ${chipY} V ${gY_top + 4} H ${g4X - 8}" fill="none" stroke="#475569" stroke-width="1.2"/>
        ${makeGate(gateType, g4X, gY_top, false)}
        <path d="M ${g4X + 13} ${gY_top} H ${getPinX(11) - 6} V ${chipY + 8} H ${getPinX(11)} V ${chipY}" fill="none" stroke="#475569" stroke-width="1.2"/>
      `;
    } else if (isNor) {
      // 7402 Quad NOR Gate: Special Pinout!
      // Gate 1: Output 1 <- Inputs 2, 3
      // Gate 2: Output 4 <- Inputs 5, 6
      // Gate 3: Output 10 <- Inputs 8, 9
      // Gate 4: Output 13 <- Inputs 11, 12
      const g1X = (getPinX(2) + getPinX(3)) / 2;
      const g2X = (getPinX(5) + getPinX(6)) / 2;
      const g3X = (getPinX(8) + getPinX(9)) / 2;
      const g4X = (getPinX(11) + getPinX(12)) / 2;
      const gY_bot = chipY + chipH - 30;
      const gY_top = chipY + 30;

      internalGatesSvg = `
        <!-- Gate 1 (Pins 2, 3 -> Output 1) [Active in Exp 2 NOR] -->
        <path d="M ${getPinX(2)} ${chipY + chipH} V ${gY_bot - 4} H ${g1X - 8}" fill="none" stroke="${cA}" stroke-width="${isActiveKit ? 1.8 : 1.2}"/>
        <path d="M ${getPinX(3)} ${chipY + chipH} V ${gY_bot + 4} H ${g1X - 8}" fill="none" stroke="${cB}" stroke-width="${isActiveKit ? 1.8 : 1.2}"/>
        ${makeGate('NOR', g1X, gY_bot, isActiveKit)}
        <path d="M ${g1X + 14} ${gY_bot} H ${getPinX(1) + 8} V ${chipY + chipH - 8} H ${getPinX(1)} V ${chipY + chipH}" fill="none" stroke="${cY}" stroke-width="${isActiveKit ? 1.8 : 1.2}"/>

        <!-- Gate 2 (Pins 5, 6 -> Output 4) -->
        <path d="M ${getPinX(5)} ${chipY + chipH} V ${gY_bot - 4} H ${g2X - 8}" fill="none" stroke="#475569" stroke-width="1.2"/>
        <path d="M ${getPinX(6)} ${chipY + chipH} V ${gY_bot + 4} H ${g2X - 8}" fill="none" stroke="#475569" stroke-width="1.2"/>
        ${makeGate('NOR', g2X, gY_bot, false)}
        <path d="M ${g2X + 14} ${gY_bot} H ${getPinX(4) + 8} V ${chipY + chipH - 8} H ${getPinX(4)} V ${chipY + chipH}" fill="none" stroke="#475569" stroke-width="1.2"/>

        <!-- Gate 3 (Pins 8, 9 -> Output 10) -->
        <path d="M ${getPinX(8)} ${chipY} V ${gY_top - 4} H ${g3X - 8}" fill="none" stroke="#475569" stroke-width="1.2"/>
        <path d="M ${getPinX(9)} ${chipY} V ${gY_top + 4} H ${g3X - 8}" fill="none" stroke="#475569" stroke-width="1.2"/>
        ${makeGate('NOR', g3X, gY_top, false)}
        <path d="M ${g3X + 14} ${gY_top} H ${getPinX(10) + 8} V ${chipY + 8} H ${getPinX(10)} V ${chipY}" fill="none" stroke="#475569" stroke-width="1.2"/>

        <!-- Gate 4 (Pins 11, 12 -> Output 13) -->
        <path d="M ${getPinX(11)} ${chipY} V ${gY_top - 4} H ${g4X - 8}" fill="none" stroke="#475569" stroke-width="1.2"/>
        <path d="M ${getPinX(12)} ${chipY} V ${gY_top + 4} H ${g4X - 8}" fill="none" stroke="#475569" stroke-width="1.2"/>
        ${makeGate('NOR', g4X, gY_top, false)}
        <path d="M ${g4X + 14} ${gY_top} H ${getPinX(13) + 8} V ${chipY + 8} H ${getPinX(13)} V ${chipY}" fill="none" stroke="#475569" stroke-width="1.2"/>
      `;
    } else if (isNot) {
      // 7404 Hex Inverter: 6 Inverters!
      // 1->2, 3->4, 5->6 (Bottom)
      // 9->8, 11->10, 13->12 (Top)
      internalGatesSvg = `
        <!-- Gate 1 (1 -> 2) [Active] -->
        <path d="M ${getPinX(1)} ${chipY + chipH} V ${chipY + chipH - 24} H ${getPinX(1) + 8}" fill="none" stroke="${cA}" stroke-width="${isActiveKit ? 1.8 : 1.2}"/>
        ${makeGate('NOT', getPinX(1) + 16, chipY + chipH - 24, isActiveKit)}
        <path d="M ${getPinX(1) + 26} ${chipY + chipH - 24} H ${getPinX(2)} V ${chipY + chipH}" fill="none" stroke="${cY}" stroke-width="${isActiveKit ? 1.8 : 1.2}"/>

        <!-- Gate 2 (3 -> 4) -->
        <path d="M ${getPinX(3)} ${chipY + chipH} V ${chipY + chipH - 24} H ${getPinX(3) + 8}" fill="none" stroke="#475569" stroke-width="1.2"/>
        ${makeGate('NOT', getPinX(3) + 16, chipY + chipH - 24, false)}
        <path d="M ${getPinX(3) + 26} ${chipY + chipH - 24} H ${getPinX(4)} V ${chipY + chipH}" fill="none" stroke="#475569" stroke-width="1.2"/>

        <!-- Gate 3 (5 -> 6) -->
        <path d="M ${getPinX(5)} ${chipY + chipH} V ${chipY + chipH - 24} H ${getPinX(5) + 8}" fill="none" stroke="#475569" stroke-width="1.2"/>
        ${makeGate('NOT', getPinX(5) + 16, chipY + chipH - 24, false)}
        <path d="M ${getPinX(5) + 26} ${chipY + chipH - 24} H ${getPinX(6)} V ${chipY + chipH}" fill="none" stroke="#475569" stroke-width="1.2"/>

        <!-- Top Inverters: 9->8, 11->10, 13->12 -->
        <path d="M ${getPinX(9)} ${chipY} V ${chipY + 24} H ${getPinX(9) + 8}" fill="none" stroke="#475569" stroke-width="1.2"/>
        ${makeGate('NOT', getPinX(9) + 16, chipY + 24, false)}
        <path d="M ${getPinX(9) + 26} ${chipY + 24} H ${getPinX(8)} V ${chipY}" fill="none" stroke="#475569" stroke-width="1.2"/>

        <path d="M ${getPinX(11)} ${chipY} V ${chipY + 24} H ${getPinX(11) + 8}" fill="none" stroke="#475569" stroke-width="1.2"/>
        ${makeGate('NOT', getPinX(11) + 16, chipY + 24, false)}
        <path d="M ${getPinX(11) + 26} ${chipY + 24} H ${getPinX(10)} V ${chipY}" fill="none" stroke="#475569" stroke-width="1.2"/>

        <path d="M ${getPinX(13)} ${chipY} V ${chipY + 24} H ${getPinX(13) + 8}" fill="none" stroke="#475569" stroke-width="1.2"/>
        ${makeGate('NOT', getPinX(13) + 16, chipY + 24, false)}
        <path d="M ${getPinX(13) + 26} ${chipY + 24} H ${getPinX(12)} V ${chipY}" fill="none" stroke="#475569" stroke-width="1.2"/>
      `;
    }

    return `
      <svg class="circuit-svg-canvas" viewBox="0 0 ${width} ${height}" style="width:100%; height:auto; display:block;" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="icGrad_${icNumber}_${width}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#242b38"/>
            <stop offset="50%" stop-color="#181e28"/>
            <stop offset="100%" stop-color="#12161f"/>
          </linearGradient>
        </defs>

        <!-- Blueprint Subtle Grid -->
        <rect width="${width}" height="${height}" fill="#0f131a" rx="4"/>
        <path d="M 0 ${height/4} H ${width} M 0 ${height/2} H ${width} M 0 ${height*3/4} H ${width} M ${width/4} 0 V ${height} M ${width/2} 0 V ${height} M ${width*3/4} 0 V ${height}" stroke="#161c26" stroke-width="0.8" stroke-dasharray="2 4"/>

        <!-- DIP IC CHIP BODY -->
        <rect x="${chipX}" y="${chipY}" width="${chipW}" height="${chipH}" rx="6" fill="url(#icGrad_${icNumber}_${width})" stroke="#374151" stroke-width="1.5"/>
        
        <!-- Orientation Notch (Left index) -->
        <path d="M ${chipX} ${chipY + chipH/2 - 12} A 12 12 0 0 1 ${chipX} ${chipY + chipH/2 + 12}" fill="#0f131a" stroke="#374151" stroke-width="1.5"/>
        <circle cx="${chipX + 14}" cy="${chipY + chipH - 14}" r="3" fill="#475569"/>

        <!-- IC Part Text Label in Center -->
        <text x="${chipX + chipW/2}" y="${chipY + chipH/2 - 2}" text-anchor="middle" font-size="11" font-weight="800" fill="#4b5563" letter-spacing="2">IC ${icNumber}</text>
        <text x="${chipX + chipW/2}" y="${chipY + chipH/2 + 10}" text-anchor="middle" font-size="7.5" font-weight="600" fill="#374151" letter-spacing="1">${gateType} GATE</text>

        <!-- Pins -->
        ${bottomPins}
        ${topPins}

        <!-- Internal Gates & Wiring -->
        ${internalGatesSvg}
      </svg>
    `;
  }

  // ========================================================
  // 5. SCHEMATIC DIAGRAM ROUTER (ALL 17 EXPERIMENTS)
  // ========================================================
  renderSchematicDiagram(part, exp) {
    const pId = part.id;
    const inputs = this.cachedStates.inputs || {};
    const sw0 = inputs.sw_0 ?? 0;
    const sw1 = inputs.sw_1 ?? 0;
    const sw2 = inputs.sw_2 ?? 0;
    const sw3 = inputs.sw_3 ?? 0;

    // Experiment 1: Logic Gates (7408 AND, 7432 OR, 7486 XOR, 7404 NOT, 74266 XNOR)
    // Redrawn as physical DIP-14 IC package with all internal gates!
    if (pId === 'exp1_and') {
      return this.getManualChipInternalSvg('AND', '7408', sw0, sw1, sw0 && sw1, true, 490, 200);
    } else if (pId === 'exp1_or') {
      return this.getManualChipInternalSvg('OR', '7432', sw0, sw1, sw0 || sw1, true, 490, 200);
    } else if (pId === 'exp1_xor') {
      return this.getManualChipInternalSvg('XOR', '7486', sw0, sw1, sw0 ^ sw1, true, 490, 200);
    } else if (pId === 'exp1_not') {
      return this.getManualChipInternalSvg('NOT', '7404', sw0, 0, sw0 ? 0 : 1, true, 490, 200);
    } else if (pId === 'exp1_xnor') {
      return this.getManualChipInternalSvg('XNOR', '74266', sw0, sw1, (sw0 ^ sw1) ? 0 : 1, true, 490, 200);
    }

    // Experiment 2: Universal Gates (7400 NAND & 7402 NOR)
    else if (pId === 'exp2_nand') {
      return this.getManualChipInternalSvg('NAND', '7400', sw0, sw1, !(sw0 && sw1) ? 1 : 0, true, 490, 200);
    } else if (pId === 'exp2_nor') {
      return this.getManualChipInternalSvg('NOR', '7402', sw0, sw1, !(sw0 || sw1) ? 1 : 0, true, 490, 200);
    }

    // Experiment 3: Universal Gate Realization (Pages 5, 6, 7 of manual)
    else if (pId === 'exp3_not_nand') {
      return this.renderUniversalNotSchematic('NAND', '7400', 1, 2, 3, sw0);
    } else if (pId === 'exp3_and_nand') {
      return this.renderUniversalAndNandSchematic(sw0, sw1);
    } else if (pId === 'exp3_or_nand') {
      return this.renderUniversalOrNandSchematic(sw0, sw1);
    } else if (pId === 'exp3_not_nor') {
      return this.renderUniversalNotSchematic('NOR', '7402', 2, 3, 1, sw0);
    } else if (pId === 'exp3_or_nor') {
      return this.renderUniversalOrNorSchematic(sw0, sw1);
    } else if (pId === 'exp3_and_nor') {
      return this.renderUniversalAndNorSchematic(sw0, sw1);
    }

    // Experiment 4: Ex-OR & Ex-NOR using Universal Gates (Page 8 of manual)
    else if (pId === 'exp4_xor_nand') {
      return this.renderXorUsing4NandSchematic(sw0, sw1);
    } else if (pId === 'exp4_xnor_nor') {
      return this.renderXnorUsing4NorSchematic(sw0, sw1);
    }

    // Experiment 5: De-Morgan's Theorems (Page 10 of manual)
    else if (pId === 'exp5_thm1') {
      return this.renderDeMorgan1Schematic(sw0, sw1);
    } else if (pId === 'exp5_thm2') {
      return this.renderDeMorgan2Schematic(sw0, sw1);
    }

    // Experiment 6: Half & Full Adder (Page 12 of manual)
    else if (pId === 'exp6_half') {
      return this.renderHalfAdderSchematic(sw0, sw1);
    } else if (pId === 'exp6_full') {
      return this.renderFullAdderSchematic(sw0, sw1, sw2);
    }

    // Experiment 7: Half & Full Subtractor (Page 14 of manual)
    else if (pId === 'exp7_half') {
      return this.renderHalfSubtractorSchematic(sw0, sw1);
    } else if (pId === 'exp7_full') {
      return this.renderFullSubtractorSchematic(sw0, sw1, sw2);
    }

    // Experiment 8: BCD to 7-Segment Decoder (Page 16 of manual)
    else if (pId === 'exp8_main') {
      return this.renderBcd7SegSchematic(sw0, sw1, sw2, sw3);
    }

    // Experiment 9: 4-Bit Comparator (Page 18 of manual)
    else if (pId === 'exp9_main') {
      return this.renderComparator7485Schematic(inputs);
    }

    // Experiment 10: 8:1 Multiplexer (Page 20 of manual)
    else if (pId === 'exp10_main') {
      return this.renderMux74151Schematic(inputs);
    }

    // Experiment 11: Demultiplexer (Page 22 of manual)
    else if (pId === 'exp11_main') {
      return this.renderDemux74155Schematic(inputs);
    }

    // Experiment 12: RS Latch (Page 24 of manual)
    else if (pId === 'exp12_main') {
      return this.renderRsLatchSchematic(sw0, sw1);
    }

    // Experiment 13: JK Flip-Flop (Page 26 of manual)
    else if (pId === 'exp13_main') {
      return this.renderJkFlipFlopSchematic(sw0, sw1);
    }

    // Experiment 14: D & T Flip-Flop (Page 28 of manual)
    else if (pId.startsWith('exp14')) {
      return this.renderDFlipFlopSchematic(pId, sw0);
    }

    // Experiment 15: Shift Register 7495 (Page 29 of manual)
    else if (pId === 'exp15_main') {
      return this.renderShiftRegister7495Schematic(sw0);
    }

    // Experiment 16: Binary Counter 7493 (Page 29/30 of manual)
    else if (pId === 'exp16_main') {
      return this.renderCounter7493Schematic();
    }

    // Experiment 17: Decade Counter 7490 (Page 30 of manual)
    else if (pId === 'exp17_main') {
      return this.renderCounter7490Schematic();
    }

    // Fallback
    return this.renderDefaultBlockSchematic(part);
  }

  // ========================================================
  // UNIVERSAL GATE SCHEMATICS (EXP 3)
  // ========================================================
  renderUniversalNotSchematic(type, icNumber, pinA, pinB, pinY, valA) {
    const cIn = valA ? '#10b981' : '#64748b';
    const cOut = (!valA) ? '#f59e0b' : '#64748b';

    return `
      <svg class="circuit-svg-canvas" viewBox="0 0 460 180" preserveAspectRatio="xMidYMid meet">
        <rect width="460" height="180" fill="#11141a" rx="6"/>
        <path d="M 0 45 H 460 M 0 90 H 460 M 0 135 H 460 M 115 0 V 180 M 230 0 V 180 M 345 0 V 180" stroke="#1d232e" stroke-width="0.8" stroke-dasharray="2 4"/>

        <text x="14" y="24" font-size="11" font-weight="700" fill="#f8fafc">IC ${icNumber}: NOT Gate using ${type}</text>
        <text x="446" y="24" text-anchor="end" font-size="11" font-weight="700" fill="#38bdf8">Manual Realization (Inputs Tied)</text>

        <!-- Input Switch SW0 -->
        <g transform="translate(40, 75)">
          <rect x="0" y="0" width="60" height="26" rx="4" fill="#1e2430" stroke="${cIn}" stroke-width="1.5"/>
          <text x="30" y="17" text-anchor="middle" font-size="11" font-weight="700" fill="${cIn}">SW0 = ${valA}</text>
        </g>

        <!-- Tied wire split to both input pins -->
        <path d="M 100 88 H 155 V 72 H 195" fill="none" stroke="${cIn}" stroke-width="2"/>
        <path d="M 155 88 V 104 H 195" fill="none" stroke="${cIn}" stroke-width="2"/>
        <circle cx="155" cy="88" r="3.5" fill="${cIn}"/>

        <!-- Pin Labels -->
        <text x="180" y="68" font-size="9" font-weight="700" fill="#94a3b8">Pin ${pinA}</text>
        <text x="180" y="118" font-size="9" font-weight="700" fill="#94a3b8">Pin ${pinB}</text>

        <!-- Logic Gate Symbol -->
        <g transform="translate(195, 60)">
          ${type === 'NAND' 
            ? `<path d="M 0 0 H 26 A 28 28 0 0 1 26 56 H 0 Z" fill="#1e232d" stroke="#38bdf8" stroke-width="2"/>
               <circle cx="58" cy="28" r="4.5" fill="#11141a" stroke="#38bdf8" stroke-width="2"/>`
            : `<path d="M 0 0 Q 14 28 0 56 Q 24 56 46 28 Q 24 0 0 0 Z" fill="#1e232d" stroke="#38bdf8" stroke-width="2"/>
               <circle cx="50" cy="28" r="4.5" fill="#11141a" stroke="#38bdf8" stroke-width="2"/>`
          }
        </g>

        <!-- Output wire to LED L0 -->
        <path d="M ${type === 'NAND' ? 258 : 250} 88 H 340" fill="none" stroke="${cOut}" stroke-width="2"/>
        <text x="280" y="80" font-size="9" font-weight="700" fill="#94a3b8">Pin ${pinY}</text>

        <!-- Output Indicator LED L0 -->
        <g transform="translate(340, 75)">
          <rect x="0" y="0" width="75" height="26" rx="4" fill="#1e2430" stroke="${cOut}" stroke-width="1.5"/>
          <circle cx="15" cy="13" r="5" fill="${cOut}"/>
          <text x="44" y="17" text-anchor="middle" font-size="11" font-weight="700" fill="${cOut}">L0 = ${valA ? 0 : 1}</text>
        </g>

        <!-- Power supply reminder -->
        <text x="230" y="160" text-anchor="middle" font-size="10" font-weight="600" fill="#64748b">VCC (Pin 14) = +5V | GND (Pin 7) = 0V</text>
      </svg>
    `;
  }

  renderUniversalAndNandSchematic(valA, valB) {
    const nand1Out = !(valA && valB) ? 1 : 0;
    const finalOut = nand1Out ? 0 : 1;

    const cA = valA ? '#10b981' : '#64748b';
    const cB = valB ? '#10b981' : '#64748b';
    const cN1 = nand1Out ? '#f59e0b' : '#64748b';
    const cFinal = finalOut ? '#f59e0b' : '#64748b';

    return `
      <svg class="circuit-svg-canvas" viewBox="0 0 460 180" preserveAspectRatio="xMidYMid meet">
        <rect width="460" height="180" fill="#11141a" rx="6"/>
        <path d="M 0 45 H 460 M 0 90 H 460 M 0 135 H 460 M 115 0 V 180 M 230 0 V 180 M 345 0 V 180" stroke="#1d232e" stroke-width="0.8" stroke-dasharray="2 4"/>

        <text x="14" y="24" font-size="11" font-weight="700" fill="#f8fafc">IC 7400: AND Gate using 2 NAND Gates</text>
        <text x="446" y="24" text-anchor="end" font-size="11" font-weight="700" fill="#38bdf8">Y = ((A·B)̅)̅ = A·B</text>

        <!-- Inputs SW0 & SW1 -->
        <path d="M 30 75 H 90" fill="none" stroke="${cA}" stroke-width="2"/>
        <text x="25" y="79" font-size="10" font-weight="700" fill="${cA}">A=${valA}</text>
        <text x="75" y="68" font-size="8" font-weight="700" fill="#94a3b8">P1</text>

        <path d="M 30 105 H 90" fill="none" stroke="${cB}" stroke-width="2"/>
        <text x="25" y="109" font-size="10" font-weight="700" fill="${cB}">B=${valB}</text>
        <text x="75" y="118" font-size="8" font-weight="700" fill="#94a3b8">P2</text>

        <!-- Gate 1: 1, 2 -> 3 -->
        <g transform="translate(90, 62)">
          <path d="M 0 0 H 26 A 28 28 0 0 1 26 56 H 0 Z" fill="#1e232d" stroke="#38bdf8" stroke-width="1.8"/>
          <circle cx="58" cy="28" r="4" fill="#11141a" stroke="#38bdf8" stroke-width="1.8"/>
        </g>
        <text x="110" y="55" font-size="9" font-weight="700" fill="#64748b">1/4 7400</text>
        <text x="156" y="80" font-size="8" font-weight="700" fill="#94a3b8">P3</text>

        <!-- Intermediate Wire Split into Gate 2 (Pins 4 & 5) -->
        <path d="M 152 90 H 200 V 75 H 230" fill="none" stroke="${cN1}" stroke-width="2"/>
        <path d="M 200 90 V 105 H 230" fill="none" stroke="${cN1}" stroke-width="2"/>
        <circle cx="200" cy="90" r="3.5" fill="${cN1}"/>
        <text x="215" y="70" font-size="8" font-weight="700" fill="#94a3b8">P4</text>
        <text x="215" y="118" font-size="8" font-weight="700" fill="#94a3b8">P5</text>

        <!-- Gate 2: 4, 5 -> 6 (Inverter) -->
        <g transform="translate(230, 62)">
          <path d="M 0 0 H 26 A 28 28 0 0 1 26 56 H 0 Z" fill="#1e232d" stroke="#38bdf8" stroke-width="1.8"/>
          <circle cx="58" cy="28" r="4" fill="#11141a" stroke="#38bdf8" stroke-width="1.8"/>
        </g>
        <text x="250" y="55" font-size="9" font-weight="700" fill="#64748b">2/4 7400</text>
        <text x="296" y="80" font-size="8" font-weight="700" fill="#94a3b8">P6</text>

        <!-- Output to L0 -->
        <path d="M 292 90 H 370" fill="none" stroke="${cFinal}" stroke-width="2"/>
        <g transform="translate(370, 75)">
          <rect x="0" y="0" width="75" height="28" rx="4" fill="#1e2430" stroke="${cFinal}" stroke-width="1.5"/>
          <circle cx="15" cy="14" r="5" fill="${cFinal}"/>
          <text x="45" y="18" text-anchor="middle" font-size="11" font-weight="700" fill="${cFinal}">L0 = ${finalOut}</text>
        </g>
      </svg>
    `;
  }

  renderUniversalOrNandSchematic(valA, valB) {
    const notA = valA ? 0 : 1;
    const notB = valB ? 0 : 1;
    const finalOut = !(notA && notB) ? 1 : 0;

    const cA = valA ? '#10b981' : '#64748b';
    const cB = valB ? '#10b981' : '#64748b';
    const cNotA = notA ? '#f59e0b' : '#64748b';
    const cNotB = notB ? '#f59e0b' : '#64748b';
    const cFinal = finalOut ? '#f59e0b' : '#64748b';

    return `
      <svg class="circuit-svg-canvas" viewBox="0 0 460 190" preserveAspectRatio="xMidYMid meet">
        <rect width="460" height="190" fill="#11141a" rx="6"/>
        <path d="M 0 47 H 460 M 0 95 H 460 M 0 142 H 460 M 115 0 V 190 M 230 0 V 190 M 345 0 V 190" stroke="#1d232e" stroke-width="0.8" stroke-dasharray="2 4"/>

        <text x="14" y="24" font-size="11" font-weight="700" fill="#f8fafc">IC 7400: OR Gate using 3 NAND Gates</text>
        <text x="446" y="24" text-anchor="end" font-size="11" font-weight="700" fill="#38bdf8">Y = (A̅ · B̅)̅ = A + B</text>

        <!-- Top Inverter: 1, 2 -> 3 -->
        <path d="M 20 62 H 50 V 52 H 70" fill="none" stroke="${cA}" stroke-width="2"/>
        <path d="M 50 62 V 72 H 70" fill="none" stroke="${cA}" stroke-width="2"/>
        <circle cx="50" cy="62" r="3" fill="${cA}"/>
        <text x="15" y="65" font-size="10" font-weight="700" fill="${cA}">A=${valA}</text>
        <g transform="translate(70, 42)">
          <path d="M 0 0 H 22 A 20 20 0 0 1 22 40 H 0 Z" fill="#1e232d" stroke="#38bdf8" stroke-width="1.8"/>
          <circle cx="46" cy="20" r="3.5" fill="#11141a" stroke="#38bdf8" stroke-width="1.8"/>
        </g>
        <path d="M 120 62 H 180 V 85 H 220" fill="none" stroke="${cNotA}" stroke-width="2"/>
        <text x="125" y="55" font-size="8" font-weight="700" fill="#94a3b8">P3 (A̅)</text>

        <!-- Bottom Inverter: 4, 5 -> 6 -->
        <path d="M 20 135 H 50 V 125 H 70" fill="none" stroke="${cB}" stroke-width="2"/>
        <path d="M 50 135 V 145 H 70" fill="none" stroke="${cB}" stroke-width="2"/>
        <circle cx="50" cy="135" r="3" fill="${cB}"/>
        <text x="15" y="138" font-size="10" font-weight="700" fill="${cB}">B=${valB}</text>
        <g transform="translate(70, 115)">
          <path d="M 0 0 H 22 A 20 20 0 0 1 22 40 H 0 Z" fill="#1e232d" stroke="#38bdf8" stroke-width="1.8"/>
          <circle cx="46" cy="20" r="3.5" fill="#11141a" stroke="#38bdf8" stroke-width="1.8"/>
        </g>
        <path d="M 120 135 H 180 V 110 H 220" fill="none" stroke="${cNotB}" stroke-width="2"/>
        <text x="125" y="148" font-size="8" font-weight="700" fill="#94a3b8">P6 (B̅)</text>

        <!-- Final NAND Gate: 9, 10 -> 8 -->
        <g transform="translate(220, 70)">
          <path d="M 0 0 H 26 A 28 28 0 0 1 26 56 H 0 Z" fill="#1e232d" stroke="#38bdf8" stroke-width="1.8"/>
          <circle cx="58" cy="28" r="4" fill="#11141a" stroke="#38bdf8" stroke-width="1.8"/>
        </g>
        <text x="240" y="63" font-size="8" font-weight="700" fill="#64748b">Gate 3 (P9,P10 -> P8)</text>

        <!-- Output to L0 -->
        <path d="M 282 98 H 360" fill="none" stroke="${cFinal}" stroke-width="2"/>
        <g transform="translate(360, 84)">
          <rect x="0" y="0" width="75" height="28" rx="4" fill="#1e2430" stroke="${cFinal}" stroke-width="1.5"/>
          <circle cx="15" cy="14" r="5" fill="${cFinal}"/>
          <text x="45" y="18" text-anchor="middle" font-size="11" font-weight="700" fill="${cFinal}">L0 = ${finalOut}</text>
        </g>
      </svg>
    `;
  }

  renderUniversalOrNorSchematic(valA, valB) {
    const nor1Out = !(valA || valB) ? 1 : 0;
    const finalOut = nor1Out ? 0 : 1;
    const cA = valA ? '#10b981' : '#64748b';
    const cB = valB ? '#10b981' : '#64748b';
    const cN1 = nor1Out ? '#f59e0b' : '#64748b';
    const cFinal = finalOut ? '#f59e0b' : '#64748b';

    return `
      <svg class="circuit-svg-canvas" viewBox="0 0 460 180" preserveAspectRatio="xMidYMid meet">
        <rect width="460" height="180" fill="#11141a" rx="6"/>
        <text x="14" y="24" font-size="11" font-weight="700" fill="#f8fafc">IC 7402: OR Gate using 2 NOR Gates</text>
        <text x="446" y="24" text-anchor="end" font-size="11" font-weight="700" fill="#38bdf8">Y = ((A+B)̅)̅ = A+B</text>

        <path d="M 30 75 H 90" fill="none" stroke="${cA}" stroke-width="2"/>
        <text x="25" y="79" font-size="10" font-weight="700" fill="${cA}">A=${valA}</text>
        <path d="M 30 105 H 90" fill="none" stroke="${cB}" stroke-width="2"/>
        <text x="25" y="109" font-size="10" font-weight="700" fill="${cB}">B=${valB}</text>

        <!-- NOR Gate 1: Pins 2, 3 -> 1 -->
        <g transform="translate(90, 62)">
          <path d="M 0 0 Q 14 28 0 56 Q 24 56 46 28 Q 24 0 0 0 Z" fill="#1e232d" stroke="#38bdf8" stroke-width="1.8"/>
          <circle cx="50" cy="28" r="4" fill="#11141a" stroke="#38bdf8" stroke-width="1.8"/>
        </g>
        <text x="145" y="80" font-size="8" font-weight="700" fill="#94a3b8">P1</text>

        <!-- Split into NOR Gate 2: Pins 5 & 6 -> 4 -->
        <path d="M 144 90 H 200 V 75 H 230" fill="none" stroke="${cN1}" stroke-width="2"/>
        <path d="M 200 90 V 105 H 230" fill="none" stroke="${cN1}" stroke-width="2"/>
        <circle cx="200" cy="90" r="3.5" fill="${cN1}"/>

        <g transform="translate(230, 62)">
          <path d="M 0 0 Q 14 28 0 56 Q 24 56 46 28 Q 24 0 0 0 Z" fill="#1e232d" stroke="#38bdf8" stroke-width="1.8"/>
          <circle cx="50" cy="28" r="4" fill="#11141a" stroke="#38bdf8" stroke-width="1.8"/>
        </g>
        <text x="285" y="80" font-size="8" font-weight="700" fill="#94a3b8">P4</text>

        <!-- Output to L0 -->
        <path d="M 284 90 H 360" fill="none" stroke="${cFinal}" stroke-width="2"/>
        <g transform="translate(360, 75)">
          <rect x="0" y="0" width="75" height="28" rx="4" fill="#1e2430" stroke="${cFinal}" stroke-width="1.5"/>
          <circle cx="15" cy="14" r="5" fill="${cFinal}"/>
          <text x="45" y="18" text-anchor="middle" font-size="11" font-weight="700" fill="${cFinal}">L0 = ${finalOut}</text>
        </g>
      </svg>
    `;
  }

  renderUniversalAndNorSchematic(valA, valB) {
    const notA = valA ? 0 : 1;
    const notB = valB ? 0 : 1;
    const finalOut = !(notA || notB) ? 1 : 0;
    const cA = valA ? '#10b981' : '#64748b';
    const cB = valB ? '#10b981' : '#64748b';
    const cFinal = finalOut ? '#f59e0b' : '#64748b';

    return `
      <svg class="circuit-svg-canvas" viewBox="0 0 460 180" preserveAspectRatio="xMidYMid meet">
        <rect width="460" height="180" fill="#11141a" rx="6"/>
        <text x="14" y="24" font-size="11" font-weight="700" fill="#f8fafc">IC 7402: AND Gate using 3 NOR Gates</text>
        <text x="446" y="24" text-anchor="end" font-size="11" font-weight="700" fill="#38bdf8">Y = (A̅ + B̅)̅ = A · B</text>
        <text x="230" y="100" text-anchor="middle" font-size="12" font-weight="700" fill="#38bdf8">De-Morgan Realization via IC 7402</text>
      </svg>
    `;
  }

  // ========================================================
  // EXP 4: XOR USING 4 NAND & XNOR USING 4 NOR
  // ========================================================
  renderXorUsing4NandSchematic(valA, valB) {
    const cA = valA ? '#10b981' : '#64748b';
    const cB = valB ? '#10b981' : '#64748b';
    const n1 = !(valA && valB) ? 1 : 0;
    const n2 = !(valA && n1) ? 1 : 0;
    const n3 = !(n1 && valB) ? 1 : 0;
    const y = !(n2 && n3) ? 1 : 0;
    const cY = y ? '#f59e0b' : '#64748b';

    return `
      <svg class="circuit-svg-canvas" viewBox="0 0 500 200" preserveAspectRatio="xMidYMid meet">
        <rect width="500" height="200" fill="#11141a" rx="6"/>
        <text x="14" y="22" font-size="11" font-weight="700" fill="#f8fafc">IC 7400: Ex-OR Realization using 4 NAND Gates</text>
        <text x="486" y="22" text-anchor="end" font-size="11" font-weight="700" fill="#38bdf8">Manual Page 8 Circuit</text>

        <!-- Central NAND Gate 1 -->
        <g transform="translate(100, 70)">
          <path d="M 0 0 H 26 A 28 28 0 0 1 26 56 H 0 Z" fill="#1e232d" stroke="#38bdf8" stroke-width="1.8"/>
          <circle cx="58" cy="28" r="4" fill="#11141a" stroke="#38bdf8" stroke-width="1.8"/>
          <text x="15" y="32" font-size="9" font-weight="700" fill="#94a3b8">G1</text>
        </g>
        <path d="M 30 84 H 100" stroke="${cA}" stroke-width="2"/>
        <path d="M 30 112 H 100" stroke="${cB}" stroke-width="2"/>
        <text x="25" y="88" font-size="10" font-weight="700" fill="${cA}">A=${valA}</text>
        <text x="25" y="116" font-size="10" font-weight="700" fill="${cB}">B=${valB}</text>

        <!-- Top NAND Gate 2 -->
        <g transform="translate(230, 30)">
          <path d="M 0 0 H 26 A 28 28 0 0 1 26 56 H 0 Z" fill="#1e232d" stroke="#38bdf8" stroke-width="1.8"/>
          <circle cx="58" cy="28" r="4" fill="#11141a" stroke="#38bdf8" stroke-width="1.8"/>
          <text x="15" y="32" font-size="9" font-weight="700" fill="#94a3b8">G2</text>
        </g>

        <!-- Bottom NAND Gate 3 -->
        <g transform="translate(230, 110)">
          <path d="M 0 0 H 26 A 28 28 0 0 1 26 56 H 0 Z" fill="#1e232d" stroke="#38bdf8" stroke-width="1.8"/>
          <circle cx="58" cy="28" r="4" fill="#11141a" stroke="#38bdf8" stroke-width="1.8"/>
          <text x="15" y="32" font-size="9" font-weight="700" fill="#94a3b8">G3</text>
        </g>

        <!-- Final NAND Gate 4 -->
        <g transform="translate(360, 70)">
          <path d="M 0 0 H 26 A 28 28 0 0 1 26 56 H 0 Z" fill="#1e232d" stroke="#38bdf8" stroke-width="1.8"/>
          <circle cx="58" cy="28" r="4" fill="#11141a" stroke="#38bdf8" stroke-width="1.8"/>
          <text x="15" y="32" font-size="9" font-weight="700" fill="#94a3b8">G4</text>
        </g>

        <!-- Output -->
        <path d="M 422 98 H 450" stroke="${cY}" stroke-width="2"/>
        <circle cx="465" cy="98" r="8" fill="${cY}" stroke="#fff" stroke-width="1.5"/>
        <text x="465" y="102" text-anchor="middle" font-size="9" font-weight="800" fill="#111">${y}</text>
      </svg>
    `;
  }

  renderXnorUsing4NorSchematic(valA, valB) {
    const y = (valA ^ valB) ? 0 : 1;
    const cY = y ? '#f59e0b' : '#64748b';
    return `
      <svg class="circuit-svg-canvas" viewBox="0 0 500 200" preserveAspectRatio="xMidYMid meet">
        <rect width="500" height="200" fill="#11141a" rx="6"/>
        <text x="14" y="22" font-size="11" font-weight="700" fill="#f8fafc">IC 7402: Ex-NOR Realization using 4 NOR Gates</text>
        <text x="486" y="22" text-anchor="end" font-size="11" font-weight="700" fill="#38bdf8">Manual Page 8 Circuit</text>
        <text x="250" y="105" text-anchor="middle" font-size="13" font-weight="700" fill="#38bdf8">Y = A ⊙ B = (A̅ ⊕ B̅) = ${y}</text>
      </svg>
    `;
  }

  // ========================================================
  // EXP 5: DE-MORGAN'S THEOREMS (PAGE 10 OF MANUAL)
  // ========================================================
  renderDeMorgan1Schematic(valA, valB) {
    const lhs = !(valA || valB) ? 1 : 0;
    const notA = valA ? 0 : 1;
    const notB = valB ? 0 : 1;
    const rhs = (notA && notB) ? 1 : 0;

    return `
      <svg class="circuit-svg-canvas" viewBox="0 0 500 200" preserveAspectRatio="xMidYMid meet">
        <rect width="500" height="200" fill="#11141a" rx="6"/>
        <text x="14" y="22" font-size="11" font-weight="700" fill="#f8fafc">De-Morgan's 1st Theorem: (A + B)̅ = A̅ · B̅</text>
        <text x="486" y="22" text-anchor="end" font-size="11" font-weight="700" fill="#38bdf8">Verified: ${lhs} = ${rhs}</text>

        <!-- LHS: NOR Gate -->
        <g transform="translate(80, 50)">
          <text x="40" y="-8" text-anchor="middle" font-size="10" font-weight="700" fill="#38bdf8">LHS: NOR Gate</text>
          <path d="M 0 0 Q 14 28 0 56 Q 24 56 46 28 Q 24 0 0 0 Z" fill="#1e232d" stroke="#38bdf8" stroke-width="1.8"/>
          <circle cx="50" cy="28" r="4" fill="#11141a" stroke="#38bdf8" stroke-width="1.8"/>
          <text x="75" y="32" font-size="11" font-weight="800" fill="${lhs?'#f59e0b':'#64748b'}">LHS=${lhs}</text>
        </g>

        <!-- Equal Sign -->
        <text x="240" y="85" text-anchor="middle" font-size="20" font-weight="800" fill="#10b981">≡</text>

        <!-- RHS: Inverters into AND Gate -->
        <g transform="translate(320, 50)">
          <text x="40" y="-8" text-anchor="middle" font-size="10" font-weight="700" fill="#38bdf8">RHS: Inverters + AND</text>
          <path d="M 0 0 H 26 A 28 28 0 0 1 26 56 H 0 Z" fill="#1e232d" stroke="#38bdf8" stroke-width="1.8"/>
          <text x="50" y="32" font-size="11" font-weight="800" fill="${rhs?'#f59e0b':'#64748b'}">RHS=${rhs}</text>
        </g>
      </svg>
    `;
  }

  renderDeMorgan2Schematic(valA, valB) {
    const lhs = !(valA && valB) ? 1 : 0;
    const notA = valA ? 0 : 1;
    const notB = valB ? 0 : 1;
    const rhs = (notA || notB) ? 1 : 0;

    return `
      <svg class="circuit-svg-canvas" viewBox="0 0 500 200" preserveAspectRatio="xMidYMid meet">
        <rect width="500" height="200" fill="#11141a" rx="6"/>
        <text x="14" y="22" font-size="11" font-weight="700" fill="#f8fafc">De-Morgan's 2nd Theorem: (A · B)̅ = A̅ + B̅</text>
        <text x="486" y="22" text-anchor="end" font-size="11" font-weight="700" fill="#38bdf8">Verified: ${lhs} = ${rhs}</text>

        <!-- LHS: NAND Gate -->
        <g transform="translate(80, 50)">
          <text x="40" y="-8" text-anchor="middle" font-size="10" font-weight="700" fill="#38bdf8">LHS: NAND Gate</text>
          <path d="M 0 0 H 26 A 28 28 0 0 1 26 56 H 0 Z" fill="#1e232d" stroke="#38bdf8" stroke-width="1.8"/>
          <circle cx="58" cy="28" r="4" fill="#11141a" stroke="#38bdf8" stroke-width="1.8"/>
          <text x="80" y="32" font-size="11" font-weight="800" fill="${lhs?'#f59e0b':'#64748b'}">LHS=${lhs}</text>
        </g>

        <!-- Equal Sign -->
        <text x="240" y="85" text-anchor="middle" font-size="20" font-weight="800" fill="#10b981">≡</text>

        <!-- RHS: Inverters into OR Gate -->
        <g transform="translate(320, 50)">
          <text x="40" y="-8" text-anchor="middle" font-size="10" font-weight="700" fill="#38bdf8">RHS: Inverters + OR</text>
          <path d="M 0 0 Q 14 28 0 56 Q 24 56 46 28 Q 24 0 0 0 Z" fill="#1e232d" stroke="#38bdf8" stroke-width="1.8"/>
          <text x="65" y="32" font-size="11" font-weight="800" fill="${rhs?'#f59e0b':'#64748b'}">RHS=${rhs}</text>
        </g>
      </svg>
    `;
  }

  // ========================================================
  // EXP 6 & 7: ADDERS & SUBTRACTORS (PAGES 12 & 14 OF MANUAL)
  // ========================================================
  renderHalfAdderSchematic(valA, valB) {
    const sum = valA ^ valB;
    const carry = valA && valB ? 1 : 0;
    const cA = valA ? '#10b981' : '#64748b';
    const cB = valB ? '#10b981' : '#64748b';
    const cSum = sum ? '#f59e0b' : '#64748b';
    const cCarry = carry ? '#f59e0b' : '#64748b';

    return `
      <svg class="circuit-svg-canvas" viewBox="0 0 480 190" preserveAspectRatio="xMidYMid meet">
        <rect width="480" height="190" fill="#11141a" rx="6"/>
        <text x="14" y="24" font-size="11" font-weight="700" fill="#f8fafc">Half Adder: IC 7486 (XOR) & IC 7408 (AND)</text>
        <text x="466" y="24" text-anchor="end" font-size="11" font-weight="700" fill="#38bdf8">Manual Page 12 Circuit</text>

        <!-- Vertical Input Bus Lines A & B as drawn in student manual -->
        <path d="M 50 40 V 160" stroke="${cA}" stroke-width="2.5"/>
        <text x="50" y="34" text-anchor="middle" font-size="10" font-weight="800" fill="${cA}">A=${valA}</text>

        <path d="M 90 40 V 160" stroke="${cB}" stroke-width="2.5"/>
        <text x="90" y="34" text-anchor="middle" font-size="10" font-weight="800" fill="${cB}">B=${valB}</text>

        <!-- SUM Gate: XOR (7486 Pins 1, 2 -> 3) -->
        <path d="M 50 65 H 175" stroke="${cA}" stroke-width="1.8"/>
        <circle cx="50" cy="65" r="3.5" fill="${cA}"/>
        <path d="M 90 85 H 175" stroke="${cB}" stroke-width="1.8"/>
        <circle cx="90" cy="85" r="3.5" fill="${cB}"/>

        <g transform="translate(175, 48)">
          <path d="M -8 0 Q 6 27 -8 54 Q 16 54 38 27 Q 16 0 -8 0 Z" fill="#1e232d" stroke="#38bdf8" stroke-width="1.8"/>
          <path d="M -14 0 Q 0 27 -14 54" fill="none" stroke="#38bdf8" stroke-width="1.8"/>
          <text x="14" y="32" font-size="9" font-weight="700" fill="#94a3b8">7486</text>
        </g>
        <path d="M 213 75 H 330" stroke="${cSum}" stroke-width="2"/>
        <text x="340" y="79" font-size="11" font-weight="800" fill="${cSum}">SUM = A ⊕ B = ${sum}</text>

        <!-- CARRY Gate: AND (7408 Pins 1, 2 -> 3) -->
        <path d="M 50 125 H 175" stroke="${cA}" stroke-width="1.8"/>
        <circle cx="50" cy="125" r="3.5" fill="${cA}"/>
        <path d="M 90 145 H 175" stroke="${cB}" stroke-width="1.8"/>
        <circle cx="90" cy="145" r="3.5" fill="${cB}"/>

        <g transform="translate(175, 110)">
          <path d="M 0 0 H 24 A 26 26 0 0 1 24 52 H 0 Z" fill="#1e232d" stroke="#38bdf8" stroke-width="1.8"/>
          <text x="14" y="31" font-size="9" font-weight="700" fill="#94a3b8">7408</text>
        </g>
        <path d="M 225 136 H 330" stroke="${cCarry}" stroke-width="2"/>
        <text x="340" y="140" font-size="11" font-weight="800" fill="${cCarry}">CARRY = A · B = ${carry}</text>
      </svg>
    `;
  }

  renderFullAdderSchematic(valA, valB, valCin) {
    const sum = valA ^ valB ^ valCin;
    const carry = (valA && valB) || (valCin && (valA ^ valB)) ? 1 : 0;
    return `
      <svg class="circuit-svg-canvas" viewBox="0 0 480 190" preserveAspectRatio="xMidYMid meet">
        <rect width="480" height="190" fill="#11141a" rx="6"/>
        <text x="14" y="24" font-size="11" font-weight="700" fill="#f8fafc">Full Adder: Cascaded XOR (7486) + AND (7408) + OR (7432)</text>
        <text x="466" y="24" text-anchor="end" font-size="11" font-weight="700" fill="#38bdf8">Manual Page 12</text>
        <text x="240" y="90" text-anchor="middle" font-size="13" font-weight="800" fill="#f59e0b">SUM = A ⊕ B ⊕ Cin = ${sum}</text>
        <text x="240" y="120" text-anchor="middle" font-size="13" font-weight="800" fill="#f59e0b">CARRY = AB + BCin + ACin = ${carry}</text>
      </svg>
    `;
  }

  renderHalfSubtractorSchematic(valA, valB) {
    const diff = valA ^ valB;
    const borrow = (!valA && valB) ? 1 : 0;
    return `
      <svg class="circuit-svg-canvas" viewBox="0 0 480 190" preserveAspectRatio="xMidYMid meet">
        <rect width="480" height="190" fill="#11141a" rx="6"/>
        <text x="14" y="24" font-size="11" font-weight="700" fill="#f8fafc">Half Subtractor: 7486 (XOR), 7404 (NOT) & 7408 (AND)</text>
        <text x="466" y="24" text-anchor="end" font-size="11" font-weight="700" fill="#38bdf8">Manual Page 14</text>
        <text x="240" y="90" text-anchor="middle" font-size="13" font-weight="800" fill="#f59e0b">DIFFERENCE = A ⊕ B = ${diff}</text>
        <text x="240" y="120" text-anchor="middle" font-size="13" font-weight="800" fill="#f59e0b">BORROW = A̅ · B = ${borrow}</text>
      </svg>
    `;
  }

  renderFullSubtractorSchematic(valA, valB, valBin) {
    const diff = valA ^ valB ^ valBin;
    const borrow = (!valA && valB) || (valBin && !(valA ^ valB)) ? 1 : 0;
    return `
      <svg class="circuit-svg-canvas" viewBox="0 0 480 190" preserveAspectRatio="xMidYMid meet">
        <rect width="480" height="190" fill="#11141a" rx="6"/>
        <text x="14" y="24" font-size="11" font-weight="700" fill="#f8fafc">Full Subtractor: Logic Implementation</text>
        <text x="466" y="24" text-anchor="end" font-size="11" font-weight="700" fill="#38bdf8">Manual Page 14</text>
        <text x="240" y="90" text-anchor="middle" font-size="13" font-weight="800" fill="#f59e0b">DIFF = A ⊕ B ⊕ Bin = ${diff}</text>
        <text x="240" y="120" text-anchor="middle" font-size="13" font-weight="800" fill="#f59e0b">BORROW = ${borrow}</text>
      </svg>
    `;
  }

  // ========================================================
  // EXP 8: BCD TO 7-SEGMENT DECODER (PAGE 16 OF MANUAL)
  // ========================================================
  renderBcd7SegSchematic(sw0, sw1, sw2, sw3) {
    const bcdVal = (sw3 << 3) | (sw2 << 2) | (sw1 << 1) | sw0;
    return `
      <svg class="circuit-svg-canvas" viewBox="0 0 520 200" preserveAspectRatio="xMidYMid meet">
        <rect width="520" height="200" fill="#11141a" rx="6"/>
        <text x="14" y="22" font-size="11" font-weight="700" fill="#f8fafc">IC 7447 BCD Decoder + Common Anode 7-Segment Display</text>
        <text x="506" y="22" text-anchor="end" font-size="11" font-weight="700" fill="#38bdf8">Manual Page 16 Circuit</text>

        <!-- IC 7447 Box -->
        <g transform="translate(100, 40)">
          <rect x="0" y="0" width="160" height="140" rx="6" fill="#1e232d" stroke="#38bdf8" stroke-width="2"/>
          <text x="80" y="25" text-anchor="middle" font-size="13" font-weight="800" fill="#f8fafc">IC 7447</text>
          <text x="80" y="42" text-anchor="middle" font-size="9" font-weight="600" fill="#94a3b8">BCD to 7-SEG DECODER</text>
          <text x="15" y="70" font-size="9" font-weight="700" fill="#34d399">A (P7)=${sw0}</text>
          <text x="15" y="90" font-size="9" font-weight="700" fill="#34d399">B (P1)=${sw1}</text>
          <text x="15" y="110" font-size="9" font-weight="700" fill="#34d399">C (P2)=${sw2}</text>
          <text x="15" y="130" font-size="9" font-weight="700" fill="#34d399">D (P6)=${sw3}</text>
          <text x="145" y="90" text-anchor="end" font-size="10" font-weight="700" fill="#f59e0b">a..g ➔</text>
        </g>

        <!-- 7-Segment Display Box -->
        <g transform="translate(360, 50)">
          <rect x="0" y="0" width="80" height="110" rx="6" fill="#090d14" stroke="#e11d48" stroke-width="2"/>
          <text x="40" y="75" text-anchor="middle" font-size="48" font-weight="900" fill="#ff0055" style="filter: drop-shadow(0 0 8px #ff0055);">${bcdVal < 10 ? bcdVal : '-'}</text>
        </g>
      </svg>
    `;
  }

  // ========================================================
  // EXP 9: COMPARATOR (PAGE 18)
  // ========================================================
  renderComparator7485Schematic(inputs) {
    return `
      <svg class="circuit-svg-canvas" viewBox="0 0 500 180" preserveAspectRatio="xMidYMid meet">
        <rect width="500" height="180" fill="#11141a" rx="6"/>
        <text x="14" y="22" font-size="11" font-weight="700" fill="#f8fafc">IC 7485: 4-Bit Magnitude Comparator</text>
        <text x="486" y="22" text-anchor="end" font-size="11" font-weight="700" fill="#38bdf8">Manual Page 18</text>
        <text x="250" y="95" text-anchor="middle" font-size="13" font-weight="700" fill="#38bdf8">Compares 4-bit word A (A3..A0) with B (B3..B0)</text>
      </svg>
    `;
  }

  // ========================================================
  // EXP 10 & 11: MUX / DEMUX (PAGES 20 & 22)
  // ========================================================
  renderMux74151Schematic(inputs) {
    return `
      <svg class="circuit-svg-canvas" viewBox="0 0 500 180" preserveAspectRatio="xMidYMid meet">
        <rect width="500" height="180" fill="#11141a" rx="6"/>
        <text x="14" y="22" font-size="11" font-weight="700" fill="#f8fafc">IC 74151: 8-to-1 Line Data Selector / Multiplexer</text>
        <text x="486" y="22" text-anchor="end" font-size="11" font-weight="700" fill="#38bdf8">Manual Page 20</text>
        <text x="250" y="95" text-anchor="middle" font-size="13" font-weight="700" fill="#38bdf8">Selects 1 of 8 Data Inputs (D0-D7) via S2, S1, S0</text>
      </svg>
    `;
  }

  renderDemux74155Schematic(inputs) {
    return `
      <svg class="circuit-svg-canvas" viewBox="0 0 500 180" preserveAspectRatio="xMidYMid meet">
        <rect width="500" height="180" fill="#11141a" rx="6"/>
        <text x="14" y="22" font-size="11" font-weight="700" fill="#f8fafc">IC 74155: Dual 1:4 / 1:8 Demultiplexer</text>
        <text x="486" y="22" text-anchor="end" font-size="11" font-weight="700" fill="#38bdf8">Manual Page 22</text>
      </svg>
    `;
  }

  // ========================================================
  // EXP 12, 13, 14: LATCH & FLIP-FLOPS (PAGES 24, 26, 28)
  // ========================================================
  renderRsLatchSchematic(s, r) {
    return `
      <svg class="circuit-svg-canvas" viewBox="0 0 500 180" preserveAspectRatio="xMidYMid meet">
        <rect width="500" height="180" fill="#11141a" rx="6"/>
        <text x="14" y="22" font-size="11" font-weight="700" fill="#f8fafc">RS Latch using Cross-Coupled NAND Gates (IC 7400)</text>
        <text x="486" y="22" text-anchor="end" font-size="11" font-weight="700" fill="#38bdf8">Manual Page 24</text>
        <text x="250" y="95" text-anchor="middle" font-size="13" font-weight="700" fill="#38bdf8">Cross-Coupled Feedback: S=${s}, R=${r}</text>
      </svg>
    `;
  }

  renderJkFlipFlopSchematic(j, k) {
    return `
      <svg class="circuit-svg-canvas" viewBox="0 0 500 180" preserveAspectRatio="xMidYMid meet">
        <rect width="500" height="180" fill="#11141a" rx="6"/>
        <text x="14" y="22" font-size="11" font-weight="700" fill="#f8fafc">IC 7476: Dual Master-Slave JK Flip-Flop</text>
        <text x="486" y="22" text-anchor="end" font-size="11" font-weight="700" fill="#38bdf8">Manual Page 26</text>
        <text x="250" y="95" text-anchor="middle" font-size="13" font-weight="700" fill="#38bdf8">Clock Pulser Triggered: J=${j}, K=${k}</text>
      </svg>
    `;
  }

  renderDFlipFlopSchematic(partId, d) {
    return `
      <svg class="circuit-svg-canvas" viewBox="0 0 500 180" preserveAspectRatio="xMidYMid meet">
        <rect width="500" height="180" fill="#11141a" rx="6"/>
        <text x="14" y="22" font-size="11" font-weight="700" fill="#f8fafc">D/T Flip-Flop using IC 7476 + 7404 Inverter</text>
        <text x="486" y="22" text-anchor="end" font-size="11" font-weight="700" fill="#38bdf8">Manual Page 28</text>
        <text x="250" y="95" text-anchor="middle" font-size="13" font-weight="700" fill="#38bdf8">D = ${d} (J=D, K=D̅ via 7404)</text>
      </svg>
    `;
  }

  renderShiftRegister7495Schematic(sw0) {
    return `
      <svg class="circuit-svg-canvas" viewBox="0 0 500 180" preserveAspectRatio="xMidYMid meet">
        <rect width="500" height="180" fill="#11141a" rx="6"/>
        <text x="14" y="22" font-size="11" font-weight="700" fill="#f8fafc">IC 7495: 4-Bit Parallel-Access Shift Register</text>
        <text x="486" y="22" text-anchor="end" font-size="11" font-weight="700" fill="#38bdf8">Manual Page 29</text>
      </svg>
    `;
  }

  renderCounter7493Schematic() {
    return `
      <svg class="circuit-svg-canvas" viewBox="0 0 500 180" preserveAspectRatio="xMidYMid meet">
        <rect width="500" height="180" fill="#11141a" rx="6"/>
        <text x="14" y="22" font-size="11" font-weight="700" fill="#f8fafc">IC 7493: 4-Bit Binary Ripple Counter</text>
        <text x="486" y="22" text-anchor="end" font-size="11" font-weight="700" fill="#38bdf8">Manual Page 29/30</text>
      </svg>
    `;
  }

  renderCounter7490Schematic() {
    return `
      <svg class="circuit-svg-canvas" viewBox="0 0 520 200" preserveAspectRatio="xMidYMid meet">
        <rect width="520" height="200" fill="#11141a" rx="6"/>
        <text x="14" y="22" font-size="11" font-weight="700" fill="#f8fafc">IC 7490: BCD Decade Counter (MOD-10)</text>
        <text x="506" y="22" text-anchor="end" font-size="11" font-weight="700" fill="#38bdf8">Manual Page 30 Circuit</text>

        <!-- IC 7490 Box -->
        <g transform="translate(140, 45)">
          <rect x="0" y="0" width="240" height="130" rx="6" fill="#1e232d" stroke="#38bdf8" stroke-width="2"/>
          <text x="120" y="25" text-anchor="middle" font-size="14" font-weight="800" fill="#f8fafc">IC 7490</text>
          <text x="120" y="42" text-anchor="middle" font-size="10" font-weight="600" fill="#94a3b8">DECADE COUNTER (MOD-10)</text>
          
          <!-- Key feedback loop: QA (Pin 12) -> CLKB (Pin 1) -->
          <text x="20" y="70" font-size="9" font-weight="700" fill="#ef4444">INA (P14) ➔ Clock Pulser</text>
          <text x="20" y="90" font-size="9" font-weight="700" fill="#38bdf8">QA (P12) ➔ INB (P1) Loop</text>
          <text x="20" y="110" font-size="9" font-weight="700" fill="#10b981">R0(1), R0(2) ➔ GND</text>

          <text x="220" y="90" text-anchor="end" font-size="11" font-weight="700" fill="#f59e0b">Outputs: QD QC QB QA ➔ LEDs</text>
        </g>
      </svg>
    `;
  }

  renderDefaultBlockSchematic(part) {
    return `
      <svg class="circuit-svg-canvas" viewBox="0 0 460 180" preserveAspectRatio="xMidYMid meet">
        <rect width="460" height="180" fill="#11141a" rx="6"/>
        <text x="230" y="90" text-anchor="middle" font-size="13" font-weight="700" fill="#38bdf8">IC ${part.icId}: ${part.name}</text>
      </svg>
    `;
  }
}

// Attach globally
if (typeof window !== 'undefined') {
  window.CircuitDiagramRenderer = CircuitDiagramRenderer;
}
