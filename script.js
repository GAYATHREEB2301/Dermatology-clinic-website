document.addEventListener('DOMContentLoaded', () => {

    /* --- Theme Toggle --- */
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    // Function to update icon
    function updateIcon(isDark) {
        const icon = themeToggle ? themeToggle.querySelector('svg') : null;
        if (!icon) return;

        if (isDark) {
            // Sun icon for dark mode (to switch to light)
            icon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
        } else {
            // Moon icon for light mode (to switch to dark)
            icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
        }
    }

    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
        updateIcon(currentTheme === 'dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = body.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcon(!isDark);
        });
    }

    /* --- Mobile Menu --- */
    const menuToggle = document.getElementById('menu-toggle');
    const navWrapper = document.querySelector('.nav-wrapper');

    if (menuToggle && navWrapper) {
        menuToggle.addEventListener('click', () => {
            navWrapper.classList.toggle('show');
            // Toggle hamburger to close icon
            if (navWrapper.classList.contains('show')) {
                menuToggle.innerHTML = '&times;';
            } else {
                menuToggle.innerHTML = '&#9776;';
            }
        });
    }

    /* --- Active Link Highlighting --- */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    /* --- Back to Top Button --- */
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* --- Form Validation --- */
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // simple check for all inputs inside this form
            const inputs = form.querySelectorAll('input, textarea, select');

            inputs.forEach(input => {
                // Clear previous error
                clearError(input);

                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    showError(input, 'This field is required');
                } else if (input.type === 'email' && input.value && !validateEmail(input.value)) {
                    isValid = false;
                    showError(input, 'Please enter a valid email address');
                } else if (input.type === 'password' && input.value.length < 8) {
                    isValid = false;
                    showError(input, 'Password must be at least 8 characters');
                } else if (input.id === 'confirm-password') {
                    const password = form.querySelector('input[type="password"]'); // gets the first one usually
                    if (password && input.value !== password.value) {
                        isValid = false;
                        showError(input, 'Passwords do not match');
                    }
                }
            });

            if (isValid) {
                // Simulate form submission
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerText;
                submitBtn.innerText = 'Sending...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    alert('Form submitted successfully! (This is a demo)');
                    form.reset();
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                    // If login/signup, maybe redirect
                    if (window.location.href.includes('login') || window.location.href.includes('signup')) {
                        window.location.href = 'index.html';
                    }
                }, 1500);
            }
        });
    });

    function showError(input, message) {
        input.style.borderColor = '#e74c3c';
        // check if error msg exists
        let error = input.parentElement.querySelector('.error-message');
        if (!error) {
            error = document.createElement('div');
            error.className = 'error-message';
            input.parentElement.appendChild(error);
        }
        error.textContent = message;
        error.style.display = 'block';
    }

    function clearError(input) {
        input.style.borderColor = '';
        const error = input.parentElement.querySelector('.error-message');
        if (error) {
            error.style.display = 'none';
        }
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

});
