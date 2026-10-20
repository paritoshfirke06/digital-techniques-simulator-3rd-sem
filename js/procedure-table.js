/**
 * DIGITAL TECHNIQUES VIRTUAL TRAINER KIT SIMULATOR
 * Synchronized Procedure Step Table
 * Displays step numbers, actions, pin details, and active status indicators
 */

class ProcedureTable {
  constructor(tableContainerEl, onStepClicked) {
    this.container = tableContainerEl;
    this.onStepClicked = onStepClicked;
    this.steps = [];
    this.currentStepIdx = 0;
  }

  setSteps(steps, activeStepIdx = 0) {
    this.steps = steps || [];
    this.currentStepIdx = activeStepIdx;
    this.render();
  }

  updateActiveStep(stepIdx) {
    this.currentStepIdx = stepIdx;
    this.render();
    this.scrollToActive();
  }

  render() {
    if (!this.container) return;

    if (this.steps.length === 0) {
      this.container.innerHTML = `
        <div class="procedure-empty-state">
          <p>No experiment selected. Select an experiment from the top dropdown or component library.</p>
        </div>
      `;
      return;
    }

    let rowsHtml = '';
    this.steps.forEach((s, idx) => {
      let statusClass = 'step-pending';
      let statusLabel = 'Pending';
      let statusIcon = 'fa-regular fa-clock';

      if (idx < this.currentStepIdx) {
        statusClass = 'step-completed';
        statusLabel = 'Completed';
        statusIcon = 'fa-solid fa-check';
      } else if (idx === this.currentStepIdx) {
        statusClass = 'step-active';
        statusLabel = 'Active';
        statusIcon = 'fa-solid fa-spinner fa-spin';
      }

      rowsHtml += `
        <tr class="procedure-row ${statusClass}" data-step-idx="${idx}" title="Click to replay or jump to this step">
          <td class="step-col-num">
            <span class="step-badge">${s.stepNumber || (idx + 1)}</span>
          </td>
          <td class="step-col-action">
            <strong class="step-title">${s.title}</strong>
          </td>
          <td class="step-col-details">
            <span class="step-desc">${s.details}</span>
          </td>
          <td class="step-col-status">
            <span class="status-pill status-${statusClass}">
              <i class="${statusIcon}"></i> ${statusLabel}
            </span>
          </td>
        </tr>
      `;
    });

    this.container.innerHTML = `
      <div class="procedure-table-wrapper">
        <table class="procedure-table">
          <thead>
            <tr>
              <th style="width: 45px;">Step</th>
              <th style="width: 140px;">Action</th>
              <th>Connection Details</th>
              <th style="width: 95px;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;

    // Attach click events
    this.container.querySelectorAll('.procedure-row').forEach(row => {
      row.addEventListener('click', () => {
        const idx = parseInt(row.getAttribute('data-step-idx'), 10);
        if (this.onStepClicked) {
          this.onStepClicked(idx);
        }
      });
    });
  }

  scrollToActive() {
    const activeRow = this.container.querySelector('.procedure-row.step-active');
    if (activeRow) {
      activeRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ProcedureTable };
}
