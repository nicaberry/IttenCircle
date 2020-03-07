"use strict";
class IndexPageControler {
  constructor(indexPageModel) {
    this.indexPageModel = indexPageModel;
    this.addListener();
  }
  //ставим обработчики событий на изменения хэша и клики по ссылкам
  addListener() {
    window.onhashchange = this.indexPageModel.switchToStateFromURLHash.bind(this.indexPageModel);
    document.onclick = (e) => {
      this.indexPageModel.switchHomePage.call(this.indexPageModel, this.indexPageModel, e);
      if (e.target.type === "button") {
        this.indexPageModel.clickAudioBtn();
      }
      if (e.target.classList.contains("closeLayout")) {
        this.indexPageModel.closeLayout();
      }
      if (e.target.hasAttribute("data-settings")) {
        this.indexPageModel.clickSettings();
      }
    };
  }
}
