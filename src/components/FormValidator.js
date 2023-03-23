export default class FormValidator {
  constructor(config, formEl) {
      this._config = config;
      this._formEl = formEl;
      this._buttonEl = this._formEl.querySelector(this._config.submitButtonSelector);
      this._inputList = Array.from(this._formEl.querySelectorAll(this._config.inputSelector));
  }

  enableValidation() {
    this._setEventListeners();
    this._toggleButtonState();
  };

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((item) => {
      this._hideInputError(item);
    });
  };
  
  _setEventListeners() {
    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener('input', () => {
        this._checkValidity(inputEl);
        this._toggleButtonState();
      });
    });
  };
  
  _toggleButtonState() {
    if (this._formEl.checkValidity()) {
      this._enableSubmitButton();
    } else {
      this._disableSubmitButton();
    }
  };

  _enableSubmitButton() {
    this._buttonEl.classList.remove(this._config.inactiveButtonClass);
    this._buttonEl.disabled = false;
  };

  _disableSubmitButton() {
    this._buttonEl.classList.add(this._config.inactiveButtonClass);
    this._buttonEl.disabled = true;
  };

  _showInputError(inputEl, errorMessage) {
    const errorEl = this._formEl.querySelector(`.${inputEl.id}-error`);
    inputEl.classList.add(this._config.inputErrorClass);
    errorEl.textContent = errorMessage;
    errorEl.classList.add(this._config.errorClass);
  };
  
  _hideInputError(inputEl) {
    const errorEl = this._formEl.querySelector(`.${inputEl.id}-error`);
    inputEl.classList.remove(this._config.inputErrorClass);
    errorEl.classList.remove(this._config.errorClass);
    errorEl.textContent = '';
  };
  
  _checkValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl, inputEl.validationMessage);
    } else {
      this._hideInputError(inputEl);
    }
  };
}