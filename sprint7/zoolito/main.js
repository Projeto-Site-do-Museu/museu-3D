import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0); // fundo claro

const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// ====== LUZES ======

// Luz direcional da direita
const lightRight = new THREE.DirectionalLight(0xffffff, 0);
lightRight.position.set(5, 2, 2);
scene.add(lightRight);

// Luz direcional da esquerda
const lightLeft = new THREE.DirectionalLight(0xffffff, 0);
lightLeft.position.set(-5, 2, -2);
scene.add(lightLeft);

// Luz ambiente
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

// HemisphereLight para dar um ar mais de “estúdio”
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

// (Opcional: helpers para visualizar as luzes)
// import { DirectionalLightHelper, HemisphereLightHelper } from 'three';
// scene.add(new THREE.DirectionalLightHelper(lightRight, 0.5));
// scene.add(new THREE.DirectionalLightHelper(lightLeft, 0.5));
// scene.add(new THREE.HemisphereLightHelper(hemiLight, 1));

// ====== CONTROLES ======
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 0.6;
controls.maxDistance = 20;

// ====== MODELO GLB ======
const loader = new GLTFLoader();
let zoolitoModel = null;

loader.load(
  './zoolitoV2_LowPoly.glb',
  function (gltf) {
    zoolitoModel = gltf.scene;
    zoolitoModel.position.set(0, 0, 0);
    zoolitoModel.scale.set(0.5, 0.5, 0.5); // ajuste se necessário
    scene.add(zoolitoModel);
  },
  undefined,
  function (error) {
    console.error('Erro ao carregar o modelo:', error);
  }
);

camera.position.x = 0.5;
camera.position.y = 0.5;
camera.position.z = 0.5;

// ====== ANIMAÇÃO ======
function animate() {
  controls.update();
  if (zoolitoModel) {
    zoolitoModel.rotation.y += 0.01; // gira suavemente no eixo Y
  }
  renderer.render(scene, camera);
}
