"use strict";
class BallView {
  constructor(ballModel) {
    this.ballModel = ballModel;
  }
  //обновление движения шара
  update(ball, posX, posY) {
    ball.setAttribute("cx", posX + 15 + "px");
    ball.setAttribute("cy", posY + 15 + "px");
  }
  //обработка столкновения шарика и ловца
  touchBallAndHunter(ball, timer, count) {
    if (ball.hasAttribute("data-color")) {
      clearInterval(timer);
      ball.classList.add("opacityBall");
      let score = +count.innerHTML;
      count.innerHTML = score + 1;
      if (count.innerHTML === "3") {
        this.stopGame();
      }
    }
  }
  //победа в игре
  stopGame() {
    this.closeOrOpenLayout("open"); 
  }
  //обработка всплывающего окна после победы в игре
  closeOrOpenLayout(closeOrOpen) {
    let layout = document.querySelector("#layout");
    let layoutContainer = document.querySelector("#layoutContainer");
    let closeLayout = document.querySelector(".closeLayout");
    let layoutInfo = document.querySelector("#layoutInfo");
    if (closeOrOpen === "open") { //открываем layout
      layout.style.display = "block";
      layoutContainer.style.display = "block";
      closeLayout.style.display = "none";
      layoutInfo.style.display = "block";
      layoutInfo.innerHTML = `<p>ПОБЕДА!</p>
      <input type="button" id="stopGame" value="покинуть игру">
      <input type="button" id="againGame" value="продолжить игру">`;
      this.clickButtonsPostWins(); 
    }
    if (closeOrOpen === "close") { //закрываем layout
      layout.style.display = "none";
      layoutContainer.style.display = "none";
      closeLayout.style.display = "block";
      layoutInfo.style.display = "";
    }
  }
  //обработка кнопок, которые появляются после победы в игре
  clickButtonsPostWins() {
    let self = this;
    let stopGame = document.querySelector("#stopGame");
    let againGame = document.querySelector("#againGame");
    stopGame.onclick = function() {
      self.closeOrOpenLayout("close");
      window.location.hash = encodeURIComponent("personalArea");
    }
    againGame.onclick = function() {
      self.closeOrOpenLayout("close");
      window.location.hash = encodeURIComponent("personalArea");
      window.location.hash = encodeURIComponent("task");
    }
  }
}


  

    