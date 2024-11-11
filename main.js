document.addEventListener('DOMContentLoaded', function() {
    // Initialize navbar
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.classList.add('show');
    
    // Optimized slider configuration for mobile and no gutter
    const sliderConfig = {
        items: 1,
        slideBy: 1,
        autoplay: false,
        controls: true,
        nav: true,
        loop: true,
        speed: 400,
        gutter: 0,
        touch: true,
        mouseDrag: true,
        preventScrollOnTouch: 'auto',
        responsive: {
            640: {
                items: 2,
                gutter: 0
            },
            1024: {
                items: 3,
                gutter: 0
            }
        },
        controlsText: ['❮', '❯']
    };

    // Initialize sliders with touch support
    const initializeSlider = (selector) => {
        const slider = tns({
            container: selector,
            ...sliderConfig,
            onInit: function() {
                const sliderElement = document.querySelector(selector);
                let startX, isDragging = false;

                // Touch events for mobile
                sliderElement.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].pageX;
                    isDragging = true;
                }, { passive: true });

                sliderElement.addEventListener('touchmove', (e) => {
                    if (!isDragging) return;
                    const currentX = e.touches[0].pageX;
                    const diff = startX - currentX;
                    
                    if (Math.abs(diff) > 50) {
                        if (diff > 0) this.goTo('next');
                        else this.goTo('prev');
                        isDragging = false;
                    }
                }, { passive: true });

                sliderElement.addEventListener('touchend', () => {
                    isDragging = false;
                }, { passive: true });
            }
        });
        
        return slider;
    };

    // Initialize both sliders
    const kegiatanSlider = initializeSlider('.kegiatan-slider');
    const ekskulSlider = initializeSlider('.ekskul-slider');

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