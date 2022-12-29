import { EventEmitter } from "events";
export default class Theme extends EventEmitter {
  constructor() {
    super();
    this.theme = "light";
    this.toggleButton = document.querySelector(".toggle-button");
    this.toggleCircle = document.querySelector(".toggle-circle");
    this.setEventListeners();
  }

  setEventListeners() {
    this.toggleButton.addEventListener("click", () => {
      if (this.theme === "light") {
        this.theme = "dark";
        this.toggleCircle.classList.add("slide");
      } else {
        this.theme = "light";
        this.toggleCircle.classList.remove("slide");
      }

      this.emit("switch", this.theme);
    });
  }
}
