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
  createStars();
  createFloatingPetals();
  createMagicalLights();
  
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

// ==================== PROGRESS TRACKING ====================
function updateProgress() {
  bloomProgress = flowersClicked.size;
  const progressPercent = Math.min(Math.round((bloomProgress / TOTAL_FLOWERS) * 100), 100);
  
  const progressFill = document.getElementById('progressFill');
  const progressPercentText = document.getElementById('progressPercent');
  
  if (progressFill) {
    progressFill.style.width = progressPercent + '%';
  }
  if (progressPercentText) {
    progressPercentText.textContent = progressPercent + '%';
  }
}

// ==================== FLOWER INTERACTION ====================
function showFlowerMessage(flowerNumber) {
  // Mark flower as clicked
  flowersClicked.add(flowerNumber);
  
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
  
  // Update progress based on flowers clicked
  updateProgress();
}

function closeFlowerMessage() {
  const modal = document.getElementById('flowerMessageModal');
  modal.style.display = 'none';
  
  // Check for completion AFTER closing the modal (gives user time to read)
  if (bloomProgress >= TOTAL_FLOWERS) {
    setTimeout(() => {
      showCompletion();
    }, 800);
  }
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
  