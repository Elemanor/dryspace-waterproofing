(function() {
  'use strict';
  
// Risk calculator
    const riskItems = document.querySelectorAll('.risk-item input');
    const meterFill = document.querySelector('.meter-fill');
    const riskAnalysis = document.querySelector('.risk-analysis');
    
    function calculateRisk() {
      let totalRisk = 0;
      riskItems.forEach(item => {
        if (item.checked) {
          totalRisk += parseInt(item.dataset.risk);
        }
      });
      
      meterFill.style.width = Math.min(totalRisk, 100) + '%';
      
      if (totalRisk > 0) {
        riskAnalysis.style.display = 'block';
        
        let riskLevel = 'Low';
        let message = 'Some risk factors present. Consider installation for peace of mind.';
        
        if (totalRisk > 75) {
          riskLevel = 'CRITICAL';
          message = 'Immediate action required! Your home is at severe risk of sewage backup.';
        } else if (totalRisk > 50) {
          riskLevel = 'High';
          message = 'Significant risk detected. Installation strongly recommended to prevent damage.';
        } else if (totalRisk > 25) {
          riskLevel = 'Medium';
          message = 'Moderate risk level. Installation would provide valuable protection.';
        }
        
        document.querySelector('.risk-level span').textContent = riskLevel;
        document.querySelector('.risk-message').textContent = message;
      } else {
        riskAnalysis.style.display = 'none';
      }
    }
    
    riskItems.forEach(item => {
      item.addEventListener('change', calculateRisk);
    });
    
    // Rebate calculator
    function calculateRebate() {
      const cost = parseFloat(document.getElementById('install-cost').value) || 0;
      const hasValve = document.getElementById('valve').checked;
      const hasSump = document.getElementById('sump').checked;
      const hasSeverance = document.getElementById('severance').checked;
      
      let valveRebate = 0;
      let sumpRebate = 0;
      let severanceRebate = 0;
      
      if (hasValve) {
        valveRebate = Math.min(cost * 0.8, 3400);
      }
      if (hasSump) {
        sumpRebate = Math.min(1750 * 0.8, 1750);
      }
      if (hasSeverance) {
        severanceRebate = Math.min(1000 * 0.8, 1000);
      }
      
      const totalRebate = valveRebate + sumpRebate + severanceRebate;
      const finalCost = cost - totalRebate;
      
      document.getElementById('valve-rebate').textContent = '$' + valveRebate.toFixed(0);
      document.getElementById('sump-rebate').textContent = '$' + sumpRebate.toFixed(0);
      document.getElementById('severance-rebate').textContent = '$' + severanceRebate.toFixed(0);
      document.getElementById('total-rebate').textContent = '$' + totalRebate.toFixed(0);
      document.getElementById('final-cost').textContent = '$' + Math.max(0, finalCost).toFixed(0);
    }
    
    document.getElementById('install-cost').addEventListener('input', calculateRebate);
    document.getElementById('valve').addEventListener('change', calculateRebate);
    document.getElementById('sump').addEventListener('change', calculateRebate);
    document.getElementById('severance').addEventListener('change', calculateRebate);
    
    // Insurance savings calculator
    function calculateInsuranceSavings() {
      const premium = parseFloat(document.getElementById('premium').value) || 0;
      const minSavings = premium * 0.1;
      const maxSavings = premium * 0.25;
      
      document.getElementById('annual-savings').textContent = '$' + minSavings.toFixed(0) + '-' + maxSavings.toFixed(0);
      document.getElementById('decade-savings').textContent = '$' + (minSavings * 10).toFixed(0) + '-' + (maxSavings * 10).toFixed(0);
    }
    
    document.getElementById('premium').addEventListener('input', calculateInsuranceSavings);
    
    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', function() {
        const item = this.closest('.faq-item');
        item.classList.toggle('active');
      });
    });
    
    // Initial calculations
    calculateRebate();
    calculateInsuranceSavings();
})();