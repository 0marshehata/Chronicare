document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. Icon Initialization Helper
    // ==========================================================================
    function refreshIcons() {
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
    }
    refreshIcons();

    // ==========================================================================
    // 2. Authentication View: Sign In / Sign Up Switching & Password Toggle
    // ==========================================================================
    const signInForm = document.getElementById('signin-form-box');
    const signUpForm = document.getElementById('signup-form-box');
    const signInHero = document.getElementById('hero-signin-content');
    const signUpHero = document.getElementById('hero-signup-content');
    const toSignUpBtn = document.getElementById('to-signup-btn');
    const toSignInBtn = document.getElementById('to-signin-btn');

    if (toSignUpBtn && signInForm && signUpForm) {
        toSignUpBtn.addEventListener('click', () => {
            signInForm.classList.add('hidden');
            signUpForm.classList.remove('hidden');
            if (signInHero && signUpHero) {
                signInHero.classList.add('hidden');
                signUpHero.classList.remove('hidden');
            }
            refreshIcons();
        });
    }

    if (toSignInBtn && signInForm && signUpForm) {
        toSignInBtn.addEventListener('click', () => {
            signUpForm.classList.add('hidden');
            signInForm.classList.remove('hidden');
            if (signInHero && signUpHero) {
                signUpHero.classList.add('hidden');
                signInHero.classList.remove('hidden');
            }
            refreshIcons();
        });
    }

    // Toggle Password Visibility
    const toggleButtons = document.querySelectorAll('.toggle-password-btn');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const input = document.getElementById(targetId);
            if (!input) return;

            if (input.type === 'password') {
                input.type = 'text';
                button.innerHTML = '<i data-lucide="eye" class="w-5 h-5"></i>';
            } else {
                input.type = 'password';
                button.innerHTML = '<i data-lucide="eye-off" class="w-5 h-5"></i>';
            }
            refreshIcons();
        });
    });

    // ==========================================================================
    // 3. Single Page Navigation / View Switching
    // ==========================================================================
    const authView = document.getElementById('auth-view');
    const portalView = document.getElementById('portal-view');
    const subviews = document.querySelectorAll('.portal-subview');
    const navItems = document.querySelectorAll('.portal-nav-btn');
    const breadcrumbCurrent = document.getElementById('breadcrumb-current');
    const sidebar = document.getElementById('sidebar');

    const viewTitles = {
        'overview': 'Patient Portal',
        'medical-files': 'My Medical Files',
        'sharing-access': 'Sharing & Access',
        'lab-trends': 'Lab Trends',
        'timeline-archive': 'Timeline & Archive'
    };

    function showView(viewName, updateHash = true) {
        if (!viewName) viewName = 'auth';

        if (viewName === 'auth') {
            if (authView) authView.classList.remove('hidden');
            if (portalView) portalView.classList.add('hidden');
            if (updateHash) {
                history.replaceState(null, null, '#auth');
            }
        } else {
            if (authView) authView.classList.add('hidden');
            if (portalView) portalView.classList.remove('hidden');

            // Toggle subviews
            let matched = false;
            subviews.forEach(sub => {
                if (sub.id === `view-${viewName}`) {
                    sub.classList.remove('hidden');
                    matched = true;
                } else {
                    sub.classList.add('hidden');
                }
            });

            // Default to overview if viewName doesn't exist
            if (!matched && document.getElementById('view-overview')) {
                document.getElementById('view-overview').classList.remove('hidden');
                viewName = 'overview';
            }

            // Update sidebar navigation active classes
            navItems.forEach(item => {
                const target = item.getAttribute('data-target');
                if (target === viewName) {
                    item.classList.add('bg-cyan-50', 'text-[#0c2340]', 'font-bold');
                    item.classList.remove('text-slate-600', 'hover:bg-slate-50');
                } else {
                    item.classList.remove('bg-cyan-50', 'text-[#0c2340]', 'font-bold');
                    item.classList.add('text-slate-600', 'hover:bg-slate-50');
                }
            });

            // Update breadcrumb
            if (breadcrumbCurrent && viewTitles[viewName]) {
                breadcrumbCurrent.textContent = viewTitles[viewName];
            }

            if (updateHash) {
                history.replaceState(null, null, `#${viewName}`);
            }

            // Close mobile menu if open
            if (sidebar && !sidebar.classList.contains('hidden') && window.innerWidth < 768) {
                sidebar.classList.add('hidden');
            }
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
        refreshIcons();
    }

    // Attach click listeners to all elements with data-navigate
    document.querySelectorAll('[data-navigate]').forEach(elem => {
        elem.addEventListener('click', (e) => {
            e.preventDefault();
            const targetView = elem.getAttribute('data-navigate');
            showView(targetView);
        });
    });

    // Handle hash routing on initial load and hashchange
    function handleHashRoute() {
        const hash = window.location.hash.replace('#', '').trim();
        if (['overview', 'medical-files', 'sharing-access', 'lab-trends', 'timeline-archive'].includes(hash)) {
            showView(hash, false);
        } else {
            showView('auth', false);
        }
    }

    window.addEventListener('hashchange', handleHashRoute);
    handleHashRoute();

    // Sign in and Sign up form submissions (transitions to portal)
    document.querySelectorAll('#signin-form-box form, #signup-form-box form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            showView('overview');
        });
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showView('overview');
            });
        }
    });

    // Google button
    document.querySelectorAll('#signin-form-box button, #signup-form-box button').forEach(btn => {
        if (btn.textContent.includes('Google') || btn.querySelector('svg')) {
            btn.addEventListener('click', () => {
                showView('overview');
            });
        }
    });

    // Sign out button
    const signOutBtn = document.getElementById('sign-out-btn');
    if (signOutBtn) {
        signOutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showView('auth');
        });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    if (mobileMenuBtn && sidebar) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
            sidebar.classList.toggle('fixed');
            sidebar.classList.toggle('inset-0');
            sidebar.classList.toggle('z-50');
            refreshIcons();
        });
    }
    if (mobileMenuClose && sidebar) {
        mobileMenuClose.addEventListener('click', () => {
            sidebar.classList.add('hidden');
            sidebar.classList.remove('fixed', 'inset-0', 'z-50');
        });
    }

    // ==========================================================================
    // 4. Medical Files Search & Filter Functionality
    // ==========================================================================
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const typeFilter = document.getElementById('typeFilter');
    const resetBtn = document.getElementById('resetBtn');
    const recordCount = document.getElementById('recordCount');
    const rows = document.querySelectorAll('#recordsTable tr');

    function filterRecords() {
        if (!rows.length) return;

        const search = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const category = categoryFilter ? categoryFilter.value : 'all';
        const type = typeFilter ? typeFilter.value : 'all';

        let visibleCount = 0;

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const rowCat = row.getAttribute('data-category');
            const rowType = row.getAttribute('data-type');

            const matchesSearch = !search || text.includes(search);
            const matchesCategory = (category === 'all' || rowCat === category);
            const matchesType = (type === 'all' || rowType === type);

            const isVisible = matchesSearch && matchesCategory && matchesType;
            row.style.display = isVisible ? '' : 'none';

            if (isVisible) visibleCount++;
        });

        if (recordCount) {
            recordCount.textContent = `${visibleCount} Records`;
        }
    }

    if (searchInput) searchInput.addEventListener('input', filterRecords);
    if (categoryFilter) categoryFilter.addEventListener('change', filterRecords);
    if (typeFilter) typeFilter.addEventListener('change', filterRecords);

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            if (categoryFilter) categoryFilter.value = 'all';
            if (typeFilter) typeFilter.value = 'all';
            filterRecords();
        });
    }

    // Condition rows filtering from side card
    document.querySelectorAll('.condition-row').forEach(row => {
        row.addEventListener('click', () => {
            const condition = row.textContent.toLowerCase();
            if (!categoryFilter) return;

            if (condition.includes('diabetes')) {
                categoryFilter.value = 'diabetes';
            } else if (condition.includes('hypertension')) {
                categoryFilter.value = 'hypertension';
            } else if (condition.includes('kidney') || condition.includes('ckd')) {
                categoryFilter.value = 'all';
            } else {
                categoryFilter.value = 'all';
            }

            filterRecords();
        });
    });

    // ==========================================================================
    // 5. File Upload Handling
    // ==========================================================================
    const fileInput = document.getElementById('fileInput');
    const uploadButtons = document.querySelectorAll('.trigger-upload-btn');

    uploadButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (fileInput) fileInput.click();
        });
    });

    if (fileInput) {
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                alert(`File selected: ${fileInput.files[0].name}\nFile ready for upload.`);
            }
        });
    }

    // ==========================================================================
    // 6. Sharing & Access: Create Share Form
    // ==========================================================================
    const newShareForm = document.getElementById('newShareForm');
    if (newShareForm) {
        newShareForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const doctorSelect = newShareForm.querySelector('select:first-of-type');
            const doctor = doctorSelect ? doctorSelect.value : 'the doctor';
            alert(`Sharing permissions successfully updated for ${doctor}!`);
            newShareForm.reset();
        });
    }

});
