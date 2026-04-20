/* ============================================
   Daniel Venegas — Portfolio Scripts
   ============================================ */

// ---------- Mobile Menu Toggle ----------
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

menuToggle.setAttribute('aria-expanded', menuToggle.classList.contains('active'));

// ---------- Scroll Animations (Intersection Observer) ----------
const fadeElements = document.querySelectorAll('.work-card, .about, .works-header');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in', 'visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2, rootMargin: '-50px' });

fadeElements.forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ---------- Navbar background on scroll ----------
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(38, 38, 38, 0.98)';
  } else {
    navbar.style.background = 'rgba(38, 38, 38, 0.92)';
  }
});

const slides = document.querySelectorAll('.hero-slider img');
let index = 0;

setInterval(() => {
  slides[index].classList.remove('active');

  index = (index + 1) % slides.length;

  setTimeout(() => {
    slides[index].classList.add('active');
  }, 200);
}, 6000);

// ---------- Scroll Animations Editorial ----------
const elements = document.querySelectorAll(
  '.project, .editorial-intro, .project-header'
);

const observer2 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer2.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

elements.forEach(el => {
  el.classList.add('fade-in');
  observer2.observe(el);
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const caption = document.getElementById('lightbox-caption');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Seleccionamos todas las imágenes de la galería activa
const images = Array.from(document.querySelectorAll('.project-grid-foto img, .project-grid img'));
let currentIndex = 0;

// Función para actualizar la imagen en el lightbox
const updateLightbox = (index) => {
  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;
  
  currentIndex = index;
  lightboxImg.src = images[currentIndex].src;
  caption.innerText = images[currentIndex].alt || `Imagen ${currentIndex + 1}`;
};

// Abrir al hacer click
images.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    updateLightbox(currentIndex);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

// Eventos de botones
prevBtn.addEventListener('click', (e) => { e.stopPropagation(); updateLightbox(currentIndex - 1); });
nextBtn.addEventListener('click', (e) => { e.stopPropagation(); updateLightbox(currentIndex + 1); });

// Cerrar al clickear fuera o en la X
lightbox.addEventListener('click', (e) => {
  if (e.target !== lightboxImg && e.target !== prevBtn && e.target !== nextBtn) {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Navegación por teclado (Flechas)
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === "ArrowLeft") updateLightbox(currentIndex - 1);
  if (e.key === "ArrowRight") updateLightbox(currentIndex + 1);
  if (e.key === "Escape") {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
