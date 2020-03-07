"use strict";
class PersonalAreaPageView {
  constructor(personalAreaPageModel, localStorageModel, ajaxStorageModel) {
    this.container = document.querySelector("#containerForPage");
    this.personalAreaPageModel = personalAreaPageModel;
    this.localStorageModel = localStorageModel;
     this.ajaxStorageModel = ajaxStorageModel;
    this.nickname = null;

    this.arrSrcAvatar = ['/image/avatars/avatar.svg', '/image/avatars/avatar_boy_1.svg', '/image/avatars/avatar_girl_1.svg', '/image/avatars/avatar_boy_2.svg', '/image/avatars/avatar_girl_2.svg', '/image/avatars/avatar_boy_3.svg',  '/image/avatars/avatar_girl_3.svg'];
    this.numberAvatar = 0;
    this.imgForSlider = null;
  }

  update() {
    this.closeLayout();
    let avatar = this.localStorageModel.getAvatar();
    this.nickname = this.localStorageModel.getNickname();
    this.container.classList.remove("containerForPage");
    this.container.innerHTML = `
    <div id="personalContainer">
      <div id="personalIMG"> ${this.setAvatarLS(avatar)}
      <input type="button" class="avatarChange" id="changeAvatarBtn" value="изменить аватар">
      </div>
      <div id="personalNickname"> 
        <p> ${this.nickname} </p> 
      </div>
      <div id="containerInfoAboutCircleItten"></div>
      <br>
      <input type="button" id="task" value="упражнение">
      <br>
    </div>
    <div id="divContainerCircleItten">
      <div id="divContainerOriginCircleItten">
          <input type="button" id="btnOriginCircleItten" value="вернуть круг Иттена">
      </div>
      <div id="divContainerColorsHarmony">
        <strong><p>Цветовые Гармонии:</p></strong>
        <ul id="ulContainerColorsHarmony">
          <li>
            <input type="button" class="openOrCloseContainerColorsHarmony" value="2 цвета">
            <ul class="closeElem">
              <li>
                <div class="colorsHarmony">
                  <input type="button" id="complementaryColorsHarmony" value="комплементарные цвета"><br>
                  <input type="button" id="adjancentColorsHarmony" value="смежные цвета"><br>
                  <input type="button" id="intermediateColorsHarmony" value="промежуточные цвета"><br>
                  <input type="button" id="similiarColorsHarmony" value="похожие цвета"><br>
                  <input type="button" id="incompatibleColorsHarmony" value="несовместимые цвета"><br>
                </div>
              </li>
            </ul>
          </li>
          <li>
            <input type="button" class="openOrCloseContainerColorsHarmony" value="3 цвета">
            <ul class="closeElem">
              <li>
               <div class="colorsHarmony">
                  <input type="button" id="threeColorsThreeColorsHarmony" value="3-цветная гармония"><br>
                  <input type="button" id="threeColorsSharedHarmony" value="разделенная гармония"><br>
                </div>
              </li>
            </ul>
          </li>
          <li>
            <input type="button" class="openOrCloseContainerColorsHarmony" value="4 цвета">
            <ul class="closeElem">
              <li>
               <div class="colorsHarmony">
                  <input type="button" id="fourColorsFourColorsHarmony" value="4-цветная гармония"><br>
                  <input type="button" id="fourColorsRectangularHarmony" value="прямоугольная гармония"><br>
                  <input type="button" id="fourColorsAnalogHarmony" value="аналоговая гармония"><br>
                  <input type="button" id="fourColorsAlternativeHarmony" value="альтернативная гармония"><br>
                </div>
              </li>
            </ul>
          </li>
          <li>
            <input type="button" class="openOrCloseContainerColorsHarmony" value="6 цветов">
            <ul class="closeElem">
              <li>
               <div class="colorsHarmony">
                <input type="button" id="sixColorsSixColorsHarmony" value="6-цветная гармония">
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div id="divContainerPrimaryColors">
        <strong><p>Из каких цветов состоит круг Иттена?</p></strong>
          <input type="button" id="primaryColors" value="первичные цвета">
          <input type="button" id="secondaryColors" value="вторичные цвета">
          <input type="button" id="tertiaryColors" value="третичные цвета">
      </div>
    </div>
   `;
    this.personalAreaPageModel.myEventPersonalAreaPageLoad();
  }
  //показать кнопку для выхода из личного кабинета
  showBtnButtonExit() {
    let exit = document.querySelector("#exit");
    exit.style.display = "inline-block";
  }
  //метод установки аватара личной страницы из localStorageModel
  setAvatarLS(avatar) {
    if (avatar) {
      return  "<img id='avatar' src=" + avatar + ">";
    } else {
      return "<img id='avatar' src='/image/avatars/avatar.svg'>";
    }
  }
  //обработка кнопки выхода из личной страницы
  clickBtnButtonExit() {
    let self = this;
    let buttonExit = document.querySelector("#exit");
    buttonExit.onclick = function() {
      self.localStorageModel.deleteData();
      exit.style.display = "none";
      window.onbeforeunload = function() {
        return false;
      };
      window.close();
    } 
  }
  //закрытие layout
  closeLayout() {
    document.querySelector("#layout").style.display = "none";
  }
  //изменение аватара
  clickBtnChangeAvatar() {
    let changeAvatarBtn = document.querySelector("#changeAvatarBtn");
    changeAvatarBtn.onclick = this.openLayoutForChangeAvatar.bind(this);
  }
  //метод для открытия слайдера
  openLayoutForChangeAvatar() {
    let layout = document.querySelector("#layout");
    let layoutContainer = document.querySelector("#layoutContainer");
    let layoutInfo = document.querySelector("#layoutInfo");

    layout.style.display = "block";
    layoutInfo.style.display = "block";
    layoutContainer.style.display = "block";

    let containerForSlider = document.createElement("div");
    containerForSlider.classList.add("containerForSlider");

    this.imgForSlider = document.createElement("img");
    this.imgForSlider.src = this.arrSrcAvatar[0];
    containerForSlider.append(this.imgForSlider);

    let br = document.createElement("br");
    containerForSlider.append(br);

    let arrowLeft = document.createElement("input");
    arrowLeft.type = "button";
    arrowLeft.value = "<";
    arrowLeft.onclick = this.clickLeftArrow.bind(this);
    containerForSlider.append(arrowLeft);

    let arrowRight = document.createElement("input");
    arrowRight.type = "button";
    arrowRight.value = ">";
    arrowRight.onclick = this.clickRightArrow.bind(this);
    containerForSlider.append(arrowRight);

    let br2 = document.createElement("br");
    containerForSlider.append(br2);

    let saveBtn = document.createElement("input");
    saveBtn.type = "button";
    saveBtn.value = "сохранить";
    saveBtn.onclick = this.clickSaveAvatar.bind(this);
    containerForSlider.append(saveBtn);

    layoutInfo.append(containerForSlider);
  }
  //клик по левой стрелки выбора нового аватара 
  clickLeftArrow() {
    if (this.numberAvatar === 0) {
      this.numberAvatar = this.arrSrcAvatar.length - 1;
      this.imgForSlider.src = this.arrSrcAvatar[this.numberAvatar];
    } else {
      this.numberAvatar = this.numberAvatar - 1;
      this.imgForSlider.src = this.arrSrcAvatar[this.numberAvatar];
    } 
  } 
  //клик по правой стрелки выбора нового аватара
  clickRightArrow() {
    if (this.numberAvatar === this.arrSrcAvatar.length - 1) {
      this.numberAvatar = 0;
      this.imgForSlider.src = this.arrSrcAvatar[this.numberAvatar];
    } else {
      this.numberAvatar = this.numberAvatar + 1;
      this.imgForSlider.src = this.arrSrcAvatar[this.numberAvatar];
    } 
  }  
  //кнопка сохранения аватара
  clickSaveAvatar() {
    this.nickname = this.nickname.trim();
    let img = document.querySelector("#avatar");
    img.src = this.arrSrcAvatar[this.numberAvatar];
    //отправляем изменение аватара на сервер
    this.ajaxStorageModel.setAvatarInAjaxStorageCI(this.nickname, this.arrSrcAvatar[this.numberAvatar]);
    this.numberAvatar = 0;
    this.closeLayoutPostClickSave();
  }
  //закрываем перекрытие при изменениии аватара
  closeLayoutPostClickSave() { 
    let layout = document.querySelector("#layout");
    let layoutInfo = document.querySelector("#layoutInfo");
    let layoutContainer = document.querySelector("#layoutContainer");
    layoutInfo.innerHTML = "";
    layout.style.display = "none";
    layoutInfo.style.display = "none";
    layoutContainer.style.display = "none";
  } 
  //показ кнопки "изменение аватара"
  mouseetnterAvatar() {
   let img = document.querySelector("#avatar");
   let personalContainer = document.querySelector("#personalContainer");
   let changeAvatarBtn = document.querySelector("#changeAvatarBtn");
   img.addEventListener("mouseenter", () => {
     changeAvatarBtn.style.opacity = "1";
   }, false);
   personalContainer.addEventListener("mouseleave", () => {
     changeAvatarBtn.style.opacity = "0";
   }, false);
  }
  //переход к упражнению
  clickTask() {
    let btnTask = document.querySelector("#task");
    btnTask.onclick = function() {
      window.location.hash = encodeURIComponent("task");
    }
  }
}

