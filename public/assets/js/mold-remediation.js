(function() {
  'use strict';
  
// Symptom checker
    const symptoms = document.querySelectorAll('.symptom input');
    const symptomResult = document.querySelector('.symptom-result');
    const riskMessage = document.querySelector('.risk-message');
    
    symptoms.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const checkedCount = document.querySelectorAll('.symptom input:checked').length;
        
        if (checkedCount > 0) {
          symptomResult.style.display = 'block';
          
          let message = '';
          if (checkedCount >= 5) {
            message = 'SEVERE RISK: Multiple symptoms indicate significant mold exposure. Immediate professional remediation strongly recommended.';
          } else if (checkedCount >= 3) {
            message = 'HIGH RISK: Your symptoms suggest possible mold exposure. Professional inspection recommended.';
          } else {
            message = 'MODERATE RISK: Some symptoms present. Consider mold testing to rule out exposure.';
          }
          
          riskMessage.textContent = message;
        } else {
          symptomResult.style.display = 'none';
        }
      });
    });
})();