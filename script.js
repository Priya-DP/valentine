// Mobile Valentine's Page with Custom Image

// Get DOM elements
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const questionState = document.getElementById("question-state");
const celebrationState = document.getElementById("celebration-state");
const heartsContainer = document.querySelector(".hearts-container");
const romanticMusic = document.getElementById("romantic-music");
const body = document.body;
const customImage = document.getElementById("custom-image");

// Track interaction state
let noButtonClickCount = 0;
let isMobile = false;
let isYesClicked = false;

// Your custom image configuration
const customImageConfig = {
  // Change this path to your custom image
  imagePath: "images/kumaran.jpeg", // Your image path here

  // Fallback image if custom image doesn't load
  fallbackImage:
    "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
};

// Check if mobile device
function checkIfMobile() {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    ) ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );
}

// Initialize the page
function init() {
  isMobile = checkIfMobile();

  // Add mobile class for CSS targeting
  if (isMobile) {
    document.body.classList.add("mobile-device");
  }

  // Setup custom image
  setupCustomImage();

  // Create background hearts
  createHeartsBackground();

  // Setup event listeners
  setupEventListeners();

  // Add console message
  console.log(
    "%c💖 Will You Be My Valentine? 💖",
    "color: #FF4081; font-size: 16px; font-weight: bold;",
  );
  console.log(
    "%cMade with love for someone special!",
    "color: #E040FB; font-size: 14px;",
  );
}

// Setup custom image with fallback
function setupCustomImage() {
  if (customImage) {
    // Set the custom image
    customImage.src = customImageConfig.imagePath;

    // Add error handling for image
    customImage.onerror = function () {
      console.log("Custom image not found, using fallback");
      this.src = customImageConfig.fallbackImage;
      this.alt = "Our Special Moment Together";
    };

    // Add load event
    customImage.onload = function () {
      console.log("Custom image loaded successfully");
      this.style.opacity = "1";
      this.style.transform = "scale(1)";
    };
  }
}

// Create floating hearts in background
function createHeartsBackground() {
  const heartCount = isMobile ? 25 : 40;

  for (let i = 0; i < heartCount; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.className = "heart-bg";
      heart.innerHTML = '<i class="fas fa-heart"></i>';

      // Random position
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.top = Math.random() * 100 + "vh";

      // Random size
      const size = isMobile ? Math.random() * 15 + 12 : Math.random() * 20 + 15;
      heart.style.fontSize = size + "px";

      // Random animation duration
      const duration = Math.random() * 20 + 15;
      heart.style.animationDuration = duration + "s";

      // Random color
      const colors = ["#FF4081", "#E040FB", "#FF6B9D", "#D81B60"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      heart.style.color = color;

      // Random opacity
      heart.style.opacity = Math.random() * 0.5 + 0.3;

      heartsContainer.appendChild(heart);
    }, i * 150);
  }
}

