"use strict";
class RegistrationPageControler {
  constructor(registrationPageModel) {
    this.registrationPageModel = registrationPageModel;
    this.registrationForm = null;
    this.listenerLoadForm();
  }
  //ловим загрузку формы
  listenerLoadForm() {
    let self = this;
    document.addEventListener("registrationFormLoad", function() { 
      self.registrationPageModel.setRegistrationForm();
      self.registrationForm = self.registrationPageModel.getRegistrationForm();
      self.listenerForm();
    }, false);
  }
  //ловим изменения в форме
  listenerForm() {
    this.registrationForm.oninput = (e) => this.registrationPageModel.validateInputForm(e, this.registrationPageModel);
    this.registrationForm.onsubmit = (e) => this.registrationPageModel.validateSubmitForm(e, this.registrationPageModel);
  }
}

