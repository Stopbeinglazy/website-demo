// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Navigation Active State with Intersection Observer
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav__link');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === entry.target.id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, {
    threshold: 0.5,
    rootMargin: '-80px 0px -20% 0px'
});

sections.forEach(section => navObserver.observe(section));

// Scroll Animation for Skills and Blog Posts
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${index * 0.1}s`;
            entry.target.classList.add('visible');
            animationObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '50px'
});

document.querySelectorAll('.skill__item, .blog__post').forEach(element => {
    animationObserver.observe(element);
});

// Enhanced Contact Form
const form = document.querySelector('.contact__form');
const inputs = form.querySelectorAll('.contact__input');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.classList.remove('focused');
        }
    });
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    try {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        form.reset();
        inputs.forEach(input => input.classList.remove('focused'));
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form__message success';
        successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
        form.appendChild(successMessage);
        
        setTimeout(() => successMessage.remove(), 5000);
    } catch (error) {
        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'form__message error';
        errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Something went wrong. Please try again.';
        form.appendChild(errorMessage);
        
        setTimeout(() => errorMessage.remove(), 5000);
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});