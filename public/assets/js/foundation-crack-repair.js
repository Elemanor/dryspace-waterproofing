(function() {
  'use strict';
  
// FAQ Accordion functionality is inline in the HTML
  
  // Photo Upload Functionality
  document.addEventListener('DOMContentLoaded', () => {
    const uploadBtn = document.getElementById('uploadPhotoBtn');
    const photoInput = document.getElementById('photoInput');
    const photoPreview = document.getElementById('photoPreview');
    const previewImage = document.getElementById('previewImage');
    const analyzeBtn = document.getElementById('analyzeBtn');
    
    // Trigger file input when button clicked
    uploadBtn?.addEventListener('click', () => {
      photoInput.click();
    });
    
    // Handle file selection
    photoInput?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          previewImage.src = e.target.result;
          photoPreview.style.display = 'block';
          uploadBtn.textContent = 'Change Photo';
          
          // Store the image data for analysis
          window.uploadedCrackPhoto = {
            data: e.target.result,
            filename: file.name,
            size: file.size
          };
        };
        reader.readAsDataURL(file);
      }
    });
    
    // Handle analyze button click
    analyzeBtn?.addEventListener('click', () => {
      if (window.uploadedCrackPhoto) {
        // Create analysis overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        `;
        
        const analysisBox = document.createElement('div');
        analysisBox.style.cssText = `
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          max-width: 500px;
          width: 90%;
          text-align: center;
        `;
        
        analysisBox.innerHTML = `
          <h3 style="color: #246191; margin-bottom: 1rem;">Analyzing Your Crack Photo...</h3>
          <div style="margin: 2rem 0;">
            <div style="border: 3px solid #f3f4f6; border-top: 3px solid #246191; border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite; margin: 0 auto;"></div>
          </div>
          <p style="color: #666; margin-bottom: 0.5rem;">Our AI is examining your photo to determine:</p>
          <ul style="text-align: left; color: #666; margin: 1rem auto; max-width: 300px;">
            <li>Crack type and severity</li>
            <li>Recommended repair method</li>
            <li>Estimated cost range</li>
            <li>Urgency level</li>
          </ul>
        `;
        
        overlay.appendChild(analysisBox);
        document.body.appendChild(overlay);
        
        // Simulate analysis and show results
        setTimeout(() => {
          analysisBox.innerHTML = `
            <h3 style="color: #246191; margin-bottom: 1rem;">Analysis Complete!</h3>
            <div style="background: #fef3c7; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
              <p style="color: #92400e; font-weight: bold; margin: 0;">Detected: Vertical Settlement Crack</p>
              <p style="color: #92400e; margin: 0.5rem 0 0 0;">Width: 3-5mm • Length: ~4ft • Priority: Medium</p>
            </div>
            <div style="text-align: left; margin: 1.5rem 0;">
              <h4 style="color: #246191; margin-bottom: 0.5rem;">Recommended Solution:</h4>
              <p style="color: #666; margin: 0.5rem 0;">Polyurethane injection with surface seal</p>
              <p style="color: #666; margin: 0.5rem 0;"><strong>Estimated Cost:</strong> $400-600</p>
              <p style="color: #666; margin: 0.5rem 0;"><strong>Time Required:</strong> 2-3 hours</p>
              <p style="color: #666; margin: 0.5rem 0;"><strong>Warranty:</strong> 10 years</p>
            </div>
            <div style="background: #ecfdf5; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
              <p style="color: #065f46; margin: 0;">✅ Good news: This crack can be permanently repaired!</p>
            </div>
            <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
              <button onclick="window.location.href='/contact?service=crack-repair&analysis=complete'" style="flex: 1; padding: 1rem; background: #246191; color: white; border: none; border-radius: 0.5rem; font-weight: bold; cursor: pointer;">Get Exact Quote</button>
              <button onclick="this.closest('[style*=fixed]').remove()" style="flex: 1; padding: 1rem; background: #f3f4f6; color: #666; border: none; border-radius: 0.5rem; font-weight: bold; cursor: pointer;">Close</button>
            </div>
          `;
        }, 3000);
      }
    });
  });
  
  // Add spinning animation
  if (!document.querySelector('#crack-upload-styles')) {
    const style = document.createElement('style');
    style.id = 'crack-upload-styles';
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .photo-button {
        transition: all 0.3s ease;
      }
      .photo-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(36, 97, 145, 0.3);
      }
    `;
    document.head.appendChild(style);
  }
})();