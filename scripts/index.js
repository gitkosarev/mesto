const initialCards = [
  {
    name: 'Алтай',
    link: './images/cards/altai.jpg',
    alt: 'фото Алтай'
  },
  {
    name: 'Камчатка',
    link: './images/cards/kamchatka.jpg',
    alt: 'фото Камчатка'
  },
  {
    name: 'Байкал',
    link: './images/cards/baikal.jpg',
    alt: 'фото Байкал'
  },
  {
    name: 'Домбай',
    link: './images/cards/dombai.png',
    alt: 'фото Домбай'
  },
  {
    name: 'Эльбрус',
    link: './images/cards/elbrus.png',
    alt: 'фото Эльбрус'
  },
  {
    name: 'Альпы',
    link: './images/cards/alps.jpg',
    alt: 'фото Альпы'
  }
];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const popupList = Array.from(document .querySelectorAll('.popup')),
  editProfileButton = document.querySelector('.profile__edit-button'),
  editProfileForm = document.querySelector('#editProfileForm'),
  editProfileFormInputName = editProfileForm.querySelector('.popup__input_value_name'),
  editProfileFormInputDescription = editProfileForm.querySelector('.popup__input_value_description'),
  addCardButtonEl = document.querySelector('.profile__add-button'),
  addCardForm = document.querySelector('#addCardForm'),
  addCardFormInputName = addCardForm.querySelector('.popup__input_value_name'),
  addCardFormInputDescription = addCardForm.querySelector('.popup__input_value_description'),
  cardsSection = document.querySelector('.cards'),
  cardTemplate = document.querySelector('#cardTemplate'),
  profileName = document.querySelector('.profile__name'),
  profileDescription = document.querySelector('.profile__description'),
  editProfilePopup = document.querySelector('#editProfilePopup'),
  addCardPopup = document.querySelector('#addCardPopup'),
  openImagePopup = document.querySelector('#openImagePopup'),
  popupImageEl = openImagePopup.querySelector('.popup__image'),
  popupImageCaptionEl = openImagePopup.querySelector('.popup__caption');


function getFilledTemplate(cardConfig) {
  const clone = cardTemplate.content.cloneNode(true);
  const imageEl = clone.querySelector('.card__image');
  imageEl.src = cardConfig.link;
  imageEl.alt = cardConfig.alt;
  imageEl.addEventListener('click', () => {
    handleImageClick(cardConfig);
  });
  clone.querySelector('.card__title').textContent = cardConfig.name;
  clone.querySelector('.card__like-button').addEventListener('click', handleLikeClick);
  clone.querySelector('.card__trash-button').addEventListener('click', handleTrashClick);
  return clone;
};

function appendCard(cardConfig) {
  const clone = getFilledTemplate(cardConfig);
  cardsSection.appendChild(clone);
};

function prependCard(cardConfig) {
  const clone = getFilledTemplate(cardConfig);
  cardsSection.prepend(clone);
};

function initCards() {
  if ('content' in document.createElement('template')) {
    initialCards.forEach(appendCard);
  }
};

function fillProfile() {
  editProfileFormInputName.value = profileName.textContent;
  editProfileFormInputDescription.value = profileDescription.textContent;
};

function handleProfileSubmit(event) {
  event.preventDefault();
  editProfile();
  closePopup(editProfilePopup);
};

function editProfile() {
  profileName.textContent = editProfileFormInputName.value;
  profileDescription.textContent = editProfileFormInputDescription.value;
};

function handleAddCardSubmit(event) {
  event.preventDefault();
  addCard();
  addCardForm.reset();
  closePopup(addCardPopup);
  toggleButtonState(addCardForm, validationConfig);
};

function addCard() {
  const config = {
    name: addCardFormInputName.value,
    link: addCardFormInputDescription.value,
    alt: `фото ${addCardFormInputName.value}`
  };
  prependCard(config);
};

function handleEditProfileClick() {
  fillProfile();
  openPopup(editProfilePopup);
};

function handleAddCardClick() {
  openPopup(addCardPopup);
};

function openPopup(popupEl) {
  popupEl.classList.add('popup_opened');
  document.addEventListener('keydown', handleKeydown);
};

function closePopup(popupEl) {
  popupEl.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleKeydown);
};

function handleKeydown(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

function handleLikeClick(event) {
  const buttonEl = event.target;
  buttonEl.classList.toggle('card__like-button_active');
};

function handleTrashClick(event) {
  const buttonEl = event.target;
  buttonEl.closest('.card').remove();
};

function handleImageClick(cardConfig) {
  popupImageEl.src = cardConfig.link;
  popupImageEl.alt = cardConfig.alt;
  popupImageCaptionEl.textContent = cardConfig.name;
  openPopup(openImagePopup);
};

editProfileButton.addEventListener('click', handleEditProfileClick);
editProfileForm.addEventListener('submit', handleProfileSubmit);

addCardButtonEl.addEventListener('click', handleAddCardClick);
addCardForm.addEventListener('submit', handleAddCardSubmit);

popupList.forEach((popup) => {
  // больше спасибо за такое решение - супер!
  popup.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (event.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});

initCards();
enableValidation(validationConfig);