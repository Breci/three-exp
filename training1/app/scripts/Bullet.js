/**
 * Created by bculas on 06/02/2017.
 */
"use strict"

class Bullet{
  constructor(x ,y,damage = 10,speed = 0.5){
    this.geometry = new THREE.CubeGeometry(1,1,1);
    this.material = new THREE.MeshPhongMaterial({map: texture,color: 0xffff00, emissive :50, specular :50, shininess : 50});
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.damage = damage;
    this.speed = speed;

    this.cube.position.x = x;
    this.cube.position.y = y;
  }

  move(){
    this.cube.position.x += this.speed;
  }

  destroy(){

  }
}
