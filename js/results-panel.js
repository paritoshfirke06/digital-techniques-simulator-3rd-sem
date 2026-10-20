/**
 * DIGITAL TECHNIQUES VIRTUAL TRAINER KIT SIMULATOR
 * Dynamic Results & Truth Table Verification Panel
 * Compares theoretical expected logic against real simulated outputs
 */

class ResultsPanel {
  constructor(containerEl, onRowClicked) {
    this.container = containerEl;
    this.onRowClicked = onRowClicked;
    this.currentPart = null;
    this.diagnostics = [];
    this.simResult = null;
    this.testedRows = new Set();
    this.activeRowIdx = null;
  }

  setPart(part) {
    this.currentPart = part;
    this.testedRows.clear();
    this.activeRowIdx = null;
    this.render();
  }

  setActiveRow(rowIdx) {
    this.activeRowIdx = rowIdx;
    if (rowIdx !== null) {
      this.testedRows.add(rowIdx);
    }
    this.render();
  }

  updateSimulation(simResult) {
    this.simResult = simResult;
    this.diagnostics = simResult.diagnostics || [];
    this.render();
  }

  render() {
    if (!this.container) return;

    if (!this.currentPart) {
      this.container.innerHTML = `
        <div class="results-empty-state">
          <p>Select an experiment to view truth table and verification output.</p>
        </div>
      `;
      return;
    }

    const tt = this.currentPart.truthTable;
    let truthTableHtml = '';

    if (tt && tt.rows) {
      const headers = tt.headers || ['Inputs', 'Expected', 'Observed', 'Match'];
      let theadHtml = headers.map(h => `<th>${h}</th>`).join('');

      let tbodyHtml = '';
      tt.rows.forEach((row, idx) => {
        // Evaluate if current circuit inputs match this row
        const isCurrentInput = this.matchesCurrentInputs(row.inputs);
        const isActiveClick = (this.activeRowIdx === idx);

        let observedVal = '-';
        if (this.simResult) {
          if (row.digit !== undefined && this.simResult.displays?.dsp_1) {
            observedVal = (row.digit !== undefined && (isCurrentInput || isActiveClick)) ? `Digit ${row.digit}` : '-';
          } else if (this.simResult.indicatorStates) {
            observedVal = this.simResult.indicatorStates['ind_0'];
          }
        }

        let isMatch = false;
        if (row.expected !== undefined && observedVal !== '-') {
          isMatch = (observedVal === row.expected);
        } else if (row.digit !== undefined && (isCurrentInput || isActiveClick)) {
          isMatch = true;
        }

        if ((isCurrentInput || isActiveClick) && isMatch) {
          this.testedRows.add(idx);
        }

        const isVerified = this.testedRows.has(idx);

        tbodyHtml += `
          <tr class="clickable-truth-row ${isCurrentInput ? 'row-current-test' : ''} ${isVerified ? 'row-verified' : ''} ${isActiveClick ? 'row-active-click' : ''}"
              data-row-idx="${idx}"
              title="Click to apply Row #${idx + 1} to the trainer kit switches and observe outputs">
            ${this.renderRowCells(row, observedVal, isCurrentInput, isVerified, isActiveClick)}
          </tr>
        `;
      });

      truthTableHtml = `
        <div class="truth-table-hint">
          <i class="fa-solid fa-hand-pointer"></i>
          <span>Click any row below to rewind & apply that test vector to the trainer kit!</span>
        </div>
        <div class="truth-table-wrapper">
          <table class="truth-table">
            <thead>
              <tr>${theadHtml}</tr>
            </thead>
            <tbody>
              ${tbodyHtml}
            </tbody>
          </table>
        </div>
      `;
    }

    // Diagnostics alerts (warnings / power missing)
    let diagHtml = '';
    if (this.diagnostics.length > 0) {
      const alerts = this.diagnostics.map(d => `
        <div class="diag-alert diag-${d.level}">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <span>${d.msg}</span>
        </div>
      `).join('');
      diagHtml = `<div class="diagnostics-box">${alerts}</div>`;
    }

    // Completion Status
    const totalRows = tt?.rows?.length || 0;
    const verifiedRows = this.testedRows.size;
    const isFullyVerified = (totalRows > 0 && verifiedRows === totalRows);

    this.container.innerHTML = `
      <div class="results-panel-content">
        <div class="results-header">
          <div class="results-title-group">
            <h4>${this.currentPart.name}</h4>
            <span class="verification-badge ${isFullyVerified ? 'verified-pass' : 'verified-pending'}">
              <i class="${isFullyVerified ? 'fa-solid fa-circle-check' : 'fa-regular fa-clock'}"></i>
              ${isFullyVerified ? 'Experiment Verified (100%)' : `Progress: ${verifiedRows} / ${totalRows} Tested`}
            </span>
          </div>
        </div>

        ${diagHtml}

        <div class="truth-table-section">
          <h5><i class="fa-solid fa-table"></i> Truth Table & Live Logic Observations</h5>
          ${truthTableHtml}
        </div>
      </div>
    `;

    // Attach click listeners to truth table rows
    this.container.querySelectorAll('.clickable-truth-row').forEach(rowEl => {
      rowEl.addEventListener('click', () => {
        const idx = parseInt(rowEl.getAttribute('data-row-idx'), 10);
        if (this.onRowClicked && tt && tt.rows && tt.rows[idx]) {
          this.activeRowIdx = idx;
          this.onRowClicked(idx, tt.rows[idx]);
        }
      });
    });
  }

