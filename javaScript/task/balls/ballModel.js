"use strict";
class BallModel {
  constructor(ball, widthField, heightField, posX, posY, widthBall, heightBall, count, hunter) {
    this.ball = ball;
    this.widthField = widthField;
    this.heightField = heightField;
    this.posX = posX;
    this.posY = posY;
    this.speedX = 2;
    this.speedY = 3;
    this.widthBall = widthBall;
    this.heightBall = heightBall;
    this.count = count;
    this.minusOrPlus = null;
    this.timer = null;
    this.hunter = hunter;
    this.touchHunter = false;
    this.timeInterval = 40;
    this.ballView = null;
  }
  //установка ballView
  setBallViewInBallModel(view) {
    this.ballView = view;
  }
  //обновление движения шара
  update(ball) {
    this.ballView.update(ball, this.posX, this.posY);
  }
  //начать игру
  startGame() {
    this.randomMinusOrPlus();
    if(!this.timer) {
      this.timer = setInterval(this.moveBall.bind(this), this.timeInterval);
    }
  }
  //метод для перемены направления шарика
  randomMinusOrPlus() {
    let x = Math.floor(Math.random() * 2);
    if (x) {
      this.minusOrPlus = 1 + Math.floor(Math.random() * 3);
    } else {
      let random = Math.floor(Math.random() * 3);
      if (random === 1) {
        this.minusOrPlus = -1;
        return;
      }
      this.minusOrPlus = -1 + -random;
    }
  }
  //осуществляем движение шарика  
  moveBall() {
    this.ball.classList.remove("opacityBall");
    this.countTouchBallWithHunter();
    this.moveBallPosX();
    this.moveBallPosY();
    this.touchBallWithHunter();
    this.update(this.ball);
  }
  //движение по оси X
  moveBallPosX() {
    this.posX += this.minusOrPlus * this.speedX;
    if (this.posX + this.widthBall > this.widthField + 1) {
      this.speedX = -this.speedX;
      this.posX = this.widthField - this.widthBall;
    }
    if (this.posX < -1) {
      this.speedX = -this.speedX;
      this.posX = 0;
    }
  }
  //движение по оси Y
  moveBallPosY() {
    this.posY += this.minusOrPlus * this.speedY;
    if (this.posY + this.heightBall > this.heightField) {
        this.speedY = -this.speedY;
        this.posY = this.heightField - this.heightBall;
    }
    if (this.posY < 0) {
        this.speedY = -this.speedY;
        this.posY = 0;
    }
  }
  //метод для действий при столкновении шарика и ловца
  touchBallWithHunter() {
  if (this.posY + this.heightBall > this.heightField - this.hunter.heightHunter && this.touchHunter) {
      this.speedY = -this.speedY;
      this.posY = this.heightField - this.heightBall - this.hunter.heightHunter;
    }
  }
  //методы для расчета столкновения шара и ловца
  countTouchBallWithHunter() {
   this.touchHunter = false;
   let posXHunterStart = this.hunter.posX;
   let posXHunterEnd = posXHunterStart + this.hunter.widthHunter;
   let posYHunter = this.hunter.posY;
   let posXBall = this.posX + this.widthBall/2;
   if (posYHunter <= this.posY + this.heightBall) {
    if (posXBall >= posXHunterStart && posXBall <= posXHunterEnd) {
     this.touchHunter = true;
     this.ballView.touchBallAndHunter(this.ball, this.timer, this.count);
    }
   }
  }
}