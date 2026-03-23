(function() {
  'use strict';
  
// Height calculator
    function updateHeightVisual() {
      const currentHeight = parseFloat(document.getElementById('current-height').value);
      const loweringAmount = parseFloat(document.getElementById('lowering-amount').value);
      const newHeight = currentHeight + loweringAmount;
      
      // Update visual
      const beforeHeight = (currentHeight / 10) * 100;
      const afterHeight = (newHeight / 10) * 100;
      
      document.querySelector('.before-visual .ceiling-height').style.height = beforeHeight + '%';
      document.querySelector('.before-visual .height-label').textContent = currentHeight + ' ft';
      
      document.querySelector('.after-visual .ceiling-height').style.height = afterHeight + '%';
      document.querySelector('.after-visual .height-label').textContent = newHeight + ' ft';
      
      // Update results
      document.getElementById('new-height').textContent = newHeight + ' feet';
      document.getElementById('added-space').textContent = '~' + (loweringAmount * 300) + ' sq ft';
      
      const minValue = loweringAmount * 40000;
      const maxValue = loweringAmount * 60000;
      document.getElementById('value-increase').textContent = `$${minValue.toLocaleString()} - $${maxValue.toLocaleString()}`;
      
      document.getElementById('code-compliant').textContent = newHeight >= 8 ? '✅ Yes (8ft+)' : '⚠️ No (min 8ft required)';
    }
    
    document.getElementById('current-height').addEventListener('input', updateHeightVisual);
    document.getElementById('lowering-amount').addEventListener('change', updateHeightVisual);
    
    // Payment calculator
    function calculatePayment() {
      const amount = parseFloat(document.getElementById('loan-amount').value);
      const months = parseInt(document.getElementById('loan-term').value);
      const rate = 0.055 / 12; // 5.5% annual rate
      
      const payment = amount * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
      
      document.getElementById('monthly-payment').textContent = '$' + Math.round(payment).toLocaleString();
    }
    
    // Gallery filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        galleryItems.forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
    
    // Dynamic ROI Chart
    function createROIChart() {
      const canvas = document.getElementById('roiChart');
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      canvas.width = canvas.offsetWidth;
      canvas.height = 200;
      
      // Get values from inputs
      const homeValue = parseFloat(document.getElementById('home-value')?.value || 800000);
      const sqft = parseFloat(document.getElementById('current-sqft')?.value || 1500);
      const projectType = document.getElementById('project-type')?.value || 'underpinning';
      
      // Calculate costs and values
      const baseCost = projectType === 'underpinning' ? 45000 : 65000;
      const additionalCost = projectType === 'full-reno' ? 35000 : 0;
      const totalCost = baseCost + additionalCost;
      
      // Calculate value increase (15-25% of home value)
      const minValueIncrease = homeValue * 0.15;
      const maxValueIncrease = homeValue * 0.25;
      const avgValueIncrease = (minValueIncrease + maxValueIncrease) / 2;
      
      // Calculate rental income potential
      const monthlyRent = 2500;
      const yearlyRent = monthlyRent * 12;
      
      // Draw the chart
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set up chart dimensions
      const padding = 40;
      const chartWidth = canvas.width - padding * 2;
      const chartHeight = canvas.height - padding * 2;
      const barWidth = chartWidth / 7;
      
      // Draw axes
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padding, padding);
      ctx.lineTo(padding, canvas.height - padding);
      ctx.lineTo(canvas.width - padding, canvas.height - padding);
      ctx.stroke();
      
      // Data for bars
      const data = [
        { label: 'Project Cost', value: -totalCost, color: '#ef4444' },
        { label: 'Property Value', value: avgValueIncrease, color: '#10b981' },
        { label: 'Year 1 Rent', value: yearlyRent, color: '#3b82f6' },
        { label: 'Year 3 Rent', value: yearlyRent * 3, color: '#3b82f6' },
        { label: 'Year 5 Rent', value: yearlyRent * 5, color: '#3b82f6' },
        { label: 'Total ROI', value: avgValueIncrease + (yearlyRent * 5) - totalCost, color: '#246191' }
      ];
      
      // Find max value for scaling
      const maxValue = Math.max(...data.map(d => Math.abs(d.value)));
      const scale = chartHeight / (maxValue * 1.2);
      
      // Draw bars
      data.forEach((item, index) => {
        const x = padding + (index * barWidth) + barWidth * 0.1;
        const barHeight = Math.abs(item.value) * scale;
        const y = item.value > 0 
          ? canvas.height - padding - barHeight 
          : canvas.height - padding;
        
        // Draw bar
        ctx.fillStyle = item.color;
        ctx.fillRect(x, y, barWidth * 0.8, barHeight);
        
        // Draw value label
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 11px system-ui';
        ctx.textAlign = 'center';
        const valueText = '$' + Math.abs(Math.round(item.value / 1000)) + 'K';
        ctx.fillText(valueText, x + barWidth * 0.4, y - 5);
        
        // Draw x-axis label
        ctx.font = '10px system-ui';
        ctx.save();
        ctx.translate(x + barWidth * 0.4, canvas.height - padding + 15);
        ctx.rotate(-Math.PI / 6);
        ctx.textAlign = 'right';
        ctx.fillText(item.label, 0, 0);
        ctx.restore();
      });
      
      // Draw ROI percentage
      const roiPercent = Math.round(((avgValueIncrease + yearlyRent * 5) / totalCost - 1) * 100);
      ctx.fillStyle = '#246191';
      ctx.font = 'bold 24px system-ui';
      ctx.textAlign = 'right';
      ctx.fillText(roiPercent + '% ROI', canvas.width - padding, padding + 20);
      
      // Update ROI display text
      const roiDisplay = document.querySelector('.roi-metrics .highlight');
      if (roiDisplay) {
        const minROI = Math.round(((minValueIncrease + yearlyRent * 3) / totalCost - 1) * 100);
        const maxROI = Math.round(((maxValueIncrease + yearlyRent * 5) / totalCost - 1) * 100);
        roiDisplay.textContent = `${minROI}% - ${maxROI}%`;
      }
    }
    
    // Update ROI when inputs change
    const roiInputs = document.querySelectorAll('.roi-inputs input, .roi-inputs select');
    roiInputs.forEach(input => {
      input.addEventListener('change', createROIChart);
    });
    
    // Add Chart.js fallback for better charts if available
    function loadChartJS() {
      if (!window.Chart && !document.querySelector('script[src*="chart.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = () => {
          createAdvancedROIChart();
        };
        document.head.appendChild(script);
      }
    }
    
    function createAdvancedROIChart() {
      if (!window.Chart) {
        createROIChart(); // Fallback to canvas drawing
        return;
      }
      
      const canvas = document.getElementById('roiChart');
      if (!canvas) return;
      
      const homeValue = parseFloat(document.getElementById('home-value')?.value || 800000);
      const projectType = document.getElementById('project-type')?.value || 'underpinning';
      
      const baseCost = projectType === 'underpinning' ? 45000 : 65000;
      const additionalCost = projectType === 'full-reno' ? 35000 : 0;
      const totalCost = baseCost + additionalCost;
      
      const avgValueIncrease = homeValue * 0.20;
      const yearlyRent = 30000;
      
      new Chart(canvas, {
        type: 'bar',
        data: {
          labels: ['Investment', 'Property Value +', 'Year 1 Income', 'Year 3 Income', 'Year 5 Income', 'Total Return'],
          datasets: [{
            data: [-totalCost, avgValueIncrease, yearlyRent, yearlyRent * 3, yearlyRent * 5, avgValueIncrease + yearlyRent * 5 - totalCost],
            backgroundColor: ['#ef4444', '#10b981', '#3b82f6', '#3b82f6', '#3b82f6', '#246191'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => '$' + Math.abs(context.raw).toLocaleString()
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => '$' + Math.abs(value / 1000) + 'K'
              }
            }
          }
        }
      });
    }
    
    // Initial calculations
    updateHeightVisual();
    calculatePayment();
    createROIChart();
    
    // Try to load Chart.js for better visualization
    setTimeout(loadChartJS, 1000);
})();