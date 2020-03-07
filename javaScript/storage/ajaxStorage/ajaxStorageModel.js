"use strict";
class AjaxStorageModel {
  constructor() {
    this.stringName = 'SONICH_ANNA_AJAX_STORAGE_CI';
    this.ajaxURL = "https://fe.it-academy.by/AjaxStringStorage2.php";
    this.storage = {};
    this.valueNicknameRegistrationForm = null;
    this.valueNicknameEntryForm = null;
    this.updatePassword = null;
    this.passwordEntryForm = null;
    this.updateForAvatarPassword = null;
    this.id = null;
    this.model = null;
    this.nickname = null;
    this.data = null;
    this.callbackRegistrationNickname = null;
    this.callbackEntryNickname = null;
    this.model2 = null;
    this.updatePassword2 = null;
    this.createAjaxStorage();
  }
  ////////////////////////////////////////////////////////////
  //создаём удалённый сервер 
  createAjaxStorage() {
    $.ajax({
      url: this.ajaxURL, type: 'POST', cache: false, dataType: 'json',
      data: { f: 'READ', n: this.stringName },
      success: this.addAjaxStorageCI.bind(this), error: this.errorAjax.bind(this)
    });
  }
  //проверяем существует или нет удалённый сервер, если нет, то создаём
  addAjaxStorageCI(data) {
    if (data.error != undefined) {
      alert(data.error);
      return;
    }
    if (data.result == "" && data.error === undefined) {
      $.ajax({
        url: this.ajaxURL, type: 'POST', cache: false, dataType: 'json',
        data: { f: 'INSERT', n: this.stringName, v: JSON.stringify(this.storage) },
        success: this.successCreateAjaxStorage.bind(this), error: this.errorAjax.bind(this)
      });
    }
  }
  successCreateAjaxStorage() {
    alert("eee");
  }
  ///////////////////////////////////////////////////
  //валидация формы регистрации - "nickname" 
  //сокращения: ASCI - ajax storage circle itten; 
  //VRFN - validate registrator form nickname;
  validateRegistrationFormNickname(value, callback) {
    this.callbackRegistrationNickname = callback;
    //устанавливаем значение "имя" из формы регистрации в класс
    this.valueNicknameRegistrationForm = value;
    $.ajax({
      url: this.ajaxURL, type: 'POST', cache: false, dataType: 'json',
      data: { f: 'READ', n: this.stringName },
      success: this.readASCIForVRFN.bind(this), error: this.errorAjax.bind(this)
    }); 
  }
  //получаем данные с удалленного сервера
  readASCIForVRFN(data) {
    if (data.error != undefined) {
      alert(data.error);
      return;
    } 
    this.storage = JSON.parse(data.result);
    //перебираем наш сервер и ищем совпадения
    for (let key in this.storage) {
      if (key === this.valueNicknameRegistrationForm) {
       this.callbackRegistrationNickname(true);//вызываем метод для отображения ошибки;
       this.callbackRegistrationNickname = null;
       return;
      } 
    }
    //выполняется если нет ошибок
      this.callbackRegistrationNickname(false); //вызываем метод для удаления ошибки;
      this.callbackRegistrationNickname = null;
      return;
  }
  ///////////////////////////////////////////////////
  //валидация формы входа в личный кабинет - "nickname" 
  //сокращения: ASCI - ajax storage circle itten; 
  //VEFN - validate entry form nickname;
  validateEntryFormNickname(value, callback) {
    //устанавливаем значение "имя" из формы входа в класс
    this.valueNicknameEntryForm = value;
    this.callbackEntryNickname = callback;
    $.ajax({
      url: this.ajaxURL, type: 'POST', cache: false, dataType: 'json',
      data: { f: 'READ', n: this.stringName },
      success: this.readASCIForVEFN.bind(this), error: this.errorAjax.bind(this)
    }); 
  }
  //получаем данные с удалленного сервера
  readASCIForVEFN(data) {
    if (data.error != undefined) {
      alert(data.error);
      return;
    } 
    this.storage = JSON.parse(data.result);
    //перебираем наш сервер и ищем совпадения
    for (let key in this.storage) {
      if (key === this.valueNicknameEntryForm) {
        //вызываем метод для сообщении о совпадении
        this.callbackEntryNickname(false);
        this.callbackEntryNickname  = null;
        this.passwordEntryForm = this.storage[key]["password"];
        return;
      } 
    }
     //вызываем метод для сообщения о том, что такого пользователя нет;
    this.callbackEntryNickname(true);
    this.callbackEntryNickname  = null;
    return;
  }
  //сверяем пароли
  validateEntryFormPassword(value, callback) {
    if (value === this.passwordEntryForm) {
      callback(false); //вызываем метод для сообщения о том, что пароли совпадают
    } else {
      callback(true); //вызываем метод для сообщения о том, что пароли не совпадают
    }
  }
  /////////////////////////////////////////////////////////////////////
  //устанавливаем в удалённый сервер имя и пароль из формы регистрации
  setClientInAjaxStorageCI(nickname, password, model) {
    this.model2 = model;
    this.nickname = nickname;
    this.storage[nickname] = {'password': password, 'data': {'nickname': nickname, 'avatar': null,},};
    if (!this.updatePassword) {
      this.updatePassword = this.createPassword();
    }
    $.ajax({
      url: this.ajaxURL, type: 'POST', cache: false, dataType: 'json',
      data: { f: 'LOCKGET', n: this.stringName, p: this.updatePassword },
      success: this.ajaxStorageCIUPDATE.bind(this), error: this.errorAjax.bind(this)
    });
  }
  //обновляем AjaxStorageCI
  ajaxStorageCIUPDATE() {
    $.ajax({
      url: this.ajaxURL, type: 'POST', cache: false, dataType: 'json',
      data: { f: 'UPDATE', n: this.stringName, p: this.updatePassword, v: JSON.stringify(this.storage) },
      success: this.successASCIUpdate.bind(this), error: this.errorAjax.bind(this)
    });
  }
  //метод для успешного обновления ASCI
  successASCIUpdate(data) {
    if (data.error != undefined) {
      alert(data.error);
    }
    this.getData(this.nickname, this.model2);
    window.location.hash = encodeURIComponent("personalArea");
  }
  // создаём пароль
  createPassword() {
    return Math.random();
  }
  /////////////////////////////////////////////////////////////
  //устанавливаем аватар
  //устанавливаем в удалённый сервер аватар
  setAvatarInAjaxStorageCI(nickname, avatarSrc) {
    this.storage[nickname]['data']['avatar'] = avatarSrc;
    if (!this.updateForAvatarPassword) {
      this.updateForAvatarPassword = this.createPassword();
    }
    $.ajax({
      url: this.ajaxURL, type: 'POST', cache: false, dataType: 'json',
      data: { f: 'LOCKGET', n: this.stringName, p: this.updateForAvatarPassword },
      success: this.ajaxStorageAvatarCIUPDATE.bind(this), error: this.errorAjax.bind(this)
    });
  }
  //обновляем AjaxStorageCI
  ajaxStorageAvatarCIUPDATE() {
    $.ajax({
      url: this.ajaxURL, type: 'POST', cache: false, dataType: 'json',
      data: { f: 'UPDATE', n: this.stringName, p: this.updateForAvatarPassword, v: JSON.stringify(this.storage) },
      success: this.successAvatarASCIUpdate.bind(this), error: this.errorAjax.bind(this)
    });
  }
  //метод для успешного обновления ASCI
  successAvatarASCIUpdate(data) {
    if (data.error != undefined) {
      alert(data.error);
    }
  }
  ////////////////////////////////////////////////////////////
  //получение data по имени пользователя для построения страницы
  getData(id, model) {
    this.id = id;
    this.model = model;
    $.ajax({
      url: this.ajaxURL, type: 'POST', cache: false, dataType: 'json',
      data: { f: 'READ', n: this.stringName },
      success: this.getDataSuccess.bind(this), error: this.errorAjax.bind(this)
    }); 
  }
  getDataSuccess(data) {
    if (data.error !== undefined) {
      alert(data.error);
      return;
    } 
    this.storage = JSON.parse(data.result);
    //перебираем наш сервер и ищем совпадения
    for (let key in this.storage) {
      if (key === this.id) {
        let persona = this.storage[key];
        let data = persona['data'];
        this.model.setData(data);
      } 
    }
  }
  ///////////////////////////////////////////////////////////
  //метод для обработки ошибок при использовании Ajax
  errorAjax(jqXHR, statusStr, errorStr) {
    alert(statusStr + ' ' + errorStr + 11);
  }

