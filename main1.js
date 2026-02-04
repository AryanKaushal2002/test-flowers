// ==================== INITIALIZATION ====================
let bloomProgress = 0;
let flowersClicked = new Set();
let petalInterval = null;

const TOTAL_FLOWERS = 3;

// Romantic flower messages
const flowerMessages = {
  1: "🌸 First Bloom: 'Gargee, you are the sunshine that makes my heart blossom. Your smile is more radiant than any flower in this garden.' 🌸",
  2: "🌺 Second Bloom: 'Gargee, like petals in the wind, my thoughts always drift to you. You make every moment feel like spring.' 🌺",
  3: "🌼 Third Bloom: 'This garden blooms for you alone, Gargee. Each flower represents a reason why you're special to me.' 🌼"
};

// ==================== PAGE LOAD ====================
window.onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    clearTimeout(c);
  }, 1000);
  
  // Initialize effects after load
  setTimeout(() => {
    initializeGarden();
  }, 500);
};

// ==================== GARDEN INITIALIZATION ====================
function initializeGarden() {
  try {
    createStars();
    createFloatingPetals();
    createMagicalLights();
    initializeCarousel();
    initializeLightbox();
  } catch (error) {
    console.error('Error initializing garden:', error);
  }
  
  // Music is handled on the main page - no audio control here
}

// ==================== BACKGROUND EFFECTS ====================
function createStars() {
  const container = document.getElementById('starsContainer');
  if (!container) return;
  
  // Create stars using CSS instead of DOM for better performance
  let starHTML = '';
  for (let i = 0; i < 50; i++) {
    const delay = Math.random() * 3;
    const duration = Math.random() * 2 + 2;
    starHTML += `<div class="star" style="left: ${Math.random() * 100}%; top: ${Math.random() * 100}%; animation-delay: ${delay}s; animation-duration: ${duration}s;"></div>`;
  }
  container.innerHTML = starHTML;
}

function createFloatingPetals() {
  const container = document.getElementById('floatingPetals');
  if (!container) return;
  
  const petals = ['🌸', '🌺', '🌼', '🌷', '🌹', '💮', '🏵️'];
  
  // Limit petal creation - max 3 petals at a time
  petalInterval = setInterval(() => {
    // Check if we should add a new petal
    const currentPetals = container.children.length;
    if (currentPetals < 3) {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.textContent = petals[Math.floor(Math.random() * petals.length)];
      petal.style.left = Math.random() * 100 + '%';
      petal.style.animationDuration = (Math.random() * 8 + 10) + 's';
      petal.style.fontSize = (Math.random() * 10 + 15) + 'px';
      container.appendChild(petal);
      
      setTimeout(() => petal.remove(), 12000);
    }
  }, 2000);
}

function createMagicalLights() {
  const container = document.getElementById('magicalLights');
  if (!container) return;
  
  const colors = [
    'rgba(255, 107, 157, 0.4)',
    'rgba(162, 155, 254, 0.4)',
    'rgba(254, 202, 87, 0.4)',
    'rgba(0, 210, 211, 0.4)'
  ];
  
  // Create just 3 magical lights instead of 5
  for (let i = 0; i < 3; i++) {
    const light = document.createElement('div');
    light.className = 'magic-light';
    light.style.left = Math.random() * 80 + 10 + '%';
    light.style.top = Math.random() * 80 + 10 + '%';
    light.style.background = `radial-gradient(circle, ${colors[i % colors.length]}, transparent)`;
    light.style.animationDelay = (i * 0.5) + 's';
    light.style.animationDuration = (Math.random() * 4 + 6) + 's';
    container.appendChild(light);
  }
}

// ==================== PICTURE CAROUSEL ====================
let currentSlide = 0;
let totalSlides = 0;
let autoSlideInterval = null;
let carouselImages = []; // Store image sources

