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
  toggleButtonState(addCardForm);
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

function onOverlayClicked(event) {
  const targetEl = event.target;
  if (Array.from(targetEl.classList).indexOf('popup_opened') > 0) {
    closePopup(targetEl);
  }
};

function handleKeydown(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
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

function showInputError(formEl, inputEl, errorMessage) {
  const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
  inputEl.classList.add('popup__input_type_error');
  errorEl.textContent = errorMessage;
  errorEl.classList.add('popup__input-error_active');
};

function hideInputError(formEl, inputEl) {
  const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
  inputEl.classList.remove('popup__input_type_error');
  errorEl.classList.remove('popup__input-error_active');
  errorEl.textContent = '';
};

function checkValidity(formEl, inputEl) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(formEl, inputEl);
  }
};

function toggleButtonState(formEl) {
  const buttonEl = formEl.querySelector('.popup__submit');
  if (formEl.checkValidity()) {
    buttonEl.classList.remove('popup__submit_inactive');
    buttonEl.disabled = false;
  } else {
    buttonEl.classList.add('popup__submit_inactive');
    buttonEl.disabled = true;
  }
};

function setEventListeners(formEl) {
  const inputList = Array.from(formEl.querySelectorAll('.popup__input'));
  inputList.forEach((inputEl) => {
    inputEl.addEventListener('input', () => {
      checkValidity(formEl, inputEl);
      toggleButtonState(formEl);
    });
  });
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formEl) => {
    setEventListeners(formEl);
    toggleButtonState(formEl);
  });
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
enableValidation();