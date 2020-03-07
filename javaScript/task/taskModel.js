"use strict";
class TaskModel {
  constructor() {
    this.taskView = null;
  }
  //установка view
  setView(view) {
    this.taskView = view;
  }
  //обновление страницы
  updateView() {
    this.taskView.update();
  }
  //событие отслеживающее создание поля игры
  myEvent() {
    let myEventTask = new Event("taskLoad");
    document.dispatchEvent(myEventTask);
  }
}