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
  /* popupList = Array.from(document .querySelectorAll('.popup')), */
  editProfileButton = document.querySelector('.profile__edit-button'),
  editProfileForm = document.querySelector('#editProfileForm'),
  editProfileFormInputName = editProfileForm.querySelector('.popup__input_value_name'),
  editProfileFormInputDescription = editProfileForm.querySelector('.popup__input_value_description'),
  addCardButtonEl = document.querySelector('.profile__add-button'),
  addCardForm = document.querySelector('#addCardForm'),
  addCardFormInputName = addCardForm.querySelector('.popup__input_value_name'),
  addCardFormInputDescription = addCardForm.querySelector('.popup__input_value_description')/* ,
  profileName = document.querySelector(profileNameSelector),
  profileDescription = document.querySelector(profileDescriptionSelector),
  openImagePopup = document.querySelector(openImagePopupSelector),
  popupImageEl = openImagePopup.querySelector('.popup__image'),
  popupImageCaptionEl = openImagePopup.querySelector('.popup__caption'),
  editProfilePopup = document.querySelector(editProfilePopupSelector),
  addCardPopup = document.querySelector(addCardPopupSelector) */;


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
  /* event.preventDefault();
  editProfile(); */
  /* closePopup(editProfilePopup); */
  userInfo.setUserInfo(inputValues);
  editProfilePopup.close();
};

function handleAddCardSubmit(inputValues) {
  /* event.preventDefault(); */
  addCard();
  //addCardForm.reset();
  resetValidation(addCardForm);
  /* closePopup(addCardPopup); */
  addCardPopup.close();
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

/* function handleImageClick(cardConfig) {
  popupImageEl.src = cardConfig.link;
  popupImageEl.alt = cardConfig.alt;
  popupImageCaptionEl.textContent = cardConfig.name;
  openPopup(openImagePopup);
  openImagePopup.open(cardConfig);
}; */

/* function openPopup(popupEl) {
  popupEl.classList.add('popup_opened');
  document.addEventListener('keydown', handleKeydown);
}; */

/* function closePopup(popupEl) {
  popupEl.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleKeydown);
}; */

/* function handleKeydown(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}; */

/* function editProfile() {
  profileName.textContent = editProfileFormInputName.value;
  profileDescription.textContent = editProfileFormInputDescription.value;
}; */

function fillProfileForm(userData) {
  editProfileFormInputName.value = userData.name;
  editProfileFormInputDescription.value = userData.description;
};

function handleEditProfileClick() {
  const userData = userInfo.getUserInfo();
  fillProfileForm(userData);
  /* openPopup(editProfilePopup); */
  editProfilePopup.open();
};

function handleAddCardClick() {
  /* openPopup(addCardPopup); */
  addCardPopup.open();
};

editProfileButton.addEventListener('click', handleEditProfileClick);
addCardButtonEl.addEventListener('click', handleAddCardClick);

/* editProfileForm.addEventListener('submit', handleProfileSubmit); */

/* addCardForm.addEventListener('submit', handleAddCardSubmit); */

/*popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (event.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});*/


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