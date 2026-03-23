(function() {
  'use strict';
  
document.addEventListener('DOMContentLoaded', function() {
      const categoryTabs = document.querySelectorAll('.category-tab');
      const categoryContents = document.querySelectorAll('.category-content');

      categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
          const category = this.dataset.category;
          
          categoryTabs.forEach(t => t.classList.remove('active'));
          categoryContents.forEach(c => c.classList.remove('active'));
          
          this.classList.add('active');
          document.getElementById(category).classList.add('active');
        });
      });

      const propertySize = document.getElementById('propertySize');
      const rangeValue = document.querySelector('.range-value');
      
      propertySize.addEventListener('input', function() {
        rangeValue.textContent = this.value + ' sq ft';
        calculateCost();
      });

      function calculateCost() {
        let baseCost = 450;
        const propertyType = document.getElementById('propertyType').value;
        const leakType = document.getElementById('leakType').value;
        const size = parseInt(document.getElementById('propertySize').value);
        const urgency = document.querySelector('input[name="urgency"]:checked').value;
        
        if (propertyType === 'commercial') baseCost += 200;
        if (propertyType === 'industrial') baseCost += 400;
        
        if (leakType === 'pool') baseCost += 150;
        if (leakType === 'unknown') baseCost += 100;
        
        let sizeAdjust = 0;
        if (size > 3000) sizeAdjust = Math.floor((size - 3000) / 500) * 50;
        
        let urgencyCost = 0;
        if (urgency === 'priority') urgencyCost = 150;
        if (urgency === 'emergency') urgencyCost = 350;
        
        let additionalCost = 0;
        document.querySelectorAll('.checkbox-group input:checked').forEach(checkbox => {
          if (checkbox.value === 'report') additionalCost += 150;
          if (checkbox.value === 'insurance') additionalCost += 200;
        });
        
        document.getElementById('baseCost').textContent = '$' + baseCost;
        document.getElementById('sizeAdjust').textContent = '+$' + sizeAdjust;
        document.getElementById('urgencyCost').textContent = '+$' + urgencyCost;
        document.getElementById('additionalCost').textContent = '+$' + additionalCost;
        document.getElementById('totalCost').textContent = '$' + (baseCost + sizeAdjust + urgencyCost + additionalCost);
      }

      document.querySelectorAll('select, input').forEach(input => {
        input.addEventListener('change', calculateCost);
      });

      calculateCost();
    });
})();