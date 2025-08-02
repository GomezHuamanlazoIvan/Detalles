// Función para mostrar el mensaje de amor
function showLoveMessage() {
    const loveMessage = document.getElementById('loveMessage');
    loveMessage.classList.add('show');
    
    // Inicializar carrusel cuando se muestre el mensaje
    setTimeout(() => {
        const images = document.querySelectorAll('.love-image');
        if (images.length > 0) {
            updateCarousel();
            const firstTitle = images[0].getAttribute('data-title');
            const firstMessage = images[0].getAttribute('data-message');
            const loveTitle = document.getElementById('loveTitle');
            const loveText = document.getElementById('loveText');
            if (loveTitle && firstTitle) {
                loveTitle.textContent = firstTitle;
            }
            if (loveText && firstMessage) {
                loveText.textContent = firstMessage;
            }
        }
    }, 100);
    
    // Agregar efecto de corazones extra
    createExtraHearts();
    
    // Efecto de vibración suave en el dispositivo si está disponible
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
    }
}

// Función para ocultar el mensaje de amor
function hideLoveMessage() {
    const loveMessage = document.getElementById('loveMessage');
    loveMessage.classList.remove('show');
}

// Crear corazones extra cuando se hace clic
function createExtraHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart extra-heart';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
            heart.style.animationDelay = '0s';
            
            heartsContainer.appendChild(heart);
            
            // Remover el corazón después de la animación
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 5000);
        }, i * 100);
    }
}

// Efecto de partículas al mover el mouse
document.addEventListener('mousemove', function(e) {
    // Cada 50ms crear una pequeña partícula en la posición del mouse
    if (Math.random() > 0.95) {
        createMouseParticle(e.clientX, e.clientY);
    }
});

function createMouseParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '6px';
    particle.style.height = '6px';
    particle.style.background = '#ff6b9d';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '999';
    particle.style.animation = 'sparkle 1s ease-out forwards';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 1000);
}

// Animación de entrada cuando se carga la página
window.addEventListener('load', function() {
    const card = document.querySelector('.card');
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px) scale(0.9)';
    card.style.transition = 'all 1s ease-out';
    
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
    }, 100);
    
    // Iniciar la lluvia de corazones después de un momento
    setTimeout(createRandomHearts, 2000);
});

// Crear corazones aleatorios continuamente
function createRandomHearts() {
    setInterval(() => {
        if (Math.random() > 0.7) {
            const heartsContainer = document.querySelector('.hearts-container');
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 4 + 4) + 's';
            heart.style.animationDelay = '0s';
            
            heartsContainer.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 8000);
        }
    }, 2000);
}

// Cerrar mensaje con ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        hideLoveMessage();
    }
});

// Cerrar mensaje haciendo clic fuera de él
document.getElementById('loveMessage').addEventListener('click', function(e) {
    if (e.target === this) {
        hideLoveMessage();
    }
});

// Variables para el carrusel
let currentImageIndex = 0;
const images = document.querySelectorAll('.love-image');
const totalImages = images.length;

// Función para mostrar la siguiente imagen
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    updateCarousel();
    updateMessage();
}

// Función para mostrar la imagen anterior
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    updateCarousel();
    updateMessage();
}

// Función para actualizar las posiciones del carrusel 3D
function updateCarousel() {
    images.forEach((img, index) => {
        img.classList.remove('active', 'prev', 'next', 'hidden');
        
        if (index === currentImageIndex) {
            img.classList.add('active');
        } else if (index === (currentImageIndex - 1 + totalImages) % totalImages) {
            img.classList.add('prev');
        } else if (index === (currentImageIndex + 1) % totalImages) {
            img.classList.add('next');
        } else {
            img.classList.add('hidden');
        }
    });
}

// Función para actualizar el mensaje según la imagen actual
function updateMessage() {
    const currentImage = images[currentImageIndex];
    const title = currentImage.getAttribute('data-title');
    const message = currentImage.getAttribute('data-message');
    const loveTitle = document.getElementById('loveTitle');
    const loveText = document.getElementById('loveText');
    
    loveTitle.style.opacity = '0';
    loveTitle.style.transform = 'translateY(10px)';
    loveText.style.opacity = '0';
    loveText.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        loveTitle.textContent = title;
        loveText.textContent = message;
        loveTitle.style.opacity = '1';
        loveTitle.style.transform = 'translateY(0)';
        loveText.style.opacity = '1';
        loveText.style.transform = 'translateY(0)';
        loveTitle.style.animation = 'textFade 0.8s ease-in-out';
        loveText.style.animation = 'textFade 0.8s ease-in-out';
    }, 400);
}

// Auto-avanzar las imágenes cada 7 segundos
let autoSlide = setInterval(nextImage, 7000);

// Pausar auto-avance cuando el usuario interactúa
function pauseAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextImage, 7000);
}

// Agregar eventos a los botones
document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.querySelector('.carousel-controls button:first-child');
    const nextBtn = document.querySelector('.carousel-controls button:last-child');
    
    if (prevBtn) prevBtn.addEventListener('click', () => { prevImage(); pauseAutoSlide(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextImage(); pauseAutoSlide(); });
    
    // Inicializar transición del texto y título
    const loveTitle = document.getElementById('loveTitle');
    const loveText = document.getElementById('loveText');
    if (loveTitle) {
        loveTitle.style.transition = 'all 0.5s ease-in-out';
    }
    if (loveText) {
        loveText.style.transition = 'all 0.5s ease-in-out';
    }
    
    // Inicializar primera imagen
    if (images.length > 0) {
        const firstTitle = images[0].getAttribute('data-title');
        const firstMessage = images[0].getAttribute('data-message');
        const loveTitle = document.getElementById('loveTitle');
        if (loveTitle && firstTitle) {
            loveTitle.textContent = firstTitle;
        }
        if (loveText && firstMessage) {
            loveText.textContent = firstMessage;
        }
        updateCarousel();
    }
    
    // Inicializar carrusel al cargar
    setTimeout(() => {
        if (typeof updateCarousel === 'function') {
            updateCarousel();
        }
    }, 100);
});