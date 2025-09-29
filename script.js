document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MOBILE MENU TOGGLE ==========
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    // Open/close the mobile menu when the hamburger is clicked
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');  // animate hamburger
        navLinks.classList.toggle('active'); // show/hide menu
    });
    
    // When you click on a menu link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');  // close hamburger
            navLinks.classList.remove('active');    // close menu
            
            // Remove highlight from all links, then highlight the clicked one
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    

    // ========== SMOOTH SCROLL TO SECTIONS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href'); // get section id
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // scroll smoothly to the section
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
    
  
    // ========== NAVBAR SCROLL EFFECT ==========
    const navbar = document.querySelector('.glass-nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled'); // add background on scroll
        } else {
            navbar.classList.remove('scrolled'); // reset when at top
        }
    });
    
   
    // ========== ANIMATIONS ON SCROLL ==========
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.skill-progress, .project-card, .info-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            // When element enters view
            if (elementPosition < screenPosition) {
                if (element.classList.contains('skill-progress')) {
                    // For skill bars → animate width
                    const width = element.getAttribute('data-width');
                    element.style.width = width;
                } else {
                    // For cards → fade & slide up
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            }
        });
    };
 
    // Set initial state (hidden & slightly shifted down)
    document.querySelectorAll('.project-card, .info-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
    });
    
    // Trigger animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // run once at load
    
  
    //  BACK TO TOP BUTTON 
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active'); // show button
        } else {
            backToTop.classList.remove('active'); // hide button
        }
    });
    
   
    // TYPING TEXT EFFECT 
    const typingText = document.querySelector('.typing-text');
    const words = ['Full Stack Developer', 'Graphic Designer', 'Football Lover', 'Tech Enthusiast'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        
        typingText.textContent = currentChar;
        
        if (!isDeleting && charIndex < currentWord.length) {
            // typing forward
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex > 0) {
            // deleting backwards
            charIndex--;
            setTimeout(type, 50);
        } else {
            // switch mode when word is complete/empty
            isDeleting = !isDeleting;
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length; // move to next word
            }
            setTimeout(type, 1000); // pause before typing/deleting again
        }
    }
    
    setTimeout(type, 1500); // start typing after page load
    
    
    //  CONTACT FORM (just logs & resets) 
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Grab values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[type="text"]').value;
            const message = this.querySelector('textarea').value;
            
            // Just logs for now (no backend)
            console.log('Form submitted:', { name, email, subject, message });
            
            alert('Thank you for your message! I will get back to you soon.');
            this.reset(); // clear the form
        });
    }
    
    
    

    // Load saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.querySelector('i').classList.add('fa-sun');
        darkModeToggle.querySelector('i').classList.remove('fa-moon');
    }
});
