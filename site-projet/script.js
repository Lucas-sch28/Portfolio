document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar effect on scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll reveal animation
    const reveals = document.querySelectorAll('.reveal');

    function reveal() {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', reveal);
    reveal(); // Trigger on load
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for navbar
                const navbarHeight = navbar.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Image Modal logic
    const modal = document.getElementById('image-modal');
    const img = document.getElementById('network-schema');
    const modalImg = document.getElementById('modal-img');
    const captionText = document.getElementById('modal-caption');
    const span = document.querySelector('.close-modal');

    if (img && modal) {
        img.onclick = function() {
            modal.style.display = 'block';
            // Slight delay for CSS transition
            setTimeout(() => modal.classList.add('show'), 10);
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        }

        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => modal.style.display = 'none', 300); // match transition duration
        };

        if (span) {
            span.onclick = closeModal;
        }

        // Close when clicking outside the image
        modal.onclick = function(e) {
            if (e.target !== modalImg) {
                closeModal();
            }
        }
    }
});
