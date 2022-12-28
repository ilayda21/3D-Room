import * as THREE from "three";
import Environment from "./Environment";
import Room from "./Room";

export default class World {
  constructor(scene, camera, resources, time) {
    this.scene = scene;
    this.camera = camera;

    this.resources = resources;
    this.time = time;
    this.resources.on("ready", () => {
      this.environment = new Environment(
        this.scene,
        this.camera,
        this.resources
      );
      this.room = new Room(this.scene, this.camera, this.resources, this.time);
    });
  }

  update() {
    if (this.room) {
      this.room.update();
    }
  }
}
