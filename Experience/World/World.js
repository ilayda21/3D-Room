import * as THREE from "three";
import Controls from "./Controls";
import Environment from "./Environment";
import Floor from "./Floor";
import Room from "./Room";

export default class World {
  constructor(scene, camera, resources, time, theme) {
    this.scene = scene;
    this.camera = camera;
    this.theme = theme;
    this.resources = resources;
    this.time = time;
    this.theme.on("switch", (theme) => {
      this.switchTheme(theme);
    });
    this.resources.on("ready", () => {
      this.environment = new Environment(
        this.scene,
        this.camera,
        this.resources
      );
      this.floor = new Floor(this.scene);
      this.room = new Room(this.scene, this.camera, this.resources, this.time);
      this.controls = new Controls(
        this.scene,
        this.camera,
        this.resources,
        this.time,
        this.room
      );
    });
  }

  switchTheme(theme) {
    if (this.environment) {
      this.environment.switchTheme(theme);
    }
  }

  resize() {}

  update() {
    if (this.room) {
      this.room.update();
    }

    if (this.controls) {
      this.controls.update();
    }
  }
}
