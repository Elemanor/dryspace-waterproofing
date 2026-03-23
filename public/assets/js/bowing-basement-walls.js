(function() {
  'use strict';
  
function assessWallCondition() {
		const bowMeasurement = document.getElementById('bowMeasurement').value;
		const crackPattern = document.getElementById('crackPattern').value;
		const progression = document.getElementById('progression').value;
		
		if (!bowMeasurement || !crackPattern || !progression) {
			alert('Please complete all assessment fields');
			return;
		}
		
		const resultsDiv = document.getElementById('assessmentResults');
		const analysisDiv = document.getElementById('riskAnalysis');
		const needle = document.getElementById('riskNeedle');
		
		let riskScore = 0;
		let riskLevel = '';
		let recommendations = '';
		
		// Calculate risk score
		const bowScores = {
			'minor': 1,
			'moderate': 2,
			'severe': 3,
			'critical': 4
		};
		
		const crackScores = {
			'vertical': 1,
			'horizontal': 2,
			'stair-step': 2,
			'multiple': 3
		};
		
		const progressionScores = {
			'stable': 0,
			'slow': 1,
			'moderate': 2,
			'rapid': 4
		};
		
		riskScore = bowScores[bowMeasurement] + crackScores[crackPattern] + progressionScores[progression];
		
		// Determine risk level and needle position
		let needleRotation = -90;
		if (riskScore <= 2) {
			riskLevel = 'Low Risk';
			needleRotation = -60;
			recommendations = `
				<h4 style="color: #27ae60;">Low Risk Assessment</h4>
				<p><strong>Current Status:</strong> Minor wall movement with stable conditions.</p>
				<p><strong>Immediate Action:</strong> Monitor quarterly for changes.</p>
				<p><strong>Recommended Solutions:</strong></p>
				<ul>
					<li>Annual professional inspection</li>
					<li>Carbon fiber reinforcement for prevention</li>
					<li>Improve exterior drainage</li>
				</ul>
				<p><strong>Timeline:</strong> Non-urgent, plan within 6-12 months</p>
			`;
		} else if (riskScore <= 5) {
			riskLevel = 'Moderate Risk';
			needleRotation = -20;
			recommendations = `
				<h4 style="color: #f39c12;">Moderate Risk Assessment</h4>
				<p><strong>Current Status:</strong> Noticeable wall movement requiring attention.</p>
				<p><strong>Immediate Action:</strong> Schedule professional assessment within 30 days.</p>
				<p><strong>Recommended Solutions:</strong></p>
				<ul>
					<li>Carbon fiber reinforcement system</li>
					<li>Steel I-beam bracing for severe areas</li>
					<li>Comprehensive drainage improvement</li>
				</ul>
				<p><strong>Timeline:</strong> Address within 2-3 months</p>
			`;
		} else if (riskScore <= 8) {
			riskLevel = 'High Risk';
			needleRotation = 20;
			recommendations = `
				<h4 style="color: #e67e22;">High Risk Assessment</h4>
				<p><strong>Current Status:</strong> Significant wall movement with ongoing progression.</p>
				<p><strong>Immediate Action:</strong> Emergency assessment recommended within 7 days.</p>
				<p><strong>Recommended Solutions:</strong></p>
				<ul>
					<li>Wall anchor system for stabilization</li>
					<li>Helical tie-back installation</li>
					<li>Immediate temporary bracing if needed</li>
				</ul>
				<p><strong>Timeline:</strong> Address immediately (1-2 weeks)</p>
			`;
		} else {
			riskLevel = 'Critical Risk';
			needleRotation = 60;
			recommendations = `
				<h4 style="color: #e74c3c;">Critical Risk Assessment</h4>
				<p><strong>Current Status:</strong> Severe wall failure risk - immediate action required.</p>
				<p><strong>Immediate Action:</strong> EMERGENCY structural assessment within 24 hours.</p>
				<p><strong>Recommended Solutions:</strong></p>
				<ul>
					<li>Emergency temporary bracing</li>
					<li>Comprehensive wall anchor system</li>
					<li>Professional structural engineering evaluation</li>
				</ul>
				<p><strong>Timeline:</strong> EMERGENCY - Contact us immediately</p>
				<div style="background: #e74c3c; color: white; padding: 15px; border-radius: 8px; margin-top: 15px;">
					<strong>⚠️ URGENT: Call 437-545-0067 now for emergency service</strong>
				</div>
			`;
		}
		
		// Update needle position
		needle.style.transform = `translateX(-50%) rotate(${needleRotation}deg)`;
		
		// Show results
		analysisDiv.innerHTML = recommendations;
		resultsDiv.style.display = 'block';
		
		// Scroll to results
		resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
	}
	
	function calculateWallRepairCost() {
		const wallLength = parseFloat(document.getElementById('wallLength').value);
		const repairType = document.getElementById('repairType').value;
		const severity = document.getElementById('severity').value;
		
		if (!wallLength || !repairType || !severity) {
			alert('Please complete all fields for cost calculation');
			return;
		}
		
		const resultsDiv = document.getElementById('costResults');
		const detailsDiv = document.getElementById('costDetails');
		
		let baseCostPerFoot = 0;
		let systemName = '';
		let severityMultiplier = 1;
		
		// Base costs per linear foot
		const baseCosts = {
			'carbon': 180,
			'anchor': 400,
			'helical': 600,
			'beam': 160
		};
		
		const systemNames = {
			'carbon': 'Carbon Fiber Reinforcement',
			'anchor': 'Wall Anchor System',
			'helical': 'Helical Tie-backs',
			'beam': 'Steel I-Beam Bracing'
		};
		
		const severityMultipliers = {
			'minor': 1.0,
			'moderate': 1.2,
			'severe': 1.4,
			'critical': 1.6
		};
		
		baseCostPerFoot = baseCosts[repairType];
		systemName = systemNames[repairType];
		severityMultiplier = severityMultipliers[severity];
		
		const materialCost = wallLength * baseCostPerFoot * severityMultiplier;
		const laborCost = materialCost * 0.6;
		const permitCost = 500;
		const totalCost = materialCost + laborCost + permitCost;
		
		const costBreakdown = `
			<div class="cost-line">
				<span>System Type:</span>
				<span><strong>${systemName}</strong></span>
			</div>
			<div class="cost-line">
				<span>Wall Length:</span>
				<span>${wallLength} feet</span>
			</div>
			<div class="cost-line">
				<span>Materials & Equipment:</span>
				<span>$${materialCost.toLocaleString()}</span>
			</div>
			<div class="cost-line">
				<span>Labor & Installation:</span>
				<span>$${laborCost.toLocaleString()}</span>
			</div>
			<div class="cost-line">
				<span>Permits & Engineering:</span>
				<span>$${permitCost.toLocaleString()}</span>
			</div>
			<div class="cost-line total">
				<span><strong>Total Project Cost:</strong></span>
				<span><strong>$${totalCost.toLocaleString()}</strong></span>
			</div>
			<div class="financing-options">
				<h4>Financing Available</h4>
				<p>Monthly payments as low as <strong>$${Math.round(totalCost / 60).toLocaleString()}</strong> with approved credit</p>
			</div>
		`;
		
		detailsDiv.innerHTML = costBreakdown;
		resultsDiv.style.display = 'block';
		
		// Scroll to results
		resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
	}
})();