// Setup all event listeners
function setupEventListeners() {
  // Yes button - primary click handler
  yesBtn.addEventListener("click", handleYesClick);

  // Mobile touch support for Yes button
  if (isMobile) {
    yesBtn.addEventListener(
      "touchstart",
      function (e) {
        e.preventDefault();
        // Add touch feedback
        this.style.transform = "scale(0.95)";
      },
      { passive: false },
    );

    yesBtn.addEventListener(
      "touchend",
      function (e) {
        e.preventDefault();
        this.style.transform = "scale(1)";
        handleYesClick();
      },
      { passive: false },
    );
  }

  // No button handlers
  if (isMobile) {
    // Mobile: Touch to move
    noBtn.addEventListener(
      "touchstart",
      function (e) {
        e.preventDefault();
        if (!isYesClicked) {
          moveNoButton();
          noButtonClickCount++;
          updateNoButtonMessage();

          // Visual feedback
          this.classList.add("mobile-move");
          setTimeout(() => {
            this.classList.remove("mobile-move");
          }, 300);
        }
      },
      { passive: false },
    );

    noBtn.addEventListener(
      "touchend",
      function (e) {
        e.preventDefault();
        if (noButtonClickCount >= 8 && !isYesClicked) {
          // After many tries, No button becomes Yes
          this.innerHTML = '<i class="fas fa-heart"></i> OK, Yes!';
          this.classList.remove("btn-no");
          this.classList.add("btn-yes");
          this.style.animation = "pulseYes 2s infinite";
          this.removeEventListener("touchstart", arguments.callee);

          // Change handler to Yes
          this.addEventListener(
            "touchend",
            function (e) {
              e.preventDefault();
              handleYesClick();
            },
            { passive: false },
          );
        }
      },
      { passive: false },
    );
  } else {
    // Desktop: Hover to move
    noBtn.addEventListener("mouseenter", function () {
      if (!isYesClicked) {
        moveNoButton();
        noButtonClickCount++;
        updateNoButtonMessage();
      }
    });

    noBtn.addEventListener("click", function () {
      if (noButtonClickCount >= 8 && !isYesClicked) {
        // After many tries, No button becomes Yes
        this.innerHTML = '<i class="fas fa-heart"></i> OK, Yes!';
        this.classList.remove("btn-no");
        this.classList.add("btn-yes");
        this.style.animation = "pulseYes 2s infinite";
        this.removeEventListener("mouseenter", arguments.callee);

        // Change handler to Yes
        this.addEventListener("click", handleYesClick);
      }
    });
  }

  // Prevent context menu on buttons
  yesBtn.addEventListener("contextmenu", (e) => e.preventDefault());
  noBtn.addEventListener("contextmenu", (e) => e.preventDefault());

  // Handle page visibility changes
  document.addEventListener("visibilitychange", handleVisibilityChange);

  // Add keyboard support
  document.addEventListener("keydown", handleKeyDown);
}

// Move No button to random position
function moveNoButton() {
  if (isMobile) {
    // On mobile, we'll move it within the flex container by swapping order
    const currentOrder = parseInt(noBtn.style.order) || 2;
    noBtn.style.order = currentOrder === 2 ? 1 : 2;
  } else {
    // Desktop: Move to random absolute position
    if (!noBtn.classList.contains("desktop-move")) {
      noBtn.classList.add("desktop-move");
      noBtn.style.position = "absolute";
      noBtn.style.margin = "0";
    }

    const container = questionState;
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxX = containerRect.width - btnRect.width - 40;
    const maxY = containerRect.height - btnRect.height - 40;

    const safeMaxX = Math.max(40, maxX);
    const safeMaxY = Math.max(40, maxY);

    const randomX = Math.random() * safeMaxX + 20;
    const randomY = Math.random() * safeMaxY + 20;

    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
    noBtn.style.transform = "scale(0.9) rotate(5deg)";

    setTimeout(() => {
      noBtn.style.transform = "scale(1) rotate(0deg)";
    }, 200);
  }
}

// Update messages based on interaction
function updateNoButtonMessage() {
  const title = document.querySelector("#question-state .title");
  const quotes = [
    "Will You Be My Valentine? 💝",
    "Please say yes! 🥺",
    "Pretty please? 🍒",
    "I'll make you so happy! 😊",
    "Think of all the fun! 🎉",
    "You're my everything! 💕",
    "My heart is waiting! 💓",
    "You're my dream! ✨",
    "Let's make memories! 📸",
    "I'll cherish you forever! 💖",
    "You make my world complete! 🌎",
    "Say yes for endless cuddles! 🧸",
  ];

  const quoteIndex = Math.min(noButtonClickCount - 1, quotes.length - 1);

  if (noButtonClickCount > 0 && quoteIndex >= 0) {
    title.innerHTML = `
      <span class="title-line">Dear Kumaran ❤️,</span>
      <span class="title-line">${quotes[quoteIndex]}</span>
      <span class="title-line">💝 Forever and Always 💝</span>
    `;
  }

  // Update No button text
  if (noButtonClickCount === 4) {
    noBtn.innerHTML = '<i class="fas fa-heart-broken"></i> Maybe?';
  }
  if (noButtonClickCount === 6) {
    noBtn.innerHTML = '<i class="fas fa-heart"></i> Think about it?';
  }
}

