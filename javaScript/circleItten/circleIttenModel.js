"use strict";
class CircleIttenModel {
  constructor() {
    this.circleIttenView = null;
  }
  //устанавливаем View
  setView(view) {
    this.circleIttenView = view;
  }
  //создаём круг Иттена
  showCircleItten() {
    this.circleIttenView.showCircleItten();
  }

  //показываем кнопки цветовых гармоний при нажатиии
  showColorHarmonyBtns() {
    this.circleIttenView.clickColorHarmony();
  }
  //обработка кликов для кнопок первичных, вторичных и третичных цветов
  clickPrimaryColorBtns() {
    this.circleIttenView.clickPrimaryColorBtnAndOther();
  }
  //кнопка для возврата круга Иттена впервоначальное состояние
  clickBtnOriginCircleItten() {
    this.circleIttenView.cleanCircleItten();
  }
  //обработка цветовых гармоний
  clickBtnsColorsHarmony() {
    this.circleIttenView.clickBtnsColorsHarmony();
  }
  changeCircleIttenSizeWindow() {
    this.circleIttenView.changeCircleIttenSizeWindow();
  }
  //создаём событие, что бы отслеживать создание круга иттена
  myEvent() {
    let myEventCircleItten = new Event("circleIttenLoad");
    document.dispatchEvent(myEventCircleItten);
  }

}