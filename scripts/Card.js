import { cardTemplate, handleImageClick } from "./utility.js";

export default class Card {
  constructor(data, templateSelector) {
      this._data = data;
      this._templateSelector = templateSelector;
  }

  create() {
    const clone = cardTemplate.content.cloneNode(true);
    const imageEl = clone.querySelector('.card__image');
    imageEl.src = this._data.link;
    imageEl.alt = this._data.alt;
    imageEl.addEventListener('click', () => {
      handleImageClick(this._data);
    });
    clone.querySelector('.card__title').textContent = this._data.name;
    clone.querySelector('.card__like-button').addEventListener('click', this._handleLikeClick);
    clone.querySelector('.card__trash-button').addEventListener('click', this._handleTrashClick);
    return clone;
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