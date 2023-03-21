export default class Popup {
  constructor(selector) {
    this._element = document.querySelector(selector);
    this._bindedHandleEscClose = this._handleEscClose.bind(this);
  }
  
  setEventListeners() {
    this._element.addEventListener('mousedown', this._bindedHandleMousedownClose.bind(this));
  };

  _bindedHandleMousedownClose(event) {
    if (event.target.classList.contains('popup_opened')) {
      this.close();
    }
    if (event.target.classList.contains('popup__close-button')) {
      this.close();
    }
  };
  
  open() {
    this._element.classList.add('popup_opened');
    document.addEventListener('keydown', this._bindedHandleEscClose);
  };
  
  close() {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._bindedHandleEscClose);
  };
  
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  };
}