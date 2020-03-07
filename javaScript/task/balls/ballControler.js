"use strict";
//класс контролирующий шар
class BallControler {
  constructor(modelBall) {
    this.ball = modelBall;
    this.init();
  }
  init() {
    //навешиваем событие на кнопку старт
    let buttonStart = document.querySelector(".buttonStart");
    buttonStart.addEventListener("click", this.ball.startGame.bind(this.ball));
  }
}