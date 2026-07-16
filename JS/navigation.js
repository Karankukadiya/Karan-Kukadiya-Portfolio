// ============================================================
// NAVIGATION: mobile menu toggle, smooth scroll, active-link highlight
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinksEl = document.getElementById('navLinks');

    if (menuBtn && navLinksEl) {
        menuBtn.addEventListener('click', () => {
            navLinksEl.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (navLinksEl.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksEl && navLinksEl.classList.contains('active')) {
                navLinksEl.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#" || targetId === "") return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                window.scrollTo({ top: target.offsetTop - navHeight + 10, behavior: 'smooth' });
            }
        });
    });

    const sections = document.querySelectorAll('section[id]');
    function setActiveLink() {
        let scrollPos = window.scrollY + 150;
        let currentId = '';
        sections.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                currentId = section.getAttribute('id');
            }
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${currentId}`) link.style.color = '#2c7da0';
        });
    }
    window.addEventListener('scroll', setActiveLink);
    setActiveLink();
});
