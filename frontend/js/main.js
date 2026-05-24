// ----------------------------------------------------
// main.js - Shared Frontend Logics (Navbars, Sessions)
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // 1. MOBILE MENU NAVIGATION
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Toggle hamburger animation
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // 2. SESSION AUTHENTICATION HANDLING
    // Check if user info exists in localStorage
    const loggedInUser = localStorage.getItem('cyberUser');
    const authContainer = document.getElementById('auth-nav-container');

    if (authContainer) {
        if (loggedInUser) {
            // User is signed in! Let's parse their details
            const user = JSON.parse(loggedInUser);
            
            // Render a welcome message and a logout button instead of Login/Signup
            authContainer.innerHTML = `
                <div class="user-badge" style="display: flex; align-items: center; gap: 10px; margin-right: 10px;">
                    <span class="user-avatar" style="width: 32px; height: 32px; border-radius: 50%; background: var(--accent-green); color: #000; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem;">
                        ${user.name.charAt(0).toUpperCase()}
                    </span>
                    <span style="font-weight: 500; font-size: 0.95rem; color: var(--accent-cyan);">Hi, ${user.name.split(' ')[0]}</span>
                </div>
                <button id="logout-btn" class="btn btn-secondary" style="padding: 8px 16px; font-size: 0.85rem;">Logout</button>
            `;

            // Attach event listener to the logout button
            document.getElementById('logout-btn').addEventListener('click', () => {
                // Clear session
                localStorage.removeItem('cyberUser');
                // Display positive feedback and reload page
                showGlobalAlert('Logged out successfully. Secure browsing session ended.', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            });
        } else {
            // User is not signed in, show regular login/signup
            authContainer.innerHTML = `
                <a href="login.html" class="btn btn-secondary">Login</a>
                <a href="signup.html" class="btn btn-primary">Sign Up</a>
            `;
        }
    }
});

// 3. HELPER FUNCTION TO DISPLAY BEAUTIFUL FLOATING ALERTS
// Handy utility so both auth and contact modules can trigger sleek visual notifications
function showGlobalAlert(message, type = 'success') {
    // Check if an existing alert is on screen
    let alertContainer = document.getElementById('floating-alert-box');
    
    if (!alertContainer) {
        alertContainer = document.createElement('div');
        alertContainer.id = 'floating-alert-box';
        alertContainer.style.position = 'fixed';
        alertContainer.style.bottom = '30px';
        alertContainer.style.right = '30px';
        alertContainer.style.zIndex = '9999';
        alertContainer.style.display = 'flex';
        alertContainer.style.flexDirection = 'column';
        alertContainer.style.gap = '10px';
        document.body.appendChild(alertContainer);
    }

    const alertItem = document.createElement('div');
    alertItem.style.padding = '15px 25px';
    alertItem.style.borderRadius = '8px';
    alertItem.style.fontWeight = '600';
    alertItem.style.fontSize = '0.95rem';
    alertItem.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
    alertItem.style.animation = 'slideIn 0.3s ease forwards';
    
    // Add CSS keyframe if not present
    if (!document.getElementById('alert-slidein-style')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'alert-slidein-style';
        styleSheet.innerText = `
            @keyframes slideIn {
                from { opacity: 0; transform: translateX(50px); }
                to { opacity: 1; transform: translateX(0); }
            }
            @keyframes fadeOut {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(20px); }
            }
        `;
        document.head.appendChild(styleSheet);
    }

    if (type === 'success') {
        alertItem.style.backgroundColor = 'rgba(15, 25, 20, 0.95)';
        alertItem.style.border = '1px solid var(--accent-green)';
        alertItem.style.color = 'var(--accent-green)';
    } else {
        alertItem.style.backgroundColor = 'rgba(25, 15, 20, 0.95)';
        alertItem.style.border = '1px solid var(--accent-red)';
        alertItem.style.color = 'var(--accent-red)';
    }

    alertItem.innerText = message;
    alertContainer.appendChild(alertItem);

    // Auto dismiss after 3.5 seconds
    setTimeout(() => {
        alertItem.style.animation = 'fadeOut 0.4s ease forwards';
        setTimeout(() => {
            alertItem.remove();
        }, 400);
    }, 3500);
}

// 4. CONFIGURATION OF BACKEND BASE URL
// Easily change this URL to host on external staging (e.g. Render/Heroku)
const BASE_URL = 'http://localhost:5000/api';
window.BASE_URL = BASE_URL;
window.showGlobalAlert = showGlobalAlert;
