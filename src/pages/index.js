import { credential } from "../components/utility.js";
import Api from "../components/Api.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";

import './index.css';


const
  cardsSelector = '.cards',
  cardTemplateSelector = '#cardTemplate',
  addCardPopupSelector = '#addCardPopup',
  editProfilePopupSelector = '#editProfilePopup',
  openImagePopupSelector = '#openImagePopup',
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

/* function resetValidation(formEl) {
  formValidators[formEl.getAttribute('name')].resetValidation();
}; */

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

function initCards() {
  if ('content' in document.createElement('template')) {
    const cardsApi = new Api(`${credential.baseUrl}v1/${credential.cohort}/cards`, credential.token);
    cardsApi.getInitialCards()
      .then((result) => {
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
      })
      .catch((error) => {
        console.error(`Error while getting cards from server. Response status: ${error.status}`);
      });
  }
};

function initValidation() {
  formList.forEach((formEl) => {
    const validator = new FormValidator(validationConfig, formEl);
    const formName = formEl.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

function initUserInfo() {
  const userApi = new Api(`${credential.baseUrl}v1/${credential.cohort}/users/me`, credential.token);
  userApi.getUserInfo()
    .then((result) => {
      userInfo.setUserInfo({ name: result.name, description: result.about });
      userInfo.setUserAvatar(result.avatar);
      console.log(`your id: ${result._id}`);
    })
    .catch((error) => {
      console.error(`Error while getting user info. Response status: ${error.status}`);
      userInfo.setUserInfo({ name: "undefined", description: "undefined"});
    });
};


initUserInfo();
initCards();
initValidation();