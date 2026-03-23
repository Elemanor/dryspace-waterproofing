(function() {
  'use strict';
  
document.addEventListener('DOMContentLoaded', function() {
      const tabButtons = document.querySelectorAll('.tab-button');
      const tabPanels = document.querySelectorAll('.tab-panel');

      tabButtons.forEach(button => {
        button.addEventListener('click', function() {
          const tabId = this.dataset.tab;
          
          tabButtons.forEach(btn => btn.classList.remove('active'));
          tabPanels.forEach(panel => panel.classList.remove('active'));
          
          this.classList.add('active');
          document.getElementById(tabId).classList.add('active');
        });
      });

      function calculateCost() {
        const surfaceArea = parseInt(document.getElementById('surfaceArea').value) || 500;
        const coatingType = document.getElementById('coatingType').value;
        const surfaceCondition = document.getElementById('surfaceCondition').value;
        const coats = parseInt(document.querySelector('input[name="coats"]:checked').value);
        
        let pricePerSqFt = 5;
        switch(coatingType) {
          case 'elastomeric': pricePerSqFt = 4; break;
          case 'crystalline': pricePerSqFt = 5; break;
          case 'cementitious': pricePerSqFt = 3; break;
          case 'liquid-rubber': pricePerSqFt = 6.5; break;
          case 'polyurethane': pricePerSqFt = 8; break;
          case 'bio-based': pricePerSqFt = 5.5; break;
        }
        
        const materialCost = surfaceArea * pricePerSqFt * (coats / 2);
        const laborCost = surfaceArea * 3;
        
        let prepCost = 500;
        switch(surfaceCondition) {
          case 'excellent': prepCost = 200; break;
          case 'good': prepCost = 500; break;
          case 'fair': prepCost = 1000; break;
          case 'poor': prepCost = 2000; break;
        }
        
        let additionalCost = 0;
        document.querySelectorAll('.checkbox-group input:checked').forEach(checkbox => {
          if (checkbox.value === 'crack-repair') additionalCost += 1000;
          if (checkbox.value === 'primer') additionalCost += surfaceArea;
          if (checkbox.value === 'warranty') additionalCost += (materialCost + laborCost) * 0.15;
          if (checkbox.value === 'inspection') additionalCost += 800;
        });
        
        const total = materialCost + laborCost + prepCost + additionalCost;
        const perSqFt = total / surfaceArea;
        
        document.getElementById('materialCost').textContent = '$' + Math.round(materialCost).toLocaleString();
        document.getElementById('laborCost').textContent = '$' + Math.round(laborCost).toLocaleString();
        document.getElementById('prepCost').textContent = '$' + Math.round(prepCost).toLocaleString();
        document.getElementById('additionalCost').textContent = '$' + Math.round(additionalCost).toLocaleString();
        document.getElementById('totalEstimate').textContent = '$' + Math.round(total).toLocaleString();
        document.getElementById('costPerSqFt').textContent = '$' + perSqFt.toFixed(2);
      }

      document.querySelectorAll('.estimator-inputs input, .estimator-inputs select').forEach(input => {
        input.addEventListener('change', calculateCost);
        input.addEventListener('input', calculateCost);
      });

      calculateCost();
    });
})();