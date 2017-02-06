/**
 * Created by bculas on 06/02/2017.
 */
"use strict"

class Ennemy{
  constructor(){
    this.geometry = new THREE.CubeGeometry(1,1,1);
    this.material = new THREE.MeshPhongMaterial({map: texture,color: 0x00ff00, emissive :50, specular :50, shininess : 50});
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.damage = 10;
  }

  fire(){
    var bullet = new Bullet(this.cube.position.x, this.cube.position.y);

  }

  move(xFunction, yFunction){
    this.x = xFunction(x);
    this.y = yFunction(y);
  }

  destroy(){

  }

}
