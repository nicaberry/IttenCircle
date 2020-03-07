"use strict";
class TaskView {
  constructor(taskModel) {
    this.taskModel = taskModel;
    this.container = document.querySelector("#containerForPage");
    this.count = null;
    this.buttonStart = null;
    this.svg = null;
    this.field = null;
    this.NSSVG = "http://www.w3.org/2000/svg";

    this.widthField = 300;
    this.heightField = 500;
    this.heightWrap = 50;
    this.colorStroke = "darkgrey";
    this.bgcolorField = "white";
    this.stokeWidth = 4;

    this.widthHunter = 40;
    this.heightHunter = 10;

    this.radiusBall = 15;
    this.widthBall = 30;
    this.heightBall = 30;

    this.hunterModel = null;
    this.containerForGame = null;

    this.buttonRight = null;
    this.buttonLeft = null;
    this.buttonStop = null;

    this.posXHunter = 0;
    this.posYHunter = 490;

    this.aboutGame = "В этой игре вы должны собрать все <strong>первичные цвета</strong> круга Иттена. Управлять можно, или кнопками внизу поля, или клавишами прокрутки влево и вправо.";
  }
  //обновление страницы
  update() {
    this.container.innerHTML = `
    <div id="containerForGame"></div>
    `;
    this.containerForGame = document.querySelector("#containerForGame");
    this.startGame();
    this.taskModel.myEvent();
    this.addControlerHunter(this.buttonLeft, this.buttonRight);
    this.createBalls();
    // this.addControlerButtonStop();
  }
  //создание игры
  startGame() {
    this.createButtonStart();
    // this.createButtonStop();
    this.createCount();
    this.createSVG();
    this.сreateField();
    this.createButtonLeft();
    this.createButtonRight();
    this.createHunter(this.posXHunter, this.posYHunter);
    this.createAboutGame(this.aboutGame);
  }

 //подсчет
  createCount() {
    let wrap = document.createElement("div");
    wrap.style.width = this.widthField + "px";
    wrap.style.height = this.heightWrap + "px";
    this.countLeft = document.createElement("span");
    this.count = document.createElement("span");
    this.countLeft.innerHTML = "3/";
    this.count.innerHTML = "0";
    wrap.append(this.countLeft); 
    wrap.append(this.count);
    wrap.classList.add("count");
    this.containerForGame.append(wrap);
  }
  //кнопка старта
  createButtonStart() {
    this.buttonStart = document.createElement("button");
    this.buttonStart.classList.add("buttonStart");
    this.buttonStart.innerHTML = "старт!";
    this.containerForGame.append(this.buttonStart);
  }
  //кнопка остановки игры
  // createButtonStop() {
  //   this.buttonStop = document.createElement("button");
  //   this.buttonStop.classList.add("buttonStart");
  //   this.buttonStop.innerHTML = "стоп!";
  //   this.containerForGame.append(this.buttonStop);
  // }
  //кнопка управления ловцом правая
  createButtonRight() {
    this.buttonRight = document.createElement("button");
    this.buttonRight.classList.add("buttonRight");
    this.buttonRight.setAttribute("data-hunter-right", "true");
    this.buttonRight.innerHTML = ">";
    this.containerForGame.append(this.buttonRight);
  }
  //кнопка управления ловцом левая
  createButtonLeft() {
    this.buttonLeft = document.createElement("button");
    this.buttonLeft.classList.add("buttonLeft");
    this.buttonLeft.setAttribute("data-hunter-left", "true");
    this.buttonLeft.innerHTML = "<";
    this.containerForGame.append(this.buttonLeft);
  }
  //создание элементаSVG
  createElemSVG(name) {
    return document.createElementNS(this.NSSVG, name);
  }
  //создаём svg
  createSVG() {
    this.svg = this.createElemSVG("svg");
    this.svg.setAttribute("width", this.widthField + "px");
    this.svg.setAttribute("height", this.heightField + "px");
    this.svg.setAttribute("xmlns", this.NSSVG);
    this.svg.classList.add("svg");
    this.containerForGame.append(this.svg);
  }
  //создаём поле игры
  сreateField() {
    this.field = this.createElemSVG("rect");
    this.field.setAttribute("x", 0 + "px");
    this.field.setAttribute("y", 0 + "px");
    this.field.setAttribute("width", this.widthField + "px");
    this.field.setAttribute("height", this.heightField + "px");
    this.field.setAttribute("stroke", this.colorStroke);
    this.field.setAttribute("stroke-width", this.stokeWidth);
    this.field.setAttribute("fill", this.bgcolorField);
    this.field.classList.add("field");
    this.svg.append(this.field);
  }
  //создание ловца
  createHunter(x, y) {
    this.hunter = this.createElemSVG("rect");
    this.hunter.setAttribute("width", this.widthHunter + "px");
    this.hunter.setAttribute("height", this.heightHunter + "px");
    this.hunter.setAttribute("x", x + "px");
    this.hunter.setAttribute("y", y + "px");
    this.hunter.setAttribute("fill", "red");
    this.hunter.classList.add("hunter");
    this.svg.append(this.hunter);
  }
 //создание мяча
  createBall(bgcolorBall, posX, posY) {
    let ball = this.createElemSVG("circle");
    ball.setAttribute("r", this.radiusBall + "");
    ball.setAttribute("cx", posX + "");
    ball.setAttribute("cy", posY + "");
    ball.setAttribute("fill", bgcolorBall);
    ball.classList.add("ball");
    ball.classList.add("opacityBall");
    this.svg.append(ball);
    return ball;
  }

