document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.querySelectorAll('.theme-toggle');
    const html = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);

    themeToggle.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcons(newTheme);
        });
    });

    function updateThemeIcons(theme) {
        themeToggle.forEach(btn => {
            btn.innerHTML = theme === 'dark' ? '<i class="ph ph-sun"></i>' : '<i class="ph ph-moon"></i>';
        });
    }

    // RTL Toggle
    const rtlToggle = document.querySelectorAll('.rtl-toggle');
    const savedRTL = localStorage.getItem('rtl') === 'true';
    if (savedRTL) {
        html.setAttribute('dir', 'rtl');
    }

    rtlToggle.forEach(btn => {
        btn.addEventListener('click', () => {
            const isRTL = html.getAttribute('dir') === 'rtl';
            html.setAttribute('dir', isRTL ? 'ltr' : 'rtl');
            localStorage.setItem('rtl', !isRTL);
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hamburger Drawer
    const hamburger = document.querySelector('.hamburger');
    const drawer = document.querySelector('.drawer');
    const drawerOverlay = document.querySelector('.drawer-overlay');
    const drawerClose = document.querySelector('.drawer-close');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            drawer.classList.add('open');
            drawerOverlay.classList.add('active');
        });
    }

    const closeDrawer = () => {
        drawer.classList.remove('open');
        drawerOverlay.classList.remove('active');
    };

    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    // Hero Animations (Intersection Observer)
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));

    // Form Validation (Placeholder logic)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showError(field, 'This field is required');
                } else if (field.type === 'email' && !validateEmail(field.value)) {
                    isValid = false;
                    showError(field, 'Invalid email format');
                } else {
                    clearError(field);
                }
            });

            const terms = form.querySelector('#terms');
            if (terms && !terms.checked) {
                isValid = false;
                showError(terms, 'You must accept the terms');
            }

            if (isValid) {
                const successMsg = document.createElement('div');
                successMsg.className = 'form-success';
                successMsg.innerText = 'Success! Your request has been sent.';
                form.appendChild(successMsg);
                form.reset();
                setTimeout(() => successMsg.remove(), 5000);
            }
        });
    });

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(field, message) {
        field.classList.add('error');
        let errorEl = field.nextElementSibling;
        if (!errorEl || !errorEl.classList.contains('error-msg')) {
            errorEl = document.createElement('span');
            errorEl.className = 'error-msg';
            field.parentNode.insertBefore(errorEl, field.nextSibling);
        }
        errorEl.innerText = message;
    }

    function clearError(field) {
        field.classList.remove('error');
        const errorEl = field.nextElementSibling;
        if (errorEl && errorEl.classList.contains('error-msg')) {
            errorEl.remove();
        }
    }
});
