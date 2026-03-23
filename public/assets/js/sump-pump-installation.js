(function() {
  'use strict';
  
document.addEventListener('DOMContentLoaded', function() {
      // Sump Pump Selector Tool
      const calculateBtn = document.querySelector('.btn-calculate');
      if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
          const basementSize = document.getElementById('basementSize').value;
          const waterTable = document.getElementById('waterTable').value;
          const powerOutages = document.getElementById('powerOutages').value;
          
          let recommendation = '';
          let specs = '';
          
          if (waterTable === 'high' || basementSize === 'large') {
            recommendation = 'We recommend a Submersible Sump Pump with Battery Backup System. This combination provides maximum protection for high-risk basements.';
            specs = '<div>• Flow Rate: 4,000+ GPH<br>• Backup Runtime: 7-10 hours<br>• Smart monitoring recommended</div>';
          } else if (waterTable === 'medium' || powerOutages === 'frequent') {
            recommendation = 'A Submersible Sump Pump with Battery Backup is ideal for your needs. This ensures protection during power outages.';
            specs = '<div>• Flow Rate: 3,000 GPH<br>• Backup Runtime: 5-7 hours<br>• Annual maintenance required</div>';
          } else {
            recommendation = 'A standard Submersible or Pedestal Sump Pump will work well for your basement. Consider adding battery backup for extra peace of mind.';
            specs = '<div>• Flow Rate: 2,500 GPH<br>• Optional battery backup<br>• 10+ year lifespan expected</div>';
          }
          
          const resultDiv = document.getElementById('pumpRecommendation');
          resultDiv.querySelector('.recommendation-text').textContent = recommendation;
          resultDiv.querySelector('.recommended-specs').innerHTML = specs;
          resultDiv.style.display = 'block';
          
          // Scroll to result
          resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
      }

      // Cost Calculator
      function calculateCost() {
        const pumpType = document.getElementById('pumpType').value;
        let pumpCost = 0;
        
        switch(pumpType) {
          case 'submersible': pumpCost = 1150; break;
          case 'pedestal': pumpCost = 700; break;
          case 'smart': pumpCost = 1850; break;
          case 'sewage': pumpCost = 1500; break;
        }
        
        let featuresCost = 0;
        if (document.getElementById('batteryBackup').checked) featuresCost += 800;
        if (document.getElementById('alarmSystem').checked) featuresCost += 150;
        if (document.getElementById('smartMonitoring').checked) featuresCost += 300;
        if (document.getElementById('secondPump').checked) featuresCost += 600;
        
        const laborCost = 800;
        
        let requirementsCost = 0;
        if (document.getElementById('newPit').checked) requirementsCost += 800;
        if (document.getElementById('electrical').checked) requirementsCost += 500;
        if (document.getElementById('discharge').checked) requirementsCost += 400;
        
        let rebateAmount = 0;
        if (document.getElementById('torontoRebate').checked) rebateAmount = 1750;
        
        const total = pumpCost + featuresCost + laborCost + requirementsCost - rebateAmount;
        
        document.getElementById('pumpCost').textContent = '$' + pumpCost.toLocaleString();
        document.getElementById('featuresCost').textContent = '$' + featuresCost.toLocaleString();
        document.getElementById('laborCost').textContent = '$' + laborCost.toLocaleString();
        document.getElementById('requirementsCost').textContent = '$' + requirementsCost.toLocaleString();
        document.getElementById('rebateAmount').textContent = '-$' + rebateAmount.toLocaleString();
        document.getElementById('totalCost').textContent = '$' + total.toLocaleString();
      }

      // Add event listeners to all calculator inputs
      document.querySelectorAll('.calculator-inputs select, .calculator-inputs input').forEach(input => {
        input.addEventListener('change', calculateCost);
      });

      // Initial calculation
      calculateCost();
    });
})();