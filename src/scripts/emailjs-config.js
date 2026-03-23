/**
 * EmailJS Configuration for Dryspace Waterproofing
 * Sends all form submissions to p.vysotckii@gmail.com
 */

// EmailJS Configuration
export const EMAILJS_CONFIG = {
  publicKey: 'cmiVEFrjF0XT3k_AO', // Your EmailJS public key
  serviceId: 'service_q7hiar3', // Your Gmail service ID
  templateId: 'template_2z5evl6', // Your EmailJS template ID
  recipientEmail: 'p.vysotckii@gmail.com'
};

/**
 * Initialize EmailJS
 */
export function initEmailJS() {
  // Load EmailJS SDK if not already loaded
  if (typeof emailjs === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = () => {
      // Initialize with your public key after script loads
      if (EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('EmailJS initialized');
      } else {
        console.warn('EmailJS: Please add your public key to emailjs-config.js');
      }
    };
    document.head.appendChild(script);
  } else {
    // Already loaded, just initialize
    if (EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
      emailjs.init(EMAILJS_CONFIG.publicKey);
    }
  }
}

/**
 * Send email using EmailJS
 */
export async function sendFormEmail(formData) {
  try {
    // Ensure EmailJS is initialized
    if (typeof emailjs === 'undefined') {
      throw new Error('EmailJS not loaded. Please wait and try again.');
    }

    // Prepare template parameters
    const templateParams = {
      // These should match your EmailJS template variables
      to_email: EMAILJS_CONFIG.recipientEmail,
      to_name: 'Pavel Vysotckii',
      from_name: formData.name || 'Website Visitor',
      from_email: formData.email || 'No email provided',
      phone: formData.phone || 'No phone provided',
      service: formData.service || 'General Inquiry',
      message: formData.message || 'No message provided',
      
      // Additional fields
      submission_date: new Date().toLocaleDateString(),
      submission_time: new Date().toLocaleTimeString(),
      page_url: window.location.href,
      
      // All form fields as JSON (for complete record)
      all_fields: JSON.stringify(formData, null, 2)
    };

    console.log('Sending email to:', EMAILJS_CONFIG.recipientEmail);
    
    // Send email
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return { success: true, response };
    
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error: error.text || error.message || 'Unknown error' };
  }
}

/**
 * Attach EmailJS to all forms
 */
export function attachEmailJSToForms() {
  // Initialize EmailJS first
  initEmailJS();
  
  // Wait for EmailJS to load
  setTimeout(() => {
    // Find all forms
    const forms = document.querySelectorAll('form:not([data-emailjs-attached])');
    
    forms.forEach(form => {
      // Mark as attached
      form.dataset.emailjsAttached = 'true';
      
      // Add submit handler
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {};
        const formDataObj = new FormData(form);
        for (const [key, value] of formDataObj.entries()) {
          formData[key] = value;
        }
        
        // Get submit button
        const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
        const originalText = submitBtn?.textContent || 'Submit';
        
        // Update button state
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending to p.vysotckii@gmail.com...';
        }
        
        // Send email
        const result = await sendFormEmail(formData);
        
        // Handle result
        if (result.success) {
          // Show success message
          showMessage(form, 'success', 'Your message has been sent to p.vysotckii@gmail.com. We will contact you within 24 hours.');
          form.reset();
        } else {
          // Show error message
          showMessage(form, 'error', `Failed to send message. Please call us at 437-545-0067. Error: ${result.error}`);
        }
        
        // Restore button
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      });
    });
    
    console.log(`EmailJS attached to ${forms.length} forms`);
  }, 1000);
}

/**
 * Show message to user
 */
function showMessage(form, type, message) {
  // Remove any existing messages
  const existingMsg = form.querySelector('.form-message');
  if (existingMsg) {
    existingMsg.remove();
  }
  
  // Create message element
  const msgDiv = document.createElement('div');
  msgDiv.className = `form-message ${type === 'success' ? 'bg-cyan-50 border-cyan-300 text-cyan-700' : 'bg-red-50 border-red-300 text-red-700'} border-2 p-4 mt-4 text-center font-bold`;
  msgDiv.textContent = message;
  
  // Add to form
  form.appendChild(msgDiv);
  
  // Remove after 5 seconds
  setTimeout(() => {
    msgDiv.remove();
  }, 5000);
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', attachEmailJSToForms);
} else {
  attachEmailJSToForms();
}

// Export for manual use
export default {
  EMAILJS_CONFIG,
  initEmailJS,
  sendFormEmail,
  attachEmailJSToForms
};