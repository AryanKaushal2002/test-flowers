// ==================== INITIALIZATION ====================
let noClickCount = 0;
let loveMeterValue = 0;
let musicPlaying = false;
let secretRevealed = false;
let confessionRead = false;  // Track if letter has been read

// Romantic messages for the love letter
const loveMessages = [
  "Dear Gargee, from the moment I saw you, my world changed. Every day with you is a gift, and I cherish every moment we share together. Will you make this Valentine's Day special by being mine? 💕",
  "Gargee, you light up my life in ways I never imagined possible. Your smile, your laugh, your presence - everything about you makes my heart skip a beat. I can't imagine celebrating this day with anyone but you. 💖",
  "Dear Gargee, they say love is patient, love is kind... and I've learned that's true because of you. You've taught me what it means to truly care for someone. Will you be my Valentine and make this the best day ever? 🌹",
  "Gargee, in a world full of ordinary moments, you make everything extraordinary. I want to create magical memories with you, starting with this Valentine's Day. Say yes? 💝"
];

// Sad GIF collection for "No" responses
const sadGifs = [
  "https://media1.tenor.com/images/9413ffc5a11722a3cc456a88810750bd/tenor.gif?itemid=14193216",
  "https://emoji.gg/assets/emoji/5228_cat_cri.gif",
  "https://media1.tenor.com/images/a0554662ae7c3c60c0a7fdadac74ef18/tenor.gif?itemid=13931206",
  "https://media3.giphy.com/media/qpCvOBBmBkble/giphy.gif",
  "https://c.tenor.com/fpIAhF2jIY0AAAAC/cat-crying.gif",
  "https://c.tenor.com/BP70qe8X0J8AAAAC/crycat-crying-cat.gif"
];

// Pleading messages
const pleadingMessages = [
  "Please... 🥺",
  "I'm begging you... 💔",
  "Don't break my heart... 😢",
  "Just one chance... 🙏",
  "Pretty please? 🥹",
  "You're killing me... 😭",
  "I promise I'll be good... 💕",
  "Think about it... 💭"
];

// ==================== PAGE LOAD ANIMATIONS ====================
document.addEventListener("DOMContentLoaded", function () {
  initializeAnimations();
  startCountdown();
  createFloatingHearts();
  createParticles();
  updateLoveMeter(0);
  
  // Set initial music icon to muted
  const musicIcon = document.querySelector('.music-icon');
  if (musicIcon) {
    musicIcon.textContent = '🔇';
  }
});

// ==================== BACKGROUND ANIMATIONS ====================
function initializeAnimations() {
  // Add entrance animation
  setTimeout(() => {
    document.getElementById('mainCard').style.opacity = '1';
  }, 100);
}

function createFloatingHearts() {
  const container = document.getElementById('heartsContainer');
  const heartSymbols = ['💕', '💖', '💗', '💓', '💝', '❤️', '💜', '🧡'];
  
  setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
    heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
    container.appendChild(heart);
    
    setTimeout(() => heart.remove(), 8000);
  }, 300);
}

function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 3 + 's';
    container.appendChild(particle);
  }
}

