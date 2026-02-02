document.addEventListener('DOMContentLoaded', function () {
    initThemeToggle();
    initBentoMenu();
    initLightbox();
    initSmoothScroll();
});

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
        themeToggle.setAttribute('aria-label',
            theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
        );
    }
}

function initBentoMenu() {
    const bentoToggle = document.getElementById('bento-toggle');
    const bentoMenu = document.getElementById('bento-menu');
    const bentoClose = document.getElementById('bento-close');

    if (bentoToggle && bentoMenu) {
        bentoToggle.addEventListener('click', function () {
            bentoMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        if (bentoClose) {
            bentoClose.addEventListener('click', closeBentoMenu);
        }

        bentoMenu.addEventListener('click', function (e) {
            if (e.target === bentoMenu) {
                closeBentoMenu();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && bentoMenu.classList.contains('active')) {
                closeBentoMenu();
            }
        });
    }
}

function closeBentoMenu() {
    const bentoMenu = document.getElementById('bento-menu');
    if (bentoMenu) {
        bentoMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    const clickableImages = document.querySelectorAll('.img-clickable');

    clickableImages.forEach(function (img) {
        img.addEventListener('click', function () {
            if (lightbox && lightboxImg) {
                lightboxImg.src = this.src;
                lightboxImg.alt = this.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
        observer.observe(el);
    });
}

function initMobileNavClose() {
    const bentoItems = document.querySelectorAll('.bento-item');

    bentoItems.forEach(function (item) {
        item.addEventListener('click', function () {
            setTimeout(closeBentoMenu, 100);
        });
    });
}

document.addEventListener('DOMContentLoaded', initMobileNavClose);
