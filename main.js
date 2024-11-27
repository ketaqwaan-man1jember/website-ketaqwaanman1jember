document.addEventListener("DOMContentLoaded", function() {
    // Nav Seting
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.classList.add('show');
    
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

    // Slide Card Strukture, Kegiatan (PHBI), Eskul
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            loadStruktur(data.struktur);
            loadProgramKerja(data.programKerja);
            loadKegiatan(data.kegiatan);
            loadEkstrakurikuler(data.ekskul);
        })
        .catch(error => console.error('Error loading JSON:', error));

    function loadStruktur(struktur) {
        const strukturContainer = document.querySelector('#struktur .structure-content');

        const listElement = document.createElement('ul');
        listElement.className = 'structure-list';
        struktur.members.forEach(member => {
            const listItem = document.createElement('li');
            listItem.textContent = member;
            listElement.appendChild(listItem);
        });
    
        strukturContainer.appendChild(listElement);
    }

    function loadProgramKerja(programKerja) {
        const programContainer = document.querySelector('.program-kerja .swiper-wrapper');

        
        // Clear existing content before populating
        programContainer.innerHTML = '';
    
        // Create program slides
        programKerja.forEach(program => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide swiper-slide-proker';
            slide.innerHTML = createProgramCardHTML(program);
            programContainer.appendChild(slide);
        });
    
        // Initialize Swiper with configuration
        const swiper = createSwiperInstance();
    
        // Add status animations
        addStatusAnimations();
    }
    
    function createProgramCardHTML(program) {
        return `
            <div class="program-card">
                <div class="program-icon">
                    <i class="${program.icon}"></i>
                </div>
                <h3 class="program-title">${program.title}</h3>
                <p class="program-description">${program.description}<br>${program.date}</p>
                <div class="program-status status-${program.status.toLowerCase()}">${program.status.replaceAll("-", " ")}</div>
            </div>
        `;
    }
    
    function createSwiperInstance() {
        return new Swiper('.swiper-proker', {
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
                640: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 3, spaceBetween: 24 },
                1024: { slidesPerView: 4, spaceBetween: 24 }
            },
            on: {
                init: function () {
                    console.log('Swiper initialized');
                    document.querySelector('.swiper-proker').classList.add('initialized');
                }
            }
        });
    }
    
    function addStatusAnimations() {
        const statusElements = document.querySelectorAll('.program-status');
            
        // Add interaction events
        statusElements.forEach(status => {
            status.addEventListener('mouseenter', () => {
                status.style.transform = 'translateY(-4px) scale(1.02)';
                status.style.boxShadow = '0 8px 28px rgba(0,0,0,0.15)';
            });
    
            status.addEventListener('mouseleave', () => {
                status.style.transform = 'translateY(0) scale(1)';
                status.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            });
    
            status.addEventListener('touchstart', (e) => {
                e.preventDefault();
                status.style.transform = 'translateY(-2px) scale(0.98)';
                status.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
            });
    
            status.addEventListener('touchend', () => {
                status.style.transform = 'translateY(0) scale(1)';
                status.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            });
        });
        
    }
    
    // Setting Kegiatan
    function loadKegiatan(kegiatan) {
        const kegiatanContainer = document.querySelector('#kegiatan .kegiatan-slider');
        kegiatan.forEach(kegiatanItem => {
            const slideCard = document.createElement('div');
            slideCard.className = 'slide-card';
            slideCard.innerHTML = `
                <div class="w-full h-64 overflow-hidden">
                    <img src="${kegiatanItem.image}" alt="${kegiatanItem.title}" class="w-full h-full object-cover">
                </div>
                <div class="p-8 flex flex-col flex-grow">
                    <h3 class="text-2xl font-bold mb-4 text-teal-700">${kegiatanItem.title}</h3>
                    <div class="content-wrapper" style="max-height: 150px;">
                        <p class="text-gray-600 leading-relaxed">${kegiatanItem.description}</p>
                        <div class="fade-overlay"></div>
                    </div>
                </div>

            `;
            kegiatanContainer.appendChild(slideCard);
        });
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
    }

    // Setting Ekskul
    function loadEkstrakurikuler(ekskul) {
        const ekskulContainer = document.querySelector('#ekskul .ekskul-slider');
        ekskul.forEach(ekskulItem => {
            const ekskulCard = document.createElement('div');
            ekskulCard.className = 'ekskul-card';
            ekskulCard.innerHTML = `
                <div class="w-full h-64 overflow-hidden">
                    <img src="${ekskulItem.image}" alt="${ekskulItem.title}" class="w-full h-full object-cover">
                </div>
                <div class="p-8 flex flex-col flex-grow">
                    <h3 class="text-2xl font-bold mb-4 text-teal-700">${ekskulItem.title}</h3>
                    <div class="content-wrapper" style="max-height: 150px;">
                        <p class="text-gray-600 leading-relaxed">${ekskulItem.description}</p>
                        <div class="fade-overlay"></div>
                    </div>
                </div>
                    <div class="ekskul-tags mt-auto">
                        <span class="ekskul-tag">${ekskulItem.schedule.day}</span>
                        <span class="ekskul-tag">${ekskulItem.schedule.time}</span>
                </div>
            `;
            ekskulContainer.appendChild(ekskulCard);
        });
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
        const ekskulSlider = initializeSlider('.ekskul-slider');
    }

});

//Seting Menu Mobile 
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

