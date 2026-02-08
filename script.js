// Get DOM elements
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const questionState = document.getElementById("question-state");
const celebrationState = document.getElementById("celebration-state");
const heartsContainer = document.querySelector(".hearts-container");
const romanticMusic = document.getElementById("romantic-music");

// Track if "No" button has been moved
let noBtnMoved = false;
let noButtonHoverCount = 0;

// Create lots of hearts in background
function createHeartsBackground() {
  const heartCount = 50;

  for (let i = 0; i < heartCount; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.className = "heart-bg";
      heart.innerHTML = '<i class="fas fa-heart"></i>';

      // Random position
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.top = Math.random() * 100 + "vh";

      // Random size
      const size = Math.random() * 30 + 20;
      heart.style.fontSize = size + "px";

      // Random animation duration
      const duration = Math.random() * 20 + 15;
      heart.style.animationDuration = duration + "s";

      // Random color variation
      const colors = ["#FF4081", "#E040FB", "#FF6B9D", "#D81B60"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      heart.style.color = color;

      // Random opacity
      heart.style.opacity = Math.random() * 0.5 + 0.3;

      heartsContainer.appendChild(heart);
    }, i * 100);
  }
}

// Function to get random position for the "No" button
function getRandomPosition() {
  const container = document.querySelector(".content");
  const containerRect = container.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  // Calculate available space
  const maxX = containerRect.width - btnRect.width - 40;
  const maxY = containerRect.height - btnRect.height - 40;

  // Get random positions
  const randomX = Math.random() * maxX + 20;
  const randomY = Math.random() * maxY + 20;

  return { x: randomX, y: randomY };
}

// Function to move "No" button away from cursor
function moveNoButton() {
  if (!noBtnMoved) {
    // Make button absolutely positioned on first move
    noBtn.style.position = "absolute";
    noBtnMoved = true;
  }

  const newPos = getRandomPosition();
  noBtn.style.left = newPos.x + "px";
  noBtn.style.top = newPos.y + "px";

  // Add a little wiggle animation
  noBtn.style.transform = "scale(0.9) rotate(5deg)";
  setTimeout(() => {
    noBtn.style.transform = "scale(1) rotate(0deg)";
  }, 150);

  // Update hover count and change messages
  noButtonHoverCount++;
  updateNoButtonMessage();
}

// Update messages based on hover count
function updateNoButtonMessage() {
  const title = document.querySelector("#question-state .title");
  const quotes = [
    "Will You Be My Valentine? 💝",
    "Please say yes! 🥺",
    "Pretty please with a cherry on top? 🍒",
    "I'll make you the happiest person! 😊",
    "Think of all the fun we'll have! 🎉",
    "You're my everything! 💕",
    "I can't imagine Valentine's without you! 🌹",
    "My heart is waiting for your yes! 💓",
    "You're my dream come true! ✨",
    "Let's make beautiful memories together! 📸",
    "I'll cherish you forever! 💖",
    "You're the love of my life! 💘",
  ];

  if (noButtonHoverCount > 0 && noButtonHoverCount <= quotes.length) {
    title.innerHTML = `
            <span class="title-line">My Dearest Love,</span>
            <span class="title-line">${quotes[noButtonHoverCount - 1]}</span>
            <span class="title-line">💝 Forever and Always 💝</span>
        `;
  }

  // Change button text after many attempts
  if (noButtonHoverCount === 15) {
    noBtn.innerHTML = '<i class="fas fa-heart-broken"></i> Maybe?';
  }

  if (noButtonHoverCount === 25) {
    noBtn.innerHTML = '<i class="fas fa-heart-broken"></i> Think about it?';
  }
}

// Function to create romantic confetti
function createConfetti() {
  const colors = [
    "#FF4081",
    "#E040FB",
    "#FF6B9D",
    "#FFD700",
    "#FF1744",
    "#D81B60",
  ];
  const confettiCount = 100;

  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.top = "-10px";
      confetti.style.background =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = Math.random() * 15 + 10 + "px";
      confetti.style.height = Math.random() * 15 + 10 + "px";
      confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      confetti.style.animationDelay = Math.random() * 0.5 + "s";
      confetti.style.animationDuration = Math.random() * 2 + 2 + "s";

      document.body.appendChild(confetti);

      // Remove confetti after animation
      setTimeout(() => {
        confetti.remove();
      }, 3000);
    }, i * 20);
  }
}

