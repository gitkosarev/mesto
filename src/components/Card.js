export default class Card {
  constructor(data, templateSelector, handleImageClick, handleRemoval) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleRemoval = handleRemoval;
    this._clone = document.querySelector(this._templateSelector).content.cloneNode(true);
    this._imageEl = this._clone.querySelector('.card__image');
    this._likeCounterEl = this._clone.querySelector('.card__like-counter');
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
    this._likeCounterEl.textContent = this._data.likes.length
  };

  _setEventListeners() {
    this._imageEl.addEventListener('click', () => {
      this._handleImageClick(this._data);
    });
    this._clone.querySelector('.card__like-button').addEventListener('click', this._handleLikeClick);
    this._clone.querySelector('.card__trash-button').addEventListener('click', this._handleTrashClick.bind(this));
  };

  _handleLikeClick(event) {
    const buttonEl = event.target;
    buttonEl.classList.toggle('card__like-button_active');
  };
  
  _handleTrashClick(event) {
    this._handleRemoval(function (isConfirmed) {
      if (isConfirmed) {
        const buttonEl = event.target;
        this._removeCard(buttonEl);
      }
    }, this);
  };
  
  _removeCard(buttonEl) {
    buttonEl.closest('.card').remove();
  };
  
}