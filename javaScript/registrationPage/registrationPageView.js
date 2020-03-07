"use strict";
class RegistrationPageView {
  constructor(registrationPageModel) {
    this.container = document.querySelector("#containerForPage");
    this.registrationPageModel = registrationPageModel;
    this.containerErrRegistrationRepeatPassword = null;
    this.containerErrRegistrationPassword = null;
    this.containerErrRegistrationName = null;
  }
  //обновление формы регистрации
  update() {
    this.container.innerHTML = `
    <div id="containerForm">
      <form id="registrationForm" name="registrationForm">
        <label>ИМЯ:<br> 
          <input type="text" name="nickname">
          <div id="containerErrRegistrationName"  data-nameErr></div>
        </label>
        <br>
        <label>ПАРОЛЬ:<br> 
          <input type="password" name="password">
          <div id="containerErrRegistrationPassword"  data-passwordErr></div>
        </label>
        <br>
        <label>ПОВТОРИТЕ ПАРОЛЬ:<br> 
          <input type="password" name="repeatPassword">
          <div id="containerErrRegistrationRepeatPassword"  data-repeatPasswordErr></div>
        </label>
        <br>
        <input type="submit" value="ОТПРАВИТЬ" name="submit">
      </form>
    </div>`;
    //сообщаем, что registrationForm загружена
    this.registrationPageModel.myEventRegistrationFormLoad();
    this.containerErrRegistrationRepeatPassword = document.querySelector("#containerErrRegistrationRepeatPassword");
    this.containerErrRegistrationPassword = document.querySelector("#containerErrRegistrationPassword");
    this.containerErrRegistrationName = document.querySelector("#containerErrRegistrationName");
  }
  //ошибка при неправильном вводе 
  err(elem) {
    this.closeLayout();
    elem.classList.add("err");
    elem.setAttribute("data-err", true); 
    if (elem.nextSibling.nextSibling.hasAttribute("data-nameErr")) {
      this.containerErrRegistrationName.style.opacity = "1"; 
      this.containerErrRegistrationName.innerHTML = `
      ** имя не должно быть больше 30символов;
      ** использовать только киррилицу или латиницу;
      ** можно использовать только буквы, числа и пробельные символы;
      ** должно быть уникальным, при совпадении уже с существующим именем другого пользователя будет ошибка;`; 
    }
    if (elem.nextSibling.nextSibling.hasAttribute("data-passwordErr")) {
      this.containerErrRegistrationPassword.style.opacity = "1";
      this.containerErrRegistrationPassword.innerHTML = `
      ** пароль не должен быть больше 10 символов и меньше 5 символов;
      ** использовать только числа;
      ** не использовать пробельные символы или другие символы, кроме чисел;`;
    }
    if (elem.nextSibling.nextSibling.hasAttribute("data-repeatPasswordErr")) {
      this.containerErrRegistrationRepeatPassword.style.opacity = "1";
      this.containerErrRegistrationRepeatPassword.innerHTML = `
      ** должен соответствовать полю "ПАРОЛЬ";`;
    }
  }
  //удаляем ошибку
  deleteErr(elem) {
    this.closeLayout();
    elem.classList.remove("err"); 
    elem.setAttribute("data-err", false); 
    this.containerErrRegistrationRepeatPassword.innerHTML = "";
    this.containerErrRegistrationPassword.innerHTML = "";
    this.containerErrRegistrationName.innerHTML = "";
    this.containerErrRegistrationRepeatPassword.style.opacity = "0";
    this.containerErrRegistrationPassword.style.opacity = "0";
    this.containerErrRegistrationName.style.opacity = "0";
  } 
  //обработка ошибок при вводе имени в форму регистрации
  errNickname(trueOrFalse) {
    let containerErrRegistrationName = document.querySelector("#containerErrRegistrationName");
    document.querySelector("#layout").style.display = "none";
    //ошибка возникающая, когда такое имя уже существует
    if (trueOrFalse) {
      let elem = document.querySelector("#registrationForm").elements["nickname"];
      elem.classList.add("err");
      elem.setAttribute("data-err", true);
      containerErrRegistrationName.style.opacity = "1"; 
      containerErrRegistrationName.innerHTML = "такое имя уже существует"; 
    } else {
    //удаляем ошибку возникающую, когда такое имя уже существует
      let elem = document.querySelector("#registrationForm").elements["nickname"]; 
      if (elem.classList.contains("err")) {
        elem.classList.remove("err");
      } 
      elem.setAttribute("data-err", false); 
      containerErrRegistrationName.style.opacity = "0"; 
      containerErrRegistrationName.innerHTML = "";
    }
  }
  //показать окно перекрытия
  showLayout() {
      document.querySelector("#layout").style.display = "block";
  }
  //закрыть окно перекрытия
  closeLayout() {
      document.querySelector("#layout").style.display = "none";
  }
}


