// Initialize EmailJS with your User ID
(function() {
    emailjs.init("pMTBWtAGhjd0az49O"); // Replace "YOUR_USER_ID" with your EmailJS User ID
})();

// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('fade-out');
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Sticky Header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 0);
});

// Enhanced Back to Top Button Functionality
const backToTopBtn = document.querySelector('.back-to-top');

function toggleBackToTop() {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
}

// Smooth scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Event listeners
window.addEventListener('scroll', toggleBackToTop);
backToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    scrollToTop();
});

// Initialize on page load
toggleBackToTop();

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animate Elements on Scroll
const animateOnScroll = function() {
    const interestCards = document.querySelectorAll('.interest-card');
    const projectCards = document.querySelectorAll('.project-card');
    
    interestCards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (cardPosition < screenPosition) {
            card.classList.add('animate');
        }
    });
    
    projectCards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (cardPosition < screenPosition) {
            card.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Form Submission with EmailJS
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('.submit-btn');
let isFormSubmitting = false; // Add flag to prevent multiple submissions

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (isFormSubmitting) return; // Prevent multiple submissions
    isFormSubmitting = true;

    // Disable the button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Check if emailjs is available
    if (typeof emailjs === 'undefined' || typeof emailjs.send !== 'function') {
        console.error('EmailJS is not properly initialized. Please check your User ID and library loading.');
        alert('Error: Email service is unavailable. Please try again later or contact me directly at er.amantharu@gmail.com.');
        isFormSubmitting = false;
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        return;
    }

    // Prepare the email parameters
    const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_name: 'Aman Tharu',
        to_email: 'er.amantharu@gmail.com' // Note: Verify this email address
    };

    // Send the email using EmailJS
    emailjs.send('service_ufihhgp', 'template_o41n40u', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('We will reply soon, ' + name + '! Thank you for reaching out.');
            // Show the video after successful submission
            document.getElementById('videoAd').style.display = 'block';
            // Reset the form
            contactForm.reset();
        }, function(error) {
            console.error('FAILED...', error);
            alert('Error sending message. Please try again later or contact me directly at er.amantharu@gmail.com.');
        })
        .finally(function() {
            // Re-enable the button and reset text
            isFormSubmitting = false;
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        });
});

// Function to close the video
function closeVideo() {
    const video = document.getElementById('adVideo');
    video.pause(); // Pause the video when closing
    document.getElementById('videoAd').style.display = 'none';
}

// Function to toggle mute/unmute
function toggleMute() {
    const video = document.getElementById('adVideo');
    const muteButton = document.getElementById('muteButton');
    video.muted = !video.muted; // Toggle the muted state
    muteButton.textContent = video.muted ? '🔇' : '🔊'; // Update the icon
}

// Animate Skill Bars
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkills() {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Intersection Observer for skills animation
const skillsSection = document.querySelector('.about-content');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(skillsSection);