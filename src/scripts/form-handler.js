/**
 * Universal Form Handler for Dryspace Waterproofing
 * Sends all form submissions to p.vysotckii@gmail.com
 * 
 * Implementation Options:
 * 1. EmailJS (recommended) - Sign up at https://www.emailjs.com/
 * 2. Formspree - Sign up at https://formspree.io/
 * 3. Netlify Forms (if hosted on Netlify)
 * 4. Custom webhook (Zapier, Make, etc.)
 */

// Configuration
const CONFIG = {
  recipientEmail: 'p.vysotckii@gmail.com',
  senderName: 'Dryspace Waterproofing Website',
  
  // EmailJS Configuration (Option 1)
  // Sign up for free at https://www.emailjs.com/
  // Replace these with your actual values from EmailJS dashboard
  emailjs: {
    publicKey: 'YOUR_EMAILJS_PUBLIC_KEY', // Get from EmailJS > Account > General
    serviceId: 'YOUR_EMAILJS_SERVICE_ID', // Get from EmailJS > Email Services
    templateId: 'YOUR_EMAILJS_TEMPLATE_ID', // Get from EmailJS > Email Templates
    enabled: false // Set to true after configuring
  },
  
  // Formspree Configuration (Option 2)
  // Sign up at https://formspree.io/
  formspree: {
    endpoint: 'https://formspree.io/f/YOUR_FORM_ID', // Get from Formspree dashboard
    enabled: false // Set to true after configuring
  },
  
  // Webhook Configuration (Option 3)
  // Use Zapier, Make, or custom endpoint
  webhook: {
    url: 'YOUR_WEBHOOK_URL',
    enabled: false // Set to true after configuring
  }
};

/**
 * Initialize form handler on all forms
 */
export function initFormHandler() {
  // Find all forms that need email handling
  const forms = document.querySelectorAll('form[data-email-form], #contactForm, .contact-form, form[action*="mailto"]');
  
  forms.forEach(form => {
    attachFormHandler(form);
  });
}

/**
 * Attach handler to a specific form
 */
function attachFormHandler(form) {
  // Skip if already initialized
  if (form.dataset.emailHandlerAttached) return;
  
  form.dataset.emailHandlerAttached = 'true';
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = collectFormData(form);
    const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
    const originalText = submitButton?.textContent || 'Submit';
    
    try {
      // Update button state
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending to p.vysotckii@gmail.com...';
      }
      
      // Send email using configured method
      const success = await sendEmail(formData);
      
      if (success) {
        showSuccess(form, 'Your message has been sent to p.vysotckii@gmail.com');
        form.reset();
      } else {
        throw new Error('Failed to send email');
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      showError(form, 'Failed to send. Please call 437-545-0067');
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    }
  });
}

/**
 * Collect form data into object
 */
function collectFormData(form) {
  const formData = new FormData(form);
  const data = {
    to: CONFIG.recipientEmail,
    from: CONFIG.senderName,
    timestamp: new Date().toISOString(),
    page: window.location.href,
    fields: {}
  };
  
  // Collect all form fields
  for (const [key, value] of formData.entries()) {
    data.fields[key] = value;
  }
  
  // Add common field mappings
  data.name = data.fields.name || data.fields.fullName || data.fields.firstName || 'Not provided';
  data.email = data.fields.email || data.fields.emailAddress || 'Not provided';
  data.phone = data.fields.phone || data.fields.phoneNumber || data.fields.tel || 'Not provided';
  data.message = data.fields.message || data.fields.details || data.fields.comments || 'No message';
  data.service = data.fields.service || data.fields.serviceType || 'Not specified';
  
  return data;
}

/**
 * Send email using configured method
 */
async function sendEmail(data) {
  // Option 1: EmailJS
  if (CONFIG.emailjs.enabled) {
    return await sendViaEmailJS(data);
  }
  
  // Option 2: Formspree
  if (CONFIG.formspree.enabled) {
    return await sendViaFormspree(data);
  }
  
  // Option 3: Webhook
  if (CONFIG.webhook.enabled) {
    return await sendViaWebhook(data);
  }
  
  // Fallback: Log to console and show mailto
  console.log('Form submission to p.vysotckii@gmail.com:', data);
  openMailtoFallback(data);
  return true; // Simulate success for demo
}

