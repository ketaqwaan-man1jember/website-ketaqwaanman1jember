document.addEventListener('DOMContentLoaded', function() {
    // Initialize navbar
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.classList.add('show');
    
    // Enhanced slider configuration for left alignment
    const sliderConfig = {
        items: 1,
        slideBy: 1,
        autoplay: true,
        controls: true,
        nav: true,
        loop: true,
        speed: 400,
        touch: true,
        mouseDrag: true,
        preventScrollOnTouch: 'auto',
        fixedWidth: true, // Menambahkan fixedWidth untuk kontrol yang lebih baik
        gutter: 0, // Tambahkan sedikit jarak antar item
        responsive: {
            0: {
                items: 1,
                fixedWidth: 280 // Lebar fixed untuk mobile
            },
            640: {
                items: 2,
                fixedWidth: 320 // Lebar fixed untuk tablet
            },
            1024: {
                items: 3,
                fixedWidth: 500 // Lebar fixed untuk desktop
            }
        },
        controlsText: ['❮', '❯'],
        // Tambahkan alignment left
        alignToSlide: true,
        startIndex: 0
    };

    // Improved slider initialization with left alignment
    const initializeSlider = (selector) => {
        const slider = tns({
            container: selector,
            ...sliderConfig,
            onInit: function(info) {
                const sliderElement = document.querySelector(selector);
                let startX, startY, isDragging = false, isTouchMoving = false;
                let threshold = 50; // Swipe threshold in pixels
                let deltaX = 0, deltaY = 0;

                // Enhanced touch event handlers
                const handleTouchStart = (e) => {
                    startX = e.touches[0].pageX;
                    startY = e.touches[0].pageY;
                    isDragging = true;
                    isTouchMoving = false;
                    deltaX = 0;
                    deltaY = 0;
                };

                const handleTouchMove = (e) => {
                    if (!isDragging) return;

                    const currentX = e.touches[0].pageX;
                    const currentY = e.touches[0].pageY;

                    deltaX = currentX - startX;
                    deltaY = currentY - startY;

                    // Determine if this is a horizontal swipe
                    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
                        isTouchMoving = true;
                        e.preventDefault(); // Prevent vertical scrolling
                    }
                };

                const handleTouchEnd = (e) => {
                    if (!isDragging) return;

                    isDragging = false;

                    // Check for significant horizontal movement
                    if (isTouchMoving) {
                        if (deltaX < -threshold) {
                            // Swipe left
                            this.goTo('next');
                        } else if (deltaX > threshold) {
                            // Swipe right
                            this.goTo('prev');
                        }
                    }

                    isTouchMoving = false;
                };

                // Add touch event listeners
                sliderElement.addEventListener('touchstart', handleTouchStart, { passive: false });
                sliderElement.addEventListener('touchmove', handleTouchMove, { passive: false });
                sliderElement.addEventListener('touchend', handleTouchEnd, { passive: true });

                // Prevent default drag behavior
                sliderElement.addEventListener('dragstart', (e) => e.preventDefault());
            }
        });
        
        return slider;
    };

    // Initialize sliders with left alignment
    const kegiatanSlider = initializeSlider('.kegiatan-slider');
    const ekskulSlider = initializeSlider('.ekskul-slider');

    // Rest of the existing code remains the same

    // Rest of the existing code remains the same (smooth scroll, content height, etc.)
    
    // Smooth scroll functionality
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerOffset = 60;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Dynamic content height adjustment
    const updateContentHeights = () => {
        document.querySelectorAll('.content-wrapper').forEach(wrapper => {
            const content = wrapper.querySelector('p');
            if (content) {
                wrapper.style.maxHeight = wrapper.classList.contains('expanded') ? 
                    `${content.scrollHeight}px` : '150px';
            }
        });
    };

    // Read more functionality
    document.querySelectorAll('.read-more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const wrapper = this.parentElement.querySelector('.content-wrapper');
            const isExpanded = wrapper.classList.contains('expanded');
            
            wrapper.classList.toggle('expanded');
            this.textContent = isExpanded ? 
                'Tampilkan selengkapnya' : 
                'Tampilkan lebih sedikit';
            
            updateContentHeights();
        });
    });

    // Initialize content heights
    updateContentHeights();

    // Update heights on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateContentHeights, 100);
    });
        
});