// ==================== COUNTDOWN TIMER ====================
function startCountdown() {
  const countdownDisplay = document.getElementById('countdownDisplay');
  
  function updateCountdown() {
    const now = new Date();
    const valentinesDay = new Date(now.getFullYear(), 1, 14); // February 14
    
    // If Valentine's Day has passed this year, set for next year
    if (now > valentinesDay) {
      valentinesDay.setFullYear(valentinesDay.getFullYear() + 1);
    }
    
    const difference = valentinesDay - now;
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    countdownDisplay.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ==================== LOVE METER ====================
function updateLoveMeter(value) {
  loveMeterValue = Math.min(100, value);
  const meterFill = document.getElementById('loveMeter');
  const meterText = document.getElementById('loveMeterText');
  
  meterFill.style.width = loveMeterValue + '%';
  meterText.textContent = loveMeterValue + '%';
  
  // Show confession when meter reaches 50%
  if (loveMeterValue >= 50 && loveMeterValue < 55) {
    setTimeout(() => showConfession(), 500);
  }
}

// ==================== BUTTON INTERACTIONS ====================
function handleYesHover() {
  const mainImg = document.getElementById('mainImg');
  mainImg.src = "https://github.com/NikhilMarko03/resources/blob/main/happy3.gif?raw=true";
  createHeartBurst();
  // Removed auto love meter increase to not interfere with 50% letter logic
}

function handleNoHover() {
  const mainImg = document.getElementById('mainImg');
  mainImg.src = "https://github.com/NikhilMarko03/resources/blob/main/sad1.gif?raw=true";
}

function handleNormalState() {
  const mainImg = document.getElementById('mainImg');
  mainImg.src = "https://github.com/NikhilMarko03/resources/blob/main/happy1.gif?raw=true";
}

function handleYes() {
  if (noClickCount < 3) {
    showEarlyYesMessage();
    return;
  }
  
  // Must read the confession letter first
  if (!confessionRead) {
    alert('💌 You need to read my letter first! It contains something important for you... 💕');
    return;
  }
  
  // Close any open modals first
  document.getElementById('pleaseModal').style.display = 'none';
  document.getElementById('confessionModal').style.display = 'none';
  
  // Play happy music
  playHappyMusic();
  
  // Hide main content
  document.getElementById('btns').style.display = 'none';
  document.getElementById('mainQuestion').innerHTML = 
    '<span class="typing-text">We\'re Valentines Now! 💕✨</span>';
  
  // Update love meter to 100%
  updateLoveMeter(100);
  
  // Show success modal
  setTimeout(() => showSuccessModal(), 1000);
  
  // Create massive confetti explosion
  createConfetti(100);
}

function handleNo() {
  noClickCount++;
  
  // Each "Still No" increases the love meter by 10 to help reach 50% threshold
  updateLoveMeter(loveMeterValue + 10);
  
  // Only close and reopen if confession modal is not showing
  const confessionModal = document.getElementById('confessionModal');
  if (confessionModal.style.display !== 'flex') {
    // Close any existing modal first
    document.getElementById('pleaseModal').style.display = 'none';
    
    // Small delay before showing new modal for smooth transition
    setTimeout(() => {
      showPleaseModal();
    }, 100);
  }
}

function showEarlyYesMessage() {
  // Create a temporary alert modal
  const alertDiv = document.createElement('div');
  alertDiv.className = 'modal';
  alertDiv.style.display = 'flex';
  alertDiv.innerHTML = `
    <div class="modal-content" style="text-align: center;">
      <h2 style="font-family: 'Dancing Script', cursive; color: var(--love-pink); margin-bottom: 20px;">
        Not So Fast! 😏
      </h2>
      <p style="font-size: 18px; margin-bottom: 20px;">
        You're too eager! Play around a bit first, cutie 😘💕
      </p>
      <button class="button button-yes" onclick="this.parentElement.parentElement.remove()">
        <span class="button-text">Okay, I'll Play! 😊</span>
      </button>
    </div>
  `;
  document.body.appendChild(alertDiv);
  
  setTimeout(() => alertDiv.remove(), 3000);
}

// ==================== MODAL FUNCTIONS ====================
function showConfession() {
  // Hide the please modal first so confession appears on top
  document.getElementById('pleaseModal').style.display = 'none';
  
  const modal = document.getElementById('confessionModal');
  const letterText = document.getElementById('typingLetter');
  
  modal.style.display = 'flex';
  modal.style.zIndex = '1001';  // Make sure it's above please modal
  
  // Random love message
  const message = loveMessages[Math.floor(Math.random() * loveMessages.length)];
  
  // Typing effect
  let i = 0;
  letterText.textContent = '';
  const typingInterval = setInterval(() => {
    if (i < message.length) {
      letterText.textContent += message[i];
      i++;
    } else {
      clearInterval(typingInterval);
    }
  }, 50);
}

function closeConfession() {
  const modal = document.getElementById('confessionModal');
  modal.style.display = 'none';
  updateLoveMeter(loveMeterValue + 15);
  
  // Mark confession as read
  confessionRead = true;
  
  // Show please modal again after letter, now with "Yes" button available
  setTimeout(() => {
    const pleaseModal = document.getElementById('pleaseModal');
    pleaseModal.style.display = 'flex';
    pleaseModal.style.zIndex = '1000';  // Reset z-index
  }, 300);
}

function closePlease() {
  // Only allow closing if they've reached 50% love meter
  if (loveMeterValue < 50) {
    alert('💔 Wait! You need to reach 50% love meter first!\n\nClick "Still No" to unlock the next part. Your love meter increases with each click! 💕');
    return;
  }
  // Allow user to close the please modal after reaching 50%
  document.getElementById('pleaseModal').style.display = 'none';
}

function showPleaseModal() {
  const modal = document.getElementById('pleaseModal');
  const pleaseText = document.getElementById('pleaseText');
  const pleaseImg = document.getElementById('pleaseImg');
  const pleaseCounter = document.getElementById('pleaseCounter');
  
  // Update content
  pleaseText.textContent = pleadingMessages[Math.min(noClickCount - 1, pleadingMessages.length - 1)];
  pleaseImg.src = sadGifs[Math.floor(Math.random() * sadGifs.length)];
  pleaseCounter.textContent = `You've said no ${noClickCount} time${noClickCount > 1 ? 's' : ''}... 💔`;
  
  modal.style.display = 'flex';
  
  // Note: Modal stays open until user clicks a button (auto-close removed for better UX)
}

function showSuccessModal() {
  const modal = document.getElementById('successModal');
  modal.style.display = 'flex';
  
  // Create confetti in the modal
  const confettiContainer = document.getElementById('confettiContainer');
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = getRandomColor();
      confetti.style.animationDelay = Math.random() + 's';
      confettiContainer.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 3000);
    }, i * 30);
  }
}