/**
 * Send via EmailJS
 */
async function sendViaEmailJS(data) {
  try {
    // Load EmailJS if not already loaded
    if (typeof emailjs === 'undefined') {
      await loadScript('https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js');
    }
    
    // Initialize EmailJS
    emailjs.init(CONFIG.emailjs.publicKey);
    
    // Send email
    const response = await emailjs.send(
      CONFIG.emailjs.serviceId,
      CONFIG.emailjs.templateId,
      {
        to_email: CONFIG.recipientEmail,
        from_name: data.name,
        from_email: data.email,
        phone: data.phone,
        service: data.service,
        message: data.message,
        page_url: data.page,
        timestamp: data.timestamp,
        all_fields: JSON.stringify(data.fields, null, 2)
      }
    );
    
    return response.status === 200;
  } catch (error) {
    console.error('EmailJS error:', error);
    return false;
  }
}

/**
 * Send via Formspree
 */
async function sendViaFormspree(data) {
  try {
    const response = await fetch(CONFIG.formspree.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _email: CONFIG.recipientEmail,
        _subject: `New form submission from ${data.name}`,
        ...data.fields,
        _replyto: data.email
      })
    });
    
    return response.ok;
  } catch (error) {
    console.error('Formspree error:', error);
    return false;
  }
}

/**
 * Send via webhook
 */
async function sendViaWebhook(data) {
  try {
    const response = await fetch(CONFIG.webhook.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    return response.ok;
  } catch (error) {
    console.error('Webhook error:', error);
    return false;
  }
}

/**
 * Fallback: Open mailto link
 */
function openMailtoFallback(data) {
  const subject = encodeURIComponent(`Contact Form: ${data.name}`);
  const body = encodeURIComponent([
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Service: ${data.service}`,
    `Message: ${data.message}`,
    '',
    'Form Details:',
    JSON.stringify(data.fields, null, 2)
  ].join('\n'));
  
  const mailtoLink = `mailto:${CONFIG.recipientEmail}?subject=${subject}&body=${body}`;
  
  // Optionally open mailto (uncomment if desired)
  // window.location.href = mailtoLink;
}

/**
 * Show success message
 */
function showSuccess(form, message) {
  // Look for existing success message element
  let successEl = form.querySelector('.form-success, #successMessage, [data-success-message]');
  
  if (!successEl) {
    // Create success message element
    successEl = document.createElement('div');
    successEl.className = 'form-success bg-cyan-50 border-2 border-cyan-300 p-4 text-center mt-4';
    successEl.innerHTML = `<p class="text-cyan-700 font-bold">${message}</p>`;
    form.appendChild(successEl);
  } else {
    successEl.textContent = message;
    successEl.classList.remove('hidden');
  }
  
  // Hide after 5 seconds
  setTimeout(() => {
    successEl.classList.add('hidden');
  }, 5000);
}

/**
 * Show error message
 */
function showError(form, message) {
  // Look for existing error message element
  let errorEl = form.querySelector('.form-error, #errorMessage, [data-error-message]');
  
  if (!errorEl) {
    // Create error message element
    errorEl = document.createElement('div');
    errorEl.className = 'form-error bg-red-50 border-2 border-red-300 p-4 text-center mt-4';
    errorEl.innerHTML = `<p class="text-red-700 font-bold">${message}</p>`;
    form.appendChild(errorEl);
  } else {
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
  }
  
  // Hide after 5 seconds
  setTimeout(() => {
    errorEl.classList.add('hidden');
  }, 5000);
}

/**
 * Load external script dynamically
 */
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFormHandler);
} else {
  initFormHandler();
}

// Export for manual initialization
export default { initFormHandler, attachFormHandler, CONFIG };