import { credential } from "../components/utility.js";
import Api from "../components/Api.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWIthConfirmation from "../components/PopupWIthConfirmation.js";

import './index.css';


const
  cardsSelector = '.cards',
  cardTemplateSelector = '#cardTemplate',
  addCardPopupSelector = '#addCardPopup',
  editProfilePopupSelector = '#editProfilePopup',
  openImagePopupSelector = '#openImagePopup',
  confirmPopupSelector = '#confirmPopup',
  avatarSelector = '.profile__avatar',
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

function initValidation() {
  formList.forEach((formEl) => {
    const validator = new FormValidator(validationConfig, formEl);
    const formName = formEl.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

initValidation();

const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  descriptionSelector: profileDescriptionSelector,
  avatarSelector: avatarSelector
});

let section;

const addCardPopup = new PopupWithForm(addCardPopupSelector, handleAddCardSubmit);
addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm(editProfilePopupSelector, handleProfileSubmit);
editProfilePopup.setEventListeners();

const openImagePopup = new PopupWithImage(openImagePopupSelector);
openImagePopup.setEventListeners();

const confirmRemovalPopup = new PopupWIthConfirmation(confirmPopupSelector);
confirmRemovalPopup.setEventListeners();


const 
  addCardButtonEl = document.querySelector('.profile__add-button'),
  editProfileButton = document.querySelector('.profile__edit-button'),
  addCardForm = document.querySelector('#addCardForm'),
  editProfileForm = document.querySelector('#editProfileForm'),
  editProfileFormInputName = editProfileForm.querySelector('.popup__input_value_name'),
  editProfileFormInputDescription = editProfileForm.querySelector('.popup__input_value_description');


function handleCardRemoval(cardId, callback, scope) {
  confirmRemovalPopup.open(function() {
    callback.bind(scope)();
    const api = new Api(`${credential.baseUrl}v1/${credential.cohort}/cards/${cardId}`, credential.token);
    api.deleteCard()
      .then((result) => {
        console.log(`Photo successfully deleted. Id: ${cardId}. Result: ${result.message}`);
      })
      .catch((error) => {
        console.error(`Error while deleting photo. Response status: ${error.status}`);
      });
  });
};

function createCardElement(cardConfig) {
  const card = new Card(cardConfig, cardTemplateSelector, openImagePopup.open.bind(openImagePopup), handleCardRemoval);
  return card.create();
};

function appendCard(cardConfig) {
  cardConfig.isOwner = cardConfig.owner && cardConfig.owner._id && cardConfig.owner._id === userInfo.userId;
  const cardElement = createCardElement(cardConfig);
  section.addItem(cardElement);
};

function prependCard(cardConfig) {
  const api = new Api(`${credential.baseUrl}v1/${credential.cohort}/cards`, credential.token);
  api.saveCard(cardConfig.name, cardConfig.link)
    .then((result) => {
      result.isOwner = true;
      const cardElement = createCardElement(result);
      section.prependItem(cardElement);
      console.log(`Photo successfully saved. id: ${result._id}`);
    })
    .catch((error) => {
      console.error(`Error while saving photo. Response status: ${error.status}`);
    });

};

function handleProfileSubmit(inputValues) {
  userInfo.setUserInfo(inputValues);
  editProfilePopup.close();
  const api = new Api(`${credential.baseUrl}v1/${credential.cohort}/users/me`, credential.token);
  api.updateProfile(inputValues.name, inputValues.description)
    .then((result) => {
      console.log(`Profile successfully updated for user with id: ${result._id}`);
    })
    .catch((error) => {
      console.error(`Error while updating profile. Response status: ${error.status}`);
    });
};

function handleAddCardSubmit(inputValues) {
  addCardPopup.close();
  addCard(inputValues);
};

function addCard(inputValues) {
  const config = {
    name: inputValues.name,
    link: inputValues.description,
    alt: `фото ${inputValues.name}`
  };
  prependCard(config);
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
  formValidators[addCardForm.getAttribute('name')].resetValidation();
  addCardPopup.open();
};

editProfileButton.addEventListener('click', handleEditProfileClick);
addCardButtonEl.addEventListener('click', handleAddCardClick);


function initUserInfo(result) {
  userInfo.userId = result._id;
  userInfo.setUserInfo({ name: result.name, description: result.about });
  userInfo.setUserAvatar(result.avatar);
  console.log(`your id: ${result._id}`);
};

function initCards(result) {
  if ('content' in document.createElement('template')) {
    const cardsArray = result.map(function(item) {
      item.alt = `фото ${item.name}`;
      return item;
    });
    section = new Section({
      items: cardsArray,
      renderer: (cardConfig) => {
        appendCard(cardConfig);
      }
    }, cardsSelector);
    section.renderItems();
  }
};

function init() {
  const userApi = new Api(`${credential.baseUrl}v1/${credential.cohort}/users/me`, credential.token);
  const cardsApi = new Api(`${credential.baseUrl}v1/${credential.cohort}/cards`, credential.token);
  Promise.all([ userApi.getUserInfo(), cardsApi.getInitialCards() ])
    .then((responses) => {
      initUserInfo(responses[0]);
      initCards(responses[1]);
    })
    .catch((error) => {
      console.error(error);
    });
};

init();