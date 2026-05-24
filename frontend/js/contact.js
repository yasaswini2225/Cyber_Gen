// ----------------------------------------------------
// contact.js - Contact Form validation & API handler
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Stop default form submit reload
            
            // Collect form fields
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Get alert message box
            const alertBox = document.getElementById('alert-box');
            alertBox.style.display = 'none'; // reset
            
            // Client-Side Field Validations
            if (!name || !email || !subject || !message) {
                showContactAlert(alertBox, 'Please complete all fields in the contact form.', 'error');
                return;
            }
            
            // Email layout validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showContactAlert(alertBox, 'Please enter a valid email address.', 'error');
                return;
            }

            try {
                // Post details to the REST backend API
                const response = await fetch(`${window.BASE_URL}/contact`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, subject, message })
                });

                const data = await response.json();

                if (!response.ok) {
                    showContactAlert(alertBox, data.error || 'Failed to submit contact request.', 'error');
                } else {
                    // Success! Display message to user
                    showContactAlert(alertBox, 'Message submitted successfully! Check the backend terminal console for logs.', 'success');
                    window.showGlobalAlert('Message sent successfully!', 'success');
                    
                    // Reset form fields
                    contactForm.reset();
                }
            } catch (err) {
                console.error('Network/Server error during contact submit:', err);
                showContactAlert(alertBox, 'Network failure. Please make sure the Express backend server is running.', 'error');
            }
        });
    }
});

// Helper for displaying contact in-form alert box
function showContactAlert(element, message, type = 'error') {
    element.innerText = message;
    element.className = 'alert-message'; // Clear old classes
    
    if (type === 'error') {
        element.classList.add('alert-error');
    } else {
        element.classList.add('alert-success');
    }
    
    element.style.display = 'block';
}
