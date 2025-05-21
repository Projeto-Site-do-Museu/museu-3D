// loader.js
const libs = [
    'libs/three/three.min.js',
    'libs/three/OrbitControls.js',
    'libs/three/MTLLoader.js',
    'libs/three/OBJLoader.js',
    'libs/three/GLTFLoader.js'
  ];
  
  function loadScripts(list, index = 0, cb) {
    if (index >= list.length) return cb();
    const s = document.createElement('script');
    s.src = list[index];
    s.onload = () => loadScripts(list, index + 1, cb);
    s.onerror = () => console.error('Falha ao carregar', list[index]);
    document.head.appendChild(s);
  }
  
  // executa o carregamento e só depois chama o main
  loadScripts(libs, 0, () => {
    const s = document.createElement('script');
    s.src = 'main.js';
    document.head.appendChild(s);
  });
  