function closeSuccess() {
  // Close success modal
  document.getElementById('successModal').style.display = 'none';
  
  // Close any other open modals
  document.getElementById('pleaseModal').style.display = 'none';
  document.getElementById('confessionModal').style.display = 'none';
  
  // Keep the main page in success state (buttons hidden, success message shown)
  // This is intentional - user already said yes!
}

function openFlowerGarden() {
  // Keep music playing - don't pause anything
  // Open flower garden in new tab
  window.open("index1.html", "_blank");
}

// ==================== VISUAL EFFECTS ====================
function createHeartBurst() {
  const container = document.getElementById('floatingHearts');
  const hearts = ['💕', '💖', '💗', '💓', '💝'];
  
  for (let i = 0; i < 10; i++) {
    const heart = document.createElement('div');
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.position = 'fixed';
    heart.style.left = '50%';
    heart.style.top = '50%';
    heart.style.fontSize = '30px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '999';
    
    const angle = (Math.PI * 2 * i) / 10;
    const velocity = 3;
    
    container.appendChild(heart);
    
    let posX = 0;
    let posY = 0;
    let opacity = 1;
    
    const animate = () => {
      posX += Math.cos(angle) * velocity;
      posY += Math.sin(angle) * velocity;
      opacity -= 0.02;
      
      heart.style.transform = `translate(${posX}px, ${posY}px)`;
      heart.style.opacity = opacity;
      
      if (opacity > 0) {
        requestAnimationFrame(animate);
      } else {
        heart.remove();
      }
    };
    
    animate();
  }
}

function createConfetti(count) {
  const container = document.body;
  
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = '-10px';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = getRandomColor();
      confetti.style.zIndex = '9999';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      
      container.appendChild(confetti);
      
      let posY = -10;
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
    }, i * 20);
  }
}

