"use strict";
class EntryPageView {
  constructor(entryPageModel) {
    this.entryPageModel = entryPageModel;
    this.container = document.querySelector("#containerForPage");
    this.containerErrEntryName = null;
    this.containerErrEntryPassword = null;
  }
 update() {
   this.container.innerHTML = `
   <div id="containerForm">
    <form name="entryForm" id="entryForm">
        <label>ИМЯ:<br>
          <input type="text" name="nickname"> 
          <div id="containerErrEntryName" data-nameErr></div>
        </label>
        <br>
        <label>ПАРОЛЬ:<br> 
          <input type="password" name="password">
          <div id="containerErrEntryPassword" data-passwordErr></div>
        </label>
        <br>
        <input type="submit" value="ОТПРАВИТЬ">
      </form>
    </div>`;

    //сообщаем, что страница создана
    this.entryPageModel.myEventEntryPageLoad();
    this.containerErrEntryName = document.querySelector("#containerErrEntryName");
    this.containerErrEntryPassword = document.querySelector("#containerErrEntryPassword");
 }
 errNickname(trueOrFalse) {
   let containerErrEntryName = document.querySelector("#containerErrEntryName");
   document.querySelector("#layout").style.display = "none";
   if (trueOrFalse) {
    //ошибка возникающая, когда такого имя не существует
    // falseNicknameEntryForm() {
      let elem = document.querySelector("#entryForm").elements["nickname"];
      elem.classList.add("err");
      elem.setAttribute("data-err", true); 
      containerErrEntryName.style.opacity = "1";
      containerErrEntryName.innerHTML = "такого имени не существует";
      return;
    // }
   }  else {
     //такое имя существует
  // trueNicknameEntryForm() {
    let elem = document.querySelector("#entryForm").elements["nickname"]; 
    if (elem.classList.contains("err")) {
      elem.classList.remove("err");
    } 
    containerErrEntryName.style.opacity = "0";
    containerErrEntryName.innerHTML = "";
    elem.setAttribute("data-err", false); 
  // }
   return;
   }
 }
 errPassword(trueOrFalse) {
   let containerErrEntryPassword = document.querySelector("#containerErrEntryPassword");
   document.querySelector("#layout").style.display = "none";
  //ошибка, когда пароли не совпали
    if (trueOrFalse) {
      let elem = document.querySelector("#entryForm").elements["password"];
      elem.classList.add("err");
      elem.setAttribute("data-err", true);
      containerErrEntryPassword.style.opacity = "1";
      containerErrEntryPassword.innerHTML = "неправильный пароль";
      return;
    } else {
    //пароли совпали
    let elem = document.querySelector("#entryForm").elements["password"]; 
      if (elem.classList.contains("err")) {
        elem.classList.remove("err");
      } 
      elem.setAttribute("data-err", false); 
      containerErrEntryPassword.style.opacity = "0";
      containerErrEntryPassword.innerHTML = "";
      return;
    } 
  }
  //ошибка при неправильном вводе 
  err(elem) {
    this.closeLayout();
    elem.classList.add("err");
    elem.setAttribute("data-err", true); 
   if (elem.nextSibling.nextSibling.hasAttribute("data-nameErr")) {
      this.containerErrEntryName.style.opacity = "1";
      this.containerErrEntryName.innerHTML = `
      ** имя не должно быть больше 30 символов;
      ** использовать только киррилицу или латиницу;
      ** можно использовать только буквы, числа и пробельные символы;`;
   }
   if (elem.nextSibling.nextSibling.hasAttribute("data-passwordErr")) {
      this.containerErrEntryPassword.style.opacity = "1";
      this.containerErrEntryPassword.innerHTML = `
      ** пароль не должен быть больше 10 символов и меньше 5 символов;
      ** использовать только числа;
      ** не использовать пробельные символы или другие символы, кроме чисел;
      ** должен совпадать с тем паролем, который был указан в форме регистрации`;
   }
  }
  //удаляем ошибку
  deleteErr(elem) {
    this.closeLayout();
    elem.classList.remove("err"); 
    elem.setAttribute("data-err", false); 
    this.containerErrEntryName.innerHTML = "";
    this.containerErrEntryPassword.innerHTML = "";
    this.containerErrEntryPassword.style.opacity = "0";
    this.containerErrEntryName.style.opacity = "0";
  } 
  //показать перекрытие
  showLayout() {
    document.querySelector("#layout").style.display = "block";
  }
  //закрыть прекрытие
  closeLayout() {
    document.querySelector("#layout").style.display = "none";
  }
}

