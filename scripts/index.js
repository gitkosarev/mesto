import { initialCards } from "./utility.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";


const cardsSelector = '.cards';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};
const formValidators = {};
const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

const cardTemplateSelector = '#cardTemplate';
const openImagePopup = document.querySelector('#openImagePopup');
const popupImageEl = openImagePopup.querySelector('.popup__image');
const popupImageCaptionEl = openImagePopup.querySelector('.popup__caption');


const popupList = Array.from(document .querySelectorAll('.popup')),
  editProfileButton = document.querySelector('.profile__edit-button'),
  editProfileForm = document.querySelector('#editProfileForm'),
  editProfileFormInputName = editProfileForm.querySelector('.popup__input_value_name'),
  editProfileFormInputDescription = editProfileForm.querySelector('.popup__input_value_description'),
  addCardButtonEl = document.querySelector('.profile__add-button'),
  addCardForm = document.querySelector('#addCardForm'),
  addCardFormInputName = addCardForm.querySelector('.popup__input_value_name'),
  addCardFormInputDescription = addCardForm.querySelector('.popup__input_value_description'),
  cardsSection = document.querySelector(cardsSelector),
  profileName = document.querySelector('.profile__name'),
  profileDescription = document.querySelector('.profile__description'),
  editProfilePopup = document.querySelector('#editProfilePopup'),
  addCardPopup = document.querySelector('#addCardPopup');


function createCardElement(cardConfig) {
  const card = new Card(cardConfig, cardTemplateSelector, handleImageClick);
  return card.create();
};

function appendCard(cardConfig) {
  const cardElement = createCardElement(cardConfig);
  section.addItem(cardElement);
};

function prependCard(cardConfig) {
  const cardElement = createCardElement(cardConfig);
  section.prependItem(cardElement);
};

function handleImageClick(cardConfig) {
  popupImageEl.src = cardConfig.link;
  popupImageEl.alt = cardConfig.alt;
  popupImageCaptionEl.textContent = cardConfig.name;
  openPopup(openImagePopup);
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
  resetValidation(addCardForm);
  closePopup(addCardPopup);
};

function resetValidation(formEl) {
  formValidators[formEl.getAttribute('name')].resetValidation();
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


const section = new Section({
  items: initialCards,
  renderer: (cardConfig) => {
    appendCard(cardConfig);
  }
}, cardsSelector);

function initCards() {
  if ('content' in document.createElement('template')) {
    section.renderItems();
  }
};

function enableValidation() {
  formList.forEach((formEl) => {
    const validator = new FormValidator(validationConfig, formEl);
    const formName = formEl.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};


initCards();
enableValidation();