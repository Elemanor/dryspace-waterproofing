(function() {
  'use strict';
  
document.addEventListener('DOMContentLoaded', function() {
      // Cost Calculator
      function calculateCost() {
        const areaSize = document.getElementById('areaSize').value;
        const severity = document.getElementById('severity').value;
        const wallMaterial = document.getElementById('wallMaterial').value;
        
        // Base costs
        let removalCost = 400;
        let treatmentCost = 300;
        let sealingCost = 400;
        
        // Area adjustments
        switch(areaSize) {
          case 'small': break;
          case 'medium': 
            removalCost *= 1.5;
            treatmentCost *= 1.5;
            sealingCost *= 1.5;
            break;
          case 'large':
            removalCost *= 2.5;
            treatmentCost *= 2.5;
            sealingCost *= 2.5;
            break;
          case 'xlarge':
            removalCost *= 4;
            treatmentCost *= 4;
            sealingCost *= 4;
            break;
        }
        
        // Severity adjustments
        switch(severity) {
          case 'light': break;
          case 'moderate':
            removalCost *= 1.3;
            treatmentCost *= 1.3;
            break;
          case 'severe':
            removalCost *= 1.8;
            treatmentCost *= 1.8;
            sealingCost *= 1.3;
            break;
        }
        
        // Wall material adjustments
        switch(wallMaterial) {
          case 'concrete': break;
          case 'block':
            treatmentCost *= 1.2;
            break;
          case 'brick':
            removalCost *= 1.3;
            treatmentCost *= 1.3;
            break;
          case 'stone':
            removalCost *= 1.5;
            treatmentCost *= 1.5;
            sealingCost *= 1.2;
            break;
        }
        
        // Additional services
        let additionalCost = 0;
        if (document.getElementById('crackRepair').checked) additionalCost += 1000;
        if (document.getElementById('waterproofing').checked) additionalCost += 800;
        if (document.getElementById('drainage').checked) additionalCost += 1200;
        if (document.getElementById('painting').checked) additionalCost += 400;
        
        // Calculate total
        const total = Math.round(removalCost + treatmentCost + sealingCost + additionalCost);
        
        // Update display
        document.getElementById('removalCost').textContent = '$' + Math.round(removalCost).toLocaleString();
        document.getElementById('treatmentCost').textContent = '$' + Math.round(treatmentCost).toLocaleString();
        document.getElementById('sealingCost').textContent = '$' + Math.round(sealingCost).toLocaleString();
        document.getElementById('additionalCost').textContent = '$' + additionalCost.toLocaleString();
        document.getElementById('totalCost').textContent = '$' + total.toLocaleString();
      }

      // Add event listeners
      document.querySelectorAll('.calc-inputs select, .calc-inputs input').forEach(input => {
        input.addEventListener('change', calculateCost);
      });

      // Initial calculation
      calculateCost();
    });
})();