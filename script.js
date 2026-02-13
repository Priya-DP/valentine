// Mobile Valentine's Page with Custom Image - No Button Hides Inside Container

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

const customImageConfig = {
  imagePath: "./images/kumaran.jpeg",
  fallbackImage:
    "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
};

// Check if mobile device
function checkIfMobile() {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );
}

// Initialize the page
function init() {
  isMobile = checkIfMobile();

  if (isMobile) {
    document.body.classList.add("mobile-device");
  }

  setupCustomImage();
  createHeartsBackground();
  setupEventListeners();

  console.log(
    "%c💖 Will You Be My Valentine? 💖",
    "color: #FF4081; font-size: 16px; font-weight: bold;"
  );
}

// Setup custom image with fallback
function setupCustomImage() {
  if (customImage) {
    customImage.src = customImageConfig.imagePath;

    customImage.onerror = function () {
      console.log("Custom image not found, using fallback");
      this.src = customImageConfig.fallbackImage;
      this.alt = "Our Special Moment Together";
    };

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

      heart.style.left = Math.random() * 100 + "vw";
      heart.style.top = Math.random() * 100 + "vh";

      const size = isMobile ? Math.random() * 15 + 12 : Math.random() * 20 + 15;
      heart.style.fontSize = size + "px";

      const duration = Math.random() * 20 + 15;
      heart.style.animationDuration = duration + "s";

      const colors = ["#FF4081", "#E040FB", "#FF6B9D", "#D81B60"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      heart.style.color = color;

      heart.style.opacity = Math.random() * 0.5 + 0.3;

      heartsContainer.appendChild(heart);
    }, i * 150);
  }
}

// Setup all event listeners
function setupEventListeners() {
  yesBtn.addEventListener("click", handleYesClick);

  if (isMobile) {
    yesBtn.addEventListener(
      "touchstart",
      function (e) {
        e.preventDefault();
        this.style.transform = "scale(0.95)";
      },
      { passive: false }
    );

    yesBtn.addEventListener(
      "touchend",
      function (e) {
        e.preventDefault();
        this.style.transform = "scale(1)";
        handleYesClick();
      },
      { passive: false }
    );
  }

  // ============================================
  // NO BUTTON - HIDES INSIDE CONTAINER WHEN CLICKED
  // ============================================
  noBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (!isYesClicked) {
      hideNoButtonInsideContainer();
      noButtonClickCount++;
      updateNoButtonMessage();

      // After 3 clicks, No button becomes Yes
      if (noButtonClickCount >= 3) {
        setTimeout(() => {
          this.innerHTML = '<i class="fas fa-heart"></i> OK, Yes! 💖';
          this.classList.remove("btn-no");
          this.classList.add("btn-yes");
          this.style.animation = "pulseYes 2s infinite";

          // Change handler to Yes
          this.removeEventListener("click", arguments.callee);
          this.addEventListener("click", handleYesClick);
        }, 300);
      }
    }
  });

  // Mobile touch support for No button
  if (isMobile) {
    noBtn.addEventListener(
      "touchstart",
      function (e) {
        e.preventDefault();
        if (!isYesClicked) {
          this.classList.add("mobile-move");
        }
      },
      { passive: false }
    );

    noBtn.addEventListener(
      "touchend",
      function (e) {
        e.preventDefault();
        this.classList.remove("mobile-move");
      },
      { passive: false }
    );
  }

  yesBtn.addEventListener("contextmenu", (e) => e.preventDefault());
  noBtn.addEventListener("contextmenu", (e) => e.preventDefault());

  document.addEventListener("visibilitychange", handleVisibilityChange);
  document.addEventListener("keydown", handleKeyDown);
}

