/* eslint-disable no-new */
/* eslint-disable class-methods-use-this */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
class RegistrationController {
  constructor() {
    // Registration Form Settings
    this.registrationForm = {
      formName: 'registrationForm',
      formFields: {
        name: '',
        loginId: '',
        email: '',
        homepage: '',
        about: '',
        notificationCheck: '',
      },
    };
    // Access Form Instance
    this.dataForm = document.forms[this.registrationForm.formName];
    // Adds Submit Event Listener
    this.dataForm.addEventListener('submit', e => this.formSubmitListener(e), false);
  }

  formSubmitListener(e) {
    e.preventDefault();
    const fields = this.registrationForm.formFields;
    for (const prop in fields) {
      const formFieldValue = this.dataForm[prop].value;
      if (formFieldValue) {
        fields[prop] = formFieldValue;
      } else {
        alert(`${prop.toUpperCase()} Field is Empty`);
        return;
      }
    }
    this.postData(this.registrationForm.formFields);
  }

  // Stores Data as stringified JSON in localStorage
  postData(data) {
    localStorage.setItem('formData', JSON.stringify(data));
    this.dataForm.reset();
    alert('Registration Form Submitted SuccessFully !');
  }
}

// Script Hit Point with IIFE
(function initializeFormController() {
  new RegistrationController();
}());