  ///////////////////////////////////////////////////////
  //удаление данных в AjaxStorageCI
  // deleteAjaxStorage() {
  //   $.ajax({
  //     url: this.ajaxURL, type: 'POST', cache: false, dataType: 'json',
  //     data: { f: 'READ', n: this.stringName },
  //     success: this.successDELETE.bind(this), error: this.errorAjax.bind(this)
  //   });
  // }

  // successDELETE() {
  //   this.updatePassword2 = this.createPassword();
  //     $.ajax({
  //       url: this.ajaxURL, type: 'POST', cache: false, dataType: 'json',
  //       data: { f: 'LOCKGET', n: this.stringName, p: JSON.stringify(this.updatePassword2) },
  //       success: () => this.deleteStorageUPDATE(this.updatePassword2), error: this.errorAjax.bind(this)
  //     });
  // }
  //  deleteStorageUPDATE(password) {
  //   this.storage = {};
  //   $.ajax({
  //     url: this.ajaxURL, type: 'POST', cache: false, dataType: 'json',
  //     data: { f: 'UPDATE', n: this.stringName, p: JSON.stringify(password), v: JSON.stringify(this.storage) },
  //     success: this.successDeleteUpdate.bind(this), error: this.errorAjax.bind(this)
  //   });
  // }
  // successDeleteUpdate(data) {
  //   if (data.error != undefined) {
  //     alert(data.error);
  //     return;
  //   }
  // }
}



