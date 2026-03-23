(function() {
  'use strict';
  
// Pressure assessment tool
    const pressureCheckboxes = document.querySelectorAll('.indicator-item input');
    const pressureMeter = document.querySelector('.meter-fill');
    const resultsDisplay = document.getElementById('pressure-results');
    const systemsDisplay = document.getElementById('recommended-systems');
    
    function updatePressureAssessment() {
      let totalPressure = 0;
      
      pressureCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
          totalPressure += parseInt(checkbox.dataset.pressure);
        }
      });
      
      // Update pressure meter
      const meterPercentage = Math.min(totalPressure, 200) / 2; // Scale to 100%
      pressureMeter.style.width = `${meterPercentage}%`;
      
      let pressureLevel = '';
      let message = '';
      let systems = [];
      
      if (totalPressure >= 150) {
        pressureLevel = 'critical';
        message = 'CRITICAL HYDROSTATIC PRESSURE - IMMEDIATE ACTION REQUIRED';
        systems = [
          { icon: '🚨', text: 'Complete pressure relief system essential' },
          { icon: '🏗️', text: 'Professional engineering assessment urgent' },
          { icon: '💧', text: 'Multiple relief valves required' },
          { icon: '⚡', text: 'Emergency drainage installation' },
          { icon: '📊', text: 'Continuous monitoring system' }
        ];
      } else if (totalPressure >= 100) {
        pressureLevel = 'high';
        message = 'HIGH HYDROSTATIC PRESSURE - PROFESSIONAL RELIEF SYSTEM NEEDED';
        systems = [
          { icon: '💧', text: 'Hydrostatic relief valve system' },
          { icon: '🏗️', text: 'Groundwater drainage installation' },
          { icon: '⚡', text: 'Enhanced sump pump system' },
          { icon: '📊', text: 'Pressure monitoring recommended' }
        ];
      } else if (totalPressure >= 50) {
        pressureLevel = 'moderate';
        message = 'MODERATE PRESSURE RISK - PREVENTIVE MEASURES RECOMMENDED';
        systems = [
          { icon: '💧', text: 'Relief valve system installation' },
          { icon: '⚡', text: 'Upgraded drainage system' },
          { icon: '📊', text: 'Pressure monitoring setup' },
          { icon: '🔍', text: 'Professional assessment' }
        ];
      } else if (totalPressure > 0) {
        message = 'LOW PRESSURE RISK - MONITORING AND PREVENTION';
        systems = [
          { icon: '📊', text: 'Baseline pressure monitoring' },
          { icon: '🔍', text: 'Professional evaluation' },
          { icon: '🛡️', text: 'Preventive measures planning' }
        ];
      } else {
        message = 'Select conditions you\'ve observed to assess your hydrostatic pressure risk...';
        systems = [{ icon: '🔍', text: 'Complete assessment above for recommendations' }];
      }
      
      if (message !== 'Select conditions you\'ve observed to assess your hydrostatic pressure risk...') {
        resultsDisplay.className = `results-display ${pressureLevel}`;
        resultsDisplay.innerHTML = `
          <h4 style="color: #0c4a6e; margin-bottom: 15px;">${message}</h4>
          <p style="margin-bottom: 20px; line-height: 1.6;">
            Based on your assessment, professional hydrostatic pressure relief systems are recommended to protect your foundation from potentially catastrophic damage.
          </p>
          <a href="tel:437-545-0067" style="background: #0284c7; color: white; padding: 12px 25px; border-radius: 25px; text-decoration: none; font-weight: bold; display: inline-block;">
            Emergency Assessment: 437-545-0067
          </a>
        `;
      } else {
        resultsDisplay.className = 'results-display';
        resultsDisplay.innerHTML = `<p>${message}</p>`;
      }
      
      // Update recommended systems
      systemsDisplay.innerHTML = '';
      systems.forEach(system => {
        const systemElement = document.createElement('div');
        systemElement.className = 'system-item';
        systemElement.innerHTML = `
          <span class="system-icon">${system.icon}</span>
          <span>${system.text}</span>
        `;
        systemsDisplay.appendChild(systemElement);
      });
    }
    
    pressureCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', updatePressureAssessment);
    });
    
    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', function() {
        const item = this.closest('.faq-item');
        item.classList.toggle('active');
      });
    });
    
    // Initialize assessment
    updatePressureAssessment();
})();