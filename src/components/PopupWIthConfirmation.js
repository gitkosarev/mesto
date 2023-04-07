import Popup from "./Popup.js";

export default class PopupWIthConfirmation extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this._handleSubmit = handleSubmit;
    this._formEl = this._element.querySelector('.popup__form');
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._formEl.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmit();
    });
  };
  
  open(handleSubmit) {
    super.open();
    this._handleSubmit = handleSubmit;
  };

}