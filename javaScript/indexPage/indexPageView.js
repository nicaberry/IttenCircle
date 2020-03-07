"use strict";
class IndexPageView {
  constructor(indexPageModel) {
    this.indexPageModel = indexPageModel;
    this.containerForPage = document.querySelector("#containerForPage");
  }
  //закрыть layout
  closeLayout() {
    let layout = document.querySelector("#layout");
    let layoutInfo = document.querySelector("#layoutInfo");
    let layoutContainer = document.querySelector("#layoutContainer");
    layoutInfo.innerHTML = "";
    layout.style.display = "none";
    layoutInfo.style.display = "none";
    layoutContainer.style.display = "none";
  }
  //обработка кнопки "настройки"
  clickSettings() {
    let btnSettings = document.querySelector("#btnSettings");
    let containerSettings = document.querySelector("#containerSettings");
    if (btnSettings.getAttribute("data-settings") === "false") {
      containerSettings.style.display = "block";
      btnSettings.setAttribute("data-settings","true");
      return;
    } else {
      containerSettings.style.display = "none";
      btnSettings.setAttribute("data-settings", "false");
      return;
    }
  }
  update() {
	this.containerForPage.innerHTML = `
  	<h1>КРУГ ИТТЕНА</h1>
		<p><a href="#registration">РЕГИСТРАЦИЯ</a></p>
		<p><a href="#entry">ВХОД</a></p>
  `
  }
  clickAudioBtn(audio) {
    let checkedBtnSound = document.querySelector("#trueAudioBtn");
    if (checkedBtnSound.checked) { //проверяем в настройках выключен ли звук
        audio.play();
    }
  }
}

