import { initialCards, openPopup, closePopup } from "./utility.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";


const currentTemplateSelector = "";

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
  profileName = document.querySelector('.profile__name'),
  profileDescription = document.querySelector('.profile__description'),
  editProfilePopup = document.querySelector('#editProfilePopup'),
  addCardPopup = document.querySelector('#addCardPopup');


function createCardElement(cardConfig) {
  const card = new Card(cardConfig, currentTemplateSelector);
  return card.create();
};

function appendCard(cardConfig) {
  const cardElement = createCardElement(cardConfig);
  cardsSection.appendChild(cardElement);
};

function prependCard(cardConfig) {
  const cardElement = createCardElement(cardConfig);
  cardsSection.prepend(cardElement);
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
  const validator = new FormValidator(validationConfig, addCardForm);
  validator.toggleButtonState();
};

function addCard() {
  const config = {
    name: addCardFormInputName.value,
    link: addCardFormInputDescription.value,
    alt: `фото ${addCardFormInputName.value}`
  };
  prependCard(config);
};

function fillProfile() {
  editProfileFormInputName.value = profileName.textContent;
  editProfileFormInputDescription.value = profileDescription.textContent;
};

function handleEditProfileClick() {
  fillProfile();
  openPopup(editProfilePopup);
};

function handleAddCardClick() {
  openPopup(addCardPopup);
};

editProfileButton.addEventListener('click', handleEditProfileClick);
editProfileForm.addEventListener('submit', handleProfileSubmit);

addCardButtonEl.addEventListener('click', handleAddCardClick);
addCardForm.addEventListener('submit', handleAddCardSubmit);

popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (event.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});

function initCards() {
  if ('content' in document.createElement('template')) {
    initialCards.forEach(appendCard);
  }
};

initCards();

const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
formList.forEach((formEl) => {
  const validator = new FormValidator(validationConfig, formEl);
  validator.enableValidation();
});