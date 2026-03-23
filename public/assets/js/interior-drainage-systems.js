(function() {
  'use strict';
  
// Drainage assessment tool
    const assessmentCheckboxes = document.querySelectorAll('.question-item input');
    const resultDisplay = document.getElementById('drainage-result');
    const componentsDisplay = document.getElementById('recommended-components');
    
    function updateDrainageAssessment() {
      let totalPoints = 0;
      
      assessmentCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
          totalPoints += parseInt(checkbox.dataset.points);
        }
      });
      
      let assessmentLevel = '';
      let recommendation = '';
      let components = [];
      
      if (totalPoints >= 100) {
        assessmentLevel = 'essential';
        recommendation = 'COMPLETE INTERIOR DRAINAGE SYSTEM ESSENTIAL';
        components = [
          { icon: '💧', text: 'Full perimeter French drain required' },
          { icon: '⚡', text: 'Dual sump pump system with backup' },
          { icon: '🛡️', text: 'Vapor barrier wall system' },
          { icon: '📱', text: 'Monitoring & alarm system' },
          { icon: '🌪️', text: 'Dehumidification integration' }
        ];
      } else if (totalPoints >= 60) {
        assessmentLevel = 'recommended';
        recommendation = 'INTERIOR DRAINAGE SYSTEM HIGHLY RECOMMENDED';
        components = [
          { icon: '💧', text: 'Perimeter French drain installation' },
          { icon: '⚡', text: 'Primary sump pump with backup' },
          { icon: '🛡️', text: 'Vapor barrier in problem areas' },
          { icon: '📱', text: 'Basic monitoring system' }
        ];
      } else if (totalPoints >= 30) {
        recommendation = 'INTERIOR DRAINAGE BENEFICIAL FOR LONG-TERM PROTECTION';
        components = [
          { icon: '💧', text: 'Targeted French drain installation' },
          { icon: '⚡', text: 'Sump pump upgrade/installation' },
          { icon: '🛡️', text: 'Moisture control measures' }
        ];
      } else if (totalPoints > 0) {
        recommendation = 'MONITOR CONDITIONS - PREVENTIVE MEASURES RECOMMENDED';
        components = [
          { icon: '🔍', text: 'Professional drainage assessment' },
          { icon: '⚡', text: 'Sump pump system evaluation' },
          { icon: '📊', text: 'Moisture monitoring setup' }
        ];
      } else {
        recommendation = 'Select applicable conditions to get your assessment...';
        components = [{ icon: '🔍', text: 'Complete assessment needed' }];
      }
      
      if (recommendation !== 'Select applicable conditions to get your assessment...') {
        resultDisplay.className = `result-display ${assessmentLevel}`;
        resultDisplay.innerHTML = `
          <h4 style="color: #1e3a8a; margin-bottom: 15px;">${recommendation}</h4>
          <p style="margin-bottom: 20px; line-height: 1.6;">
            Based on your responses, interior drainage would provide significant water management benefits for your basement.
          </p>
          <a href="tel:437-545-0067" style="background: #3b82f6; color: white; padding: 12px 25px; border-radius: 25px; text-decoration: none; font-weight: bold; display: inline-block;">
            Get Free Assessment: 437-545-0067
          </a>
        `;
      } else {
        resultDisplay.className = 'result-display';
        resultDisplay.innerHTML = `<p>${recommendation}</p>`;
      }
      
      // Update recommended components
      componentsDisplay.innerHTML = '';
      components.forEach(component => {
        const componentElement = document.createElement('div');
        componentElement.className = 'component-item';
        componentElement.innerHTML = `
          <span class="component-icon">${component.icon}</span>
          <span>${component.text}</span>
        `;
        componentsDisplay.appendChild(componentElement);
      });
    }
    
    assessmentCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', updateDrainageAssessment);
    });
    
    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', function() {
        const item = this.closest('.faq-item');
        item.classList.toggle('active');
      });
    });
    
    // Initialize assessment
    updateDrainageAssessment();
})();