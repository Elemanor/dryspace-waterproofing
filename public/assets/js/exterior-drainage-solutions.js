(function() {
  'use strict';
  
// Drainage assessment tool
    const assessmentCheckboxes = document.querySelectorAll('.assessment-item input');
    const resultsDisplay = document.getElementById('assessment-results');
    const solutionsDisplay = document.getElementById('recommended-solutions');
    
    function updateAssessment() {
      let foundationPoints = 0;
      let surfacePoints = 0;
      let hardscapePoints = 0;
      let weatherPoints = 0;
      
      assessmentCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
          const points = parseInt(checkbox.dataset.points);
          switch(checkbox.dataset.category) {
            case 'foundation':
              foundationPoints += points;
              break;
            case 'surface':
              surfacePoints += points;
              break;
            case 'hardscape':
              hardscapePoints += points;
              break;
            case 'weather':
              weatherPoints += points;
              break;
          }
        }
      });
      
      const totalPoints = foundationPoints + surfacePoints + hardscapePoints + weatherPoints;
      
      let assessmentLevel = '';
      let message = '';
      let solutions = [];
      
      if (totalPoints >= 80) {
        assessmentLevel = 'significant';
        message = 'SIGNIFICANT DRAINAGE ISSUES DETECTED';
        solutions = [
          { icon: '🏗️', text: 'Comprehensive property drainage system recommended' },
          { icon: '🌊', text: 'French drain installation priority' },
          { icon: '📐', text: 'Professional grading correction needed' },
          { icon: '💧', text: 'Downspout routing and extensions' },
          { icon: '⚡', text: 'Emergency consultation recommended' }
        ];
      } else if (totalPoints >= 50) {
        assessmentLevel = 'moderate';
        message = 'MODERATE DRAINAGE IMPROVEMENTS NEEDED';
        solutions = [
          { icon: '💧', text: 'Targeted French drain installation' },
          { icon: '📐', text: 'Grading improvements in problem areas' },
          { icon: '🌊', text: 'Surface water management solutions' },
          { icon: '🏠', text: 'Foundation drainage protection' }
        ];
      } else if (totalPoints >= 20) {
        message = 'MINOR DRAINAGE ENHANCEMENTS BENEFICIAL';
        solutions = [
          { icon: '💧', text: 'Downspout extension improvements' },
          { icon: '🌊', text: 'Surface water diversion' },
          { icon: '📐', text: 'Localized grading adjustments' }
        ];
      } else if (totalPoints > 0) {
        message = 'MINIMAL DRAINAGE CONCERNS - MONITORING RECOMMENDED';
        solutions = [
          { icon: '🔍', text: 'Professional drainage assessment' },
          { icon: '📊', text: 'Seasonal monitoring plan' },
          { icon: '🌿', text: 'Preventive landscaping measures' }
        ];
      } else {
        message = 'Select issues you\'ve experienced to get your customized assessment...';
        solutions = [{ icon: '🔍', text: 'Complete your assessment above' }];
      }
      
      if (message !== 'Select issues you\'ve experienced to get your customized assessment...') {
        resultsDisplay.className = `results-display ${assessmentLevel}`;
        resultsDisplay.innerHTML = `
          <h4 style="color: #166534; margin-bottom: 15px;">${message}</h4>
          <p style="margin-bottom: 20px; line-height: 1.6;">
            Based on your responses, we recommend the priority solutions shown below to address your property's drainage needs effectively.
          </p>
          <a href="tel:437-545-0067" style="background: #22c55e; color: white; padding: 12px 25px; border-radius: 25px; text-decoration: none; font-weight: bold; display: inline-block;">
            Get Professional Assessment: 437-545-0067
          </a>
        `;
      } else {
        resultsDisplay.className = 'results-display';
        resultsDisplay.innerHTML = `<p>${message}</p>`;
      }
      
      // Update recommended solutions
      solutionsDisplay.innerHTML = '';
      solutions.forEach(solution => {
        const solutionElement = document.createElement('div');
        solutionElement.className = 'solution-item';
        solutionElement.innerHTML = `
          <span class="solution-icon">${solution.icon}</span>
          <span>${solution.text}</span>
        `;
        solutionsDisplay.appendChild(solutionElement);
      });
      
      // Update cost projections based on severity
      const essentialCost = document.getElementById('essential-cost');
      const completeCost = document.getElementById('complete-cost');
      const premiumCost = document.getElementById('premium-cost');
      
      if (totalPoints >= 80) {
        essentialCost.textContent = '$5,000-8,000';
        completeCost.textContent = '$12,000-18,000';
        premiumCost.textContent = '$18,000-25,000';
      } else if (totalPoints >= 50) {
        essentialCost.textContent = '$3,500-6,000';
        completeCost.textContent = '$8,000-12,000';
        premiumCost.textContent = '$12,000-18,000';
      } else {
        essentialCost.textContent = '$2,000-4,000';
        completeCost.textContent = '$5,000-10,000';
        premiumCost.textContent = '$10,000-15,000';
      }
    }
    
    assessmentCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', updateAssessment);
    });
    
    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', function() {
        const item = this.closest('.faq-item');
        item.classList.toggle('active');
      });
    });
    
    // Initialize assessment
    updateAssessment();
})();