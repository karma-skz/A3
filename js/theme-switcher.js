document.addEventListener('DOMContentLoaded', () => {
    // Get theme toggle element
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const darkThemeStylesheet = document.getElementById('dark-theme');
    const heading = document.querySelector('h1');
    
    // Replace button with slider
    createThemeSlider();
    
    // Add data-text attribute for glitch effect
    if (heading) {
        heading.setAttribute('data-text', heading.textContent);
    }

    // Check for saved theme preference and apply it
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        darkThemeStylesheet.removeAttribute('disabled');
        document.getElementById('theme-slider').checked = true;
    }

    // Add typing animation to paragraphs with smoother timing
    document.querySelectorAll('p').forEach(paragraph => {
        const text = paragraph.textContent;
        paragraph.textContent = '';
        
        let i = 0;
        const typeSpeed = 20; // Slower for more readable effect
        const typeVariation = 10; // Random variation to make it look more natural
        
        const typeText = () => {
            if (i < text.length) {
                paragraph.textContent += text.charAt(i);
                i++;
                // Random timing for more natural typing effect
                const randomDelay = typeSpeed + Math.random() * typeVariation;
                setTimeout(typeText, randomDelay);
            }
        };
        
        // Start typing when section is in view with IntersectionObserver
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => typeText(), 300); // Small delay before starting
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2 // Start animation when 20% of element is visible
        });
        
        observer.observe(paragraph.parentElement);
    });
    
    // Create theme slider to replace button
    function createThemeSlider() {
        // Only create if the button exists
        if (!themeToggleButton) return;
        
        // Create the slider container
        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'theme-slider-container';
        
        // Create the label element
        const label = document.createElement('label');
        label.className = 'theme-switch';
        label.htmlFor = 'theme-slider';
        
        // Create the checkbox input
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'theme-slider';
        checkbox.className = 'theme-slider-checkbox';
        
        // Create the slider element
        const slider = document.createElement('span');
        slider.className = 'slider round';
        
        // Create icons for light/dark
        const lightIcon = document.createElement('span');
        lightIcon.className = 'mode-icon light-icon';
        lightIcon.innerHTML = '☀️';
        
        const darkIcon = document.createElement('span');
        darkIcon.className = 'mode-icon dark-icon';
        darkIcon.innerHTML = '🌙';
        
        // Assemble the components
        label.appendChild(checkbox);
        label.appendChild(slider);
        label.appendChild(lightIcon);
        label.appendChild(darkIcon);
        
        sliderContainer.appendChild(label);
        
        // Replace the button with our new slider
        themeToggleButton.parentNode.replaceChild(sliderContainer, themeToggleButton);
        
        // Add event listener to the checkbox
        checkbox.addEventListener('change', () => {
            body.classList.toggle('dark-theme');
            
            if (body.classList.contains('dark-theme')) {
                darkThemeStylesheet.removeAttribute('disabled');
                localStorage.setItem('theme', 'dark');
                playSound('switch');
            } else {
                darkThemeStylesheet.setAttribute('disabled', '');
                localStorage.setItem('theme', 'light');
                playSound('switch');
            }
        });
    }
    
    // Simple 8-bit sound effects function
    function playSound(type) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            if (type === 'switch') {
                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime); // Lower volume
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.2);
            }
        } catch (e) {
            console.log('Audio context not supported or user interaction required');
        }
    }
    
    // Add hover sound effects with a lighter touch
    document.querySelectorAll('button, a').forEach(element => {
        element.addEventListener('mouseenter', () => {
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(330, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.05, audioContext.currentTime); // Very quiet
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.1);
            } catch (e) {
                // Silently fail if audio context isn't available
            }
        });
    });

    // Smooth entrance animations for sections
    document.querySelectorAll('section').forEach((section, index) => {
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";
        section.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        
        // Add staggered delay based on index
        setTimeout(() => {
            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
        }, 300 + (index * 150));
    });

    // Game-like animation for page transitions
    const links = document.querySelectorAll('a:not([target="_blank"])');
    links.forEach(link => {
        if (link.hostname === window.location.hostname) {
            link.addEventListener('click', function(e) {
                if (link.href.includes('#')) return; // Skip for anchor links

                e.preventDefault();
                document.body.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                document.body.style.opacity = '0';
                document.body.style.transform = 'scale(0.95)';
                
                // Play transition sound
                try {
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.type = 'square';
                    oscillator.frequency.setValueAtTime(500, audioContext.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);
                    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                    
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.3);
                } catch(e) {}
                
                setTimeout(() => {
                    window.location = link.href;
                }, 300);
            });
        }
    });

    // Random XP gain animation
    function simulateXpGain() {
        const xpBar = document.querySelector('.xp-bar .stat-fill');
        const levelIndicator = document.querySelector('.level-indicator');
        if (!xpBar || !levelIndicator) return;
        
        // Get current XP and level
        const currentWidth = parseFloat(xpBar.style.width) || 45; // Default to 45 if not set
        let currentLevel = parseInt(levelIndicator.textContent.replace('LVL ', '')) || 25; // Default to 25
        
        // Add XP
        let newWidth = currentWidth + Math.random() * 3;
        
        // Check for level up
        if (newWidth >= 100) {
            // Level up!
            currentLevel++;
            levelIndicator.textContent = 'LVL ' + currentLevel;
            
            // Reset XP bar
            newWidth = 10; // Start with a little XP in the new level
            
            // Play level up sound
            playLevelUpSound();
            
            // Visual feedback
            flashLevelUp();
        }
        
        // Update XP bar
        xpBar.style.width = newWidth + '%';
        
        // Play regular XP gain sound if not leveling up
        if (newWidth < 100) {
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.1);
            } catch(e) {}
        }
    }

    // Add XP to bar - Fixed version
    function addXp(amount) {
        console.log("Adding XP:", amount); // Debug line
        const xpBar = document.querySelector('.xp-bar .stat-fill');
        const levelIndicator = document.querySelector('.level-indicator');
        
        if (!xpBar || !levelIndicator) {
            console.error("XP bar or level indicator not found!");
            return;
        }
        
        // Get current XP and level - Fix for getting initial width
        // This checks if width is set as inline style, CSS computed style, or fallback to 45
        let currentWidth;
        if (xpBar.style.width) {
            currentWidth = parseFloat(xpBar.style.width);
        } else if (window.getComputedStyle) {
            const computedWidth = window.getComputedStyle(xpBar).width;
            currentWidth = parseFloat(computedWidth) / xpBar.parentElement.offsetWidth * 100;
        } else {
            currentWidth = 45; // Fallback
        }
        
        // Fix for NaN value
        if (isNaN(currentWidth)) currentWidth = 45;
        
        let currentLevel = parseInt(levelIndicator.textContent.replace('LVL ', '')) || 25;
        
        console.log("Current XP:", currentWidth, "Current Level:", currentLevel); // Debug line
        
        // Add XP
        let newWidth = currentWidth + amount;
        console.log("New XP:", newWidth); // Debug line
        
        // Check for level up
        if (newWidth >= 100) {
            // Level up!
            currentLevel++;
            levelIndicator.textContent = 'LVL ' + currentLevel;
            console.log("LEVEL UP! New Level:", currentLevel); // Debug line
            
            // Reset XP bar with overflow
            newWidth = newWidth - 100;
            
            // Play level up sound
            playLevelUpSound();
            
            // Visual feedback
            flashLevelUp();
        }
        
        // Update XP bar - ensure it's a percentage string
        xpBar.style.width = newWidth + '%';
        console.log("Final XP bar width:", xpBar.style.width); // Debug line
    }

    // Play special level up sound
    function playLevelUpSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // First note
            const oscillator1 = audioContext.createOscillator();
            const gainNode1 = audioContext.createGain();
            oscillator1.connect(gainNode1);
            gainNode1.connect(audioContext.destination);
            oscillator1.type = 'square';
            oscillator1.frequency.setValueAtTime(440, audioContext.currentTime);
            gainNode1.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator1.start();
            oscillator1.stop(audioContext.currentTime + 0.3);
            
            // Second note (higher pitch)
            setTimeout(() => {
                const oscillator2 = audioContext.createOscillator();
                const gainNode2 = audioContext.createGain();
                oscillator2.connect(gainNode2);
                gainNode2.connect(audioContext.destination);
                oscillator2.type = 'square';
                oscillator2.frequency.setValueAtTime(587.33, audioContext.currentTime); // D5
                gainNode2.gain.setValueAtTime(0.2, audioContext.currentTime);
                gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
                oscillator2.start();
                oscillator2.stop(audioContext.currentTime + 0.4);
            }, 300);
            
            // Final triumphant note
            setTimeout(() => {
                const oscillator3 = audioContext.createOscillator();
                const gainNode3 = audioContext.createGain();
                oscillator3.connect(gainNode3);
                gainNode3.connect(audioContext.destination);
                oscillator3.type = 'square';
                oscillator3.frequency.setValueAtTime(659.25, audioContext.currentTime); // E5
                gainNode3.gain.setValueAtTime(0.2, audioContext.currentTime);
                gainNode3.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                oscillator3.start();
                oscillator3.stop(audioContext.currentTime + 0.5);
            }, 600);
        } catch (e) {
            console.log('Audio context not supported or user interaction required');
        }
    }

    // Visual feedback for level up
    function flashLevelUp() {
        // Create level up notification
        const levelUpNotification = document.createElement('div');
        levelUpNotification.className = 'level-up-notification';
        levelUpNotification.textContent = 'LEVEL UP!';
        document.body.appendChild(levelUpNotification);
        
        // Flash the screen
        const flash = document.createElement('div');
        flash.className = 'screen-flash';
        document.body.appendChild(flash);
        
        // Remove after animation
        setTimeout(() => {
            document.body.removeChild(flash);
            setTimeout(() => {
                document.body.removeChild(levelUpNotification);
            }, 2000);
        }, 1000);
        
        // Increase HP and MP slightly when leveling up
        const hpBar = document.querySelector('.hp-bar .stat-fill');
        const mpBar = document.querySelector('.mp-bar .stat-fill');
        
        if (hpBar) {
            const currentHP = parseFloat(hpBar.style.width) || 80;
            hpBar.style.width = Math.min(100, currentHP + 10) + '%';
        }
        
        if (mpBar) {
            const currentMP = parseFloat(mpBar.style.width) || 65;
            mpBar.style.width = Math.min(100, currentMP + 10) + '%';
        }
    }

    // HP bar animation on scroll
    window.addEventListener('scroll', () => {
        const hpBar = document.querySelector('.hp-bar .stat-fill');
        if (!hpBar) return;
        
        const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        const hpPercentage = 100 - (scrollPercentage * 30); // Reduce HP as user scrolls
        
        hpBar.style.width = Math.max(hpPercentage, 10) + '%';
    });

    // Remove the event listeners that might be giving random XP
    document.querySelectorAll('section, button, a').forEach(element => {
        // Remove any existing XP gain listeners
        const newElement = element.cloneNode(true);
        element.parentNode.replaceChild(newElement, element);
    });

    // Create a style element to override the problematic body::after
    const fixOverlayStyle = document.createElement('style');
    fixOverlayStyle.textContent = `
        /* Remove scanline overlay that's covering content */
        body::after {
            display: none !important;
        }
        
        /* Ensure sections are visible */
        section {
            opacity: 1 !important;
            visibility: visible !important;
        }
    `;
    document.head.appendChild(fixOverlayStyle);
});