function getRandomColor() {
  const colors = ['#ff6b9d', '#ff4757', '#a29bfe', '#6c5ce7', '#feca57', '#ff9ff3', '#667eea'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// ==================== MUSIC CONTROLS ====================
function toggleMusic() {
  const musicToggle = document.getElementById('musicToggle');
  const musicIcon = musicToggle.querySelector('.music-icon');
  const music = document.getElementById('backgroundMusic');
  
  if (musicPlaying) {
    music.pause();
    musicToggle.style.opacity = '0.6';
    musicIcon.textContent = '🔇';
    musicPlaying = false;
  } else {
    music.play().catch((error) => {
      console.log('Music autoplay blocked by browser:', error);
      alert('Please click the music button again to enable sound! 🎵\n\nBrowsers block autoplay, but clicking will enable music.');
    });
    musicToggle.style.opacity = '1';
    musicIcon.textContent = '🎵';
    musicPlaying = true;
  }
}

function playHappyMusic() {
  const music = document.getElementById('backgroundMusic');
  const musicToggle = document.getElementById('musicToggle');
  const musicIcon = musicToggle.querySelector('.music-icon');
  
  // Only start music if not already playing
  if (music.paused) {
    music.play().catch((error) => {
      console.log('Music autoplay blocked by browser:', error);
    });
  }
  
  musicToggle.style.opacity = '1';
  musicIcon.textContent = '🎵';
  musicPlaying = true;
}

function playSadMusic() {
  const music = document.getElementById('backgroundMusic');
  const musicToggle = document.getElementById('musicToggle');
  const musicIcon = musicToggle.querySelector('.music-icon');
  
  // Same music plays regardless - keep it playing
  if (music.paused) {
    music.play().catch((error) => {
      console.log('Music autoplay blocked by browser:', error);
    });
  }
  
  musicToggle.style.opacity = '1';
  musicIcon.textContent = '🎵';
  musicPlaying = true;
}

// ==================== MINI-GAMES ====================
let gameScore = 0;

function startHeartCatch() {
  const gameContent = document.getElementById('gameContent');
  gameContent.innerHTML = `
    <h2 style="color: var(--love-pink); margin-bottom: 20px;">💓 Catch the Hearts! 💓</h2>
    <div id="gameArea" style="width: 100%; height: 300px; background: linear-gradient(135deg, rgba(255,107,157,0.2), rgba(162,155,254,0.2)); border-radius: 10px; position: relative; overflow: hidden; margin-bottom: 20px;">
      <div id="catcher" style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); font-size: 40px; cursor: grab; z-index: 10;">🎯</div>
    </div>
    <div style="font-size: 20px; color: var(--love-pink); font-weight: bold;">Score: <span id="gameScore">0</span>/20 | Level: <span id="gameLevel">1</span></div>
    <p style="color: #666; margin-top: 10px; font-size: 12px;">Move mouse left/right. Catch 20 hearts to win!</p>
  `;
  document.getElementById('gameModal').style.display = 'flex';
  
  gameScore = 0;
  playHeartCatchGame();
}

function playHeartCatchGame() {
  const gameArea = document.getElementById('gameArea');
  const catcher = document.getElementById('catcher');
  let catcherX = gameArea.offsetWidth / 2 - 20;
  let currentLevel = 1;
  let spawnSpeed = 600;
  let heartSpeed = 3;
  let heartsSpawned = 0;
  let spawnInterval;
  let gameActive = true;
  
  // Mouse control (better responsive)
  gameArea.addEventListener('mousemove', (e) => {
    if (!gameActive) return;
    const rect = gameArea.getBoundingClientRect();
    catcherX = Math.max(0, Math.min(e.clientX - rect.left - 20, gameArea.offsetWidth - 40));
    catcher.style.left = catcherX + 'px';
  });
  
  const spawnHeart = () => {
    if (!document.getElementById('gameModal') || document.getElementById('gameModal').style.display === 'none' || !gameActive) {
      clearInterval(spawnInterval);
      return;
    }
    
    const heart = document.createElement('div');
    const hearts = ['💕', '💖', '💗', '💓'];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.position = 'absolute';
    heart.style.top = '-40px';
    heart.style.left = Math.random() * (gameArea.offsetWidth - 30) + 'px';
    heart.style.fontSize = '30px';
    heart.style.userSelect = 'none';
    heart.style.transition = 'none';
    
    gameArea.appendChild(heart);
    heartsSpawned++;
    
    let top = -40;
    const interval = setInterval(() => {
      top += heartSpeed;
      heart.style.top = top + 'px';
      
      // Check collision
      const heartRect = heart.getBoundingClientRect();
      const catcherRect = catcher.getBoundingClientRect();
      
      if (heartRect.bottom >= catcherRect.top && 
          heartRect.left <= catcherRect.right && 
          heartRect.right >= catcherRect.left) {
        gameScore++;
        document.getElementById('gameScore').textContent = gameScore;
        
        // Check if reached 20 hearts
        if (gameScore >= 20) {
          gameActive = false;
          clearInterval(spawnInterval);
          clearInterval(interval);
          heart.remove();
          setTimeout(() => {
            alert('🎉 Caught 20 hearts! Great job!');
            closeGame();
          }, 300);
          return;
        }
        
        // Level up every 5 hearts
        if (gameScore % 5 === 0) {
          currentLevel++;
          spawnSpeed = Math.max(300, spawnSpeed - 50);
          heartSpeed += 0.5;
          document.getElementById('gameLevel').textContent = currentLevel;
          clearInterval(spawnInterval);
          spawnInterval = setInterval(spawnHeart, spawnSpeed);
        }
        
        heart.remove();
        clearInterval(interval);
      } else if (top > gameArea.offsetHeight) {
        heart.remove();
        clearInterval(interval);
      }
    }, 20);
  };
  
  spawnInterval = setInterval(spawnHeart, spawnSpeed);
}

function startLoveQuiz() {
  const gameContent = document.getElementById('gameContent');
  gameContent.innerHTML = `
    <h2 style="color: var(--love-pink); margin-bottom: 20px;">⚡ Love Speed Typing ⚡</h2>
    <p style="font-size: 14px; color: #999; margin-bottom: 20px;">Type the word as fast as you can!</p>
    <div id="wordDisplay" style="font-size: 48px; color: var(--love-pink); font-weight: bold; margin: 30px 0; letter-spacing: 3px; font-family: monospace;">LOVE</div>
    <input type="text" id="wordInput" placeholder="Type here..." style="width: 100%; padding: 12px; font-size: 16px; border: 2px solid var(--love-pink); border-radius: 10px; margin-bottom: 20px;">
    <div style="font-size: 18px; color: var(--love-pink); font-weight: bold;">Score: <span id="typeScore">0</span>/10</div>
    <p style="color: #666; margin-top: 10px; font-size: 12px;">Type 10 words correctly to win!</p>
  `;
  document.getElementById('gameModal').style.display = 'flex';
  
  const words = ['LOVE', 'HEART', 'KISS', 'CUPID', 'ROSES', 'ROMANCE', 'FOREVER', 'SWEETHEART', 'BELOVED', 'ADORE', 'AFFECTION', 'TENDER', 'DEVOTED', 'CHERISH', 'ADMIRE'];
  let wordIndex = 0;
  let typingScore = 0;
  
  const updateWord = () => {
    wordIndex = Math.floor(Math.random() * words.length);
    document.getElementById('wordDisplay').textContent = words[wordIndex];
    document.getElementById('wordInput').value = '';
    document.getElementById('wordInput').focus();
  };
  
  document.getElementById('wordInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const typed = e.target.value.toUpperCase();
      if (typed === words[wordIndex]) {
        typingScore++;
        document.getElementById('typeScore').textContent = typingScore;
        
        if (typingScore >= 10) {
          alert('🎉 Amazing typing speed! You completed it!');
          closeGame();
        } else {
          updateWord();
        }
      } else {
        e.target.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
        setTimeout(() => e.target.style.backgroundColor = '', 200);
      }
    }
  });
  
  updateWord();
}

