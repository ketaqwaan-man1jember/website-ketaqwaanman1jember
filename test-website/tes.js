document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Slider Configuration
    const createSliderConfig = (customOptions = {}) => ({
        items: 1,
        slideBy: 1,
        autoplay: true,
        controls: true,
        nav: true,
        loop: true,
        speed: 400,
        gutter: 10,
        touch: true,
        mouseDrag: true,
        preventScrollOnTouch: 'force',
        lazyload: true,
        rewind: true,
        autoplayButtonOutput: false,
        controlsText: ['❮', '❯'],
        responsive: {
            0: {
                items: 1,
                gutter: 10
            },
            640: {
                items: 2,
                gutter: 15
            },
            1024: {
                items: 3,
                gutter: 20
            }
        },
        ...customOptions
    });

    // Advanced Slider Initialization Function
    const initializeAdvancedSlider = (selector, customConfig = {}) => {
        try {
            const sliderConfig = createSliderConfig(customConfig);
            
            const slider = tns({
                container: selector,
                ...sliderConfig,
                onInit: function(info) {
                    console.log(`Slider ${selector} initialized successfully`);
                    enhanceSliderAccessibility(info.container);
                    setupEnhancedTouchHandling(info);
                },
                onChange: function(info) {
                    console.log(`Current slide: ${info.index}`);
                },
                onTransitionEnd: function(info) {
                    trackSliderPerformance(info);
                }
            });

            return slider;
        } catch (error) {
            console.error('Slider initialization error:', error);
            reportSliderError(selector, error);
            return null;
        }
    };

    // Enhanced Touch Handling
    function setupEnhancedTouchHandling(sliderInfo) {
        const sliderElement = sliderInfo.container;
        let startX, startY, isDragging = false;

        const preventScroll = (e) => {
            e.preventDefault();
        };

        sliderElement.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX;
            startY = e.touches[0].pageY;
            isDragging = true;
            
            // Disable scroll while dragging
            document.body.addEventListener('touchmove', preventScroll, { passive: false });
        }, { passive: true });

        sliderElement.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const currentX = e.touches[0].pageX;
            const currentY = e.touches[0].pageY;
            
            const deltaX = Math.abs(currentX - startX);
            const deltaY = Math.abs(currentY - startY);
            
            if (deltaX > deltaY && deltaX > 50) {
                if (currentX < startX) {
                    sliderInfo.goTo('next');
                } else {
                    sliderInfo.goTo('prev');
                }
                isDragging = false;
            }
        }, { passive: false });

        sliderElement.addEventListener('touchend', () => {
            isDragging = false;
            
            // Re-enable scroll
            document.body.removeEventListener('touchmove', preventScroll, { passive: false });
        }, { passive: true });
    }

    // Accessibility Enhancements
    function enhanceSliderAccessibility(sliderContainer) {
        // Add ARIA attributes
        sliderContainer.setAttribute('role', 'region');
        sliderContainer.setAttribute('aria-label', 'Image Slider');

        // Add keyboard navigation
        sliderContainer.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowRight':
                    document.querySelector('.tns-controls .tns-controls-next').click();
                    break;
                case 'ArrowLeft':
                    document.querySelector('.tns-controls .tns-controls-prev').click();
                    break;
            }
        });
    }

    // Performance Tracking
    function trackSliderPerformance(info) {
        const slideCount = info.slideCount;
        const currentIndex = info.index;
        
        // Custom performance logging
        performance.mark(`slide-${currentIndex}-start`);
        setTimeout(() => {
            performance.mark(`slide-${currentIndex}-end`);
            performance.measure(
                `Slide ${currentIndex} Transition`, 
                `slide-${currentIndex}-start`, 
                `slide-${currentIndex}-end`
            );
        }, info.speed);
    }

    // Error Reporting
    function reportSliderError(selector, error) {
        // You could integrate with your error tracking system
        const errorDetails = {
            selector: selector,
            timestamp: new Date().toISOString(),
            error: error.message
        };
        
        console.error('Slider Error Details:', errorDetails);
        
        // Optional: Send to error tracking service
        // sendErrorToTrackingService(errorDetails);
    }

    // Reduced Motion Support
    function supportReducedMotion() {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        function handleReducedMotion(e) {
            const styleSheet = document.createElement('style');
            styleSheet.textContent = e.matches ? `
                .tns-slider {
                    transition: transform 0.2s ease !important;
                }
            ` : '';
            document.head.appendChild(styleSheet);
        }
        
        mediaQuery.addListener(handleReducedMotion);
        handleReducedMotion(mediaQuery);
    }

    // Initialize Sliders
    const kegiatanSlider = initializeAdvancedSlider('.kegiatan-slider', {
        autoplay: true,
        autoplayTimeout: 5000
    });

    const ekskulSlider = initializeAdvancedSlider('.ekskul-slider', {
        autoplay: false
    });

    // Reduced Motion Support
    supportReducedMotion();

    // Dynamic Resize Handling
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (kegiatanSlider) kegiatanSlider.rebuild();
            if (ekskulSlider) ekskulSlider.rebuild();
        }, 250);
    });
});