/* ===================================
   MAIN.JS — Portfolio Stephan Doreal
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Remove preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => preloader.remove(), 500);
        }, 600);
    });

    // ===== NAVBAR =====
    const navbar = document.getElementById('navbar');
    const navLinks = document.getElementById('navLinks');
    const navHamburger = document.getElementById('navHamburger');
    const allNavLinks = navLinks.querySelectorAll('a');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hamburger menu
    navHamburger.addEventListener('click', () => {
        navHamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu on link click
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            navHamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = navLinks.querySelector(`a[href="#${sectionId}"]`);

            if (navLink && scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                allNavLinks.forEach(l => l.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    });

    // ===== THEME TOGGLE =====
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

    // ===== TYPING EFFECT =====
    const typingElement = document.getElementById('typingText');
    const roles = [
        'Développeur Web Full Stack',
        'DevOps Junior',
        'Passionné Laravel & Vue.js',
        'Amoureux du Code Propre'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeEffect() {
        const currentRole = roles[roleIndex];

        if (!isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause before deleting
            } else {
                typingSpeed = 80;
            }
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500; // Pause before typing next
            } else {
                typingSpeed = 40;
            }
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Add cursor style
    typingElement.style.borderRight = '2px solid var(--accent)';
    typingElement.style.paddingRight = '4px';
    setInterval(() => {
        typingElement.style.borderRightColor = 
            typingElement.style.borderRightColor === 'transparent' 
                ? 'var(--accent)' 
                : 'transparent';
    }, 530);

    typeEffect();

    // ===== SCROLL REVEAL =====
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ===== SKILL BARS ANIMATION =====
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // ===== COUNTER ANIMATION =====
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 40;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 50);
    }

    // ===== BACK TO TOP =====
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();

        // Basic validation
        if (!name || !email || !subject || !message) {
            showFormMessage('Veuillez remplir tous les champs.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showFormMessage('Veuillez entrer une adresse email valide.', 'error');
            return;
        }

        // Simulate form submission (replace with actual Formspree later)
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="preloader-spinner" style="width:20px;height:20px;border-width:2px;"></span> Envoi en cours...';
        submitBtn.disabled = true;

        // Use Formspree
        const formData = new FormData(contactForm);
        
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                showFormMessage('Message envoyé avec succès ! Je vous répondrai bientôt. 🎉', 'success');
                contactForm.reset();
            } else {
                showFormMessage('Une erreur est survenue. Vous pouvez m\'écrire directement à ponmetetstephan@gmail.com', 'error');
            }
        })
        .catch(() => {
            showFormMessage('Une erreur est survenue. Vous pouvez m\'écrire directement à ponmetetstephan@gmail.com', 'error');
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showFormMessage(text, type) {
        // Remove existing message
        const existing = document.querySelector('.form-message');
        if (existing) existing.remove();

        const msg = document.createElement('div');
        msg.className = `form-message`;
        msg.style.cssText = `
            padding: 14px 20px;
            border-radius: 10px;
            margin-top: 16px;
            font-size: 0.9rem;
            font-weight: 500;
            animation: fadeIn 0.3s ease;
            background: ${type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)'};
            color: ${type === 'success' ? '#10b981' : '#ef4444'};
            border: 1px solid ${type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'};
        `;
        msg.textContent = text;
        contactForm.appendChild(msg);

        setTimeout(() => msg.remove(), 5000);
    }

    // ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
