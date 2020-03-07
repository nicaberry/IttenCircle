"use strict";
class RegistrationPageModel {
  constructor(ajaxStorageModel, personalAreaPageModel, localStorageModel) {
   this.ajaxStorageModel = ajaxStorageModel;
   this.registrationPageView = null;
   this.registrationForm = null;
   this.personalAreaPageModel = personalAreaPageModel;
   this.localStorageModel = localStorageModel;
   this.nickname = null;
  }
  //установить registrationPageView
  setRegistrationPageViewInModel(view) {
    this.registrationPageView = view;
  }
  //передача имени
  getNickname() {
    return this.nickname;
  }
  //обновить 
  updateView() {
    this.registrationPageView.update();
  }
  //устанавливаем registrationForm
  setRegistrationForm() {
    this.registrationForm = document.querySelector("#registrationForm");
  }
  //передаём registrationForm
  getRegistrationForm() {
    return this.registrationForm;
  }
  //валидация input формы
  validateInputForm(e, self) {
    e = e || window.event;
    //определяем какое поле и валидизируем его
    if (e.target.name === "nickname") {
      self.funcValidator(e, self.nicknameValidate, self);
    }
    if (e.target.name === "password") {
      self.funcValidator(e, self.passwordValidate, self);
    }
    if (e.target.name === "repeatPassword") {
      self.funcValidator(e, self.repeatPasswordValidate, self);
    }
  }
  //валидация для отправки формы
  validateSubmitForm(e, self) {
    e = e || window.event;
    //проверка на пустые поля
    let nickname = self.registrationForm.elements["nickname"].value;
    let password = self.registrationForm.elements["password"].value;
    let repeatPassword = self.registrationForm.elements["repeatPassword"].value;
     //проверка на ошибки
    let nicknameErr = self.registrationForm.elements["nickname"].dataset.err;
    let passwordErr = self.registrationForm.elements["password"].dataset.err;
    let repeatPasswordErr = self.registrationForm.elements["repeatPassword"].dataset.err; 
    //условия
    if ( nickname === "" || password === "" || repeatPassword === "" ) {
            e.preventDefault();
    } else if ( nicknameErr === "true" || passwordErr === "true" || repeatPasswordErr === "true" ) {
        e.preventDefault();
    } else {
        //включаем окно ожидания
        self.registrationPageView.showLayout();
        //устанавливаем в удалённый сервер данные: "nickname: {password: password...}", и переходим в личный кабинет
        
        self.nickname = nickname;
        self.ajaxStorageModel.setClientInAjaxStorageCI(nickname, password, self.personalAreaPageModel);
        //this.localStorageModel.setData({"nickname": "lolik", "avatar": null});
        e.preventDefault();
    }
  }
  //фунция для связи поля формы и её валидации
  funcValidator(e, nameFuncValidate, self) {
      let result = nameFuncValidate(e.target.value, self);
      if (!result) {
        this.registrationPageView.err(e.target);
      } else {
        this.registrationPageView.deleteErr(e.target);
      }
      return;
  }
  //валидация имени пользователя
  /*Правила валидации поля "ИМЯ" должно подчинятся следующим правилам:
    ** имя не должно быть больше 30символов;
    ** использовать только киррилицу или латиницу;
    ** можно использовать только буквы, числа и пробельные символы;
    ** должно быть уникальным, при совпадении уже с существующим именем другого пользователя будет ошибка;
  */
  nicknameValidate(value, self) {
    value = value.trim();
    let regexp = /^([0-9 a-z а-я]{1,30})$/ig
    let result = true;
    if (value !== "") {
          result = regexp.test(value);
          if (result) {
            //вешаем событие  change чтобы запрос на сервер уходил только после потери элементом фокуса, а ни прикаждом изменении 
            self.registrationForm.elements["nickname"].onchange = function() {
              //передаём запрос на удалённый сервер для проверки о том существует такое имя или нет
              //включаем окно ожидания
              self.registrationPageView.showLayout();
              self.ajaxStorageModel.validateRegistrationFormNickname(value, self.registrationPageView.errNickname);
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
  */
  passwordValidate(value, self) {
    self.registrationForm.elements["repeatPassword"].value = "";//делаем так, что бы не сделать ошибок в поле "повторите пароль"
    value = value.trim();
    let regexp = /^([0-9]{5,10})$/ig
    let result = true;
    if (value !== "") {
          result = regexp.test(value);
    } 
    return result;
  }
  //валидация повтора пароля пользователя
  /*Правила валидации поля "ПОВТОРИТЕ ПАРОЛЬ" должно подчинятся следующим правилам:
    ** должен соответствовать полю "ПАРОЛЬ";
  */
  repeatPasswordValidate(value, self) {
    value = value.trim();
    let password = self.registrationForm.elements["password"].value;
    let result = true;
    if (value !== "") {
          result = (password === value);
    } 
    return result;
  }
  // создаём событие, что бы включить валидизацию формы
  myEventRegistrationFormLoad() {
    let myEventRegistrationForm = new Event("registrationFormLoad");
    document.dispatchEvent(myEventRegistrationForm);
  }
}