  //подключаем контролер к ловцу
  addControlerHunter(buttonLeft, buttonRight) {
    this.hunterModel = new HunterModel(this.posXHunter, this.posYHunter, ".hunter", this.widthField);
    let hunterControler = new HunterControler(this.hunterModel, buttonLeft, buttonRight);
  }
  //подключаем контролер к мячам
  addControlerBalls(ball, posX, posY) {
    let ballModel = new BallModel(ball, this.widthField, this.heightField, posX, posY, this.widthBall, this.heightBall, this.count, this.hunterModel);
    let ballView = new BallView(ballModel);
    ballModel.setBallViewInBallModel(ballView);
    let ballControler = new BallControler(ballModel);
  }
  //создание шариков 
  createBalls() {
    let arrPosX = [15, 35, 50, 75, 105, 125, 180, 200, 219, 234, 275, 285];
    let arrPosY = [15, 30, 15, 45, 35, 20, 15, 30, 15, 25, 15, 35];
    let arrColors = ["red", "orangered", "orange", "gold", "yellow", "greenyellow", "green", "teal", "blue", "blueviolet", "violet", "mediumvioletred"];
    for (let i = 0; i < arrColors.length; i++) {
      let ball = this.createBall(arrColors[i], arrPosX[i], arrPosY[i]);
      if (arrColors[i] === "red" || arrColors[i] === "blue" || arrColors[i] === "yellow") {
        ball.setAttribute("data-color", "primary");
      }
      this.addControlerBalls(ball, arrPosX[i], arrPosY[i]);
    }
  }
  //обрабатывает кнопки возникающие при нажатии на кнопку "стоп"
  // addControlerButtonStop() {
  //   let self = this;
  //   this.buttonStop.onclick = function() {
  //     self.closeOrOpenLayout("open");
  //   }
  // }
  // //показывает перекрытие и кнопки для выхода из игры или её продолжения
  // clickButtonStop() {
  //   let self = this;
  //   let stopGame = document.querySelector("#stopGame");
  //   let againGame = document.querySelector("#againGame");
  //   stopGame.onclick = function() {
  //     self.closeOrOpenLayout("close");
  //     window.location.hash = encodeURIComponent("personalArea");
  //   }
  //   againGame.onclick = function() {
  //     self.closeOrOpenLayout("close");
  //     window.location.hash = encodeURIComponent("task");
  //   }
  // }
  // //показывает или скрывает перекрытие
  // closeOrOpenLayout(closeOrOpen) {
  //   let self = this;
  //   let layout = document.querySelector("#layout");
  //   let layoutContainer = document.querySelector("#layoutContainer");
  //   let closeLayout = document.querySelector(".closeLayout");
  //   let layoutInfo = document.querySelector("#layoutInfo");
  //   if (closeOrOpen === "open") { //открываем layout
  //     layout.style.display = "block";
  //     layoutContainer.style.display = "block";
  //     closeLayout.style.display = "none";
  //     layoutInfo.style.display = "block";
  //     layoutInfo.innerHTML = `
  //     <input type="button" id="stopGame" value="покинуть игру">
  //     <input type="button" id="againGame" value="продолжить игру">`;
  //     self.clickButtonStop(); 
  //   }
  //   if (closeOrOpen === "close") { //закрываем layout
  //     layout.style.display = "none";
  //     layoutContainer.style.display = "none";
  //     closeLayout.style.display = "block";
  //     layoutInfo.style.display = "";
  //   }
  // }
  //словие игры
  createAboutGame(aboutGame) {
    let p = document.createElement("p");
    p.innerHTML = aboutGame;
    this.containerForGame.append(p);
  }
  //событие сообщающие о прекращении игры 
  myEvent() {
    let myEventGameStop = new Event("gameStop");
    document.dispatchEvent(myEventGameStop);
  }
}



  