// Add CSS for level up effects to the DOM
const levelUpStyles = document.createElement('style');
levelUpStyles.textContent = `
.level-up-notification {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--accent);
    color: #000;
    padding: 15px 30px;
    font-size: 1.5em;
    z-index: 9999;
    text-align: center;
    border: 3px solid #000;
    box-shadow: 0 0 20px var(--accent);
    animation: levelUpNotification 2.5s forwards;
}

.screen-flash {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--accent);
    opacity: 0.3;
    z-index: 9998;
    pointer-events: none;
    animation: screenFlash 1s forwards;
}

@keyframes levelUpNotification {
    0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
    10% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
    20% { transform: translate(-50%, -50%) scale(1); }
    80% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
}

@keyframes screenFlash {
    0% { opacity: 0.3; }
    50% { opacity: 0.6; }
    100% { opacity: 0; }
}

/* Theme slider styles */
.theme-slider-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 100;
}

.theme-switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

.theme-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    transition: .4s;
    border: 2px solid var(--accent);
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 2px;
    background-color: var(--accent);
    transition: .4s;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

input:checked + .slider {
    background-color: rgba(8, 8, 24, 0.6);
}

input:checked + .slider:before {
    transform: translateX(26px);
}

.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}

.mode-icon {
    position: absolute;
    top: 7px;
    font-size: 14px;
    z-index: 1;
}

.light-icon {
    left: 7px;
}

.dark-icon {
    right: 7px;
}

.theme-switch:hover .slider:before {
    box-shadow: 0 0 8px var(--accent);
}

.theme-switch:active .slider:before {
    width: 28px;
}
`;
document.head.appendChild(levelUpStyles);