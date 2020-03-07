"use strict";
class EntryPageModel {
  constructor(ajaxStorageModel, personalAreaPageModel) {
    this.ajaxStorageModel = ajaxStorageModel;
    this.entryPageView = null;
    this.entryForm = null;
    this.nickname = null;
    this.personalAreaPageModel = personalAreaPageModel;
  }
  //установить форму входа в модель входа
  setEntryFormInEntryPageModel() {
    this.entryForm = document.querySelector("#entryForm");
  }
  //передача формы входа
  getEntryForm() {
    return this.entryForm;
  }
  //передача имени
  getNickname() {
    return this.nickname;
  }
  //установить отображения входа в модель входа
  setEntryPageView(view) {
    this.entryPageView = view; 
  }
  //обновить отображения входа
  updateView() {
    this.entryPageView.update();
  }
  //валидация формы
  validateForm(e, self) {
    e = e || window.event;
    //определяем какое поле и валидизируем его
    if (e.target.name === "nickname") {
      self.funcValidator(e, self.nicknameValidate, self);
    }
    if (e.target.name === "password") {
      self.funcValidator(e, self.passwordValidate, self);
    }
  }
  //валидация для отправки формы
  validateSubmitForm(e, self) {
    e = e || window.event;
    //проверка на пустые поля
    let nickname = self.entryForm.elements["nickname"].value;
    let password = self.entryForm.elements["password"].value;
     //проверка на ошибки
    let nicknameErr = self.entryForm.elements["nickname"].dataset.err;
    let passwordErr = self.entryForm.elements["password"].dataset.err; 
    //условия
    if ( nickname === "" || password === "" ) {
            e.preventDefault();
    } else if ( nicknameErr === "true" || passwordErr === "true" ) {
        e.preventDefault();
    } else {
        //включаем окно ожидания
        self.entryPageView.showLayout();
        //переходим в личный кабинет
        self.nickname = nickname;
        self.ajaxStorageModel.getData(self.nickname, self.personalAreaPageModel);
        window.location.hash = encodeURIComponent("personalArea");
        e.preventDefault();
    }
  }
  //фунция для связи поля формы и её валидации
  funcValidator(e, nameFuncValidate, self) {
      let result = nameFuncValidate(e.target.value, self);
      if (!result) {
        this.entryPageView.err(e.target);
      } else {
        this.entryPageView.deleteErr(e.target);
      }
      return;
  }
   //валидация имени пользователя
  /*Правила валидации поля "ИМЯ" должно подчинятся следующим правилам:
    ** имя не должно быть больше 30символов;
    ** использовать только киррилицу или латиницу;
    ** можно использовать только буквы, числа и пробельные символы;
    ** должно быть уникальным (совпадать с тем именем, которое было указано во время регистрации), при совпадении уже с существующим именем другого пользователя будет ошибка;
  */
  nicknameValidate(value, self) {
    value = value.trim();
    let regexp = /^([0-9 a-z а-я]{1,30})$/ig
    let result = true;
    if (value !== "") {
          result = regexp.test(value);
          if (result) {
            //вешаем событие  change чтобы запрос на сервер уходил только после потери элементом фокуса, а ни прикаждом изменении 
            self.entryForm.elements["nickname"].onchange = function() {
              //передаём запрос на удалённый сервер для проверки о том существует такое имя или нет
              self.ajaxStorageModel.validateEntryFormNickname(value, self.entryPageView.errNickname); 
            }
          }
    } 
    return result;
  }
  //валидация пароля пользователя
  /*Правила валидации поля "ПАРОЛЬ" должно подчинятся следующим правилам:
    ** пароль не должен быть больше 10 символов и меньше 5 символов;
    ** использовать только числа;
    ** не использовать пробельные символы или другие символы, кроме чисел;
    ** должен совпадать с тем паролем, который был указан в форме регистрации;
  */
  passwordValidate(value, self) {
    value = value.trim();
    let regexp = /^([0-9]{5,10})$/ig
    let result = true;
    if (value !== "") {
          result = regexp.test(value);
          if (result) {
            //вешаем событие  change чтобы запрос на сервер уходил только после потери элементом фокуса, а ни прикаждом изменении 
            self.entryForm.elements["password"].onchange = function() {
              //передаём метод на удалённый сервер для проверки о том совпадает такой пароль или нет
              self.ajaxStorageModel.validateEntryFormPassword(value, self.entryPageView.errPassword);
            }
          }
    } 
    return result;
  }
  // создаём событие, что бы включить валидизацию формы
  myEventEntryPageLoad() {
    let myEventEntryForm = new Event("entryFormLoad");
    document.dispatchEvent(myEventEntryForm);
  }
}


