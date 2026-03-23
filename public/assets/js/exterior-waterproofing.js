(function() {
  'use strict';
  
document.addEventListener('DOMContentLoaded', () => {
    // Accordion functionality for technical specs
    const toggleButtons = document.querySelectorAll('.specs-toggle');
    
    toggleButtons.forEach(button => {
      button.addEventListener('click', () => {
        const specsGrid = button.nextElementSibling;
        const isVisible = specsGrid.style.display !== 'none';
        
        // Toggle visibility
        specsGrid.style.display = isVisible ? 'none' : 'block';
        
        // Toggle active class
        button.classList.toggle('active', !isVisible);
      });
    });
  });
})();