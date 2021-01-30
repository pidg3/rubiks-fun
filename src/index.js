import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube1 = new THREE.Mesh(geometry, material1);
scene.add(cube1);
const material2 = new THREE.MeshBasicMaterial({ color: 0xff11ff });
const cube2 = new THREE.Mesh(geometry, material2);
scene.add(cube2);

cube2.position.y += 2;

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  cube1.rotation.x += 0.01;
  cube1.rotation.y += 0.01;
  cube2.rotation.y -= 0.01;
  cube2.rotation.z -= 0.01;

  renderer.render(scene, camera);
}
animate();
