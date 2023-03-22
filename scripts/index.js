import { initialCards } from "./utility.js";
import UserInfo from "./UserInfo.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";


const
  cardsSelector = '.cards',
  cardTemplateSelector = '#cardTemplate',
  addCardPopupSelector = '#addCardPopup',
  editProfilePopupSelector = '#editProfilePopup',
  openImagePopupSelector = '#openImagePopup',
  profileNameSelector = '.profile__name',
  profileDescriptionSelector = '.profile__description';

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

const userInfo = new UserInfo({ nameSelector: profileNameSelector, descriptionSelector: profileDescriptionSelector });

const addCardPopup = new PopupWithForm(addCardPopupSelector, handleAddCardSubmit);
addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm(editProfilePopupSelector, handleProfileSubmit);
editProfilePopup.setEventListeners();

const openImagePopup = new PopupWithImage(openImagePopupSelector);
openImagePopup.setEventListeners();


const 
  addCardButtonEl = document.querySelector('.profile__add-button'),
  editProfileButton = document.querySelector('.profile__edit-button'),
  addCardForm = document.querySelector('#addCardForm'),
  editProfileForm = document.querySelector('#editProfileForm'),
  editProfileFormInputName = editProfileForm.querySelector('.popup__input_value_name'),
  editProfileFormInputDescription = editProfileForm.querySelector('.popup__input_value_description');


function createCardElement(cardConfig) {
  const card = new Card(cardConfig, cardTemplateSelector, openImagePopup.open.bind(openImagePopup));
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

function handleProfileSubmit(inputValues) {
  userInfo.setUserInfo(inputValues);
  editProfilePopup.close();
};

function handleAddCardSubmit(inputValues) {
  addCard(inputValues);
  resetValidation(addCardForm);
  addCardPopup.close();
};

function addCard(inputValues) {
  const config = {
    name: inputValues.name,
    link: inputValues.description,
    alt: `фото ${inputValues.name}`
  };
  prependCard(config);
};

function resetValidation(formEl) {
  formValidators[formEl.getAttribute('name')].resetValidation();
};

function fillProfileForm(userData) {
  editProfileFormInputName.value = userData.name;
  editProfileFormInputDescription.value = userData.description;
};

function handleEditProfileClick() {
  const userData = userInfo.getUserInfo();
  fillProfileForm(userData);
  editProfilePopup.open();
};

function handleAddCardClick() {
  addCardPopup.open();
};

editProfileButton.addEventListener('click', handleEditProfileClick);
addCardButtonEl.addEventListener('click', handleAddCardClick);

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