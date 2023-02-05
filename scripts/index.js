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
    name: 'Карачаевск',
    link: './images/cards/karachaevsk.png',
    alt: 'фото Карачаевск'
  }
];

let closePopupButtons = document.querySelectorAll('.popup__close-button'),
    editProfileButton = document.querySelector('.profile__edit-button'),
    editProfileForm = document.querySelector('#editProfileForm'),
    editProfileFormInputName = editProfileForm.querySelector('.popup__input_value_name'),
    editProfileFormInputDescription = editProfileForm.querySelector('.popup__input_value_description'),
    addCardButton = document.querySelector('.profile__add-button'),
    addCardForm = document.querySelector('#addCardForm');

let profileName = document.querySelector('.profile__name'),
    profileDescription = document.querySelector('.profile__description'),
    editProfilePopup = document.querySelector('#editProfilePopup'),
    addCardPopup = document.querySelector('#addCardPopup');


function initCards() {
  if ('content' in document.createElement('template')) {
    let cardsEl = document.querySelector('.cards');
    let cardTemp = document.querySelector('#cardTemplate');
    initialCards.forEach(function(item) {
      let clone = cardTemp.content.cloneNode(true);
      clone.querySelector('.card__image').src = item.link;
      clone.querySelector('.card__image').alt = item.alt;
      clone.querySelector('.card__title').textContent = item.name;
      clone.querySelector('.card__like-button').addEventListener('click', onLikeClicked);
      cardsEl.appendChild(clone);
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
  closePopup(event);
};

function editProfile() {
  profileName.textContent = editProfileFormInputName.value;
  profileDescription.textContent = editProfileFormInputDescription.value;
};

function onAddCardSubmit(event) {
  event.preventDefault();
  addCard();
  closePopup(event);
};

function addCard() {
  console.log('addCard clicked');
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
};

function onLikeClicked(event) {
  let buttonEl = event.target;
  buttonEl.classList.toggle('card__like-button_active');
};

closePopupButtons.forEach(function(button) {
  button.addEventListener('click', closePopup);
});

editProfileButton.addEventListener('click', onEditProfileButton);
editProfileForm.addEventListener('submit', onEditProfileSubmit);

addCardButton.addEventListener('click', onAddCardButton);
addCardForm.addEventListener('submit', onAddCardSubmit);

initCards();