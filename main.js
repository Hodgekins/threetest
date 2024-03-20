import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();
let house;
let pivot; // Reference to your pivot object

loader.load('victorian_house.glb', function (gltf) {
  pivot = new THREE.Object3D();
  const house = gltf.scene;

  // Adjust the model’s position relative to the new pivot
  // This example assumes you want the pivot point located at some offset
  house.position.set(-0.2,0,0); // Adjust these values based on your needs

  pivot.add(house); // Add house to pivot instead of directly to the scene
  scene.add(pivot); // Add pivot to scene
});

const controls = new OrbitControls(camera, renderer.domElement);

const light = new THREE.AmbientLight(0xFFFFFF, 10);
scene.add(light);

camera.position.set(0, 15, 25);
controls.update();

function animate() {
  requestAnimationFrame(animate);

  if (pivot) {
    // Rotates around the new pivot point
    pivot.rotation.y += 0.001;
  }

  renderer.render(scene, camera);
}
animate();
