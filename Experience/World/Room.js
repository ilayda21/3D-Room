import * as THREE from "three";

export default class Room {
  constructor(scene, camera, resources, time) {
    this.scene = scene;
    this.camera = camera;

    this.resources = resources;
    this.room = this.resources.items.room;

    this.actualRoom = this.room.scene;

    this.time = time;

    this.setModel();
    this.setAnimation();
  }

  setModel() {
    this.actualRoom.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child instanceof THREE.Group) {
        child.children.forEach((groupChild) => {
          groupChild.castShadow = true;
          groupChild.receiveShadow = true;
        });
      }

      if (child.name === "Aqua_Glass") {
        child.material = new THREE.MeshPhysicalMaterial();
        child.material.roughness = 0;
        child.material.color.set(0x549dd2);
        child.material.ior = 3;
        child.material.transmission = 1;
        child.material.opacity = 1;
      }
    });
    this.scene.add(this.actualRoom);
    this.actualRoom.scale.set(0.11, 0.11, 0.11);
  }

  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.actualRoom);

    const fishAnimation = this.room.animations.filter(
      (anim) => anim.name === "FishAction"
    )[0];

    this.swimAnimation = this.mixer.clipAction(fishAnimation);
    this.swimAnimation.play();
  }

  update() {
    this.mixer.update(this.time.delta * 0.001);
  }
}
