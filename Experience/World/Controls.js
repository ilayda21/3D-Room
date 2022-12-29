import * as THREE from "three";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export default class Controls {
  constructor(scene, camera, resources, time, room) {
    this.scene = scene;
    this.camera = camera;
    this.resources = resources;
    this.time = time;

    this.room = room.actualRoom;
    GSAP.registerPlugin(ScrollTrigger);
    this.setPath();
  }

  setPath() {
    this.timeline = new GSAP.timeline();
    this.timeline.to(this.room.position, {
      x: () => this.camera.sizes.width * 0.0012,
      scrollTrigger: {
        trigger: ".first-move",
        markers: true,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });
  }

  resize() {}

  update() {}
}
