"use strict";
class PersonalAreaPageModel {
  constructor(ajaxStorageModel, localStorageModel) {
    this.personalAreaPageView = null;
    this.ajaxStorageModel = ajaxStorageModel;
    this.localStorageModel = localStorageModel;
    this.buttonExit = null;

    this.circleIttenModel = new CircleIttenModel();
    this.circleIttenView = new CircleIttenView(this.circleIttenModel);
    this.circleIttenModel.setView(this.circleIttenView);
    this.circleIttenControler = new CircleIttenControler(this.circleIttenModel);
  }
  //обработка кнопки выхода из личной страницы
  clickBtnButtonExit() {
    this.personalAreaPageView.clickBtnButtonExit(); 
  }
  //обработка изменения аватара
  clickBtnChangeAvatar() {
    this.personalAreaPageView.clickBtnChangeAvatar(); 
  }
  //установка view 
  setPersonalAreaPageViewinModel(view) {
    this.personalAreaPageView = view;
  }
  //передача данных через ajaxStorageModel
  getData(name) {
    let id = name || this.localStorageModel.getNickname() ||indexPageModel.getRegistrationPageModel().getNickname() || indexPageModel.getEntryPageModel().getNickname();
    this.ajaxStorageModel.getData(id, this);
  }
  //установка data в localStorageModel
  setData(data) {
    this.localStorageModel.setData(data);
    this.personalAreaPageView.update();
  }
  //событие, что личный кабинет загрузился
  myEventPersonalAreaPageLoad() {
    let myEventPersonalAreaPageLoad = new Event("personalAreaPageLoad");
    document.dispatchEvent(myEventPersonalAreaPageLoad);
  }
  //показать кнопку выхода из личного кабинета
  showBtnButtonExit() {
    this.personalAreaPageView.showBtnButtonExit();
  }
  //показ кнопки "изменение аватара"
  mouseetnterAvatar() {
    this.personalAreaPageView.mouseetnterAvatar();
  }
  //переход к упражнению
  clickTask() {
    this.personalAreaPageView.clickTask();
  }
}
