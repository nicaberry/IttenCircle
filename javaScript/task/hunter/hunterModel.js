"use strict";
class HunterModel {
  constructor(posX, posY, idHunter, widthField) {
    this.posX = posX;
    this.posY = posY;
    this.speedX = 2;
    this.widthHunter = 40;
    this.heightHunter = 10;
    this.idHunter = idHunter;
    this.widthField = widthField;
  }

 //обновление позиции
 update() {
  let hunter = document.querySelector(this.idHunter);
  if (hunter !== null) {
    hunter.setAttribute("y", this.posY + "px");
    hunter.setAttribute("x", this.posX + "px");
  }
 }
  //метод описывающий движение ракетки вправо
  moveRightHunter() {
    this.posX += this.speedX;
    if (this.posX > this.widthField - this.widthHunter) {
        this.posX = this.widthField - this.widthHunter;
    }
    this.update();
  } 
  //метод описывающий движение ракетки влево
  moveLeftHunter() {
    this.posX -= this.speedX;
    if ( this.posX <= 0) {
        this.posX = 0;
    }
    this.update();
  }
}