// ----------------------------------------------------
// auth.js - Frontend Validations and Auth APIs
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. REGISTRATION / SIGN UP FORM HANDLING
    // ==========================================
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Stop default browser reload
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const confirmPassword = document.getElementById('confirmPassword').value.trim();
            
            // Grab alert message box
            const alertBox = document.getElementById('alert-box');
            alertBox.style.display = 'none'; // reset visual alerts
            
            // Client-Side Input Validations
            if (!name || !email || !password || !confirmPassword) {
                showFormAlert(alertBox, 'Please fill in all details.', 'error');
                return;
            }
            
            // Basic Email pattern validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormAlert(alertBox, 'Please enter a valid email address.', 'error');
                return;
            }
            
            // Password length requirement
            if (password.length < 6) {
                showFormAlert(alertBox, 'Security requirement: Password must be at least 6 characters.', 'error');
                return;
            }
            
            // Confirm password matching
            if (password !== confirmPassword) {
                showFormAlert(alertBox, 'Passwords do not match. Please verify.', 'error');
                return;
            }

            // If local validation passes, let's send request to backend
            try {
                const response = await fetch(`${window.BASE_URL}/auth/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, password })
                });

                const data = await response.json();

                if (!response.ok) {
                    // Backend returned an error (e.g. user already exists)
                    showFormAlert(alertBox, data.error || 'Registration failed.', 'error');
                } else {
                    // Registration succeeded!
                    showFormAlert(alertBox, 'Registration successful! Redirecting to login...', 'success');
                    window.showGlobalAlert('Account created successfully!', 'success');
                    
                    // Redirect to login page after 1.5 seconds
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1500);
                }
            } catch (err) {
                console.error('Network/Server error during signup:', err);
                showFormAlert(alertBox, 'Unable to connect to the server. Please ensure the backend is running.', 'error');
            }
        });
    }

    // ==========================================
    // 2. LOGIN FORM HANDLING
    // ==========================================
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Stop default browser reload
            
            // Get form values
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            
            // Grab alert box
            const alertBox = document.getElementById('alert-box');
            alertBox.style.display = 'none'; // reset
            
            // Validation
            if (!email || !password) {
                showFormAlert(alertBox, 'Please enter both email and password.', 'error');
                return;
            }
            
            try {
                // Fetch the backend API
                const response = await fetch(`${window.BASE_URL}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (!response.ok) {
                    // Credentials mismatch or user not found
                    showFormAlert(alertBox, data.error || 'Login failed.', 'error');
                } else {
                    // Success! Store user credentials in localStorage to maintain active session
                    localStorage.setItem('cyberUser', JSON.stringify(data.user));
                    
                    showFormAlert(alertBox, 'Access Authorized. Redirecting to home...', 'success');
                    window.showGlobalAlert(`Welcome back, ${data.user.name}!`, 'success');
                    
                    // Redirect to dashboard/home after 1.2 seconds
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1200);
                }
            } catch (err) {
                console.error('Network/Server error during login:', err);
                showFormAlert(alertBox, 'Unable to connect to the server. Please ensure the backend is running.', 'error');
            }
        });
    }
});

// ==========================================
// 3. UTILITY FORM ALERT HELPER
// ==========================================
function showFormAlert(element, message, type = 'error') {
    element.innerText = message;
    element.className = 'alert-message'; // Reset classes
    
    if (type === 'error') {
        element.classList.add('alert-error');
    } else {
        element.classList.add('alert-success');
    }
    
    element.style.display = 'block';
}
