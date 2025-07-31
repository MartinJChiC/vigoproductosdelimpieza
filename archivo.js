// VARIABLES GLOBALES
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        const contactForm = document.getElementById('contactForm');

        // VARIABLES PARA TESTIMONIOS
        const testimonialsSlider = document.getElementById('testimonialsSlider');
        const prevButton = document.getElementById('prevTestimonial');
        const nextButton = document.getElementById('nextTestimonial');
        const navDots = document.querySelectorAll('.nav-dot');
        let currentSlide = 0;
        const totalSlides = 4;
        let autoSlideTimer;

        // FUNCIONES PARA SLIDER DE TESTIMONIOS
        function updateSlider() {
            const translateX = -currentSlide * 100;
            testimonialsSlider.style.transform = `translateX(${translateX}%)`;
            updateNavDots();
        }

        function updateNavDots() {
            navDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        }

        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            updateSlider();
        }

        function startAutoSlide() {
            autoSlideTimer = setInterval(nextSlide, 5000); // Cambiar cada 5 segundos
        }

        function stopAutoSlide() {
            clearInterval(autoSlideTimer);
        }

        function resetAutoSlide() {
            stopAutoSlide();
            startAutoSlide();
        }

        // FUNCIÓN PARA NAVBAR AL HACER SCROLL
        function handleNavbarScroll() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // FUNCIÓN PARA ANIMACIONES AL HACER SCROLL
        function handleSectionAnimations() {
            sections.forEach(section => {
                const sectionTop = section.offsetTop - window.innerHeight / 1.3;
                
                if (window.scrollY > sectionTop) {
                    section.classList.add('visible');
                }
            });
        }

        // FUNCIÓN PARA NAVEGACIÓN SUAVE
        function smoothScrollToSection(targetId) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Ajuste para navbar fijo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }

        // FUNCIÓN PARA CERRAR MENÚ MÓVIL
        function closeMenu() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }

        // FUNCIÓN PARA ALTERNAR MENÚ MÓVIL
        function toggleMenu() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        }

        // FUNCIÓN PARA MANEJAR ENVÍO DEL FORMULARIO
        function handleFormSubmit(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            const telefono = document.getElementById('telefono').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Crear mensaje para WhatsApp
            const whatsappMessage = `Hola! Me llamo ${nombre}.%0A%0ATeléfono: ${telefono}%0A%0AMensaje: ${mensaje}%0A%0A¡Gracias!`;
            const whatsappURL = `https://wa.me/9991292985?text=${whatsappMessage}`;
            
            // Abrir WhatsApp
            window.open(whatsappURL, '_blank');
            
            // Limpiar formulario
            contactForm.reset();
            
            // Mostrar mensaje de confirmación
            alert('¡Gracias por tu mensaje! Te redirigimos a WhatsApp para completar el contacto.');
        }

        // FUNCIÓN PARA DESTACAR ENLACE ACTIVO EN NAVEGACIÓN
        function highlightActiveNavLink() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        // FUNCIÓN DE INICIALIZACIÓN
        function initializeWebsite() {
            // Mostrar primera sección inmediatamente
            if (sections.length > 0) {
                sections[0].classList.add('visible');
            }
            
            // Ejecutar animaciones iniciales
            handleSectionAnimations();
            handleNavbarScroll();
            highlightActiveNavLink();
            
            // Inicializar slider de testimonios
            startAutoSlide();
        }

        // EVENT LISTENERS
        
        // Scroll event - Optimizado con throttling
        let ticking = false;
        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleNavbarScroll();
                    handleSectionAnimations();
                    highlightActiveNavLink();
                    ticking = false;
                });
                ticking = true;
            }
        }
        window.addEventListener('scroll', onScroll);

        // Hamburger menu toggle
        hamburger.addEventListener('click', toggleMenu);

        // Navigation links - Smooth scroll
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                smoothScrollToSection(targetId);
                closeMenu(); // Cerrar menú móvil después de hacer clic
            });
        });

        // Cerrar menú móvil al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                closeMenu();
            }
        });

        // Form submission
        contactForm.addEventListener('submit', handleFormSubmit);

        // EVENT LISTENERS PARA TESTIMONIOS
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => {
                prevSlide();
                resetAutoSlide();
            });

            nextButton.addEventListener('click', () => {
                nextSlide();
                resetAutoSlide();
            });
        }

        // Navigation dots
        navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetAutoSlide();
            });
        });

        // Pausar auto-slide al hacer hover
        if (testimonialsSlider) {
            testimonialsSlider.addEventListener('mouseenter', stopAutoSlide);
            testimonialsSlider.addEventListener('mouseleave', startAutoSlide);
        }

        // Soporte para gestos táctiles en testimonios
        let touchStartX = 0;
        let touchEndX = 0;

        if (testimonialsSlider) {
            testimonialsSlider.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });

            testimonialsSlider.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
        }

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide(); // Swipe izquierda - siguiente
                } else {
                    prevSlide(); // Swipe derecha - anterior
                }
                resetAutoSlide();
            }
        }

        // Botones del hero
        document.querySelectorAll('.hero-buttons a').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = btn.getAttribute('href');
                smoothScrollToSection(targetId);
            });
        });

        // Botones "Más info" de productos
        document.querySelectorAll('.product-card .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                smoothScrollToSection('#contacto');
            });
        });

        // Resize event para ajustar menú móvil
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });

        // Prevenir comportamiento por defecto en enlaces de WhatsApp
        document.querySelectorAll('a[href^="https://wa.me"]').forEach(link => {
            link.addEventListener('click', (e) => {
                // Permitir que el enlace funcione normalmente
                // Solo agregamos una pequeña animación visual
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = 'scale(1)';
                }, 150);
            });
        });

        // Efecto parallax suave para el hero (opcional)
        function handleParallax() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const parallaxSpeed = 0.5;
            
            if (hero && scrolled < hero.offsetHeight) {
                hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        }

        // Agregar parallax al scroll (comentado por defecto para mejor rendimiento)
        // window.addEventListener('scroll', handleParallax);

        // INICIALIZAR WEBSITE CUANDO EL DOM ESTÉ LISTO
        document.addEventListener('DOMContentLoaded', initializeWebsite);

        // Preloader simple (opcional)
        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
            console.log('🧽 Vigo Productos de Limpieza - Website cargado correctamente');
        });

        // Función para mejorar la experiencia en dispositivos táctiles
        function improveTouchExperience() {
            // Agregar clase para dispositivos táctiles
            if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
                document.body.classList.add('touch-device');
            }
            
            // Mejorar el scroll en iOS
            if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                document.body.style.webkitOverflowScrolling = 'touch';
            }
        }

        // Ejecutar mejoras para dispositivos táctiles
        improveTouchExperience();

        // FUNCIÓN PARA MANEJAR LOGO FALLBACK
        function handleLogoFallback() {
            const logoImg = document.querySelector('.logo img');
            const logoText = document.querySelector('.logo-text');
            
            if (logoImg && logoText) {
                logoImg.addEventListener('error', () => {
                    logoImg.style.display = 'none';
                    logoText.style.display = 'block';
                });
                
                logoImg.addEventListener('load', () => {
                    logoImg.style.display = 'block';
                    logoText.style.display = 'none';
                });
            }
        }

        // Ejecutar función de logo
        handleLogoFallback();

        // Función para animación de conteo (por si se quiere agregar estadísticas)
        function animateNumbers() {
            const numbers = document.querySelectorAll('[data-number]');
            
            numbers.forEach(numberElement => {
                const targetNumber = parseInt(numberElement.dataset.number);
                const duration = 2000; // 2 segundos
                const increment = targetNumber / (duration / 16); // 60fps
                let currentNumber = 0;
                
                const timer = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= targetNumber) {
                        currentNumber = targetNumber;
                        clearInterval(timer);
                    }
                    numberElement.textContent = Math.floor(currentNumber);
                }, 16);
            });
        }

        // Easter egg - Mensaje en consola
        console.log(`
        VIGO PRODUCTOS DE LIMPIEZA
        ==========================
        ¡Gracias por visitar nuestro sitio web!
        
        💛 Colores corporativos utilizados:
        - Amarillo mostaza: #f2c94c
        - Azul turquesa: #00bcd4
        - Blanco: #ffffff
        
        📱 Contáctanos: 999 123 4567
        🌐 Diseño responsive y moderno
        ⚡ Optimizado para rendimiento
        🖼️ Para cambiar el logo: reemplaza "logo-vigo.png"
        
        ¡Todo lo que necesitas para limpiar!
        `);        