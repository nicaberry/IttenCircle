"use strict";
class LocalStorageModel {
  constructor() {
    this.nickname = null;
  }
  //установить  данные в localStorage
  setData(data) {
    this.nickname = data["nickname"];
    this.data = data;
    localStorage.setItem(JSON.stringify("nickname"), JSON.stringify(this.data)); 
  }
  //передача имени
  getNickname() {
    return this.nickname;
  }
  //передача данных о аватаре
  getAvatar() {
      let data = localStorage[JSON.stringify("nickname")];
      data = JSON.parse(data);
      return data["avatar"];  
  }
  //очистить localStorage
  deleteData() {
    localStorage.setItem(JSON.stringify("nickname"), JSON.stringify({}));
  }
}
