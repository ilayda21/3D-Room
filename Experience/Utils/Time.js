import { EventEmitter } from "events";
export default class Time extends EventEmitter {
  constructor() {
    super();
    this.start = Date.now();
    this.currentTime = this.start;
    this.elapsed = 0;
    this.delta = 16;

    this.update();
  }

  update() {
    const currentTime = Date.now();
    this.delta = currentTime - this.currentTime;
    this.currentTime = currentTime;
    this.elapsed = this.currentTime - this.start;

    this.emit("update");
    window.requestAnimationFrame(() => this.update());
  }
}
