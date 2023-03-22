import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImageEl = this._element.querySelector('.popup__image');
    this._popupImageCaptionEl = this._element.querySelector('.popup__caption');
  }

  open(cardConfig) {
    this._popupImageCaptionEl.textContent = cardConfig.name;
    this._popupImageEl.src = cardConfig.link;
    this._popupImageEl.alt = cardConfig.alt;
    super.open();
  };
}