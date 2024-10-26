// Initialize sliders
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('navbar').classList.add('show');
});
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();  // Menghentikan perilaku default link

        // Mendapatkan target elemen berdasarkan href
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            // Memindahkan halaman dengan smooth
            window.scrollTo({
                top: target.offsetTop - 50,  // Mengatur posisi offset (misalnya untuk memperhitungkan tinggi navbar)
                behavior: 'smooth'  // Animasi smooth
            });
        }
    });
});
// Initialize sliders with improved options
document.addEventListener('DOMContentLoaded', function() {
    // Slider configuration
    const sliderConfig = {
        items: 2,
        slideBy: 1,
        autoplay: false,
        controls: true,
        nav: true,
        loop: true,
        speed: 400,
        gutter: 0,
        responsive: {
            640: {
                items: 2
            },
            1024: {
                items: 3
            }
        },
        preventScrollOnTouch: 'auto',
        onInit: function() {
            setTimeout(() => {
                updateSlideHeights();
            }, 100);
        }
    };

    // Initialize both sliders
    const kegiatanSlider = tns({
        container: '.kegiatan-slider',
        ...sliderConfig
    });

    const ekskulSlider = tns({
        container: '.ekskul-slider',
        ...sliderConfig
    });

    // Handle read more functionality for both sliders
    document.querySelectorAll('.read-more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const wrapper = this.parentElement.querySelector('.content-wrapper');
            const card = this.closest('.slide-card, .ekskul-card');
            const isExpanded = wrapper.classList.contains('expanded');
            
            wrapper.classList.toggle('expanded');
            this.textContent = isExpanded ? 
                'Tampilkan selengkapnya' : 
                'Tampilkan lebih sedikit';
            
            // Update heights after content change
            updateSlideHeights();
        });
    });

    // Function to update slide heights
    function updateSlideHeights() {
        ['.kegiatan-slider .slide-card', '.ekskul-slider .ekskul-card'].forEach(selector => {
            const slides = document.querySelectorAll(selector);
            let maxHeight = 0;

            // Reset heights
            slides.forEach(slide => slide.style.height = 'auto');

            // Find max height
            slides.forEach(slide => {
                maxHeight = Math.max(maxHeight, slide.offsetHeight);
            });

            // Apply max height
            slides.forEach(slide => slide.style.height = `${maxHeight}px`);
        });
    }

    // Update heights on window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateSlideHeights, 100);
    });

    // Initial height update
    updateSlideHeights();
});