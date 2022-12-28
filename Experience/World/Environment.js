import * as THREE from "three";

export default class Environment {
  constructor(scene, camera, resources) {
    this.scene = scene;
    this.camera = camera;

    this.resources = resources;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;

    this.setSunlight();
  }

  setSunlight() {
    this.sunlight = new THREE.DirectionalLight("#FFFFFF", 1.5);
    this.sunlight.castShadow = true;
    this.sunlight.shadow.camera.far = 200;
    this.sunlight.shadow.mapSize.set(2048, 2048);
    this.sunlight.shadow.normalBias = 0.05;

    // const helper = new THREE.CameraHelper(this.sunlight.shadow.camera);
    // this.scene.add(helper);
    this.sunlight.position.set(-1.5, 7, 3);
    this.scene.add(this.sunlight);

    const light = new THREE.AmbientLight("#ffffff", 1);
    this.scene.add(light);
  }
}
