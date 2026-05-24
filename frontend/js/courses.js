// ----------------------------------------------------
// courses.js - Fetching and rendering courses dynamically
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    
    // Check if we are on the Home Page or Catalog Page
    const isHomePage = document.getElementById('featured-courses-grid') !== null;
    const coursesGrid = isHomePage 
        ? document.getElementById('featured-courses-grid') 
        : document.getElementById('catalog-courses-grid');

    // Keep a local copy of all fetched courses so we can perform instant search/filtering client-side
    let coursesList = [];

    if (coursesGrid) {
        // Build the target endpoint url
        const apiPath = isHomePage ? '/courses/featured' : '/courses';
        
        // Fetch data from the Express backend API
        fetch(`${window.BASE_URL}${apiPath}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to retrieve course data from the server.');
                }
                return res.json();
            })
            .then(data => {
                coursesList = data;
                renderCourses(coursesList, coursesGrid);
            })
            .catch(err => {
                console.error('Course fetching error:', err);
                coursesGrid.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 40px; border: 1px dashed var(--border-color); border-radius: 12px;">
                        <p style="color: var(--accent-red); font-size: 1.1rem; font-weight: 600; margin-bottom: 10px;">❌ Connection to courses catalog failed</p>
                        <p style="color: var(--text-secondary); font-size: 0.95rem;">Please check if the Node backend server is running and the database tables are initialized.</p>
                    </div>
                `;
            });
    }

    // ==========================================
    // 1. DYNAMIC SEARCH & FILTER LOGIC
    // ==========================================
    const searchInput = document.getElementById('search-input');
    const levelFilter = document.getElementById('level-filter');

    if (searchInput && levelFilter && coursesGrid) {
        // Attach listener for search inputs
        searchInput.addEventListener('input', applyFilters);
        levelFilter.addEventListener('change', applyFilters);
    }

    function applyFilters() {
        const query = searchInput.value.toLowerCase().trim();
        const selectedLevel = levelFilter.value;

        // Filter the catalog
        const filtered = coursesList.filter(course => {
            const matchesQuery = course.title.toLowerCase().includes(query) || 
                                 course.instructor.toLowerCase().includes(query) ||
                                 course.description.toLowerCase().includes(query);
            
            const matchesLevel = selectedLevel === 'all' || 
                                 course.level.toLowerCase() === selectedLevel.toLowerCase();

            return matchesQuery && matchesLevel;
        });

        renderCourses(filtered, coursesGrid);
    }

    // ==========================================
    // 2. RENDERING LOGIC FOR COURSE CARDS
    // ==========================================
    function renderCourses(courses, container) {
        container.innerHTML = ''; // Clear container

        if (courses.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 50px 0;">
                    <p style="color: var(--text-secondary); font-size: 1.1rem;">No courses found matching your criteria.</p>
                </div>
            `;
            return;
        }

        courses.forEach(course => {
            const card = document.createElement('div');
            card.className = 'course-card';

            // Determine level badge class
            const lvlClass = course.level.toLowerCase();

            card.innerHTML = `
                <div class="course-img-wrapper">
                    <img src="${course.image_url}" alt="${course.title}" class="course-img" onerror="this.src='https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600'">
                    <span class="course-badge ${lvlClass}">${course.level}</span>
                </div>
                <div class="course-body">
                    <h3 class="course-title">${course.title}</h3>
                    <div class="course-instructor">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        <span>Instructor: ${course.instructor}</span>
                    </div>
                    <p class="course-desc">${course.description}</p>
                    <div class="course-meta">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            ${course.duration}
                        </span>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path></svg>
                            Self-Paced
                        </span>
                    </div>
                    <div class="course-footer">
                        <span class="course-price">₹${course.price}</span>
                        <button class="btn btn-green enroll-btn" data-id="${course.id}" data-title="${course.title}">Enroll Now</button>
                    </div>
                </div>
            `;

            container.appendChild(card);
        });

        // ==========================================
        // 3. ENROLLMENT INTERACTIVITY HANDLER
        // ==========================================
        const enrollBtns = container.querySelectorAll('.enroll-btn');
        enrollBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const courseId = e.target.getAttribute('data-id');
                const courseTitle = e.target.getAttribute('data-title');
                
                // Inspect user session
                const loggedInUser = localStorage.getItem('cyberUser');
                
                if (!loggedInUser) {
                    // Unauthorized: redirect to login page
                    window.showGlobalAlert('Access Denied. Please login to enroll in courses.', 'error');
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1500);
                } else {
                    // Authorized: proceed with fake enrollment success
                    const user = JSON.parse(loggedInUser);
                    window.showGlobalAlert(`✔ Success! ${user.name.split(' ')[0]}, you have successfully enrolled in "${courseTitle}".`, 'success');
                    
                    // Toggle button status visually
                    e.target.innerText = 'Enrolled ✓';
                    e.target.disabled = true;
                    e.target.style.background = 'rgba(255,255,255,0.1)';
                    e.target.style.color = 'var(--text-secondary)';
                    e.target.style.border = '1px solid var(--border-color)';
                    e.target.style.boxShadow = 'none';
                }
            });
        });
    }
});
