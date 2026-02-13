// Three.js Heart Tunnel Animation

let scene, camera, renderer;
let heartTunnel = [];
let animationFrameId;

function initHeartTunnel() {
  scene = new THREE.Scene();
  
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 0;
  
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  
  const canvas = renderer.domElement;
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '0';
  canvas.style.pointerEvents = 'none';
  document.body.insertBefore(canvas, document.body.firstChild);
  
  // Create heart shape
  const heartShape = createHeartShape();
  
  // Create tunnel of hearts
  const colors = [0xFF4081, 0xE040FB, 0xFF6B9D, 0xD81B60, 0xFFD700];
  const tunnelLength = 50;
  const heartsPerRing = 8;
  
  for (let i = 0; i < tunnelLength; i++) {
    for (let j = 0; j < heartsPerRing; j++) {
      const angle = (j / heartsPerRing) * Math.PI * 2;
      const radius = 30;
      
      // Create extruded 3D heart
      const extrudeSettings = {
        depth: 2,
        bevelEnabled: true,
        bevelThickness: 0.5,
        bevelSize: 0.3,
        bevelSegments: 3
      };
      
      const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
      const material = new THREE.MeshPhongMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 0.7,
        emissive: colors[Math.floor(Math.random() * colors.length)],
        emissiveIntensity: 0.3,
        shininess: 100
      });
      
      const heart = new THREE.Mesh(geometry, material);
      
      // Position in tunnel
      heart.position.x = Math.cos(angle) * radius;
      heart.position.y = Math.sin(angle) * radius;
      heart.position.z = -i * 15;
      
      // Rotate to face camera
      heart.rotation.y = -angle;
      
      // Store original z position for looping
      heart.userData.originalZ = heart.position.z;
      heart.userData.speed = 0.5 + Math.random() * 0.5;
      
      scene.add(heart);
      heartTunnel.push(heart);
    }
  }
  
  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);
  
  const pointLight1 = new THREE.PointLight(0xFF4081, 2, 100);
  pointLight1.position.set(0, 0, 20);
  scene.add(pointLight1);
  
  const pointLight2 = new THREE.PointLight(0xE040FB, 2, 100);
  pointLight2.position.set(0, 0, -50);
  scene.add(pointLight2);
  
  animateTunnel();
  
  window.addEventListener('resize', onTunnelResize, false);
}

function createHeartShape() {
  const heartShape = new THREE.Shape();
  const x = 0, y = 0;
  
  heartShape.moveTo(x + 2.5, y + 2.5);
  heartShape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
  heartShape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
  heartShape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
  heartShape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 5.5, x + 8, y + 3.5);
  heartShape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
  heartShape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);
  
  return heartShape;
}

function animateTunnel() {
  animationFrameId = requestAnimationFrame(animateTunnel);
  
  const time = Date.now() * 0.001;
  
  // Move hearts toward camera
  heartTunnel.forEach((heart, index) => {
    heart.position.z += heart.userData.speed;
    
    // Loop hearts back to the end of tunnel
    if (heart.position.z > 20) {
      heart.position.z = -150;
    }
    
    // Gentle rotation
    heart.rotation.z = Math.sin(time + index * 0.1) * 0.2;
    
    // Pulse effect
    const scale = 1 + Math.sin(time * 2 + index * 0.2) * 0.1;
    heart.scale.set(scale, scale, scale);
  });
  
  // Gentle camera movement
  camera.position.x = Math.sin(time * 0.5) * 3;
  camera.position.y = Math.cos(time * 0.3) * 2;
  camera.lookAt(0, 0, -100);
  
  renderer.render(scene, camera);
}

function onTunnelResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeartTunnel);
} else {
  initHeartTunnel();
}