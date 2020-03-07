"use strict";
//класс контролирующий ловца
class HunterControler {
  constructor(hunterModel, buttonLeft, buttonRight) {
    this.hunterModel = hunterModel;
    this.buttonLeft = buttonLeft;
    this.buttonRight = buttonRight;
    this.keyCodeRight = 39;
    this.keyCodeLeft = 37;
    this.timerUp = null;
    this.timerDown = null;
    this.timeInterval = 40;
    this.init();
  }
  //навешиваем события на кнопки
  init() {
    window.addEventListener("keydown", this.moveHunter.bind(this));
    window.addEventListener("keyup", this.notMoveHunter.bind(this));
    this.buttonLeft.addEventListener("mousedown", this.moveHunter.bind(this));
    this.buttonLeft.addEventListener("mouseup", this.notMoveHunter.bind(this));
    this.buttonRight.addEventListener("mousedown", this.moveHunter.bind(this));
    this.buttonRight.addEventListener("mouseup", this.notMoveHunter.bind(this));
    this.buttonLeft.addEventListener("touchstart", this.moveHunter.bind(this));
    this.buttonLeft.addEventListener("touchend", this.notMoveHunter.bind(this));
    this.buttonRight.addEventListener("touchstart", this.moveHunter.bind(this));
    this.buttonRight.addEventListener("touchend", this.notMoveHunter.bind(this));
  }
  //метод для нажатой кнопки
  moveHunter(e) {
    if (e.keyCode === this.keyCodeRight) { 
      if (!this.timerUp) {
        this.timerUp = setInterval(this.hunterModel.moveRightHunter.bind(this.hunterModel), this.timeInterval);
      }
    }
     if (e.target.hasAttribute("data-hunter-right")) { 
      if (!this.timerUp) {
        this.timerUp = setInterval(this.hunterModel.moveRightHunter.bind(this.hunterModel), this.timeInterval);
      }
    }
   
    if (e.keyCode === this.keyCodeLeft) {
      if (!this.timerDown) {
        this.timerDown = setInterval(this.hunterModel.moveLeftHunter.bind(this.hunterModel), this.timeInterval);
      }
    }
    if (e.target.hasAttribute("data-hunter-left")) {
      if (!this.timerDown) {
        this.timerDown = setInterval(this.hunterModel.moveLeftHunter.bind(this.hunterModel), this.timeInterval);
      }
    }
  }
  //метод для отжатой кнопки
  notMoveHunter(e) {
    if (e.keyCode === this.keyCodeRight) {
      clearInterval(this.timerUp);
      this.timerUp = null;
    }
    if (e.target.hasAttribute("data-hunter-right")) {
      clearInterval(this.timerUp);
      this.timerUp = null;
    }
    if (e.keyCode === this.keyCodeLeft) {
      clearInterval(this.timerDown);
      this.timerDown = null;
    }
    if (e.target.hasAttribute("data-hunter-left")) {
      clearInterval(this.timerDown);
      this.timerDown = null;
    }
  }
}