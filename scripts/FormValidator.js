export default class FormValidator {
  constructor(config, formEl) {
      this._config = config;
      this._formEl = formEl;
  }

  enableValidation() {
    this._setEventListeners();
    this.toggleButtonState();
  };
  
  toggleButtonState() {
    const buttonEl = this._formEl.querySelector(this._config.submitButtonSelector);
    if (this._formEl.checkValidity()) {
      buttonEl.classList.remove(this._config.inactiveButtonClass);
      buttonEl.disabled = false;
    } else {
      buttonEl.classList.add(this._config.inactiveButtonClass);
      buttonEl.disabled = true;
    }
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
  
  _setEventListeners() {
    const inputList = Array.from(this._formEl.querySelectorAll(this._config.inputSelector));
    inputList.forEach((inputEl) => {
      inputEl.addEventListener('input', () => {
        this._checkValidity(inputEl);
        this.toggleButtonState();
      });
    });
  };
}