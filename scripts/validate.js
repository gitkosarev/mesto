function showInputError(formEl, inputEl, errorMessage, config) {
  const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
  inputEl.classList.add(config.inputErrorClass);
  errorEl.textContent = errorMessage;
  errorEl.classList.add(config.errorClass);
};

function hideInputError(formEl, inputEl, config) {
  const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
  inputEl.classList.remove(config.inputErrorClass);
  errorEl.classList.remove(config.errorClass);
  errorEl.textContent = '';
};

function checkValidity(formEl, inputEl, config) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
};

function toggleButtonState(formEl, config) {
  const buttonEl = formEl.querySelector(config.submitButtonSelector);
  if (formEl.checkValidity()) {
    buttonEl.classList.remove(config.inactiveButtonClass);
    buttonEl.disabled = false;
  } else {
    buttonEl.classList.add(config.inactiveButtonClass);
    buttonEl.disabled = true;
  }
};

function setEventListeners(formEl, config) {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  inputList.forEach((inputEl) => {
    inputEl.addEventListener('input', () => {
      checkValidity(formEl, inputEl, config);
      toggleButtonState(formEl, config);
    });
  });
};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
    toggleButtonState(formEl, config);
  });
};