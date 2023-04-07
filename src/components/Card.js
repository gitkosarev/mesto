export default class Card {
  constructor(data, templateSelector, handleImageClick, handleRemoval, handleLike) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleRemoval = handleRemoval;
    this._handleLike = handleLike;
    this._clone = document.querySelector(this._templateSelector).content.cloneNode(true);
    this._imageEl = this._clone.querySelector('.card__image');
    this._likeButton = this._clone.querySelector('.card__like-button');
    this._trashButtonEl = this._clone.querySelector('.card__trash-button');
    this._likeCounterEl = this._clone.querySelector('.card__like-counter');
  }

  create() {
    this._fillData();
    this._setEventListeners();
    return this._clone;
  };

  _setLikeCounter(data) {
    this._likeCounterEl.textContent = data.likes ? data.likes.length : 0;
  };

  _setLikeByCurrentUser(data) {
    const likesArray = data.likes;
    if (likesArray.some((item) => item._id === data.currentUserId)) {
      this._likeButton.classList.add('card__like-button_active');
    }
  };

  _fillData() {
    this._clone.querySelector('.card__title').textContent = this._data.name;
    this._imageEl.src = this._data.link;
    this._imageEl.alt = this._data.alt;
    this._setLikeCounter(this._data);
    this._setLikeByCurrentUser(this._data);
  };

  _setEventListeners() {
    this._imageEl.addEventListener('click', () => {
      this._handleImageClick(this._data);
    });
    this._likeButton.addEventListener('click', this._handleLikeClick.bind(this));
    if (this._data.isOwner) {
      this._trashButtonEl.addEventListener('click', this._handleTrashClick.bind(this));
    } else {
      this._trashButtonEl.remove();
    }
  };

  _handleLikeClick(event) {
    const buttonEl = event.target;
    const isActive = buttonEl.classList.toggle('card__like-button_active');
    this._handleLike(isActive, this._data._id, (updatedData) => {
      this._setLikeCounter(updatedData);
    });
  };
  
  _handleTrashClick(event) {
    this._handleRemoval(
      this._data._id,
      function () {
        const buttonEl = event.target;
        this._removeCard(buttonEl);
      },
      this
    );
  };
  
  _removeCard(buttonEl) {
    buttonEl.closest('.card').remove();
  };
  
}