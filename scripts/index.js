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
  addCardButton = document.querySelector('.profile__add-button'),
  addCardForm = document.querySelector('#addCardForm'),
  addCardFormInputName = addCardForm.querySelector('.popup__input_value_name'),
  addCardFormInputDescription = addCardForm.querySelector('.popup__input_value_description'),
  cardsSection = document.querySelector('.cards'),
  cardTemplate = document.querySelector('#cardTemplate'),
  profileName = document.querySelector('.profile__name'),
  profileDescription = document.querySelector('.profile__description'),
  editProfilePopup = document.querySelector('#editProfilePopup'),
  closeEditProfilePopup = editProfilePopup.querySelector('.popup__close-button'),
  addCardPopup = document.querySelector('#addCardPopup'),
  closeAddCardPopup = addCardPopup.querySelector('.popup__close-button'),
  openImagePopup = document.querySelector('#openImagePopup'),
  closeOpenImagePopup = openImagePopup.querySelector('.popup__close-button'),
  popupImageEl = openImagePopup.querySelector('.popup__image'),
  popupImageCaptionEl = openImagePopup.querySelector('.popup__caption');


function getFilledTemplate(cardConfig) {
  const clone = cardTemplate.content.cloneNode(true);
  clone.querySelector('.card__image').src = cardConfig.link;
  clone.querySelector('.card__image').alt = cardConfig.alt;
  clone.querySelector('.card__title').textContent = cardConfig.name;
  clone.querySelector('.card__like-button').addEventListener('click', onLikeClicked);
  clone.querySelector('.card__trash-button').addEventListener('click', onTrashClicked);
  clone.querySelector('.card__image').addEventListener('click', onOpenImageClicked);
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
    initialCards.forEach(function(config) {
      appendCard(config);
    });
  }
};

function fillProfile() {
  editProfileFormInputName.value = profileName.textContent;
  editProfileFormInputDescription.value = profileDescription.textContent;
};

function onEditProfileSubmit(event) {
  event.preventDefault();
  editProfile();
  closePopup(editProfilePopup);
  editProfileForm.reset();
};

function editProfile() {
  profileName.textContent = editProfileFormInputName.value;
  profileDescription.textContent = editProfileFormInputDescription.value;
};

function onAddCardSubmit(event) {
  event.preventDefault();
  addCard();
  onCloseAddCardPopup(event);
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

function onEditProfileButton() {
  fillProfile();
  openPopup(editProfilePopup);
};

function onAddCardButton() {
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

function closePopupManually(popupEl) {
  switch (popupEl.id) {
    case 'editProfilePopup':
      onCloseEditProfilePopup();
      break;
    case 'addCardPopup':
      onCloseAddCardPopup();
      break;
    case 'openImagePopup':
      onCloseOpenImagePopup();
      break;
    default:
      break;
  }
};

function onOverlayClicked(event) {
  const targetEl = event.target;
  if (Array.from(targetEl.classList).indexOf('popup_opened') > 0) {
    closePopupManually(targetEl);
  }
};

function handleKeydown(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopupManually(openedPopup);
  }
};

function onCloseEditProfilePopup() {
  closePopup(editProfilePopup);
  editProfileForm.reset();
};

function onCloseAddCardPopup() {
  closePopup(addCardPopup);
  addCardForm.reset();
};

function onCloseOpenImagePopup() {
  closePopup(openImagePopup);
};

function onLikeClicked(event) {
  const buttonEl = event.target;
  buttonEl.classList.toggle('card__like-button_active');
};

function onTrashClicked(event) {
  const buttonEl = event.target;
  buttonEl.closest('.card').remove();
};

function onOpenImageClicked(event) {
  const imageEl = event.target;
  const cardEl = imageEl.closest('.card');
  const cardTitle = cardEl.querySelector('.card__title').textContent;
  popupImageEl.src = imageEl.src;
  popupImageEl.alt = imageEl.alt;
  popupImageCaptionEl.textContent = cardTitle;
  openPopup(openImagePopup);
};

closeEditProfilePopup.addEventListener('click', onCloseEditProfilePopup);
closeAddCardPopup.addEventListener('click', onCloseAddCardPopup);
closeOpenImagePopup.addEventListener('click', onCloseOpenImagePopup);

editProfileButton.addEventListener('click', onEditProfileButton);
editProfileForm.addEventListener('submit', onEditProfileSubmit);

addCardButton.addEventListener('click', onAddCardButton);
addCardForm.addEventListener('submit', onAddCardSubmit);

popupList.forEach((popupEl) => {
  popupEl.addEventListener('click', onOverlayClicked);
});

initCards();
enableValidation(validationConfig);