export default class Card {
  constructor(data, templateSelector, handleImageClick) {
      this._data = data;
      this._templateSelector = templateSelector;
      this._handleImageClick = handleImageClick;
      this._clone = document.querySelector(this._templateSelector).content.cloneNode(true);
      this._imageEl = this._clone.querySelector('.card__image');
  }

  create() {
    this._fillData();
    this._setEventListeners();
    return this._clone;
  };

  _fillData() {
    this._clone.querySelector('.card__title').textContent = this._data.name;
    this._imageEl.src = this._data.link;
    this._imageEl.alt = this._data.alt;
  };

  _setEventListeners() {
    this._imageEl.addEventListener('click', () => {
      this._handleImageClick(this._data);
    });
    this._clone.querySelector('.card__like-button').addEventListener('click', this._handleLikeClick);
    this._clone.querySelector('.card__trash-button').addEventListener('click', this._handleTrashClick);
  };

  _handleLikeClick(event) {
    const buttonEl = event.target;
    buttonEl.classList.toggle('card__like-button_active');
  };
  
  _handleTrashClick(event) {
    const buttonEl = event.target;
    buttonEl.closest('.card').remove();
  };
  
}