/**
 * DIGITAL TECHNIQUES VIRTUAL TRAINER KIT SIMULATOR
 * Realistic Stackable Banana Plug Virtual Wiring System
 * Features authentic 4mm stackable laboratory patch cords, 3D banana plugs,
 * stacking tower physics, and natural bezier wire droop.
 */

class WiringSystem {
  constructor(svgContainer, boardCoords, onCircuitChanged) {
    this.svg = svgContainer;
    this.boardCoords = boardCoords;
    this.onCircuitChanged = onCircuitChanged;

    this.wires = []; // Array of wire objects
    this.selectedWireId = null;
    this.pendingFromHole = null;
    this.activeColor = '#ff2222'; // Default red

    this.wireColorPalette = [
      { name: 'Red (+5V / VCC)',   color: '#ff2222' },
      { name: 'Black (GND)',       color: '#111111' },
      { name: 'Blue (Input A)',    color: '#2277ff' },
      { name: 'Green (Input B)',   color: '#11aa44' },
      { name: 'Yellow (Input C)',  color: '#eebb00' },
      { name: 'Orange (Outputs)',  color: '#ff8800' },
      { name: 'Purple (Clock/IC)', color: '#aa33cc' },
      { name: 'White',             color: '#ffffff' }
    ];

    // Layers inside SVG
    this.wiresGroup = null;
    this.previewLayer = null;
    this.plugsGroup = null;

    this.initSvgLayers();
  }

  initSvgLayers() {
    if (!this.svg) return;
    this.svg.innerHTML = `
      <defs>
        <!-- Realistic wire ambient drop shadow -->
        <filter id="wire-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="1.5" dy="4" stdDeviation="3" flood-color="#000000" flood-opacity="0.65"/>
        </filter>
        <!-- Banana plug shadow -->
        <filter id="plug-shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="1" dy="2.5" stdDeviation="2" flood-color="#000000" flood-opacity="0.7"/>
        </filter>
        <!-- Stacked plug upper layer shadow -->
        <filter id="stack-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="1.5" dy="3.5" stdDeviation="2.5" flood-color="#000000" flood-opacity="0.85"/>
        </filter>
      </defs>
      <g id="svg-wires-layer"></g>
      <g id="svg-preview-layer"></g>
      <g id="svg-plugs-layer"></g>
    `;

    this.wiresGroup = this.svg.querySelector('#svg-wires-layer');
    this.previewLayer = this.svg.querySelector('#svg-preview-layer');
    this.plugsGroup = this.svg.querySelector('#svg-plugs-layer');
  }

  setColor(color) {
    this.activeColor = color;
  }

  startWiring(holeId) {
    const hole = HOLE_LOOKUP[holeId];
    if (!hole) return;
    this.pendingFromHole = holeId;
    this.updatePreview(hole.x, hole.y);
  }

  cancelWiring() {
    this.pendingFromHole = null;
    if (this.previewLayer) {
      this.previewLayer.innerHTML = '';
    }
  }

  completeWiring(toHoleId) {
    if (!this.pendingFromHole || this.pendingFromHole === toHoleId) {
      this.cancelWiring();
      return null;
    }

    const fromHole = this.pendingFromHole;
    this.pendingFromHole = null;
    if (this.previewLayer) this.previewLayer.innerHTML = '';

    // Check if duplicate wire already exists between same two holes
    const exists = this.wires.some(w =>
      (w.fromHole === fromHole && w.toHole === toHoleId) ||
      (w.fromHole === toHoleId && w.toHole === fromHole)
    );
    if (exists) return null;

    const wire = this.addWire(fromHole, toHoleId, this.activeColor);
    if (this.onCircuitChanged) {
      this.onCircuitChanged(this.wires);
    }
    return wire;
  }

