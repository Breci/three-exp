var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var x =0;
var y = 0;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var texture = new THREE.TextureLoader().load( "textures/texture.jpg" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 1, 1 );

var geometry = new THREE.SphereGeometry(1,100,100);
var material = new THREE.MeshPhongMaterial({map: texture,color: 0x00ff00, emissive :50, specular :50, shininess : 50});

var directionalLight = new THREE.DirectionalLight(0xffffff,0.5);
var aLight = new THREE.AmbientLight(0xffffff,0.5);

var cube = new THREE.Mesh(geometry, material);

directionalLight.target = cube;

cube.map = texture;

scene.add(cube);
scene.add(directionalLight);
scene.add(aLight);

camera.position.z = 5;
camera.target = cube;

var render = function () {
  requestAnimationFrame(render);

  //cube.rotation.x += 0.1;
  //cube.rotation.y += 0.1;
  cube.position.x = (cube.position.x+0.1)%10;
  cube.rotation.x += x;
  cube.rotation.y += y;

  renderer.render(scene, camera);
};

document.addEventListener('keydown',onDocumentKeyDown,false);
function onDocumentKeyDown(event){
  event = event || window.event;
  var keycode = event.keyCode;
  switch(keycode){
    case 37 : //left arrow 向左箭头
      y = -0.1;
      break;
    case 38 : // up arrow 向上箭头
      x = -0.1;
      break;
    case 39 : // right arrow 向右箭头
      y = 0.1;
      break;
    case 40 : //down arrow向下箭头
      x = 0.1;
      break;
  }
  document.addEventListener('keyup',onDocumentKeyUp);
}
function onDocumentKeyUp(event){
  //document.removeEventListener('keydown',onDocumentKeyDown);
  x = 0;
  y =0;
}

render();
