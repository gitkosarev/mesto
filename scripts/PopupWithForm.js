import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this._handleSubmit = handleSubmit;
    this._formEl = this._element.querySelector('.popup__form');
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._formEl.addEventListener('submit', this._handleSubmit);
  };
  
  close() {
    super.close();
    this._formEl.reset();
  };

  _getInputValues() {
    const dataArray = {};
    const inputList = Array.from(this._element.querySelectorAll('.popup__input'));
    inputList.forEach((input) => {
      dataArray[input.name] = input.value;
    });
    return dataArray;
  };
}