  matchesCurrentInputs(rowInputs) {
    if (!rowInputs || !this.simResult) return false;
    for (const swKey of Object.keys(rowInputs)) {
      const swVal = window.trainerApp?.logicEngine?.switchStates[swKey];
      if (swVal !== rowInputs[swKey]) return false;
    }
    return true;
  }

  renderRowCells(row, observedVal, isCurrentInput, isVerified, isActiveClick = false) {
    let cells = '';

    // Inputs
    if (row.inputs) {
      Object.keys(row.inputs).forEach(k => {
        cells += `<td><strong>${row.inputs[k]}</strong></td>`;
      });
    } else if (row.pulse !== undefined) {
      cells += `<td>Pulse ${row.pulse}</td>`;
    }

    // Special fields (Digits, MUX channels, etc.)
    if (row.digit !== undefined) cells += `<td>Digit <strong>${row.digit}</strong></td>`;
    if (row.ch !== undefined) cells += `<td><strong>${row.ch}</strong></td>`;
    if (row.dec !== undefined) cells += `<td>${row.dec}</td>`;
    if (row.state) cells += `<td>${row.state}</td>`;

    // Expected Output
    if (row.expected !== undefined) {
      cells += `<td class="cell-expected">${row.expected}</td>`;
    }

    // Observed Output
    cells += `<td class="cell-observed ${(isCurrentInput || isActiveClick) ? 'cell-live' : ''}">${(isCurrentInput || isActiveClick) ? observedVal : (isVerified ? (row.expected !== undefined ? row.expected : (row.digit !== undefined ? `Digit ${row.digit}` : '-')) : '-')}</td>`;

    // Status / Match Badge
    cells += `
      <td>
        ${isActiveClick ? `
          <span class="badge-active-kit"><i class="fa-solid fa-play"></i> LIVE</span>
        ` : isVerified ? `
          <span class="badge-pass"><i class="fa-solid fa-check"></i> PASS</span>
        ` : isCurrentInput ? `
          <span class="badge-testing"><i class="fa-solid fa-spinner fa-spin"></i> LIVE</span>
        ` : `
          <span class="badge-pending">Pending</span>
        `}
        <span class="row-jump-btn" title="Click to apply to trainer kit"><i class="fa-solid fa-arrow-turn-down-left"></i></span>
      </td>
    `;

    return cells;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ResultsPanel };
}
