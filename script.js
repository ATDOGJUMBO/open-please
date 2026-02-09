/* ========================================
   ROMANTIC WEBSITE - JAVASCRIPT
   Happy 13th Monthsary & Valentine's Day
   ======================================== */

/* ======== SPLASH SCREEN & AUTO PLAY MUSIC ======== */
// When user clicks the splash screen, play music and show the website
function enterSite() {
    const audio = document.getElementById('background-music');
    const splash = document.getElementById('splash-screen');
    const mainSite = document.getElementById('main-site');

    // Play the music immediately on click
    if (audio) {
        audio.volume = 1;
        audio.play();
    }

    // Fade out splash screen
    splash.style.transition = 'opacity 1s ease';
    splash.style.opacity = '0';

    // Show main website
    setTimeout(() => {
        splash.style.display = 'none';
        mainSite.style.display = 'block';
        mainSite.style.animation = 'fadeIn 1s ease';
    }, 800);
}

/* ======== FLOATING HEARTS ANIMATION ======== */
// This creates floating heart emojis that drift upward
function createFloatingHearts() {
    const container = document.getElementById('hearts-container');
    // Number of hearts to create
    const heartCount = 30;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤️';
        
        // Random horizontal position
        heart.style.left = Math.random() * 100 + '%';
        // Random starting height
        heart.style.top = Math.random() * 100 + 'vh';
        // Random size (smaller to bigger)
        heart.style.fontSize = Math.random() * 20 + 20 + 'px';
        // Random opacity
        heart.style.opacity = Math.random() * 0.4 + 0.2;
        // Random animation duration (slower = more dramatic)
        heart.style.animationDuration = Math.random() * 4 + 4 + 's';
        // Random delay so they don't all start at once
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, parseInt(heart.style.animationDuration) * 1000 + parseInt(heart.style.animationDelay) * 1000);
    }
}

// Create new hearts every few seconds for continuous effect
window.addEventListener('load', () => {
    // Create initial hearts
    createFloatingHearts();
    // Create new hearts every 4 seconds
    setInterval(createFloatingHearts, 4000);
});

