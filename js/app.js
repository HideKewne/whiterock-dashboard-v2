// WhiteRock Dashboard - Light/Dark Mode Toggle (Rock/Pond Mode)

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const rockToggle = document.getElementById('rockToggle');
    const modeLabel = document.getElementById('modeLabel');
    const modeTarget = document.getElementById('modeTarget');
    const callModal = document.getElementById('callModal');
    const acceptBtn = document.getElementById('acceptCall');

    // Update time display
    function updateTime() {
        const timeElement = document.getElementById('currentTime');
        if (timeElement) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
            timeElement.textContent = timeString;
        }
    }

    // Initialize time
    updateTime();
    setInterval(updateTime, 1000);

    // Update mode indicator text
    function updateModeUI() {
        const isDark = document.body.classList.contains('dark-mode');
        if (modeLabel) {
            modeLabel.textContent = isDark ? 'Pond Mode' : 'Rock Mode';
        }
        if (modeTarget) {
            modeTarget.textContent = isDark ? 'rock' : 'pond';
        }
    }

    // Rock Toggle - Light/Dark Mode Switch with animation
    if (rockToggle) {
        rockToggle.addEventListener('click', function() {
            // Add transition class for smooth animation
            document.body.classList.add('transitioning');

            // Toggle mode
            document.body.classList.toggle('dark-mode');
            document.body.classList.toggle('light-mode');

            // Update UI text
            updateModeUI();

            // Restart ripple animations for a fresh effect
            const rippleRings = document.querySelectorAll('.ripple-ring');
            rippleRings.forEach(ring => {
                ring.style.animation = 'none';
                ring.offsetHeight; // Trigger reflow
                ring.style.animation = '';
            });

            // Remove transition class after animation completes
            setTimeout(() => {
                document.body.classList.remove('transitioning');
            }, 800);

            // Log mode change
            const mode = document.body.classList.contains('dark-mode') ? 'Pond' : 'Rock';
            console.log(`Switched to ${mode} Mode`);
        });
    }

    // Initialize mode UI on page load
    updateModeUI();

    // Call Modal handlers
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            if (callModal) {
                callModal.classList.remove('active');
            }
            console.log('Call accepted');
        });
    }

    // Close modal on backdrop click
    if (callModal) {
        callModal.addEventListener('click', function(e) {
            if (e.target === callModal) {
                callModal.classList.remove('active');
            }
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Press 'C' to toggle call modal (demo)
        if (e.key === 'c' || e.key === 'C') {
            if (callModal) {
                callModal.classList.toggle('active');
            }
        }
        // Press 'D' to toggle dark mode
        if (e.key === 'd' || e.key === 'D') {
            document.body.classList.toggle('dark-mode');
            document.body.classList.toggle('light-mode');
            updateModeUI();
        }
        // Press 'Escape' to close modal
        if (e.key === 'Escape') {
            if (callModal) {
                callModal.classList.remove('active');
            }
        }
    });

    // Navigation active state
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Stat card hover effects (enhanced)
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Pause float animation on hover
            this.style.animationPlayState = 'paused';
        });
        card.addEventListener('mouseleave', function() {
            // Resume float animation
            this.style.animationPlayState = 'running';
        });
    });

    // Console info
    console.log('%c WhiteRock Dashboard ', 'background: #183153; color: #05CDFF; font-size: 16px; padding: 8px;');
    console.log('Keyboard shortcuts:');
    console.log('  Click Rock - Toggle Rock/Pond mode');
    console.log('  C - Toggle call modal');
    console.log('  D - Toggle dark mode');
    console.log('  Escape - Close modal');
});
