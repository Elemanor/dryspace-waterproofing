(function() {
  'use strict';
  
// Symptom checker
    const symptoms = document.querySelectorAll('.symptom-item');
    const diagnosisResult = document.querySelector('.diagnosis-result');
    let selectedSymptoms = [];

    symptoms.forEach(symptom => {
      symptom.addEventListener('click', function() {
        this.classList.toggle('selected');
        const cause = this.dataset.cause;
        
        if (this.classList.contains('selected')) {
          selectedSymptoms.push(cause);
        } else {
          selectedSymptoms = selectedSymptoms.filter(s => s !== cause);
        }
        
        updateDiagnosis();
      });
    });

    function updateDiagnosis() {
      if (selectedSymptoms.length > 0) {
        diagnosisResult.style.display = 'block';
        
        let severity = selectedSymptoms.length * 25;
        if (severity > 100) severity = 100;
        
        document.querySelector('.meter-fill').style.width = severity + '%';
        
        let severityText = 'Low';
        let diagnosisText = 'Minor crawl space issues detected.';
        
        if (severity > 75) {
          severityText = 'CRITICAL';
          diagnosisText = 'Severe crawl space problems requiring immediate attention. Multiple health and structural risks present.';
        } else if (severity > 50) {
          severityText = 'High';
          diagnosisText = 'Significant crawl space issues affecting your home and health. Professional intervention recommended.';
        } else if (severity > 25) {
          severityText = 'Moderate';
          diagnosisText = 'Crawl space problems developing. Early intervention can prevent costly damage.';
        }
        
        document.querySelector('.severity-text').textContent = severityText;
        document.querySelector('.diagnosis-text').textContent = diagnosisText;
      } else {
        diagnosisResult.style.display = 'none';
      }
    }

    // Cost calculator
    function calculateCrawlSpaceCost() {
      const size = parseInt(document.getElementById('crawl-size').value);
      const condition = document.getElementById('condition').value;
      const serviceLevel = document.getElementById('service-level').value;
      
      let baseRate = 8;
      if (serviceLevel === 'standard') baseRate = 20;
      if (serviceLevel === 'premium') baseRate = 30;
      
      let conditionMultiplier = 1;
      if (condition === 'damp') conditionMultiplier = 1.2;
      if (condition === 'wet') conditionMultiplier = 1.5;
      if (condition === 'damaged') conditionMultiplier = 1.8;
      
      const baseCost = size * baseRate;
      const conditionCost = baseCost * (conditionMultiplier - 1);
      
      let addonsCost = 0;
      if (document.getElementById('mold-removal').checked) addonsCost += 2500;
      if (document.getElementById('dehumidifier').checked) addonsCost += 1800;
      if (document.getElementById('sump-pump').checked) addonsCost += 1500;
      if (document.getElementById('insulation').checked) addonsCost += size * 3;
      
      const totalCost = baseCost + conditionCost + addonsCost;
      
      document.getElementById('base-cost').textContent = '$' + baseCost.toLocaleString();
      document.getElementById('condition-cost').textContent = '$' + Math.round(conditionCost).toLocaleString();
      document.getElementById('addons-cost').textContent = '$' + addonsCost.toLocaleString();
      document.getElementById('total-cost').textContent = '$' + totalCost.toLocaleString();
    }

    // Add event listeners
    document.getElementById('crawl-size').addEventListener('input', calculateCrawlSpaceCost);
    document.getElementById('condition').addEventListener('change', calculateCrawlSpaceCost);
    document.getElementById('service-level').addEventListener('change', calculateCrawlSpaceCost);
    document.querySelectorAll('.add-ons input').forEach(checkbox => {
      checkbox.addEventListener('change', calculateCrawlSpaceCost);
    });

    // Initial calculation
    calculateCrawlSpaceCost();

    // Countdown timer
    function updateCountdown() {
      const hours = document.querySelector('.countdown .time-block:first-child .number');
      const minutes = document.querySelector('.countdown .time-block:last-child .number');
      
      let h = parseInt(hours.textContent);
      let m = parseInt(minutes.textContent);
      
      if (m > 0) {
        m--;
      } else {
        m = 59;
        if (h > 0) h--;
      }
      
      hours.textContent = h.toString().padStart(2, '0');
      minutes.textContent = m.toString().padStart(2, '0');
    }

    setInterval(updateCountdown, 60000);
})();