/* ======== CONFETTI BURST ON PAGE LOAD ======== */
// Creates a confetti explosion effect when page loads
function createConfetti() {
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random emoji for confetti (hearts, sparkles, etc.)
        const emojis = ['❤️', '💕', '💖', '✨', '🎀'];
        confetti.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Random starting position
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '0px';
        
        // Random direction and distance for burst effect
        const angle = Math.random() * 360;
        const distance = Math.random() * 300 + 200;
        const x = Math.cos(angle * Math.PI / 180) * distance;
        const y = Math.sin(angle * Math.PI / 180) * distance;
        
        confetti.style.setProperty('--x', x + 'px');
        confetti.style.setProperty('--y', y + 'px');
        
        document.body.appendChild(confetti);
        
        // Remove confetti after animation ends
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Trigger confetti on page load (remove or comment out if you don't want this)
window.addEventListener('load', () => {
    // Wait 1 second before showing confetti for dramatic effect
    setTimeout(createConfetti, 500);
});

/* ======== SMOOTH SCROLLING ======== */
// Smooth scroll to a specific section when clicking buttons
function smoothScroll(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/* ======== PHOTO GALLERY MODAL ======== */
// Open modal when clicking on a photo
function openModal(imgElement) {
    const modal = document.getElementById('photo-modal');
    const modalImage = document.getElementById('modal-image');
    
    // Set the modal image source to the clicked image
    modalImage.src = imgElement.src;
    // Display the modal
    modal.style.display = 'block';
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
}

// Close modal when clicking the X or outside the image
function closeModal(event) {
    const modal = document.getElementById('photo-modal');
    
    // Only close if clicking on the background or close button
    if (!event || event.target === modal || event.target.classList.contains('close')) {
        modal.style.display = 'none';
        // Restore body scrolling
        document.body.style.overflow = 'auto';
    }
}

// Close modal when pressing Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
});

/* ======== MUSIC PLAYER ======== */
let isPlaying = false;

// Toggle music play/pause
function toggleMusic() {
    const audio = document.getElementById('background-music');
    const playBtn = document.getElementById('play-btn');
    
    if (isPlaying) {
        // Pause music
        audio.pause();
        playBtn.innerHTML = '<span class="play-icon">▶</span>';
        isPlaying = false;
    } else {
        // Play music
        audio.play();
        playBtn.innerHTML = '<span class="play-icon">⏸</span>';
        isPlaying = true;
    }
}

// Update progress bar as music plays
function updateProgress() {
    const audio = document.getElementById('background-music');
    const progressFill = document.getElementById('progress-fill');
    const progressSlider = document.getElementById('progress-slider');
    const timeDisplay = document.getElementById('time-display');
    
    if (audio.duration) {
        // Update progress bar width based on current time
        const percent = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = percent + '%';
        progressSlider.value = percent;
        
        // Format and display current time
        const currentMinutes = Math.floor(audio.currentTime / 60);
        const currentSeconds = Math.floor(audio.currentTime % 60);
        const durationMinutes = Math.floor(audio.duration / 60);
        const durationSeconds = Math.floor(audio.duration % 60);
        
        timeDisplay.textContent = 
            `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds} / ` +
            `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
    }
}

// Seek music to a specific position
function seekMusic(value) {
    const audio = document.getElementById('background-music');
    const time = (value / 100) * audio.duration;
    audio.currentTime = time;
}

// Update progress bar every 100ms while music is playing
const audio = document.getElementById('background-music');
audio.addEventListener('timeupdate', updateProgress);

/* ======== SCROLL REVEAL ANIMATION ======== */
// This reveals elements with fade-in animation as you scroll
// Add class "reveal" to any element you want to animate on scroll

function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach((reveal) => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        
        // If element is visible in viewport, add active class
        if (revealTop < windowHeight - 100) {
            reveal.classList.add('active');
        }
    });
}

// Check for reveals on page load and scroll
window.addEventListener('load', revealOnScroll);
window.addEventListener('scroll', revealOnScroll);

/* ======== INTERACTIVE ELEMENTS ======== */

// Add hover effect to gallery items (bonus interactivity)
document.addEventListener('DOMContentLoaded', () => {
    // Add slight tilt effect to gallery items on hover
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotate(2deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
});

/* ======== BUTTON HOVER EFFECTS ======== */
// Add sparkle effect when hovering over CTA button
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('mouseover', function() {
        this.style.boxShadow = '0 15px 35px rgba(196, 30, 58, 0.4)';
    });
    
    ctaButton.addEventListener('mouseout', function() {
        this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
    });
}

/* ======== TYPING ANIMATION FOR LETTER (OPTIONAL) ======== */
// Uncomment this section if you want the letter to have a typing effect
// This is a cool but optional feature

/*
function typeWriter(element, text, speed = 50) {
    let index = 0;
    element.innerHTML = '';
    
    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Use it like this (uncomment to activate):
// const letterContent = document.querySelector('.letter-content');
// const text = letterContent.innerText;
// typeWriter(letterContent, text, 30);
*/

/* ======== PAGE LOAD ANIMATIONS ======== */
// Add animation to all sections as page loads
window.addEventListener('load', () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        // Stagger the animation for each section
        setTimeout(() => {
            section.style.animation = 'fadeInUp 0.8s ease forwards';
        }, index * 200);
    });
});

/* ======== NAVIGATION ACTIVE STATE ======== */
// Highlight navigation link for current section
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach((link) => {
        link.style.color = 'var(--text-dark)';
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.style.color = 'var(--primary-pink)';
        }
    });
});

/* ======== BONUS: EASTER EGG ======== */
// Double-click the hero title to trigger extra confetti!
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    heroTitle.addEventListener('dblclick', () => {
        // Create extra burst of confetti
        for (let i = 0; i < 3; i++) {
            setTimeout(createConfetti, i * 300);
        }
    });
}

/* ======== HELPFUL CONSOLE MESSAGE ======== */
// Display helpful info in console for customization
console.log(
    '%cHappy 13th Monthsary & Valentine\'s Day! ❤️',
    'color: #ff6b9d; font-size: 20px; font-weight: bold;'
);
console.log(
    '%cTo customize this website:\n' +
    '1. Edit images in index.html (search for "REPLACE_WITH_YOUR_PHOTO")\n' +
    '2. Edit the love letter text in the letter section\n' +
    '3. Update timeline dates and descriptions\n' +
    '4. Change colors in style.css :root variables\n' +
    '5. Replace the music URL with your own song file',
    'color: #333; font-size: 12px; font-family: monospace;'
);

/* ======== ROAMING ANIMATED CATS ======== */
const catMessages = [
    "Meow! 💕",
    "Purrrr~ 🥰",
    "I love you! 💖",
    "Happy Monthsary! 🎉",
    "*nuzzle* 😻",
    "You're purrfect! ✨",
    "Kate & AJ! 💕",
    "*purrs loudly* 🐱",
    "Love you, Kate! ❤️",
    "Meow meow! 🐾"
];

const catStates = {
    cat1: { x: 50, y: window.innerHeight * 0.7, state: 'walking', stateTimer: 0 },
    cat2: { x: window.innerWidth - 130, y: window.innerHeight * 0.6, state: 'walking', stateTimer: 0 }
};

// Random position within viewport
function randomPos(catId) {
    const margin = 80;
    return {
        x: margin + Math.random() * (window.innerWidth - margin * 2),
        y: margin + Math.random() * (window.innerHeight - margin * 2)
    };
}

// Move a cat to a new random position
function roamCat(catId) {
    const cat = document.getElementById(catId);
    if (!cat) return;

    const data = catStates[catId];
    const states = ['walking', 'sitting', 'walking', 'walking', 'sleeping', 'walking'];
    data.state = states[Math.floor(Math.random() * states.length)];

    cat.classList.remove('sitting', 'sleeping', 'nuzzle');

    if (data.state === 'sitting') {
        cat.classList.add('sitting');
        // Drop a love particle occasionally
        dropLoveParticle(data.x + 40, data.y);
        // Stay still for a bit then move again
        data.stateTimer = setTimeout(() => roamCat(catId), 3000 + Math.random() * 3000);
        return;
    }

    if (data.state === 'sleeping') {
        cat.classList.add('sleeping');
        // Add zzz
        let zzz = cat.querySelector('.sleep-z');
        if (!zzz) {
            zzz = document.createElement('div');
            zzz.className = 'sleep-z';
            zzz.textContent = '💤';
            cat.appendChild(zzz);
        }
        data.stateTimer = setTimeout(() => {
            if (zzz && zzz.parentNode) zzz.remove();
            roamCat(catId);
        }, 5000 + Math.random() * 4000);
        return;
    }

    // Walking — pick new destination
    const dest = randomPos(catId);

    // Flip cat based on direction
    if (dest.x < data.x) {
        cat.classList.add('facing-left');
    } else {
        cat.classList.remove('facing-left');
    }

    data.x = dest.x;
    data.y = dest.y;
    cat.style.left = dest.x + 'px';
    cat.style.top = dest.y + 'px';

    // Leave love trail occasionally
    if (Math.random() > 0.6) {
        setTimeout(() => dropLoveParticle(dest.x + 40, dest.y + 60), 1500);
    }

    // Next action after arriving
    data.stateTimer = setTimeout(() => roamCat(catId), 3500 + Math.random() * 3000);
}

// Drop a floating love particle
function dropLoveParticle(x, y) {
    const particles = ['💕', '💖', '🩷', '✨', '💗', '🐾'];
    const p = document.createElement('div');
    p.className = 'love-particle';
    p.textContent = particles[Math.floor(Math.random() * particles.length)];
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1500);
}

// Cat click — meow with speech bubble
function catMeow(catEl) {
    const speech = catEl.querySelector('.cat-speech');
    if (!speech) return;

    speech.textContent = catMessages[Math.floor(Math.random() * catMessages.length)];
    speech.classList.add('show');

    // Drop some hearts on click
    const rect = catEl.getBoundingClientRect();
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            dropLoveParticle(rect.left + Math.random() * 60, rect.top - 10);
        }, i * 200);
    }

    setTimeout(() => speech.classList.remove('show'), 2000);
}

// Check if cats are near each other — nuzzle!
function checkCatMeeting() {
    const c1 = catStates.cat1;
    const c2 = catStates.cat2;
    const dist = Math.sqrt((c1.x - c2.x) ** 2 + (c1.y - c2.y) ** 2);

    if (dist < 150) {
        const cat1El = document.getElementById('cat1');
        const cat2El = document.getElementById('cat2');
        if (cat1El && cat2El) {
            cat1El.classList.add('nuzzle');
            cat2El.classList.add('nuzzle');
            // Show love speech
            const s1 = cat1El.querySelector('.cat-speech');
            const s2 = cat2El.querySelector('.cat-speech');
            if (s1) { s1.textContent = '😻💕'; s1.classList.add('show'); }
            if (s2) { s2.textContent = '🥰💖'; s2.classList.add('show'); }
            // Hearts burst between them
            const midX = (c1.x + c2.x) / 2;
            const midY = (c1.y + c2.y) / 2;
            for (let i = 0; i < 5; i++) {
                setTimeout(() => dropLoveParticle(midX + (Math.random() - 0.5) * 60, midY + (Math.random() - 0.5) * 40), i * 200);
            }
            setTimeout(() => {
                cat1El.classList.remove('nuzzle');
                cat2El.classList.remove('nuzzle');
                if (s1) s1.classList.remove('show');
                if (s2) s2.classList.remove('show');
            }, 2500);
        }
    }
}

// Start roaming after a short delay
setTimeout(() => roamCat('cat1'), 1000);
setTimeout(() => roamCat('cat2'), 2500);

// Periodically check if cats meet
setInterval(checkCatMeeting, 3000);

// Random auto-speech from cats
setInterval(() => {
    const catId = Math.random() > 0.5 ? 'cat1' : 'cat2';
    const catEl = document.getElementById(catId);
    if (catEl) {
        const speech = catEl.querySelector('.cat-speech');
        if (speech && !speech.classList.contains('show')) {
            speech.textContent = catMessages[Math.floor(Math.random() * catMessages.length)];
            speech.classList.add('show');
            setTimeout(() => speech.classList.remove('show'), 2000);
        }
    }
}, 7000);

