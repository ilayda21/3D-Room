import * as THREE from "three";
import GSAP from "gsap";

export default class Floor {
  constructor(scene) {
    this.scene = scene;

    this.setFloor();
  }

  setFloor() {
    this.geometry = new THREE.PlaneGeometry(100, 100);
    this.material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.BackSide,
    });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
    this.plane.rotation.x = Math.PI / 2;
    this.plane.position.y = -0.5;
    this.plane.receiveShadow = true;
  }

  update() {}
}
