(function() {
  'use strict';
  
function calculateSmartROI() {
      const systemType = document.getElementById('systemType').value;
      const premium = parseInt(document.getElementById('insurancePremium').value);
      
      let systemMin, systemMax;
      switch(systemType) {
        case 'basic':
          systemMin = 300; systemMax = 500;
          break;
        case 'standard':
          systemMin = 800; systemMax = 1200;
          break;
        case 'premium':
          systemMin = 1500; systemMax = 2500;
          break;
      }
      
      const discountRate = systemType === 'basic' ? 0.05 : systemType === 'standard' ? 0.10 : 0.15;
      const annualSavingsAmount = Math.round(premium * discountRate);
      
      document.getElementById('systemCost').textContent = `$${systemMin.toLocaleString()} - $${systemMax.toLocaleString()}`;
      document.getElementById('annualSavings').textContent = `$${Math.round(annualSavingsAmount * 0.8).toLocaleString()} - $${Math.round(annualSavingsAmount * 1.2).toLocaleString()}`;
      
      const avgCost = (systemMin + systemMax) / 2;
      const paybackYears = Math.round(avgCost / annualSavingsAmount);
      document.getElementById('paybackPeriod').textContent = `${paybackYears-1}-${paybackYears+1} years`;
      
      const tenYearNet = (annualSavingsAmount * 10) - avgCost;
      document.getElementById('tenYearSavings').textContent = `$${Math.round(tenYearNet * 0.8).toLocaleString()} - $${Math.round(tenYearNet * 1.2).toLocaleString()}`;
    }
    
    // Initialize calculator
    calculateSmartROI();
})();