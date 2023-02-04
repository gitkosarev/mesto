const initialCards = [
  {
    name: 'Алтай',
    link: './images/cards/altai.jpg'
  },{
    name: 'Камчатка',
    link: './images/cards/kamchatka.jpg'
  },{
    name: 'Байкал',
    link: './images/cards/baikal.jpg'
  },{
    name: 'Домбай',
    link: './images/cards/dombai.png'
  },{
    name: 'Эльбрус',
    link: './images/cards/elbrus.png'
  },{
    name: 'Карачаевск',
    link: './images/cards/karachaevsk.png'
  }
];

let editProfileButton = document.querySelector('.profile__edit-button'),
    closeProfileButton = document.querySelector('.popup__close-button'),
    formElement = document.querySelector('.popup__form'),
    heartElement = document.querySelector('.card__like-button');

let nameInput = document.querySelector('.popup__input_value_name'),
    descriptionInput = document.querySelector('.popup__input_value_description'),
    profileName = document.querySelector('.profile__name'),
    profileDescription = document.querySelector('.profile__description'),
    popupBlock = document.querySelector('.popup');

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
heartElement.addEventListener('click', addSomeLove);