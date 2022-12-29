import * as THREE from "three";
import GSAP from "gsap";
import GUI from "lil-gui";

export default class Environment {
  constructor(scene, camera, resources) {
    this.scene = scene;
    this.camera = camera;

    this.resources = resources;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;

    // this.gui = new GUI({ container: document.querySelector(".hero-main") });
    this.obj = {
      colorObj: { r: 0, g: 0, b: 0 },
      intensity: 3,
    };

    this.setSunlight();
    // this.setGUI();
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

    this.ambientLight = new THREE.AmbientLight("#ffffff", 1);
    this.scene.add(this.ambientLight);
  }

  setGUI() {
    this.gui.addColor(this.obj, "colorObj").onChange(() => {
      this.sunlight.color.copy(this.obj.colorObj);
      this.ambientLight.color.copy(this.obj.colorObj);
      console.log(this.obj);
    });

    this.gui.add(this.obj, "intensity", 0, 10).onChange(() => {
      this.sunlight.intensity = this.obj.intensity;
      this.ambientLight.intensity = this.obj.intensity;
    });
  }

  switchTheme(theme) {
    if (theme === "dark") {
      GSAP.to(this.sunlight.color, {
        r: 0.17254901960784313,
        g: 0.21568627450980393,
        b: 0.807843137254902,
      });

      GSAP.to(this.ambientLight.color, {
        r: 0.17254901960784313,
        g: 0.21568627450980393,
        b: 0.807843137254902,
      });

      GSAP.to(this.sunlight, {
        intensity: 0.78,
      });
      GSAP.to(this.ambientLight, {
        intensity: 0.78,
      });
    } else {
      GSAP.to(this.sunlight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });

      GSAP.to(this.ambientLight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });

      GSAP.to(this.sunlight, {
        intensity: 1,
      });
      GSAP.to(this.ambientLight, {
        intensity: 1,
      });
    }
  }
}