function startHeartBreaker() {
  const gameContent = document.getElementById('gameContent');
  gameContent.innerHTML = `
    <h2 style="color: var(--love-pink); margin-bottom: 20px;">🎮 Memory Hearts 🎮</h2>
    <p style="color: #666; margin-bottom: 20px; font-size: 14px;">Match all pairs! Click cards to flip them.</p>
    <div id="memoryGrid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 20px; width: 100%; max-width: 400px; margin-left: auto; margin-right: auto;"></div>
    <div style="font-size: 18px; color: var(--love-pink); font-weight: bold;">Moves: <span id="moveCount">0</span> | Matched: <span id="matchCount">0</span>/8</div>
  `;
  document.getElementById('gameModal').style.display = 'flex';
  
  const emojis = ['💕', '💖', '💗', '💓', '💕', '💖', '💗', '💓'];
  let shuffled = [...emojis].sort(() => Math.random() - 0.5);
  let flipped = [];
  let matched = [];
  let moves = 0;
  
  const grid = document.getElementById('memoryGrid');
  const cards = [];
  
  shuffled.forEach((emoji, i) => {
    const card = document.createElement('button');
    card.dataset.emoji = emoji;
    card.dataset.index = i;
    card.style.padding = '20px';
    card.style.fontSize = '30px';
    card.style.border = '2px solid var(--love-pink)';
    card.style.borderRadius = '10px';
    card.style.background = 'linear-gradient(135deg, #ff6b9d, #ff9ff3)';
    card.style.cursor = 'pointer';
    card.style.transition = 'all 0.3s';
    card.textContent = '❓';
    
    card.addEventListener('click', () => {
      if (flipped.includes(i) || matched.includes(i) || flipped.length >= 2) return;
      
      flipped.push(i);
      card.textContent = emoji;
      card.style.background = 'rgba(255, 107, 157, 0.1)';
      
      if (flipped.length === 2) {
        moves++;
        document.getElementById('moveCount').textContent = moves;
        
        const [first, second] = flipped;
        if (shuffled[first] === shuffled[second]) {
          matched.push(first, second);
          document.getElementById('matchCount').textContent = matched.length / 2;
          flipped = [];
          
          if (matched.length === 8) {
            setTimeout(() => {
              alert(`🎉 Memory Master! Completed in ${moves} moves!`);
              closeGame();
            }, 500);
          }
        } else {
          setTimeout(() => {
            cards[first].textContent = '❓';
            cards[second].textContent = '❓';
            cards[first].style.background = 'linear-gradient(135deg, #ff6b9d, #ff9ff3)';
            cards[second].style.background = 'linear-gradient(135deg, #ff6b9d, #ff9ff3)';
            flipped = [];
          }, 800);
        }
      }
    });
    
    cards.push(card);
    grid.appendChild(card);
  });
}

function closeGame() {
  document.getElementById('gameModal').style.display = 'none';
  document.getElementById('gameContent').innerHTML = '';
}

// ==================== UTILITY FUNCTIONS ====================
// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    // Only trigger if no modal is open or if in a modal with Yes button
    const modalsOpen = document.querySelector('.modal[style*="display: flex"]');
    if (!modalsOpen || document.getElementById('pleaseModal').style.display === 'flex') {
      handleYes();
    }
  } else if (e.key === 'Escape') {
    // Close game if open
    if (document.getElementById('gameModal').style.display === 'flex') {
      closeGame();
    } else {
      // Close other modals
      document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
      });
    }
  }
});

// Add touch support for mobile
document.addEventListener('touchstart', function() {}, {passive: true});

// Music continues playing even when tab is hidden - no pause/resume needed

console.log('💕 Valentine\'s Day Special - Made with Love 💕');
  
