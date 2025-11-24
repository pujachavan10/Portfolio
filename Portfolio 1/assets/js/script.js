// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-item');
    
    let currentSection = 0;
    let isScrolling = false;
    
    // Track scroll position and highlight correct section
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Find which section is currently in view
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                if (currentSection !== index) {
                    currentSection = index;
                    updateNavigation();
                }
            }
        });
    });
    
    // Icon effects are now handled by CSS in bottom-nav.css
    
    // Function to scroll to a specific section
    function scrollToSection(index) {
        if (isScrolling || index < 0 || index >= sections.length) return;
        
        isScrolling = true;
        currentSection = index;
        
        // Update the active class for navigation
        updateNavigation();
        
        // Scroll to the section
        const targetSection = sections[index];
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
        
        // Reset scrolling flag after animation
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }
    
    // Update navigation states
    function updateNavigation() {
        // Update bottom navigation
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href === '#' + sections[currentSection].id) {
                link.classList.add('active');
            }
        });
    }
    
    // Click handlers for navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if link is external (doesn't start with #)
            if (!targetId || !targetId.startsWith('#')) return;
            
            e.preventDefault();
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const index = Array.from(sections).indexOf(targetSection);
                scrollToSection(index);
            }
        });
    });
    
    // Initialize
    updateNavigation();
});
