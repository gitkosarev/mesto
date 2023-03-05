export default class FormValidator {
  constructor(config, formEl) {
      this._config = config;
      this._formEl = formEl;
  }

  enableValidation() {
    this._setEventListeners(this._formEl, this._config);
    this._toggleButtonState(this._formEl, this._config);
  };

  _showInputError(formEl, inputEl, errorMessage, config) {
    const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
    inputEl.classList.add(config.inputErrorClass);
    errorEl.textContent = errorMessage;
    errorEl.classList.add(config.errorClass);
  };
  
  _hideInputError(formEl, inputEl, config) {
    const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
    inputEl.classList.remove(config.inputErrorClass);
    errorEl.classList.remove(config.errorClass);
    errorEl.textContent = '';
  };
  
  _checkValidity(formEl, inputEl, config) {
    if (!inputEl.validity.valid) {
      this._showInputError(formEl, inputEl, inputEl.validationMessage, config);
    } else {
      this._hideInputError(formEl, inputEl, config);
    }
  };
  
  _toggleButtonState(formEl, config) {
    const buttonEl = formEl.querySelector(config.submitButtonSelector);
    if (formEl.checkValidity()) {
      buttonEl.classList.remove(config.inactiveButtonClass);
      buttonEl.disabled = false;
    } else {
      buttonEl.classList.add(config.inactiveButtonClass);
      buttonEl.disabled = true;
    }
  };
  
  _setEventListeners(formEl, config) {
    const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
    inputList.forEach((inputEl) => {
      inputEl.addEventListener('input', () => {
        this._checkValidity(formEl, inputEl, config);
        this._toggleButtonState(formEl, config);
      });
    });
  };
}