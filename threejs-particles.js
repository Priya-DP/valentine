// Three.js Particle Hearts Explosion Animation

let scene, camera, renderer, particleSystem;
let animationFrameId;
let particles = [];

function initParticleHearts() {
  // Setup scene
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000,
  );
  camera.position.z = 300;

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  const canvas = renderer.domElement;
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "0";
  canvas.style.pointerEvents = "none";
  document.body.insertBefore(canvas, document.body.firstChild);

  // Create heart texture using canvas
  const heartTexture = createHeartTexture();

  // Create particle system
  const particleCount = 500;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  const colorPalette = [
    new THREE.Color(0xff4081),
    new THREE.Color(0xe040fb),
    new THREE.Color(0xff6b9d),
    new THREE.Color(0xd81b60),
    new THREE.Color(0xffd700),
  ];

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;

    // Position in a sphere
    const radius = 150;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);

    // Random color from palette
    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;

    // Random size
    sizes[i] = Math.random() * 20 + 10;

    // Store velocity for animation
    particles.push({
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5,
      ),
      acceleration: new THREE.Vector3(0, 0, 0),
    });
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    size: 15,
    map: heartTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });

  particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);

  // Animate
  animateParticles();

  window.addEventListener("resize", onParticleResize, false);
}

function createHeartTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  // Draw heart shape
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();

  const x = 32,
    y = 32;
  const size = 20;

  ctx.moveTo(x, y + size / 4);
  ctx.bezierCurveTo(x, y, x - size / 2, y - size / 2, x - size, y + size / 4);
  ctx.bezierCurveTo(x - size, y + size, x, y + size * 1.5, x, y + size * 1.5);
  ctx.bezierCurveTo(
    x,
    y + size * 1.5,
    x + size,
    y + size,
    x + size,
    y + size / 4,
  );
  ctx.bezierCurveTo(x + size / 2, y - size / 2, x, y, x, y + size / 4);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function animateParticles() {
  animationFrameId = requestAnimationFrame(animateParticles);

  const positions = particleSystem.geometry.attributes.position.array;
  const time = Date.now() * 0.001;

  for (let i = 0; i < particles.length; i++) {
    const i3 = i * 3;
    const particle = particles[i];

    // Create pulsing effect
    const pulseRadius = 150 + Math.sin(time + i * 0.1) * 30;

    // Calculate direction to pulse position
    const currentPos = new THREE.Vector3(
      positions[i3],
      positions[i3 + 1],
      positions[i3 + 2],
    );

    const targetRadius = currentPos.length();
    const direction = currentPos.clone().normalize();
    const targetPos = direction.multiplyScalar(pulseRadius);

    // Apply attraction to pulse radius
    particle.acceleration = targetPos.sub(currentPos).multiplyScalar(0.01);

    // Update velocity
    particle.velocity.add(particle.acceleration);
    particle.velocity.multiplyScalar(0.95); // Damping

    // Update position
    positions[i3] += particle.velocity.x;
    positions[i3 + 1] += particle.velocity.y;
    positions[i3 + 2] += particle.velocity.z;
  }

  particleSystem.geometry.attributes.position.needsUpdate = true;

  // Rotate particle system
  particleSystem.rotation.y += 0.002;
  particleSystem.rotation.x = Math.sin(time * 0.3) * 0.2;

  renderer.render(scene, camera);
}

function onParticleResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initParticleHearts);
} else {
  initParticleHearts();
}
