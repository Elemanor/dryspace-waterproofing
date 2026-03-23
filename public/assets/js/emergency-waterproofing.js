(function() {
  'use strict';
  
// Damage calculator
    function updateDamageCalculator() {
      const depth = parseFloat(document.getElementById('water-depth').value) || 4;
      const area = parseFloat(document.getElementById('affected-area').value) || 800;
      const responseTime = parseFloat(document.getElementById('response-time').value) || 0.5;
      
      // Base costs
      let responseCost = 199 + (responseTime > 1 ? (responseTime - 1) * 200 : 0);
      let extractionCost = Math.round(area * 3 * (depth / 12));
      let dryingCost = Math.round(area * 2.5 * Math.max(1, responseTime / 6));
      let materialCost = depth > 6 ? Math.round(area * 8) : Math.round(area * 5.5);
      let moldCost = responseTime > 4 ? Math.round(area * 2) : Math.round(area * 1);
      
      // Time penalty multiplier
      const timePenalty = Math.max(1, 1 + (responseTime - 0.5) * 0.3);
      materialCost = Math.round(materialCost * timePenalty);
      moldCost = Math.round(moldCost * timePenalty);
      
      const totalCost = responseCost + extractionCost + dryingCost + materialCost + moldCost;
      
      // Update display
      document.getElementById('response-cost').textContent = `$${responseCost.toLocaleString()}`;
      document.getElementById('extraction-cost').textContent = `$${extractionCost.toLocaleString()}`;
      document.getElementById('drying-cost').textContent = `$${dryingCost.toLocaleString()}`;
      document.getElementById('material-cost').textContent = `$${materialCost.toLocaleString()}`;
      document.getElementById('mold-cost').textContent = `$${moldCost.toLocaleString()}`;
      document.getElementById('total-cost').textContent = `$${totalCost.toLocaleString()}`;
    }
    
    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', function() {
        const item = this.closest('.faq-item');
        item.classList.toggle('active');
      });
    });
    
    // Add event listeners
    document.getElementById('water-depth').addEventListener('input', updateDamageCalculator);
    document.getElementById('affected-area').addEventListener('input', updateDamageCalculator);
    document.getElementById('response-time').addEventListener('input', updateDamageCalculator);
    
    // Initial calculation
    updateDamageCalculator();
})();