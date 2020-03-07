"use strict";
class CircleIttenControler {
  constructor(circleIttenModel) {
    this.circleIttenModel = circleIttenModel;

    this.listenerPersonalAreaPage();
  }
  //отслеживаем создание личного кабинета
 listenerPersonalAreaPage() {
   let self = this;
   window.addEventListener("resize", function() {
      self.circleIttenModel.changeCircleIttenSizeWindow();
   }, false);
   document.addEventListener("personalAreaPageLoad", function() {
      self.circleIttenModel.showCircleItten();
      self.circleIttenModel.changeCircleIttenSizeWindow();
   }, false);
   document.addEventListener("circleIttenLoad", function() {
      self.circleIttenModel.showColorHarmonyBtns();
      self.circleIttenModel.clickPrimaryColorBtns();
      self.circleIttenModel.clickBtnOriginCircleItten();
      self.circleIttenModel.clickBtnsColorsHarmony();
   }, false);
 }

}