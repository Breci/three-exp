var container, stats;
var camera, scene, renderer;
var geometry, group;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


var t ={
  start: ,
  target:
}

var elements = [];
var basePos = [];
var data = [];
var movement = [];

var timeLimit = 200;
var lastUpdate;
var lastRefresh;

document.addEventListener( 'mousemove', onDocumentMouseMove, false );
init();
animate();
function init() {
  lastUpdate = Date.now();
  lastRefresh = Date.now();
  loadSound();
  container = document.createElement( 'div' );
  document.body.appendChild( container );
  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 15000 );
  camera.position.z = 500;
  scene = new THREE.Scene();
  //scene.fog = new THREE.Fog( 0xffffff, 1, 10000 );
  var geometry = new THREE.BoxGeometry( 100, 100, 100 );
  var material = new THREE.MeshNormalMaterial();
  group = new THREE.Group();
  for ( var i = 0; i < 1024; i ++ ) {
    var mesh = new THREE.Mesh( geometry, material );
    mesh.position.x = Math.random() * 2000 - 1000;
    mesh.position.y = Math.random() * 2000 - 1000;
    mesh.position.z = Math.random() * 2000 - 1000;
    mesh.rotation.x = Math.random() * 2 * Math.PI;
    mesh.rotation.y = Math.random() * 2 * Math.PI;

    //mesh.position.multiplyScalar(3);

    //mesh.position.x =  mesh.position.x * 3;
    //mesh.position.y =  mesh.position.y * 3;
    //mesh.position.z =  mesh.position.z * 3  ;

    mesh.matrixAutoUpdate = true;
    //mesh.updateMatrix();

    elements.push(mesh);
    basePos.push(mesh.position.clone());

    group.add( mesh );
  }
  scene.add( group );
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( 0xffffff );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.sortObjects = false;
  container.appendChild( renderer.domElement );
  //stats = new Stats();
  //container.appendChild( stats.dom );
  //
  window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
function onDocumentMouseMove(event) {
  mouseX = ( event.clientX - windowHalfX ) * 10;
  mouseY = ( event.clientY - windowHalfY ) * 10;
}
//
function animate() {



  requestAnimationFrame( animate );
  frame();
  update();
  //render();
  //stats.update();
}
function render() {


  renderer.render( scene, camera );
}

window.onload = function(){

};

function average(table){
  var total = 0;
  for(var i = 0; i < table.length; i++) {
    total += table[i];
  }
  var avg = total / table.length;
}

function update(){
  var time = Date.now() * 0.001;
  var rx = Math.sin( time * 0.7 ) * 0.5,
    ry = Math.sin( time * 0.3 ) * 0.5,
    rz = Math.sin( time * 0.2 ) * 0.5;
  camera.position.x += ( mouseX - camera.position.x ) * .05;
  camera.position.y += ( - mouseY - camera.position.y ) * .05;
  camera.lookAt( scene.position );
  group.rotation.x = rx;
  group.rotation.y = ry;
  group.rotation.z = rz;

  var date = Date.now();

  if ((date-lastUpdate)>timeLimit){
    for ( var i = 0; i < frequencyData.length; i++ ) {
      var ave = average(data[i]);

      var _v = basePos[i].clone();
      var __v = basePos[i].clone();
      var _p = __v.add(_v.multiplyScalar(ave*0.01));

      movement[i] = {
        start: elements[i],
        target: _p
      }
    };

    lastUpdate = Date.now();
  }
  else{
    for ( var i = 0; i < frequencyData.length; i++ ) {
      if (!data[i]){
        data[i]= [];
      }
      data[i].push(frequencyData[i]);

      var delta = (Date.now()-lastRefresh)%timeLimit;

      var _v = target[i].position.clone();
      _v.multiplyScalar(delta/timeLimit);

      elements[i].position.add


    }
    lastRefresh = Date.now();

  }

  for ( var i = 0; i < frequencyData.length; i++ ) {


    //elements[i].position.copy(_p);
  }
}

