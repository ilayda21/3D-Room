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
        document.body.classList.add("dark-theme");
        document.body.classList.remove("light-theme");
      } else {
        this.theme = "light";
        this.toggleCircle.classList.remove("slide");
        document.body.classList.add("light-theme");
        document.body.classList.remove("dark-theme");
      }

      this.emit("switch", this.theme);
    });
  }
}