document.addEventListener("DOMContentLoaded", function() {

    // Initialize Swiper
    const swiper = new Swiper('.swiper-proker', {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        grabCursor: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination-proker',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next-proker',
            prevEl: '.swiper-button-prev-proker',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 24
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 24
            }
        },
        on: {
            init: function () {
                console.log('Swiper initialized');
                document.querySelector('.swiper-proker').classList.add('initialized');
            }
        }
    });
    // Animasi program kerja
    function initializeStatusAnimations() {
        // Get all status indicators
        const statusElements = document.querySelectorAll('.program-status');
        
        // Add enhanced animation styles
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes statusPulse {
                0% {
                    transform: scale(1) translateY(0);
                    opacity: 1;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                50% {
                    transform: scale(1.08) translateY(-3px);
                    opacity: 0.85;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
                }
                100% {
                    transform: scale(1) translateY(0);
                    opacity: 1;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
            }
    
            @keyframes dotPulse {
                0% {
                    transform: scale(1);
                    opacity: 1;
                    filter: brightness(1);
                }
                50% {
                    transform: scale(1.3);
                    opacity: 0.7;
                    filter: brightness(1.2);
                }
                100% {
                    transform: scale(1);
                    opacity: 1;
                    filter: brightness(1);
                }
            }
    
            .program-status {
                position: relative;
                animation: statusPulse 3s ease-in-out infinite;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                border-radius: 8px;
                backdrop-filter: blur(8px);
            }
    
            .program-status::before {
                content: '';
                position: absolute;
                left: -8px;
                top: 50%;
                transform: translateY(-50%);
                width: 12px;
                height: 12px;
                border-radius: 50%;
                animation: dotPulse 2s ease-in-out infinite;
            }
    
            /* Custom animations for different statuses */
            .status-ongoing {
                animation-duration: 2.5s;
            }
            .status-ongoing::before {
                background: #2196F3;
                box-shadow: 0 0 12px rgba(33, 150, 243, 0.5);
            }
    
            .status-completed {
                animation-duration: 3s;
            }
            .status-completed::before {
                background: #4CAF50;
                box-shadow: 0 0 12px rgba(76, 175, 80, 0.5);
            }
    
            .status-planned {
                animation-duration: 3.5s;
            }
            .status-planned::before {
                background: #FFC107;
                box-shadow: 0 0 12px rgba(255, 193, 7, 0.5);
            }
    
            /* Enhanced hover effects */
            .program-status:hover {
                transform: translateY(-4px) scale(1.02);
                box-shadow: 0 8px 28px rgba(0,0,0,0.15);
                animation-play-state: paused;
            }
    
            .program-status:hover::before {
                animation-play-state: paused;
                filter: brightness(1.2);
            }
    
            /* Active state for better mobile interaction */
            .program-status:active {
                transform: translateY(-2px) scale(0.98);
                box-shadow: 0 4px 16px rgba(0,0,0,0.12);
            }
        `;
        document.head.appendChild(styleSheet);
    
        // Enhanced interaction effects
        statusElements.forEach(status => {
            status.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px) scale(1.02)';
                this.style.boxShadow = '0 8px 28px rgba(0,0,0,0.15)';
            });
    
            status.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            });
    
            // Enhanced touch interactions
            status.addEventListener('touchstart', function(e) {
                e.preventDefault();
                this.style.transform = 'translateY(-2px) scale(0.98)';
                this.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
            });
    
            status.addEventListener('touchend', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            });
        });
    }

})
// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    
    
    initializeStatusAnimations();

    // Observer for dynamic content
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                initializeStatusAnimations();
            }
        });
    });

    const programContent = document.querySelector('.program-content');
    if (programContent) {
        observer.observe(programContent, { childList: true, subtree: true });
    }

    // Enhanced reduced motion support
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    function handleReducedMotion(e) {
        if (e.matches) {
            const styleSheet = document.createElement('style');
            styleSheet.textContent = `
                .program-status, .program-status::before {
                    animation: none !important;
                    transition: transform 0.2s ease !important;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08) !important;
                }
                
                .program-status:hover {
                    transform: translateY(-2px) !important;
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }
    mediaQuery.addListener(handleReducedMotion);
    handleReducedMotion(mediaQuery);
});

function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.overlay');
    
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.overlay');
    
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
}
