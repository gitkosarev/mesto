const initialCards = [
  {
    name: 'Алтай',
    link: './images/cards/altai.jpg',
    alt: 'фото Алтай'
  },{
    name: 'Камчатка',
    link: './images/cards/kamchatka.jpg',
    alt: 'фото Камчатка'
  },{
    name: 'Байкал',
    link: './images/cards/baikal.jpg',
    alt: 'фото Байкал'
  },{
    name: 'Домбай',
    link: './images/cards/dombai.png',
    alt: 'фото Домбай'
  },{
    name: 'Эльбрус',
    link: './images/cards/elbrus.png',
    alt: 'фото Эльбрус'
  },{
    name: 'Карачаевск',
    link: './images/cards/karachaevsk.png',
    alt: 'фото Карачаевск'
  }
];

let editProfileButton = document.querySelector('.profile__edit-button'),
    closeProfileButton = document.querySelector('.popup__close-button'),
    formElement = document.querySelector('.popup__form');

let nameInput = document.querySelector('.popup__input_value_name'),
    descriptionInput = document.querySelector('.popup__input_value_description'),
    profileName = document.querySelector('.profile__name'),
    profileDescription = document.querySelector('.profile__description'),
    popupBlock = document.querySelector('.popup');


function initCards() {
  if ('content' in document.createElement('template')) {
    let cardsEl = document.querySelector('.cards');
    let cardTemp = document.querySelector('#cardTemplate');
    initialCards.forEach(function(item) {
      let clone = cardTemp.content.cloneNode(true);
      clone.querySelector('.card__image').src = item.link;
      clone.querySelector('.card__image').alt = item.alt;
      clone.querySelector('.card__title').textContent = item.name;
      cardsEl.appendChild(clone);
    });
  }
};

function fillProfile() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
};

function updateProfileInfo(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeProfileEdit();
};

function openProfileEdit() {
  fillProfile();
  popupBlock.classList.add('popup_opened');
};

function closeProfileEdit() {
  popupBlock.classList.remove('popup_opened');
};

function addSomeLove() {
  console.log('☮️ & ❤️');
};

editProfileButton.addEventListener('click', openProfileEdit);
closeProfileButton.addEventListener('click', closeProfileEdit);
formElement.addEventListener('submit', updateProfileInfo);

initCards();