function initializeCarousel() {
  console.log('Initializing carousel...');
  const track = document.getElementById('carouselTrack');
  const indicatorsContainer = document.getElementById('carouselIndicators');
  
  if (!track) {
    console.error('Carousel track not found!');
    return;
  }
  if (!indicatorsContainer) {
    console.error('Carousel indicators not found!');
    return;
  }
  
  console.log('Carousel elements found, loading images...');
  
  const pictureFolder = 'picture/';
  
  // Function to check if an image exists
  const checkImage = (index) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ exists: true, index });
      img.onerror = () => resolve({ exists: false, index });
      img.src = `${pictureFolder}pic${index}.jpg`;
    });
  };
  
  // Check for images up to pic50.jpg
  const loadImages = async () => {
    const checks = [];
    for (let i = 1; i <= 50; i++) {
      checks.push(checkImage(i));
    }
    
    const results = await Promise.all(checks);
    const validImages = results.filter(r => r.exists);
    
    if (validImages.length === 0) {
      console.error('No images found in picture folder!');
      return;
    }
    
    totalSlides = validImages.length;
    console.log(`Found ${totalSlides} images`);
    
    // Store image sources for lightbox
    carouselImages = validImages.map(img => `picture/pic${img.index}.jpg`);
    
    // Create carousel slides for each valid image
    validImages.forEach((imgData, index) => {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      if (index === 0) slide.classList.add('active');
      
      const image = document.createElement('img');
      image.src = `${pictureFolder}pic${imgData.index}.jpg`;
      image.alt = `Memory ${imgData.index}`;
      image.className = 'carousel-image';
      image.style.cursor = 'pointer';
      image.addEventListener('click', () => openLightbox(index));
      
      slide.appendChild(image);
      track.appendChild(slide);
      
      // Create indicator
      const indicator = document.createElement('div');
      indicator.className = 'carousel-indicator';
      if (index === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => goToSlide(index));
      indicatorsContainer.appendChild(indicator);
    });
    
    console.log(`Created ${totalSlides} slides`);
    
    // Setup navigation
    setupCarouselNavigation();
    startAutoSlide();
  };
  
  loadImages();
}

function setupCarouselNavigation() {
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  
  if (!prevBtn || !nextBtn || totalSlides === 0) return;
  
  if (prevBtn) prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    previousSlide();
    startAutoSlide();
  });
  
  if (nextBtn) nextBtn.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
  });
}

function goToSlide(index) {
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.carousel-indicator');
  
  if (slides.length === 0) return;
  
  // Remove active class from all
  slides.forEach(slide => slide.classList.remove('active'));
  indicators.forEach(ind => ind.classList.remove('active'));
  
  // Add active class to current
  currentSlide = index;
  slides[currentSlide].classList.add('active');
  indicators[currentSlide].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  goToSlide(currentSlide);
}

function previousSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  goToSlide(currentSlide);
}

function startAutoSlide() {
  if (totalSlides === 0) return;
  stopAutoSlide();
  autoSlideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
}

function stopAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }
}

// ==================== LIGHTBOX FUNCTIONALITY ====================
let lightboxIndex = 0;

function openLightbox(index) {
  try {
    const overlay = document.getElementById('lightboxOverlay');
    const image = document.getElementById('lightboxImage');
    const counter = document.getElementById('lightboxCounter');
    
    if (!overlay || !image || carouselImages.length === 0) return;
    
    lightboxIndex = index;
    image.src = carouselImages[lightboxIndex];
    counter.textContent = `${lightboxIndex + 1} / ${totalSlides}`;
    
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    stopAutoSlide();
  } catch (error) {
    console.error('Error opening lightbox:', error);
  }
}

function closeLightbox() {
  const overlay = document.getElementById('lightboxOverlay');
  if (!overlay) return;
  
  overlay.classList.remove('active');
  document.body.style.overflow = '';
  
  startAutoSlide();
}

function lightboxNextImage() {
  if (totalSlides === 0 || carouselImages.length === 0) return;
  lightboxIndex = (lightboxIndex + 1) % totalSlides;
  updateLightboxImage();
}

function lightboxPrevImage() {
  if (totalSlides === 0 || carouselImages.length === 0) return;
  lightboxIndex = (lightboxIndex - 1 + totalSlides) % totalSlides;
  updateLightboxImage();
}

function updateLightboxImage() {
  const image = document.getElementById('lightboxImage');
  const counter = document.getElementById('lightboxCounter');
  
  if (!image || carouselImages.length === 0) return;
  
  image.style.opacity = '0';
  
  setTimeout(() => {
    image.src = carouselImages[lightboxIndex];
    counter.textContent = `${lightboxIndex + 1} / ${totalSlides}`;
    image.style.opacity = '1';
  }, 200);
}

