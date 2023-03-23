import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this._handleSubmit = handleSubmit;
    this._formEl = this._element.querySelector('.popup__form');
    this._inputList = Array.from(this._element.querySelectorAll('.popup__input'));
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._formEl.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  };
  
  close() {
    super.close();
    this._formEl.reset();
  };

  _getInputValues() {
    const dataArray = {};
    this._inputList.forEach((input) => {
      dataArray[input.name] = input.value;
    });
    return dataArray;
  };
}