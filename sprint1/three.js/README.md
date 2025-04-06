## Relatório técnico: Primeiros testes com o Three.js.

### Introdução.

Este relatório comenta sobre um estudo introdutório sobre o Three.js. O Three.js é uma biblioteca e API Javascript que cria animações em 3D usando WebGL. Neste estudo executaremos um código para criar um site num server local com um cubo tridimensional se movendo, para fins de nos familiarizar com a ferramenta.

### Execução do código.

Primeiramente temos que inicializar com projeto Node digitando no Terminal:

```
npm init -y
```

Em seguida instalaremos via Terminal também o Three.js e o Vite.js que é um servidor de desenvolvimento local.

```
npm install --save three
```

```
npm install --save-dev vite
```

Se todos os comandos foram executados corretamente será criado um arquivo `package.json`. Neste arquivo dentro de `scripts` adicione:

```JavaScript
"scripts": {
    "dev": "vite"
}
```

Após isso criaremos um arquivo `index.html` com o seguinte código:

``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>My first three.js app</title>
    <style>
      body { margin: 0; }
    </style>
  </head>
  <body>
    <script type="module" src="/main.js"></script>
  </body>
</html>
```

Adicionaremos um arquivo chamado `main.js` contendo o código:

``` JavaScript
import * as THREE from 'three';
```

E finalmente criaremos uma pasta `/public` para armazenar dados de textura, áudio e modelos 3D.

### Criando o Cubo em terceira dimensão.

No próximo trecho de código será criada a cena, a câmera e o renderizador:

```JavaScript
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
```

Depois será criado o cubo em si:

```JavaScript
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;
```

Para renderizar a cena, adicionaremos:

```JavaScript
function animate() {
  renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );
```

O código seguinte irá adicionar animações ao cubo, e será escrito dentro da função `animate` criada acima, em cima do `renderer.render`.

```JavaScript
cube.rotation.x += 0.01;
cube.rotation.y += 0.01;
```

O código final no arquivo `main.js` devera ser organizado assim:

```JavaScript
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );

}
```

Por final para executar o código no server local faremos:

```
npx vite
```

Aparecerá uma URL como `http://localhost:5173`, clique nela para observar o cubo em ação.

### Conclusão

Apesar das dificuldades relacionadas à falta de conhecimento em JavaScript da equipe, a ferramenta se mostrou relativamente intuitiva para uso, mesmo se tratando de pessoas com pouca experiência em Desenvolvimento Web. Os próximos desafios serão integrar o código feito pelo Three.js com as ferramentas Blender e Meshroom.

### Fontes e Referências

- [Documentação do Three.js](https://threejs.org/docs/)
- [Documentação do Vite](https://vite.dev/guide/)
- [Documentação do npm Docs](https://docs.npmjs.com/about-npm)