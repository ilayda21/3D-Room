import * as THREE from "three";
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";

export default class Room {
  constructor(scene, camera, resources, time) {
    this.scene = scene;
    this.camera = camera;
    this.resources = resources;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;
    this.time = time;

    this.lerpX = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.lerpY = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.setModel();
    this.setAnimation();
    this.onMouseMove();
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

      if (child.name === "Aquarium") {
        for (let aquariumElement of child.children) {
          if (
            aquariumElement.material &&
            aquariumElement.material.name === "Water"
          ) {
            aquariumElement.material = new THREE.MeshPhysicalMaterial();
            aquariumElement.material.roughness = 0;
            aquariumElement.material.color.set(0x549dd2);
            aquariumElement.material.ior = 3;
            aquariumElement.material.transmission = 1;
            aquariumElement.material.opacity = 1;
            break;
          }
        }
      }
    });

    const width = 0.5;
    const height = 1;
    const intensity = 1;
    const rectLight = new THREE.RectAreaLight(
      0xffffff,
      intensity,
      width,
      height
    );
    rectLight.position.set(8.5, 8, -2);
    rectLight.rotation.x = -Math.PI / 2;
    rectLight.rotation.z = Math.PI / 4;
    this.actualRoom.add(rectLight);

    const rectLightHelper = new RectAreaLightHelper(rectLight);
    // rectLight.add(rectLightHelper);
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

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.rotationX =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerpX.target = this.rotationX * 0.1;

      this.rotationY =
        ((e.clientY - window.innerHeight / 2) * 2) / window.innerHeight;
      this.lerpY.target = this.rotationY * 0.1;
    });
  }

  update() {
    this.lerpX.current = GSAP.utils.interpolate(
      this.lerpX.current,
      this.lerpX.target,
      this.lerpX.ease
    );

    this.lerpY.current = GSAP.utils.interpolate(
      this.lerpY.current,
      this.lerpY.target,
      this.lerpY.ease
    );

    this.actualRoom.rotation.y = this.lerpX.current;
    this.actualRoom.rotation.x = this.lerpY.current;

    this.mixer.update(this.time.delta * 0.001);
  }
}
