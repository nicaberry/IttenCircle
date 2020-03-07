"use strict";
class IndexPageModel {
  constructor() {
    this.audioBtn = new Audio("audioFiles/click.mp3");
    this.ajaxStorageModel = new AjaxStorageModel();
    this.localStorageModel = new LocalStorageModel();
    this.indexPageView = null;
    //this.ajaxStorageModel.deleteAjaxStorage();
   
    this.taskModel = new TaskModel();
    this.taskView = new TaskView(this.taskModel);
    this.taskModel.setView(this.taskView);
    this.taskControler = new TaskControler(this.taskModel);

    this.entryPageModel = new EntryPageModel(this.ajaxStorageModel);
    this.entryPageView = new EntryPageView(this.entryPageModel);
    this.entryPageModel.setEntryPageView(this.entryPageView);
    this.entryPageControler = new EntryPageControler(this.entryPageModel);
    
    this.personalAreaPageModel = new PersonalAreaPageModel(this.ajaxStorageModel, this.localStorageModel);
    this.personalAreaPageView = new PersonalAreaPageView(this.personalAreaPageModel, this.localStorageModel, this.ajaxStorageModel);
    this.personalAreaPageModel.setPersonalAreaPageViewinModel(this.personalAreaPageView);
    this.personalAreaPageControler = new PersonalAreaPageControler(this.personalAreaPageModel);

    this.registrationPageModel = new RegistrationPageModel(this.ajaxStorageModel, this.personalAreaPageModel, this.localStorageModel);
    this.registrationPageView = new RegistrationPageView(this.registrationPageModel);
    this.registrationPageModel.setRegistrationPageViewInModel(this.registrationPageView);
    this.registrationPageControler = new RegistrationPageControler(this.registrationPageModel);

    this.switchToStateFromURLHash();
  }
  //установить indexPageView
  setIndexPageViewInModel(view) {
    this.indexPageView = view;
  }
  //передача модели регистрации
  getRegistrationPageModel() {
    return this.registrationPageModel;
  }
  //передача модели входа
  getEntryPageModel() {
    return this.entryPageModel;
  }
  //передача отображения регистрации
  getRegistrationPageView() {
    return this.registrationPageView;
  }
  //передача отображения входа
  getEntryPageView() {
    return this.entryPageView;
  }
  //передача модели личного кабинета
  getPersonalAreaPageModel() {
    return this.personalAreaPageModel;
  }
  //изменяем хэш страницы
  switchToState(newState) {
    window.location.hash = encodeURIComponent(newState);
  }
  //отслеживаем клики по ссылкам, что бы изменить хэш страницы
  switchHomePage(self, e) {
    if (e.target.tagName === "A") {
      let url = e.target.getAttribute("href");
      self.switchToState(url);
    }
  }
  //проверяем localStorage
  checkLocalStorage() {
    let ls = localStorage[JSON.stringify("nickname")];
    if (ls) {
      ls  = JSON.parse(ls);
      if (ls["nickname"]) {
          this.personalAreaPageModel.getData(ls["nickname"]); 
          return true;
      }
    }
  }
 
  //функция для обновления страниц
   switchToStateFromURLHash() { // вызывать конструкторы определенных моделей
    let hashURL = window.location.hash;
    let state = decodeURIComponent(hashURL.substr(1));
    state = state.split("_");
    if (state[0] === "task") {
      this.taskModel.updateView();
      return;
    }
    if (this.checkLocalStorage()) {
      return;
    } else {
      if ( state[0] != "" ){
          if (state[0] === "registration") {
            this.registrationPageModel.updateView();
            return;
          }
          if (state[0] === "entry") {
            this.entryPageModel.updateView();
            return;
          }
          if (state[0] === "personalArea") {
            this.personalAreaPageModel.getData();
            return;
        } else {
          this.indexPageView.update();
        }
      }
    }
  }
  //закрыть layout
  closeLayout() {
    this.indexPageView.closeLayout();
  }
  //обработка клика на кнопку настройки
  clickSettings() {
     this.indexPageView.clickSettings();
  }
  //clickAudioBtn()
  clickAudioBtn() {
    this.indexPageView.clickAudioBtn(this.audioBtn);
  }
}

let indexPageModel;
let indexPageView;
let indexPageControler;
window.addEventListener("load", function(e) { 
  indexPageModel = new IndexPageModel();
  indexPageView = new IndexPageView(indexPageModel);
  indexPageModel.setIndexPageViewInModel(indexPageView);
  indexPageControler = new IndexPageControler(indexPageModel); 
}, false)

