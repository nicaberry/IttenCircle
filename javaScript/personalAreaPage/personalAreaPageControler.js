"use strict";
class PersonalAreaPageControler {
  constructor(personalAreaPageModel) {
    this.personalAreaPageModel = personalAreaPageModel;
    this.listenerPersonalAreaPage();
  }
  listenerPersonalAreaPage() {
    let self = this;
    //слушаем событие, что личный кабинет создан
    document.addEventListener("personalAreaPageLoad", function() {
      self.personalAreaPageModel.showBtnButtonExit();
      self.personalAreaPageModel.clickBtnButtonExit();
      self.personalAreaPageModel.clickBtnChangeAvatar();
      self.personalAreaPageModel.clickTask();
      self.personalAreaPageModel.mouseetnterAvatar();
    }, false);
  }
 
}

