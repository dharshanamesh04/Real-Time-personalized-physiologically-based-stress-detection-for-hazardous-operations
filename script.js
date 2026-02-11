const canvas = document.getElementById("bg");
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 70;

const geo = new THREE.PlaneGeometry(140, 140, 80, 80);
const mat = new THREE.MeshBasicMaterial({ color: 0x970747, wireframe: true });
const wave = new THREE.Mesh(geo, mat);
scene.add(wave);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  wave.rotation.x = 1.2;
  let time = Date.now() * 0.002;

  for (let i = 0; i < wave.geometry.attributes.position.count; i++) {
    let x = wave.geometry.attributes.position.getX(i);
    let y = wave.geometry.attributes.position.getY(i);
    wave.geometry.attributes.position.setZ(
      i,
      Math.sin(x * 0.25 + time) * Math.cos(y * 0.25 + time) * 5
    );
  }

  wave.geometry.attributes.position.needsUpdate = true;
  renderer.render(scene, camera);
}
animate();

// Navbar darken on scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");
  nav.style.background =
    window.scrollY > 50 ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.5)";
});

// Responsive canvas
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