// Handle Yes button click
function handleYesClick() {
  if (isYesClicked) return;
  isYesClicked = true;

  // Play romantic music if user has interacted
  if (romanticMusic) {
    romanticMusic.volume = 0.2;
    const playPromise = romanticMusic.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Auto-play was prevented, we'll handle it on user interaction
      });
    }
  }

  // Create celebration effects
  createConfetti();

  // Add visual feedback
  yesBtn.style.transform = "scale(1.1)";
  yesBtn.style.boxShadow = "0 0 50px rgba(255, 64, 129, 0.8)";

  // Switch to celebration state
  setTimeout(() => {
    questionState.classList.remove("active");
    celebrationState.classList.add("active");

    // Lock body scroll on mobile during celebration
    if (isMobile) {
      body.classList.add("mobile-scroll-lock");
    }

    // Scroll to top of celebration content
    const celebrationContainer = document.querySelector(
      ".celebration-container",
    );
    if (celebrationContainer) {
      celebrationContainer.scrollTop = 0;
    }

    // Add sparkle effect to container
    const container = document.querySelector(".romantic-border");
    container.style.boxShadow =
      "0 20px 80px rgba(255, 64, 129, 0.5), " +
      "0 0 60px rgba(255, 215, 0, 0.4), " +
      "inset 0 0 40px rgba(255, 255, 255, 0.9)";

    // Add floating celebration elements
    createCelebrationHearts();

    // Animate custom image entrance
    if (customImage) {
      customImage.style.animation = "imageFloat 3s ease-in-out infinite";
    }
  }, 500);
}

// Create confetti celebration
function createConfetti() {
  const colors = [
    "#FF4081",
    "#E040FB",
    "#FF6B9D",
    "#FFD700",
    "#FF1744",
    "#D81B60",
  ];
  const confettiCount = isMobile ? 60 : 100;

  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.top = "-20px";
      confetti.style.background =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = Math.random() * 12 + 8 + "px";
      confetti.style.height = Math.random() * 12 + 8 + "px";
      confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      confetti.style.animationDelay = Math.random() * 0.5 + "s";
      confetti.style.animationDuration = Math.random() * 2 + 2 + "s";

      document.body.appendChild(confetti);

      // Remove after animation
      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.remove();
        }
      }, 3000);
    }, i * 30);
  }
}

// Create floating hearts for celebration
function createCelebrationHearts() {
  const heartCount = 20;

  for (let i = 0; i < heartCount; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.style.position = "fixed";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.top = "100vh";
      heart.style.fontSize = Math.random() * 30 + 20 + "px";
      heart.innerHTML = "💖";
      heart.style.color = ["#FF4081", "#E040FB"][Math.floor(Math.random() * 2)];
      heart.style.opacity = "0.9";
      heart.style.zIndex = "1000";
      heart.style.pointerEvents = "none";
      heart.style.animation = `floatUp ${Math.random() * 3 + 2}s ease-out forwards`;

      document.body.appendChild(heart);

      // Remove after animation
      setTimeout(() => {
        if (heart.parentNode) {
          heart.remove();
        }
      }, 3000);
    }, i * 150);
  }

  // Add the animation keyframes if not already present
  if (!document.querySelector("#floatUpAnimation")) {
    const style = document.createElement("style");
    style.id = "floatUpAnimation";
    style.textContent = `
      @keyframes floatUp {
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

// Handle page visibility changes
function handleVisibilityChange() {
  if (document.hidden && romanticMusic) {
    romanticMusic.pause();
  } else if (!document.hidden && isYesClicked && romanticMusic) {
    romanticMusic.play().catch(() => {
      // Ignore auto-play errors
    });
  }
}

// Handle keyboard input
function handleKeyDown(e) {
  if (e.key === "Enter" || e.key === " ") {
    if (questionState.classList.contains("active") && !isYesClicked) {
      e.preventDefault();
      handleYesClick();
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", init);

// Handle page unload
window.addEventListener("beforeunload", function () {
  if (romanticMusic) {
    romanticMusic.pause();
    romanticMusic.currentTime = 0;
  }
});

// Handle window resize
let resizeTimeout;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function () {
    // Reset No button position on resize
    if (!isMobile && noBtn.classList.contains("desktop-move")) {
      moveNoButton();
    }
  }, 250);
});

// Add touch support for celebration scrolling
document.addEventListener(
  "touchstart",
  function (e) {
    // Allow touch scrolling in celebration container
    const celebrationContainer = document.querySelector(
      ".celebration-container",
    );
    if (celebrationContainer && celebrationContainer.contains(e.target)) {
      e.stopPropagation();
    }
  },
  { passive: true },
);

// Image loading helper
function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = reject;
    img.src = url;
  });
}
