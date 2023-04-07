import { credential, toggleSubmitCaptionOnLoad } from "../utils/utility.js";
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
  popupOpenedSelector = '.popup_opened',
  submitSelector = '.popup__submit',
  cardsSelector = '.cards',
  cardTemplateSelector = '#cardTemplate',
  addCardPopupSelector = '#addCardPopup',
  editProfilePopupSelector = '#editProfilePopup',
  openImagePopupSelector = '#openImagePopup',
  confirmPopupSelector = '#confirmPopup',
  avatarPopupSelector = '#avatarPopup',
  avatarImgSelector = '.profile__avatar-image',
  avatarEditSelector = '.profile__avatar-edit',
  profileNameSelector = '.profile__name',
  profileDescriptionSelector = '.profile__description';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: submitSelector,
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

const api = new Api(credential.baseUrl, credential.token, credential.cohort);

const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  descriptionSelector: profileDescriptionSelector,
  avatarImageSelector: avatarImgSelector
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

const avatarPopup = new PopupWithForm(avatarPopupSelector, handleAvatarUpdate);
avatarPopup.setEventListeners();


const 
  avatarEditButton = document.querySelector(avatarEditSelector),
  editProfileButton = document.querySelector('.profile__edit-button'),
  addCardButtonEl = document.querySelector('.profile__add-button'),
  addCardForm = document.querySelector('#addCardForm'),
  avatarForm = document.querySelector('#avatarForm'),
  editProfileForm = document.querySelector('#editProfileForm'),
  editProfileFormInputName = editProfileForm.querySelector('.popup__input_value_name'),
  editProfileFormInputDescription = editProfileForm.querySelector('.popup__input_value_description');


function handleCardRemoval(cardId, callback, scope) {
  confirmRemovalPopup.open(function() {
    callback.bind(scope)();
    api.deleteCard(cardId)
      .then((result) => {
        confirmRemovalPopup.close();
        console.log(`Photo successfully deleted. Id: ${cardId}. Result: ${result.message}`);
      })
      .catch((error) => {
        console.error(`Error while deleting photo. Response status: ${error.status}`);
      });
  });
};

function handleLikeToggle(isActive, cardId, callback) {
  if (isActive) {
    api.putLike(cardId)
      .then((result) => {
        callback(result);
        console.log(`Like successfully added. Card id: ${cardId}`);
      })
      .catch((error) => {
        console.error(`Error while adding like. Card id: ${cardId}. Response status: ${error.status}`);
      });
  } else {
    api.deleteLike(cardId)
      .then((result) => {
        callback(result);
        console.log(`Like successfully deleted. Card id: ${cardId}`);
      })
      .catch((error) => {
        console.error(`Error while deleting like. Card id: ${cardId}. Response status: ${error.status}`);
      });
  }
};

function createCardElement(cardConfig) {
  cardConfig.currentUserId = userInfo.userId;
  const card = new Card(
    cardConfig,
    cardTemplateSelector,
    openImagePopup.open.bind(openImagePopup),
    handleCardRemoval,
    handleLikeToggle
  );
  return card.create();
};

function appendCard(cardConfig) {
  cardConfig.isOwner = cardConfig.owner && cardConfig.owner._id && cardConfig.owner._id === userInfo.userId;
  const cardElement = createCardElement(cardConfig);
  section.addItem(cardElement);
};

function prependCard(cardConfig) {
  toggleSubmitCaptionOnLoad(true, popupOpenedSelector, submitSelector);
  api.saveCard(cardConfig.name, cardConfig.link)
    .then((result) => {
      result.isOwner = true;
      const cardElement = createCardElement(result);
      section.prependItem(cardElement);
      toggleSubmitCaptionOnLoad(false, popupOpenedSelector, submitSelector);
      addCardPopup.close();
      console.log(`Photo successfully saved. id: ${result._id}`);
    })
    .catch((error) => {
      console.error(`Error while saving photo. Response status: ${error.status}`);
    });

};

function handleProfileSubmit(inputValues) {
  toggleSubmitCaptionOnLoad(true, popupOpenedSelector, submitSelector);
  api.updateProfile(inputValues.name, inputValues.description)
    .then((result) => {
      userInfo.setUserInfo(inputValues);
      toggleSubmitCaptionOnLoad(false, popupOpenedSelector, submitSelector);
      editProfilePopup.close();
      console.log(`Profile successfully updated for user with id: ${result._id}`);
    })
    .catch((error) => {
      console.error(`Error while updating profile. Response status: ${error.status}`);
    });
};

function handleAvatarUpdate(inputValues) {
  const link = inputValues.description;
  toggleSubmitCaptionOnLoad(true, popupOpenedSelector, submitSelector);
  api.updateAvatar(link)
    .then((result) => {
      userInfo.setUserAvatar(link);
      toggleSubmitCaptionOnLoad(false, popupOpenedSelector, submitSelector);
      avatarPopup.close();
      console.log(`Avatar successfully updated for current user with id: ${result._id}`);
    })
    .catch((error) => {
      console.error(`Error while updating avatar. Response status: ${error.status}`);
    });
};

function handleAddCardSubmit(inputValues) {
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

function handleAvatarEditClick() {
  formValidators[avatarForm.getAttribute('name')].resetValidation();
  avatarPopup.open();
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

avatarEditButton.addEventListener('click', handleAvatarEditClick);
editProfileButton.addEventListener('click', handleEditProfileClick);
addCardButtonEl.addEventListener('click', handleAddCardClick);


function initUserInfo(data) {
  userInfo.userId = data._id;
  userInfo.setUserInfo({ name: data.name, description: data.about });
  userInfo.setUserAvatar(data.avatar);
  console.log(`your id: ${data._id}`);
};

function initCards(data) {
  if ('content' in document.createElement('template')) {
    const cardsArray = data.map(function(item) {
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
  Promise.all([ api.getUserData(), api.getInitialCards() ])
    .then((responses) => {
      initUserInfo(responses[0]);
      initCards(responses[1]);
    })
    .catch((error) => {
      console.error(error);
    });
};

init();