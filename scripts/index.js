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

let closePopupButtons = document.querySelectorAll('.popup__close-button'),
    editProfileButton = document.querySelector('.profile__edit-button'),
    editProfileForm = document.querySelector('#editProfileForm'),
    editProfileFormInputName = editProfileForm.querySelector('.popup__input_value_name'),
    editProfileFormInputDescription = editProfileForm.querySelector('.popup__input_value_description'),
    addCardButton = document.querySelector('.profile__add-button'),
    addCardForm = document.querySelector('#addCardForm');

let cardsElement = document.querySelector('.cards'),
    cardTemplate = document.querySelector('#cardTemplate'),
    profileName = document.querySelector('.profile__name'),
    profileDescription = document.querySelector('.profile__description'),
    editProfilePopup = document.querySelector('#editProfilePopup'),
    addCardPopup = document.querySelector('#addCardPopup'),
    openImagePopup = document.querySelector('#openImagePopup'),
    popupImageEl = openImagePopup.querySelector('.popup__image'),
    popupImageCaptionEl = openImagePopup.querySelector('.popup__caption');


function getFilledTemplate(cardConfig) {
  let clone = cardTemplate.content.cloneNode(true);
  clone.querySelector('.card__image').src = cardConfig.link;
  clone.querySelector('.card__image').alt = cardConfig.alt;
  clone.querySelector('.card__title').textContent = cardConfig.name;
  clone.querySelector('.card__like-button').addEventListener('click', onLikeClicked);
  clone.querySelector('.card__trash-button').addEventListener('click', onTrashClicked);
  clone.querySelector('.card__image').addEventListener('click', onOpenImageClicked);
  return clone;
};

function appendCard(cardConfig) {
  let clone = getFilledTemplate(cardConfig);
  cardsElement.appendChild(clone);
};

function prependCard(cardConfig) {
  let clone = getFilledTemplate(cardConfig);
  cardsElement.prepend(clone);
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

function clearForm(buttonEl) {
  let popupEl = buttonEl.closest('.popup');
  let inputNameEl = popupEl.querySelector('.popup__input_value_name');
  if (inputNameEl) { inputNameEl.value = ''; }
  let inputDescriptionEl = popupEl.querySelector('.popup__input_value_description');
  if (inputDescriptionEl) { inputDescriptionEl.value = ''; }
  let imageEl = popupEl.querySelector('.popup__image');
  if (imageEl) {
    imageEl.src = '#';
    imageEl.alt = '';
  }
  let imageCaptionEl = popupEl.querySelector('.popup__caption');
  if (imageCaptionEl) { imageCaptionEl.textContent = ''; }
};

function onEditProfileSubmit(event) {
  event.preventDefault();
  editProfile();
  closePopup(event);
};

function editProfile() {
  profileName.textContent = editProfileFormInputName.value;
  profileDescription.textContent = editProfileFormInputDescription.value;
};

function onAddCardSubmit(event) {
  event.preventDefault();
  addCard(event);
  closePopup(event);
};

function addCard(event) {
  let popupEl = event.target.closest('.popup');
  let nameValue = popupEl.querySelector('.popup__input_value_name').value;
  let descriptionValue = popupEl.querySelector('.popup__input_value_description').value;
  const config = {
    name: nameValue,
    link: descriptionValue,
    alt: `фото ${nameValue}`
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

function openPopup(element) {
  element.classList.add('popup_opened');
};

function closePopup(event) {
  let buttonEl = event.target;
  buttonEl.closest('.popup').classList.remove('popup_opened');
  clearForm(buttonEl);
};

function onLikeClicked(event) {
  let buttonEl = event.target;
  buttonEl.classList.toggle('card__like-button_active');
};

function onTrashClicked(event) {
  let buttonEl = event.target;
  let cardEl = buttonEl.closest('.card');
  cardEl.remove();
};

function onOpenImageClicked(event) {
  let imageEl = event.target;
  let cardEl = imageEl.closest('.card');
  let cardTitle = cardEl.querySelector('.card__title').textContent;
  popupImageEl.src = imageEl.src;
  popupImageEl.alt = imageEl.alt;
  popupImageCaptionEl.textContent = cardTitle;
  openPopup(openImagePopup);
};

closePopupButtons.forEach(function(button) {
  button.addEventListener('click', closePopup);
});

editProfileButton.addEventListener('click', onEditProfileButton);
editProfileForm.addEventListener('submit', onEditProfileSubmit);

addCardButton.addEventListener('click', onAddCardButton);
addCardForm.addEventListener('submit', onAddCardSubmit);

initCards();