  addWire(fromHoleId, toHoleId, color = null, label = '', stepNumber = null) {
    const fromHole = HOLE_LOOKUP[fromHoleId];
    const toHole = HOLE_LOOKUP[toHoleId];
    if (!fromHole || !toHole) return null;

    const wireId = `wire_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const wire = {
      id: wireId,
      fromHole: fromHoleId,
      toHole: toHoleId,
      color: color || this.activeColor,
      label: label || `${fromHole.name || fromHoleId} → ${toHole.name || toHoleId}`,
      stepNumber: stepNumber,
      slack: (Math.random() * 16) - 8, // slight organic slack variation
      selected: false
    };

    this.wires.push(wire);
    this.render();
    return wire;
  }

  removeWire(wireId) {
    const idx = this.wires.findIndex(w => w.id === wireId);
    if (idx !== -1) {
      this.wires.splice(idx, 1);
      if (this.selectedWireId === wireId) {
        this.selectedWireId = null;
      }
      this.render();
      if (this.onCircuitChanged) {
        this.onCircuitChanged(this.wires);
      }
    }
  }

  clearAllWires() {
    this.wires = [];
    this.selectedWireId = null;
    this.pendingFromHole = null;
    this.render();
    if (this.onCircuitChanged) {
      this.onCircuitChanged(this.wires);
    }
  }

  selectWire(wireId) {
    this.selectedWireId = wireId;
    this.wires.forEach(w => w.selected = (w.id === wireId));
    this.render();
  }

  deleteSelected() {
    if (this.selectedWireId) {
      this.removeWire(this.selectedWireId);
    }
  }

  updatePreview(currentX, currentY) {
    if (!this.pendingFromHole || !this.previewLayer) return;
    const fromHole = HOLE_LOOKUP[this.pendingFromHole];
    if (!fromHole) return;

    // Calculate stack offset for preview starting point
    const fromStackCount = this.getHoleStackCount(this.pendingFromHole);
    const startPt = this.getStackOffset(fromHole.x, fromHole.y, fromStackCount);

    const pathData = this.calculateWirePath(startPt.x, startPt.y, currentX, currentY, 0);

    this.previewLayer.innerHTML = `
      <path d="${pathData}"
            stroke="${this.activeColor}"
            stroke-width="5"
            stroke-linecap="round"
            stroke-dasharray="6,4"
            fill="none"
            opacity="0.85" />
      ${this.renderStackablePlugSvg(startPt.x, startPt.y, this.activeColor, fromStackCount, 0)}
      <circle cx="${currentX}" cy="${currentY}" r="5" fill="${this.activeColor}" opacity="0.75"/>
    `;
  }

  /**
   * Count how many wires currently connect into a specific hole
   */
  getHoleStackCount(holeId) {
    let count = 0;
    this.wires.forEach(w => {
      if (w.fromHole === holeId || w.toHole === holeId) count++;
    });
    return count;
  }

  /**
   * Offset for stackable banana plugs plugged on top of each other
   */
  getStackOffset(baseX, baseY, stackIndex) {
    if (stackIndex === 0) return { x: baseX, y: baseY };
    // Subtle upward vertical stepping to show stacked plugs
    return {
      x: baseX,
      y: baseY - stackIndex * 4.5
    };
  }

  /**
   * Natural hanging jumper wire path
   */
  calculateWirePath(x1, y1, x2, y2, slackOffset = 0) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Natural gravity sag based on distance
    const minSag = 24;
    const sag = Math.max(minSag, dist * 0.20) + slackOffset;

    // Cubic bezier with 2 control points for smooth flexible patch cord curve
    const cp1x = x1 + dx * 0.22;
    const cp1y = y1 + sag * 0.85;
    const cp2x = x1 + dx * 0.78;
    const cp2y = y2 + sag * 0.85;

    return `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
  }