// ============================================
// MAIN FUNCTION: HIDE NO BUTTON INSIDE CONTAINER
// ============================================
function hideNoButtonInsideContainer() {
  // Add the hidden-inside class to make it disappear inside the container
  noBtn.classList.add("hidden-inside");

  // After a short delay, bring it back but make it harder to find
  setTimeout(() => {
    if (!isYesClicked && noButtonClickCount < 3) {
      noBtn.classList.remove("hidden-inside");

      // Make it move to a random position within the container
      const container = document.querySelector(".romantic-border");
      const containerRect = container.getBoundingClientRect();
      const btnRect = noBtn.getBoundingClientRect();

      // Set position absolute for random placement
      noBtn.style.position = "absolute";
      noBtn.style.margin = "0";

      // Calculate safe boundaries
      const padding = 20;
      const maxX = containerRect.width - btnRect.width - padding;
      const maxY = containerRect.height - btnRect.height - padding;

      // Random position within container
      const randomX = Math.max(padding, Math.min(maxX, Math.random() * maxX));
      const randomY = Math.max(padding, Math.min(maxY, Math.random() * maxY));

      noBtn.style.left = randomX + "px";
      noBtn.style.top = randomY + "px";

      // Add a little shake animation
      noBtn.style.animation = "shake 0.5s ease-in-out";
      setTimeout(() => {
        noBtn.style.animation = "";
      }, 500);
    }
  }, 400);

  // On third click, transform the button
  if (noButtonClickCount >= 2) {
    noBtn.classList.remove("hidden-inside");
  }
}

// Update messages based on interaction
function updateNoButtonMessage() {
  const title = document.querySelector("#question-state .title");
  const quotes = [
    "Will You Be My Valentine? 💝",
    "Please say yes! 🥺",
    "Pretty please? 🍒",
    "You're my everything! 💕",
    "My heart is waiting! 💓",
    "You're my dream! ✨",
  ];

  const quoteIndex = Math.min(noButtonClickCount, quotes.length - 1);

  if (noButtonClickCount > 0 && quoteIndex >= 0) {
    title.innerHTML = `
      <span class="title-line">Dear Kumaran ❤️,</span>
      <span class="title-line">${quotes[quoteIndex]}</span>
      <span class="title-line">💝 Forever and Always 💝</span>
    `;
  }

  // Update No button text based on clicks
  if (noButtonClickCount === 1) {
    noBtn.innerHTML = '<i class="fas fa-heart-broken"></i> Are you sure?';
  }
  if (noButtonClickCount === 2) {
    noBtn.innerHTML = '<i class="fas fa-heart"></i> Last chance!';
  }
}

// Handle Yes button click
function handleYesClick() {
  if (isYesClicked) return;
  isYesClicked = true;

  if (romanticMusic) {
    romanticMusic.volume = 0.2;
    const playPromise = romanticMusic.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }

  createConfetti();

  yesBtn.style.transform = "scale(1.1)";
  yesBtn.style.boxShadow = "0 0 50px rgba(255, 64, 129, 0.8)";

  setTimeout(() => {
    questionState.classList.remove("active");
    celebrationState.classList.add("active");

    if (isMobile) {
      body.classList.add("mobile-scroll-lock");
    }

    const celebrationContainer = document.querySelector(
      ".celebration-container"
    );
    if (celebrationContainer) {
      celebrationContainer.scrollTop = 0;
    }

    const container = document.querySelector(".romantic-border");
    container.style.boxShadow =
      "0 20px 80px rgba(255, 64, 129, 0.5), " +
      "0 0 60px rgba(255, 215, 0, 0.4), " +
      "inset 0 0 40px rgba(255, 255, 255, 0.9)";

    createCelebrationHearts();

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

      setTimeout(() => {
        if (heart.parentNode) {
          heart.remove();
        }
      }, 3000);
    }, i * 150);
  }

  if (!document.querySelector("#floatUpAnimation")) {
    const style = document.createElement("style");
    style.id = "floatUpAnimation";
    style.textContent = `
      @keyframes floatUp {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
      }
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
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
    romanticMusic.play().catch(() => {});
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
    if (noBtn.classList.contains("hidden-inside")) {
      noBtn.classList.remove("hidden-inside");
    }
  }, 250);
});

// Add CSS for hidden-inside class dynamically if not in CSS
(function addDynamicStyles() {
  const style = document.createElement("style");
  style.textContent = `
    .btn-no.hidden-inside {
      opacity: 0 !important;
      pointer-events: none !important;
      transform: scale(0.5) !important;
      transition: all 0.3s ease !important;
    }
    .btn-no {
      transition: all 0.3s ease;
    }
  `;
  document.head.appendChild(style);
})();