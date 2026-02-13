// Three.js 3D Hearts Animation - BRIGHT BLUE THEME

let scene,
  camera,
  renderer,
  hearts = [];
let animationFrameId;

function initThreeJS() {
  // Create scene
  scene = new THREE.Scene();

  // Create camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 50;

  // Create renderer
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0); // Transparent background

  // Insert canvas as background
  const canvas = renderer.domElement;
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "0";
  canvas.style.pointerEvents = "none";
  document.body.insertBefore(canvas, document.body.firstChild);

  // Create heart shape
  const heartShape = createHeartShape();

  // BRIGHT BLUE COLOR PALETTE
  const heartColors = [
    0x2196f3, // Blue
    0x00bcd4, // Cyan
    0x42a5f5, // Light Blue
    0x1e88e5, // Blue Romantic
    0x64b5f6, // Lighter Blue
    0x03a9f4, // Bright Blue
  ];

  // Create multiple 3D hearts
  for (let i = 0; i < 30; i++) {
    const geometry = new THREE.ShapeGeometry(heartShape);
    const material = new THREE.MeshBasicMaterial({
      color: heartColors[Math.floor(Math.random() * heartColors.length)],
      transparent: true,
      opacity: 0.75, // Increased opacity for brighter effect
      side: THREE.DoubleSide,
    });

    const heart = new THREE.Mesh(geometry, material);

    // Random position
    heart.position.x = (Math.random() - 0.5) * 100;
    heart.position.y = (Math.random() - 0.5) * 100;
    heart.position.z = (Math.random() - 0.5) * 100;

    // Random rotation
    heart.rotation.x = Math.random() * Math.PI;
    heart.rotation.y = Math.random() * Math.PI;
    heart.rotation.z = Math.random() * Math.PI;

    // Random scale
    const scale = Math.random() * 0.3 + 0.2;
    heart.scale.set(scale, scale, scale);

    // Store animation properties
    heart.userData = {
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      },
      floatSpeed: Math.random() * 0.02 + 0.01,
      floatOffset: Math.random() * Math.PI * 2,
    };

    scene.add(heart);
    hearts.push(heart);
  }

  // Add brighter ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  // Add bright blue point light
  const pointLight = new THREE.PointLight(0x2196f3, 1.5, 100);
  pointLight.position.set(0, 0, 50);
  scene.add(pointLight);

  // Add cyan point light for extra brightness
  const pointLight2 = new THREE.PointLight(0x00bcd4, 1.2, 100);
  pointLight2.position.set(50, 50, 0);
  scene.add(pointLight2);

  // Start animation
  animate();

  // Handle window resize
  window.addEventListener("resize", onWindowResize, false);
}

function createHeartShape() {
  const heartShape = new THREE.Shape();
  const x = 0,
    y = 0;

  heartShape.moveTo(x + 5, y + 5);
  heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
  heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
  heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
  heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
  heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
  heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

  return heartShape;
}

function animate() {
  animationFrameId = requestAnimationFrame(animate);

  // Animate each heart
  hearts.forEach((heart, index) => {
    // Rotate
    heart.rotation.x += heart.userData.rotationSpeed.x;
    heart.rotation.y += heart.userData.rotationSpeed.y;
    heart.rotation.z += heart.userData.rotationSpeed.z;

    // Float up and down
    const time = Date.now() * 0.001;
    heart.position.y += Math.sin(time + heart.userData.floatOffset) * 0.02;

    // Gentle drift
    heart.position.x +=
      Math.cos(time * 0.5 + heart.userData.floatOffset) * 0.01;
  });

  // Gentle camera rotation
  const time = Date.now() * 0.0001;
  camera.position.x = Math.sin(time) * 5;
  camera.position.y = Math.cos(time * 0.7) * 3;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function cleanupThreeJS() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  if (renderer) {
    renderer.dispose();
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
  }

  hearts.forEach((heart) => {
    if (heart.geometry) heart.geometry.dispose();
    if (heart.material) heart.material.dispose();
  });

  hearts = [];
  scene = null;
  camera = null;
  renderer = null;
}

// Initialize when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initThreeJS);
} else {
  initThreeJS();
}

// Cleanup on page unload
window.addEventListener("beforeunload", cleanupThreeJS);