function initializeLightbox() {
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  const overlay = document.getElementById('lightboxOverlay');
  
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', lightboxPrevImage);
  if (nextBtn) nextBtn.addEventListener('click', lightboxNextImage);
  
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeLightbox();
    });
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!overlay || !overlay.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrevImage();
    if (e.key === 'ArrowRight') lightboxNextImage();
  });
}

// ==================== PROGRESS TRACKING (DISABLED) ====================
// Progress tracking removed to allow continuous viewing
function updateProgress() {
  // Progress tracking disabled
}

// ==================== FLOWER INTERACTION ====================
function showFlowerMessage(flowerNumber) {
  // Show modal with message
  const modal = document.getElementById('flowerMessageModal');
  const messageTitle = document.getElementById('messageTitle');
  const messageText = document.getElementById('messageText');
  
  messageTitle.textContent = `Flower ${flowerNumber} Message`;
  messageText.textContent = flowerMessages[flowerNumber];
  
  modal.style.display = 'flex';
  
  // Play sparkle effect
  createSparkles();
  
  // Hide hint after first click
  const hint = document.getElementById('interactionHint');
  if (hint) {
    hint.style.display = 'none';
  }
}

function closeFlowerMessage() {
  const modal = document.getElementById('flowerMessageModal');
  modal.style.display = 'none';
}

// ==================== SPARKLE EFFECT ====================
function createSparkles() {
  const sparkles = ['✨', '💫', '⭐', '🌟'];
  
  for (let i = 0; i < 8; i++) {
    const sparkle = document.createElement('div');
    sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    sparkle.style.position = 'fixed';
    sparkle.style.left = '50%';
    sparkle.style.top = '50%';
    sparkle.style.fontSize = '30px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    
    const angle = (Math.PI * 2 * i) / 8;
    const velocity = 3;
    
    document.body.appendChild(sparkle);
    
    let posX = 0;
    let posY = 0;
    let opacity = 1;
    
    const animate = () => {
      posX += Math.cos(angle) * velocity;
      posY += Math.sin(angle) * velocity;
      opacity -= 0.02;
      
      sparkle.style.transform = `translate(${posX}px, ${posY}px)`;
      sparkle.style.opacity = opacity;
      
      if (opacity > 0) {
        requestAnimationFrame(animate);
      } else {
        sparkle.remove();
      }
    };
    
    animate();
  }
}

// ==================== COMPLETION ====================
function showCompletion() {
  const overlay = document.getElementById('completionOverlay');
  overlay.style.display = 'flex';
  
  // Create celebration confetti
  createGardenConfetti();
}

function createGardenConfetti() {
  const emojis = ['🌸', '🌺', '🌼', '💐', '💕', '💖', '✨', '🎉'];
  
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      confetti.style.position = 'fixed';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = '-50px';
      confetti.style.fontSize = (Math.random() * 20 + 20) + 'px';
      confetti.style.zIndex = '9999';
      confetti.style.pointerEvents = 'none';
      
      document.body.appendChild(confetti);
      
      let posY = -50;
      let posX = parseFloat(confetti.style.left);
      let rotation = 0;
      const speed = Math.random() * 3 + 2;
      const drift = (Math.random() - 0.5) * 2;
      
      const animate = () => {
        posY += speed;
        posX += drift;
        rotation += 10;
        
        confetti.style.top = posY + 'px';
        confetti.style.left = posX + '%';
        confetti.style.transform = `rotate(${rotation}deg)`;
        
        if (posY < window.innerHeight) {
          requestAnimationFrame(animate);
        } else {
          confetti.remove();
        }
      };
      
      animate();
    }, i * 30);
  }
}

function returnToMain() {
  window.location.href = 'index.html';
}

// ==================== KEYBOARD CONTROLS ====================
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeFlowerMessage();
  }
});

// ==================== EASTER EGG ====================
let clickCount = 0;
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('main-title')) {
    clickCount++;
    if (clickCount === 5) {
      alert('🎉 Secret Found! You discovered the hidden message: "Every flower in this garden represents a moment I fell for you." 💕');
      clickCount = 0;
    }
  }
});

console.log('🌸 Blooming Garden - Made with Love 🌸');
  