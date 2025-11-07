document.addEventListener('DOMContentLoaded', () => {

    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    const track = document.getElementById('slide-track');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const totalSlides = slides.length;
    let currentSlide = 0;

    if (track && slides.length > 0 && prevButton && nextButton) {
        const updateSlidePosition = () => {
            const offset = -currentSlide * 100;
            track.style.transform = 'translateX(' + offset + '%)';
        };

        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlidePosition();
        });

        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlidePosition();
        });
    }

    const profileImageContainer = document.getElementById('profile-image-container');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeButton = document.getElementById('close-button');
    const profileImage = document.getElementById('profile-image');

    const showModal = (src) => {
        lightboxImage.src = src; 
        lightboxModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; 
    };

    const hideModal = () => {
        lightboxModal.classList.add('hidden');
        document.body.style.overflow = ''; 
    };

    if (profileImageContainer && lightboxModal && profileImage) {
        profileImageContainer.addEventListener('click', () => {
            showModal(profileImage.src); 
        });

        closeButton.addEventListener('click', hideModal);

        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                hideModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !lightboxModal.classList.contains('hidden')) {
                hideModal();
            }
        });
    }

    const music = document.getElementById('musicPlayer');
    const playButton = document.getElementById('playButton');
    const progressBar = document.getElementById('progressBar');

    if (music && playButton && progressBar) {
        playButton.addEventListener('click', () => {
            if (music.paused) {
                music.play();
                playButton.textContent = '⏸️';
            } else {
                music.pause();
                playButton.textContent = '▶️';
            }
        });

        music.addEventListener('timeupdate', () => {
            const progress = (music.currentTime / music.duration) * 100;
            progressBar.value = progress || 0;
        });

        progressBar.addEventListener('input', () => {
            const newTime = (progressBar.value / 100) * music.duration;
            music.currentTime = newTime;
        });

        music.addEventListener('ended', () => {
            playButton.textContent = '▶️';
            progressBar.value = 0;
        });
    }
    
    const scrollTogglerBtn = document.getElementById('scroll-toggler');
    const scrollIcon = document.getElementById('scroll-icon');
    const SCROLL_THRESHOLD = 300; 

    if (scrollTogglerBtn) {
        scrollTogglerBtn.addEventListener('click', () => {
            const scrollHeight = document.body.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;
            const scrollTop = window.scrollY;
            const scrolledToBottom = scrollHeight - clientHeight - scrollTop;

            if (scrolledToBottom < SCROLL_THRESHOLD) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                window.scrollTo({ top: scrollHeight, behavior: 'smooth' });
            }
        });
    }
    window.addEventListener('scroll', () => {
        const scrollHeight = document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const scrollTop = window.scrollY;
        const scrolledToBottom = scrollHeight - clientHeight - scrollTop;
        
        if (scrollIcon) {
            if (scrolledToBottom < SCROLL_THRESHOLD) {
                scrollIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>';
            } else {
                scrollIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>';
            }
        }
    });

    window.dispatchEvent(new Event('scroll'));
});