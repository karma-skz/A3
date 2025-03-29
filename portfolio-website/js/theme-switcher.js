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

// Target practice game for XP gain
(function() {
    // Configuration
    const targetConfig = {
        maxTargets: 4,
        minSpawnTime: 1000,
        maxSpawnTime: 3000,
        minLifespan: 4000,
        maxLifespan: 8000,
        minSize: 25,
        maxSize: 35,
        xpReward: {
            small: 20,
            medium: 15,
            large: 10,
        },
        safeZone: 100
    };

    let activeTargets = [];
    let isGameActive = false;
    
    // Start the game after a short delay to let the page load
    setTimeout(() => {
        isGameActive = true;
        scheduleNextTarget();
    }, 2000);
    
    // Create and position a new target
    function createTarget() {
        if (!isGameActive) return;
        
        // Find safe areas to place targets (away from content)
        const safeAreas = findSafeAreas();
        if (safeAreas.length === 0) return;
        
        // Select a random safe area
        const safeArea = safeAreas[Math.floor(Math.random() * safeAreas.length)];
        
        // Create target element
        const target = document.createElement('div');
        target.className = 'xp-target';
        
        // Randomize target appearance
        const size = Math.floor(Math.random() * (targetConfig.maxSize - targetConfig.minSize) + targetConfig.minSize);
        const isSpecial = Math.random() < 0.2; // 20% chance for special target
        
        target.style.width = `${size}px`;
        target.style.height = `${size}px`;
        
        if (isSpecial) {
            target.classList.add('special-target');
            target.innerHTML = '<span class="target-value">+10%</span>';
        } else {
            // Determine XP value based on size
            let xpValue;
            if (size < targetConfig.minSize + 7) {
                xpValue = targetConfig.xpReward.small;
                target.classList.add('small-target');
            } else if (size < targetConfig.minSize + 15) {
                xpValue = targetConfig.xpReward.medium;
                target.classList.add('medium-target');
            } else {
                xpValue = targetConfig.xpReward.large;
                target.classList.add('large-target');
            }
            target.innerHTML = `<span class="target-value">+${xpValue}%</span>`;
            target.dataset.xpValue = xpValue;
        }
        
        // Position target within safe area
        const x = Math.floor(Math.random() * (safeArea.width - size) + safeArea.left);
        const y = Math.floor(Math.random() * (safeArea.height - size) + safeArea.top);
        
        target.style.left = `${x}px`;
        target.style.top = `${y}px`;
        
        // Add click handler
        target.addEventListener('click', () => {
            // Get XP value (special targets give more XP)
            const xpValue = isSpecial ? 10 : parseInt(target.dataset.xpValue || 2);
            
            // Create hit effect
            createHitEffect(x + size/2, y + size/2);
            
            // Play sound
            playTargetHitSound(isSpecial);
            
            // Add XP
            addXp(xpValue);
            
            // Remove target
            removeTarget(target);
            
            // Always schedule a new target when one is clicked
            scheduleNextTarget();
        });
        
        // Add to DOM
        document.body.appendChild(target);
        
        // Add to active targets
        activeTargets.push(target);
        
        // Set auto-expiration
        const lifespan = Math.floor(Math.random() * (targetConfig.maxLifespan - targetConfig.minLifespan) + targetConfig.minLifespan);
        setTimeout(() => {
            if (document.body.contains(target)) {
                target.classList.add('target-expire');
                setTimeout(() => removeTarget(target), 1000);
            }
        }, lifespan);
        
        // Add entrance animation
        setTimeout(() => {
            target.classList.add('target-active');
        }, 10);
    }
    
    // Find safe areas to place targets (away from content)
    function findSafeAreas() {
        const safeAreas = [];
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Get all main content elements
        const contentElements = Array.from(document.querySelectorAll('header, main, footer, nav, .theme-slider-container'));
        
        // Left margin area
        safeAreas.push({
            left: 0,
            top: 0,
            width: targetConfig.safeZone,
            height: windowHeight
        });
        
        // Right margin area
        safeAreas.push({
            left: windowWidth - targetConfig.safeZone,
            top: 0,
            width: targetConfig.safeZone,
            height: windowHeight
        });
        
        // Find gaps between content elements
        let occupiedRanges = contentElements.map(el => {
            const rect = el.getBoundingClientRect();
            return {
                top: Math.max(0, rect.top - targetConfig.safeZone),
                bottom: Math.min(windowHeight, rect.bottom + targetConfig.safeZone),
                left: Math.max(0, rect.left - targetConfig.safeZone),
                right: Math.min(windowWidth, rect.right + targetConfig.safeZone)
            };
        });
        
        // Find vertical gaps (top to bottom)
        let lastBottom = 0;
        occupiedRanges.sort((a, b) => a.top - b.top);
        
        for (const range of occupiedRanges) {
            if (range.top - lastBottom > targetConfig.maxSize * 2) {
                safeAreas.push({
                    left: targetConfig.safeZone,
                    top: lastBottom,
                    width: windowWidth - targetConfig.safeZone * 2,
                    height: range.top - lastBottom
                });
            }
            lastBottom = Math.max(lastBottom, range.bottom);
        }
        
        // Add bottom area if available
        if (windowHeight - lastBottom > targetConfig.maxSize * 2) {
            safeAreas.push({
                left: targetConfig.safeZone,
                top: lastBottom,
                width: windowWidth - targetConfig.safeZone * 2,
                height: windowHeight - lastBottom
            });
        }
        
        // Filter out areas too small for targets
        return safeAreas.filter(area => 
            area.width >= targetConfig.maxSize * 1.5 && 
            area.height >= targetConfig.maxSize * 1.5
        );
    }
    
    // Remove a target
    function removeTarget(target) {
        const index = activeTargets.indexOf(target);
        if (index > -1) {
            activeTargets.splice(index, 1);
        }
        
        if (document.body.contains(target)) {
            target.classList.add('target-hit');
            setTimeout(() => {
                if (document.body.contains(target)) {
                    document.body.removeChild(target);
                }
            }, 300);
        }
    }
    
    // Schedule next target appearance
    function scheduleNextTarget() {
        if (!isGameActive) return;
        
        // Only spawn if we haven't reached max targets
        if (activeTargets.length >= targetConfig.maxTargets) return;
        
        const delay = Math.floor(Math.random() * (targetConfig.maxSpawnTime - targetConfig.minSpawnTime) + targetConfig.minSpawnTime);
        setTimeout(() => {
            createTarget();
            // Possibly schedule another if we're still under max
            if (activeTargets.length < targetConfig.maxTargets) {
                scheduleNextTarget();
            }
        }, delay);
    }
    
    // Create hit effect at position
    function createHitEffect(x, y) {
        const effect = document.createElement('div');
        effect.className = 'target-hit-effect';
        effect.style.left = `${x}px`;
        effect.style.top = `${y}px`;
        document.body.appendChild(effect);
        
        setTimeout(() => {
            if (document.body.contains(effect)) {
                document.body.removeChild(effect);
            }
        }, 1000);
    }
    
    // Play target hit sound
    function playTargetHitSound(isSpecial) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            if (isSpecial) {
                // Special target sound (higher pitched, more complex)
                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(1320, audioContext.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            } else {
                // Regular target sound
                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(660, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            }
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + (isSpecial ? 0.3 : 0.2));
        } catch (e) {
            console.log('Audio context not supported or user interaction required');
        }
    }

    // Add CSS for target elements
    const targetStyles = document.createElement('style');
    targetStyles.textContent = `
    .xp-target {
        position: fixed;
        cursor: crosshair;
        transform: scale(0);
        opacity: 0;
        transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                    opacity 0.3s ease;
        z-index: 999;
        image-rendering: pixelated;
        box-sizing: border-box;
        border: 2px solid #ff3333;
        background-color: rgba(255, 0, 0, 0.3);
        box-shadow: 0 0 8px rgba(255, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Press Start 2P', cursive;
        font-size: 10px;
        color: white;
        text-shadow: 1px 1px 1px black;
        border-radius: 50%; /* Make all targets circular */
    }
    
    .target-value {
        opacity: 0;
        transition: opacity 0.2s ease;
    }
    
    .xp-target:hover .target-value {
        opacity: 1;
    }
    
    .xp-target.target-active {
        transform: scale(1);
        opacity: 1;
    }
    
    .xp-target.target-hit {
        transform: scale(1.5);
        opacity: 0;
        transition: all 0.3s ease;
        background-color: rgba(255, 0, 0, 0.5);
    }
    
    .xp-target.target-expire {
        animation: targetExpire 1s forwards;
    }
    
    .small-target {
        background: radial-gradient(
            circle,
            rgba(255, 50, 50, 0.7) 0%,
            rgba(200, 0, 0, 0.5) 100%
        );
        border: 2px solid #ff6666;
    }
    
    .medium-target {
        background: radial-gradient(
            circle,
            rgba(255, 50, 50, 0.6) 0%,
            rgba(200, 0, 0, 0.4) 100%
        );
        border: 2px solid #ff3333;
    }
    
    .large-target {
        background: radial-gradient(
            circle,
            rgba(255, 50, 50, 0.5) 0%,
            rgba(200, 0, 0, 0.3) 100%
        );
        border: 2px solid #cc0000;
    }
    
    .special-target {
        background: radial-gradient(
            circle,
            rgba(255, 215, 0, 0.6) 0%,
            rgba(255, 0, 0, 0.4) 100%
        );
        border-color: gold;
        box-shadow: 0 0 15px gold;
        animation: pulseTarget 1.5s infinite alternate;
    }
    
    .special-target .target-value {
        opacity: 1;
        color: gold;
        font-size: 12px;
        animation: bounceText 1s infinite alternate;
    }
    
    .target-hit-effect {
        position: fixed;
        width: 40px;
        height: 40px;
        margin-left: -20px;
        margin-top: -20px;
        background: transparent;
        border-radius: 50%;
        pointer-events: none;
        z-index: 998;
        animation: hitEffect 1s forwards;
    }
    
    @keyframes hitEffect {
        0% {
            box-shadow: 0 0 0 0 #ff3333;
            transform: scale(0.3);
            opacity: 1;
        }
        100% {
            box-shadow: 0 0 0 30px transparent;
            transform: scale(3);
            opacity: 0;
        }
    }
    
    @keyframes pulseTarget {
        0% {
            box-shadow: 0 0 5px gold;
            transform: scale(1);
        }
        100% {
            box-shadow: 0 0 15px gold, 0 0 20px rgba(255, 215, 0, 0.3);
            transform: scale(1.1);
        }
    }
    
    @keyframes bounceText {
        0% { transform: scale(1); }
        100% { transform: scale(1.2); }
    }
    
    @keyframes targetExpire {
        0% { opacity: 1; }
        20% { opacity: 0.8; }
        40% { opacity: 1; }
        60% { opacity: 0.8; }
        80% { opacity: 1; }
        100% { opacity: 0; }
    }
    `;
    document.head.appendChild(targetStyles);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Remove all active targets
        activeTargets.forEach(target => {
            if (document.body.contains(target)) {
                document.body.removeChild(target);
            }
        });
        activeTargets = [];
        
        // Schedule new targets
        scheduleNextTarget();
    });
    
    // Pause game when window is not focused
    document.addEventListener('visibilitychange', () => {
        isGameActive = !document.hidden;
        
        // If we're back and active, schedule new targets
        if (isGameActive && activeTargets.length < targetConfig.maxTargets) {
            scheduleNextTarget();
        }
    });
})();