  /**
   * Render an authentic 3D Stackable Banana Plug Connector
   */
  renderStackablePlugSvg(x, y, color, stackIndex, angle = 0, isSelected = false, wireId = null) {
    const isStacked = (stackIndex > 0);
    const filter = isStacked ? 'url(#stack-shadow)' : 'url(#plug-shadow)';

    return `
      <g class="stackable-plug ${isSelected ? 'plug-selected' : ''}"
         transform="translate(${x}, ${y})"
         filter="${filter}"
         data-wire-id="${wireId || ''}"
         style="cursor: pointer;">
        <!-- Base metallic trainer kit socket collar around hole (visible under bottom plug) -->
        ${!isStacked ? `
          <circle cx="0" cy="0" r="7" fill="none" stroke="#64748b" stroke-width="1.8" opacity="0.85" />
          <circle cx="0" cy="0" r="4.5" fill="#09090b" />
        ` : ''}

        <!-- Selected plug glowing ring -->
        ${isSelected ? `
          <circle cx="0" cy="0" r="10.5" fill="none" stroke="#fbbf24" stroke-width="3" opacity="0.9" />
        ` : ''}

        <!-- Molded Insulated Banana Plug Barrel (4mm stackable lab standard) -->
        <rect x="-6.5" y="-6.5" width="13" height="13" rx="4" fill="${color}" stroke="#0f172a" stroke-width="1.2" />

        <!-- 3D Specular Highlight on top bevel of plug barrel -->
        <path d="M -5 -4.5 L 5 -4.5" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" opacity="0.6" />
        <!-- Bottom ambient shadow bevel on plug barrel -->
        <path d="M -4.5 5 L 4.5 5" stroke="#000000" stroke-width="1.4" stroke-linecap="round" opacity="0.38" />

        <!-- Top Stackable Female Jack (Where another banana plug inserts!) -->
        <circle cx="0" cy="0" r="4.3" fill="#334155" stroke="#cbd5e1" stroke-width="1.2" />
        <!-- Inner stackable entry hole -->
        <circle cx="0" cy="0" r="2.5" fill="#020617" />
        <!-- Metallic internal contact glint -->
        <circle cx="-0.8" cy="-0.8" r="1.3" fill="none" stroke="#ffffff" stroke-width="0.7" opacity="0.75" />

        <!-- Stack level indicator badge (if stacked 2 or more) -->
        ${isStacked ? `
          <circle cx="6.5" cy="-6.5" r="3.8" fill="#f8fafc" stroke="#0f172a" stroke-width="1" />
          <text x="6.5" y="-4.7" font-size="4.5" font-family="system-ui, -apple-system, sans-serif" font-weight="900" fill="#0f172a" text-anchor="middle">${stackIndex + 1}</text>
        ` : ''}
      </g>
    `;
  }