// Function to create floating hearts celebration
function createFloatingHearts() {
  const heartCount = 30;

  for (let i = 0; i < heartCount; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.className = "heart-celebration";
      heart.innerHTML = '<i class="fas fa-heart"></i>';
      heart.style.position = "fixed";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.top = "100vh";
      heart.style.fontSize = Math.random() * 40 + 20 + "px";
      heart.style.color = ["#FF4081", "#E040FB", "#FF6B9D"][
        Math.floor(Math.random() * 3)
      ];
      heart.style.opacity = "0.9";
      heart.style.zIndex = "1000";
      heart.style.pointerEvents = "none";

      // Animation
      heart.style.animation = `heartCelebration ${Math.random() * 3 + 2}s ease-out forwards`;

      document.body.appendChild(heart);

      // Remove after animation
      setTimeout(() => {
        heart.remove();
      }, 3000);
    }, i * 100);
  }

  // Add CSS for animation
  if (!document.querySelector("#heartCelebrationStyle")) {
    const style = document.createElement("style");
    style.id = "heartCelebrationStyle";
    style.textContent = `
            @keyframes heartCelebration {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
    document.head.appendChild(style);
  }
}

// Function to handle "Yes" button click
function handleYesClick() {
  // Play romantic music (optional)
  if (romanticMusic) {
    romanticMusic.volume = 0.5;
    romanticMusic.play().catch((e) => console.log("Autoplay prevented:", e));
  }

  // Create celebration effects
  createConfetti();
  createFloatingHearts();

  // Add sparkle effect to the container
  const container = document.querySelector(".romantic-border");
  container.style.boxShadow =
    "0 20px 80px rgba(255, 64, 129, 0.5), " +
    "0 0 60px rgba(255, 215, 0, 0.4), " +
    "inset 0 0 40px rgba(255, 255, 255, 0.9)";

  // Switch states with delay
  setTimeout(() => {
    questionState.classList.remove("active");
    celebrationState.classList.add("active");

    // Add pulsing animation to celebration title
    const celebrationTitle = document.querySelector(".celebration-title");
    celebrationTitle.style.animation = "celebrate 1s ease-in-out infinite";
  }, 500);
}

// Function to handle "No" button click (after many attempts)
function handleNoClick() {
  if (noButtonHoverCount > 30) {
    questionState.classList.remove("active");

    // Create a "that's okay" state
    const content = document.querySelector(".content");
    content.innerHTML = `
            <div class="state active">
                <div class="title-wrapper">
                    <h1 class="title">
                        <span class="title-line">That's Okay, My Love</span>
                        <span class="title-line">You'll Always Have My Heart 💙</span>
                    </h1>
                </div>
                <div class="gif-container">
                    <img src="https://media.giphy.com/media/ZBQhoZC0nqknSviPqT/giphy.gif" 
                         alt="Understanding hug" 
                         class="gif">
                </div>
                <div class="romantic-message">
                    <p class="love-quote">"My love for you is unconditional and endless."</p>
                    <p class="promise">No matter what, I'll always care for you and cherish our connection. Hope we can still share beautiful moments together! 😊💕</p>
                </div>
                <div class="romantic-footer">
                    <p>You mean the world to me, always and forever.</p>
                </div>
            </div>
        `;
  }
}

// Event listeners for "No" button evasion
noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
});

// Event listener for "Yes" button
yesBtn.addEventListener("click", handleYesClick);

// Event listener for "No" button click
noBtn.addEventListener("click", handleNoClick);

// Add keyboard support for accessibility
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && questionState.classList.contains("active")) {
    handleYesClick();
  }

  // Spacebar can also trigger "Yes"
  if (e.key === " " && questionState.classList.contains("active")) {
    e.preventDefault();
    handleYesClick();
  }
});

// Initialize background hearts when page loads
window.addEventListener("DOMContentLoaded", () => {
  createHeartsBackground();

  // Add romantic message to console
  console.log(
    "%c💖 For the most amazing person in my life 💖",
    "color: #FF4081; font-size: 18px; font-weight: bold;",
  );
  console.log(
    "%cYou make every day brighter and more beautiful!",
    "color: #E040FB; font-size: 14px;",
  );
});

// Make hearts responsive on resize
window.addEventListener("resize", () => {
  // Hearts will reposition automatically with CSS
});

// Add a romantic touch to the tab title
let originalTitle = document.title;
let isBlinking = false;

function blinkTitle() {
  if (isBlinking) return;

  isBlinking = true;
  let blinkCount = 0;
  const maxBlinks = 10;

  const blinkInterval = setInterval(() => {
    document.title = blinkCount % 2 === 0 ? "💝 SAY YES! 💝" : originalTitle;
    blinkCount++;

    if (blinkCount > maxBlinks * 2) {
      clearInterval(blinkInterval);
      document.title = originalTitle;
      isBlinking = false;
    }
  }, 500);
}

// Blink title when user tries to leave
window.addEventListener("beforeunload", () => {
  if (questionState.classList.contains("active")) {
    return "Wait! Don't go without answering! 💕";
  }
});

// Blink title when user is inactive for a while
let inactivityTimer;
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    if (questionState.classList.contains("active") && !isBlinking) {
      blinkTitle();
    }
  }, 30000); // 30 seconds
}

// Reset timer on user activity
document.addEventListener("mousemove", resetInactivityTimer);
document.addEventListener("keypress", resetInactivityTimer);
resetInactivityTimer();
