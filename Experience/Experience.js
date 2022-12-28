import * as THREE from "three";
import Camera from "./Camera";
import Renderer from "./Renderer";
import assets from "./Utils/assets";
import Resources from "./Utils/Resources";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import World from "./World/World";

export default class Experience {
  static instance;

  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance;
    }

    Experience.instance = this;
    this.canvas = canvas;
    this.scene = new THREE.Scene();

    this.time = new Time();

    this.sizes = new Sizes();
    this.camera = new Camera(this.sizes, this.scene, this.canvas);
    this.renderer = new Renderer(
      this.sizes,
      this.scene,
      this.canvas,
      this.camera
    );

    this.resources = new Resources(this.renderer, assets);
    this.world = new World(this.scene, this.camera, this.resources, this.time);

    this.time.on("update", () => {
      this.update();
    });

    this.time.on("resize", () => {
      this.resize();
    });
  }

  update() {
    this.camera.update();
    this.renderer.update();
    this.world.update();
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
    this.world.resize();
  }
}
