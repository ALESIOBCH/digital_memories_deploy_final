// Memory Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.memory-slide');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    if (slides[index]) {
        slides[index].classList.add('active');
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Event listeners for carousel controls
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
}

// Auto-advance carousel
if (slides.length > 0) {
    setInterval(nextSlide, 5000);
}

// Birthday Game functionality
const gameBalloons = document.querySelectorAll('.game-balloon');
const gameMessage = document.getElementById('gameMessage');

gameBalloons.forEach(balloon => {
    balloon.addEventListener('click', function() {
        const message = this.getAttribute('data-message');
        gameMessage.textContent = message;
        
        // Add pop animation
        this.style.transform = 'scale(1.5) rotate(360deg)';
        this.style.opacity = '0.5';
        
        setTimeout(() => {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.opacity = '1';
        }, 500);
        
        // Add confetti effect
        createConfetti();
    });
});

// Confetti effect
function createConfetti() {
    const colors = ['#ff6b9d', '#fdcb6e', '#6c5ce7', '#00b894', '#74b9ff'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '9999';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        // Animate confetti falling
        const fallDuration = Math.random() * 3 + 2;
        confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(100vh) rotate(720deg)`, opacity: 0 }
        ], {
            duration: fallDuration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, fallDuration * 1000);
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.timeline-item, .fact-card, .message-card, .achievement-card, .team-message, .value-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter animation for statistics
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent.replace(/[^\d]/g, '');
        const suffix = counter.textContent.replace(/[\d]/g, '');
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        };
        
        updateCounter();
    });
};

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Photo gallery lightbox effect
const photoItems = document.querySelectorAll('.photo-item');

photoItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const overlay = this.querySelector('.photo-overlay p');
        
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        lightbox.style.display = 'flex';
        lightbox.style.alignItems = 'center';
        lightbox.style.justifyContent = 'center';
        lightbox.style.zIndex = '9999';
        lightbox.style.cursor = 'pointer';
        
        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.src;
        lightboxImg.style.maxWidth = '90%';
        lightboxImg.style.maxHeight = '90%';
        lightboxImg.style.borderRadius = '10px';
        
        const caption = document.createElement('p');
        caption.textContent = overlay ? overlay.textContent : '';
        caption.style.position = 'absolute';
        caption.style.bottom = '50px';
        caption.style.color = 'white';
        caption.style.fontSize = '1.2rem';
        caption.style.textAlign = 'center';
        caption.style.width = '100%';
        
        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(caption);
        document.body.appendChild(lightbox);
        
        // Close lightbox on click
        lightbox.addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });
        
        // Animate lightbox appearance
        lightbox.style.opacity = '0';
        lightbox.animate([
            { opacity: 0 },
            { opacity: 1 }
        ], {
            duration: 300,
            fill: 'forwards'
        });
    });
});

// Floating hearts animation for anniversary theme
if (document.body.classList.contains('anniversary-theme')) {
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.bottom = '-50px';
        heart.style.fontSize = '2rem';
        heart.style.zIndex = '1';
        heart.style.pointerEvents = 'none';
        heart.style.opacity = '0.7';
        
        document.body.appendChild(heart);
        
        // Animate heart floating up
        heart.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 0.7 },
            { transform: 'translateY(-100vh) rotate(360deg)', opacity: 0 }
        ], {
            duration: 8000,
            easing: 'linear'
        });
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 8000);
    }
    
    // Create floating hearts periodically
    setInterval(createFloatingHeart, 3000);
}

// Parallax effect for header
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.example-header');
    if (header) {
        header.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Smooth reveal animation for timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
});

// Interactive message bubbles
const messageBubbles = document.querySelectorAll('.message-bubble');
messageBubbles.forEach(bubble => {
    bubble.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
        this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
    });
    
    bubble.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
});

// Certificate print functionality
const certificate = document.querySelector('.certificate');
if (certificate) {
    const printBtn = document.createElement('button');
    printBtn.textContent = 'Imprimir Certificado';
    printBtn.style.marginTop = '20px';
    printBtn.style.padding = '10px 20px';
    printBtn.style.backgroundColor = 'var(--primary-color)';
    printBtn.style.color = 'white';
    printBtn.style.border = 'none';
    printBtn.style.borderRadius = '5px';
    printBtn.style.cursor = 'pointer';
    
    printBtn.addEventListener('click', () => {
        window.print();
    });
    
    certificate.appendChild(printBtn);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Activate special effect
        document.body.style.filter = 'hue-rotate(180deg)';
        createConfetti();
        
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
        
        konamiCode = [];
    }
});

// Touch gestures for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    if (!touchStartX || !touchStartY) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    
    // Swipe detection for carousel
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
            nextSlide(); // Swipe left
        } else {
            prevSlide(); // Swipe right
        }
    }
    
    touchStartX = 0;
    touchStartY = 0;
});