  /**
   * Render all wires and stackable banana plugs
   */
  render() {
    if (!this.wiresGroup || !this.plugsGroup) return;

    let wiresHtml = '';
    let plugsHtml = '';

    // Track stack indices at each hole
    const holePlugStacks = {};

    this.wires.forEach(w => {
      const p1 = HOLE_LOOKUP[w.fromHole];
      const p2 = HOLE_LOOKUP[w.toHole];
      if (!p1 || !p2) return;

      const stackFrom = holePlugStacks[w.fromHole] || 0;
      const stackTo = holePlugStacks[w.toHole] || 0;
      holePlugStacks[w.fromHole] = stackFrom + 1;
      holePlugStacks[w.toHole] = stackTo + 1;

      const pt1 = this.getStackOffset(p1.x, p1.y, stackFrom);
      const pt2 = this.getStackOffset(p2.x, p2.y, stackTo);

      const pathData = this.calculateWirePath(pt1.x, pt1.y, pt2.x, pt2.y, w.slack || 0);
      const isSelected = (w.id === this.selectedWireId);

      // Wire SVG Rendering
      wiresHtml += `
        <g class="wire-item ${isSelected ? 'wire-selected' : ''}" data-wire-id="${w.id}">
          <!-- Transparent wider hit-box for easy selection & clicking -->
          <path d="${pathData}"
                stroke="transparent"
                stroke-width="18"
                fill="none"
                class="wire-hit-area"
                data-wire-id="${w.id}" />

          <!-- Realistic wire ambient drop shadow -->
          <path d="${pathData}"
                stroke="#000000"
                stroke-width="6.5"
                stroke-linecap="round"
                fill="none"
                opacity="0.4"
                transform="translate(1.5, 3.5)" />

          <!-- Selected wire glowing outline -->
          ${isSelected ? `
            <path d="${pathData}"
                  stroke="#fbbf24"
                  stroke-width="11"
                  stroke-linecap="round"
                  fill="none"
                  opacity="0.9" />
          ` : ''}

          <!-- Wire main insulated core -->
          <path d="${pathData}"
                stroke="${w.color}"
                stroke-width="5"
                stroke-linecap="round"
                fill="none"
                filter="url(#wire-shadow)" />

          <!-- 3D Specular Highlight reflection on wire spine -->
          <path d="${pathData}"
                stroke="#ffffff"
                stroke-width="1.3"
                stroke-linecap="round"
                fill="none"
                opacity="0.45"
                transform="translate(-0.6, -0.6)" />
        </g>
      `;

      // Stackable Banana Plugs at both ends
      plugsHtml += this.renderStackablePlugSvg(pt1.x, pt1.y, w.color, stackFrom, 0, isSelected, w.id);
      plugsHtml += this.renderStackablePlugSvg(pt2.x, pt2.y, w.color, stackTo, 0, isSelected, w.id);
    });

    this.wiresGroup.innerHTML = wiresHtml;
    this.plugsGroup.innerHTML = plugsHtml;

    // Attach click listeners to wire hit areas
    const hitAreas = this.wiresGroup.querySelectorAll('.wire-hit-area');
    hitAreas.forEach(area => {
      area.addEventListener('click', (e) => {
        e.stopPropagation();
        const wId = area.getAttribute('data-wire-id');
        this.selectWire(wId);
      });
    });

    // Attach click listeners to banana plugs as well
    const plugEls = this.plugsGroup.querySelectorAll('.stackable-plug');
    plugEls.forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const wId = el.getAttribute('data-wire-id');
        if (wId) {
          this.selectWire(wId);
        }
      });
    });
  }

  animateWire(fromHoleId, toHoleId, color, onFinished) {
    const fromHole = HOLE_LOOKUP[fromHoleId];
    const toHole = HOLE_LOOKUP[toHoleId];
    if (!fromHole || !toHole) {
      if (onFinished) onFinished();
      return;
    }

    const fromStack = this.getHoleStackCount(fromHoleId);
    const toStack = this.getHoleStackCount(toHoleId);
    const pt1 = this.getStackOffset(fromHole.x, fromHole.y, fromStack);
    const pt2 = this.getStackOffset(toHole.x, toHole.y, toStack);

    const duration = 600;
    const startTime = performance.now();
    const pathFull = this.calculateWirePath(pt1.x, pt1.y, pt2.x, pt2.y, 0);

    const tempGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    tempGroup.innerHTML = `
      <path d="${pathFull}" stroke="${color}" stroke-width="5" fill="none" stroke-linecap="round"/>
      ${this.renderStackablePlugSvg(pt1.x, pt1.y, color, fromStack)}
    `;
    this.svg.appendChild(tempGroup);
    const tempPath = tempGroup.querySelector('path');
    const totalLength = tempPath.getTotalLength();
    tempPath.style.strokeDasharray = `${totalLength} ${totalLength}`;
    tempPath.style.strokeDashoffset = `${totalLength}`;

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1.0, elapsed / duration);
      const ease = 1 - Math.pow(1 - progress, 3);
      tempPath.style.strokeDashoffset = `${totalLength * (1 - ease)}`;

      if (progress < 1.0) {
        requestAnimationFrame(step);
      } else {
        tempGroup.remove();
        this.addWire(fromHoleId, toHoleId, color);
        if (this.onCircuitChanged) {
          this.onCircuitChanged(this.wires);
        }
        if (onFinished) onFinished();
      }
    };
    requestAnimationFrame(step);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { WiringSystem };
}
