let scene, camera, renderer, controls;

function init(containerId = null) {

  const parent = containerId
    ? document.getElementById(containerId)
    : document.body;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x222222);

  camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
  );
  camera.position.set(0, 1, 1.5);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.physicallyCorrectLights = true;
  renderer.setSize(window.innerWidth, window.innerHeight);
  parent.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const hemi = new THREE.HemisphereLight(0xffffff, 0x444444);
  hemi.position.set(0, 20, 0);
  scene.add(hemi);

  const mtlL = new THREE.MTLLoader();
  mtlL.setPath('modelos/');
  mtlL.load('texturedMesh.mtl', m => {
    m.preload();
    Object.values(m.materials).forEach(mat => {
      mat.roughness = 0.8;
      mat.metalness = 0.2;
      mat.opacity = 1.0;
      mat.transparent = true;
    });
    const objL = new THREE.OBJLoader();
    objL.setMaterials(m);
    objL.setPath('modelos/');
    objL.load('texturedMesh.obj', obj => {
      // centraliza e escala
      const box = new THREE.Box3().setFromObject(obj);
      const ctr = box.getCenter(new THREE.Vector3());
      obj.position.sub(ctr);
      const size = box.getSize(new THREE.Vector3());
      const mD = Math.max(size.x, size.y, size.z);
      if (mD > 2) obj.scale.setScalar(2 / mD);

      scene.add(obj);
    });
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, false);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

// expõe o “módulo” no global
window.Viewer3D = { init, animate };
