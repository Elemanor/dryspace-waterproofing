(function() {
  'use strict';
  
document.addEventListener('DOMContentLoaded', function() {
      const navButtons = document.querySelectorAll('.nav-btn');
      const methodSlides = document.querySelectorAll('.method-slide');

      navButtons.forEach(button => {
        button.addEventListener('click', function() {
          const method = this.dataset.method;
          
          navButtons.forEach(btn => btn.classList.remove('active'));
          methodSlides.forEach(slide => slide.classList.remove('active'));
          
          this.classList.add('active');
          document.querySelector(`.method-slide[data-method="${method}"]`).classList.add('active');
        });
      });

      const affectedArea = document.getElementById('affectedArea');
      const rangeOutput = document.querySelector('.range-output');
      
      affectedArea.addEventListener('input', function() {
        rangeOutput.textContent = this.value + ' ft';
        calculateCost();
      });

      function calculateCost() {
        const foundationType = document.getElementById('foundationType').value;
        const primaryIssue = document.getElementById('primaryIssue').value;
        const area = parseInt(affectedArea.value);
        const severity = document.querySelector('input[name="severity"]:checked').value;
        
        let baseCost = 3000;
        
        if (foundationType === 'block') baseCost += 1000;
        if (foundationType === 'stone') baseCost += 2000;
        if (foundationType === 'brick') baseCost += 1500;
        
        if (primaryIssue === 'settlement') baseCost += 5000;
        if (primaryIssue === 'bowing') baseCost += 3000;
        if (primaryIssue === 'slab') baseCost += 2000;
        if (primaryIssue === 'water') baseCost += 1500;
        
        const areaMultiplier = area / 50;
        
        let severityAdjust = 0;
        if (severity === 'moderate') severityAdjust = baseCost * 0.5;
        if (severity === 'severe') severityAdjust = baseCost * 1.0;
        
        let additionalServices = 0;
        document.querySelectorAll('.checkbox-options input:checked').forEach(checkbox => {
          if (checkbox.value === 'waterproofing') additionalServices += 3000;
          if (checkbox.value === 'drainage') additionalServices += 2500;
          if (checkbox.value === 'excavation') additionalServices += 5000;
          if (checkbox.value === 'engineering') additionalServices += 1500;
        });
        
        const total = Math.round((baseCost * areaMultiplier) + severityAdjust + additionalServices);
        const min = Math.round(total * 0.8);
        const max = Math.round(total * 1.2);
        
        document.getElementById('baseRepairCost').textContent = '$' + baseCost.toLocaleString();
        document.getElementById('areaMultiplier').textContent = '×' + areaMultiplier.toFixed(1);
        document.getElementById('severityAdjust').textContent = '+$' + Math.round(severityAdjust).toLocaleString();
        document.getElementById('additionalServices').textContent = '+$' + additionalServices.toLocaleString();
        document.getElementById('estimatedTotal').textContent = '$' + total.toLocaleString();
        document.getElementById('rangeMin').textContent = '$' + min.toLocaleString();
        document.getElementById('rangeMax').textContent = '$' + max.toLocaleString();
        
        const indicator = document.querySelector('.range-indicator');
        const percentage = ((total - min) / (max - min)) * 100;
        indicator.style.left = percentage + '%';
      }

      document.querySelectorAll('select, input').forEach(input => {
        input.addEventListener('change', calculateCost);
      });

      calculateCost();
    });
})();