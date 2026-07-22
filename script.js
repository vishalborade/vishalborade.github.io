document.addEventListener('DOMContentLoaded', () => {
    // Current year
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Subtitle text cycler
    const roleTextEl = document.getElementById('roleText');
    if (roleTextEl) {
        const roles = [
            "QA/Testing Specialist",
            "Test Automation Engineer",
            "QA Team Lead"
        ];
        let roleIndex = 0;
        
        setInterval(() => {
            roleTextEl.classList.add('fade-out');
            setTimeout(() => {
                roleIndex = (roleIndex + 1) % roles.length;
                roleTextEl.textContent = roles[roleIndex];
                roleTextEl.classList.remove('fade-out');
            }, 400);
        }, 4000);
    }

    // Theme state
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    
    const getPreferredTheme = () => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) return storedTheme;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    };

    let currentTheme = getPreferredTheme();
    
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
            if (currentTheme === 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuBtn && navMenu) {
        const toggleMenu = () => {
            navMenu.classList.toggle('mobile-open');
            mobileMenuBtn.classList.toggle('mobile-open-active');
            document.body.style.overflow = navMenu.classList.contains('mobile-open') ? 'hidden' : '';
        };

        mobileMenuBtn.addEventListener('click', toggleMenu);

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('mobile-open')) toggleMenu();
            });
        });
    }

    // Scroll reveal observer
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => revealOnScroll.observe(element));

    // Stats counter animation
    const statsElements = document.querySelectorAll('.stat-number');
    const animateStats = () => {
        statsElements.forEach(stat => {
            const originalText = stat.textContent;
            const target = parseInt(originalText.replace(/[^0-9]/g, ''));
            const suffix = originalText.replace(/[0-9]/g, '');
            let current = 0;
            const duration = 1500;
            const steps = 60;
            const stepTime = duration / steps;
            const increment = target / steps;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + suffix;
                }
            }, stepTime);
        });
    };

    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid && statsElements.length > 0) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        statsObserver.observe(statsGrid);
    }

    // Active link highlighter on scroll
    const sections = document.querySelectorAll('section[id]');
    const navHighlighter = () => {
        let scrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            
            const correspondingLink = document.querySelector('.nav-menu a[href*=' + sectionId + ']');
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                correspondingLink?.classList.add('active');
            } else {
                correspondingLink?.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', navHighlighter);
    navHighlighter();

    // Smooth scroll offset adjustment for local anchors
    const localAnchors = document.querySelectorAll('a[href^="#"]');
    localAnchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.length > 1 && href.startsWith('#')) {
                e.preventDefault();
                const targetEl = document.querySelector(href);
                if (targetEl) {
                    window.scrollTo({
                        top: href === '#home' ? 0 : targetEl.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
