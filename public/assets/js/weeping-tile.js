(function() {
  'use strict';
  
document.addEventListener('DOMContentLoaded', function() {
      // Cost Calculator
      function calculateCost() {
        const perimeter = parseInt(document.getElementById('perimeter').value);
        const installType = document.getElementById('installType').value;
        
        let baseCost = 0;
        switch(installType) {
          case 'interior':
            baseCost = perimeter * 80; // $80 per linear foot
            break;
          case 'exterior':
            baseCost = perimeter * 150; // $150 per linear foot
            break;
          case 'both':
            baseCost = perimeter * 200; // $200 per linear foot
            break;
        }
        
        let additionalCost = 0;
        if (document.getElementById('sumpPump').checked) additionalCost += 2500;
        if (document.getElementById('waterproofing').checked) additionalCost += 3500;
        if (document.getElementById('backwater').checked) additionalCost += 2000;
        if (document.getElementById('windowWells').checked) additionalCost += 1600; // 2 wells
        
        let conditionsCost = 0;
        if (document.getElementById('emergency').checked) {
          baseCost *= 1.2; // 20% rush charge
        }
        if (document.getElementById('concrete').checked) conditionsCost += 2000;
        
        const subtotal = baseCost + additionalCost + conditionsCost;
        const total = subtotal;
        
        document.getElementById('baseCost').textContent = '$' + baseCost.toLocaleString();
        document.getElementById('additionalCost').textContent = '$' + additionalCost.toLocaleString();
        document.getElementById('conditionsCost').textContent = '$' + conditionsCost.toLocaleString();
        document.getElementById('subtotal').textContent = '$' + subtotal.toLocaleString();
        document.getElementById('totalCost').textContent = '$' + total.toLocaleString();
        
        // Update monthly payment
        const monthly = Math.round(total / 72); // 72 months at 0%
        document.querySelector('.monthly strong').textContent = '$' + monthly + '/month';
      }

      // Add event listeners to all calculator inputs
      document.querySelectorAll('.cost-inputs select, .cost-inputs input').forEach(input => {
        input.addEventListener('change', calculateCost);
      });

      // Initial calculation
      calculateCost();
    });
})();