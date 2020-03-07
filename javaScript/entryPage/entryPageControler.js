"use strict";
class EntryPageControler {
  constructor(entryPageModel) {
    this.entryPageModel = entryPageModel;
    this.entryForm = null;

    this.listenerLoadForm();
  }
 //ловим загрузку формы
  listenerLoadForm() {
    let self = this;
    document.addEventListener("entryFormLoad", function() { 
      self.entryPageModel.setEntryFormInEntryPageModel();
      self.entryForm = self.entryPageModel.getEntryForm();
      self.listenerForm();
    }, false);
  }

  listenerForm() {
    this.entryForm.oninput = (e) => this.entryPageModel.validateForm(e, this.entryPageModel);
    this.entryForm.onsubmit = (e) => this.entryPageModel.validateSubmitForm(e, this.entryPageModel);
  }
}

