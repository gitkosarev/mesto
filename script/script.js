let editProfileButton = document.querySelector('.profile__edit-button');
let closeProfileButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let heartElement = document.querySelector('.card__like-button');

initEventListeners();

function initEventListeners() {
  editProfileButton.addEventListener('click', openProfileEdit);
  closeProfileButton.addEventListener('click', closeProfileEdit);
  formElement.addEventListener('submit', updateProfileInfo);
  heartElement.addEventListener('click', addSomeLove);
};

function fillProfile() {
  let name = document.querySelector('#name'),
      description = document.querySelector('#description'),
      profileName = document.querySelector('.profile__name').textContent,
      profileDescription = document.querySelector('.profile__description').textContent;
  name.value = profileName;
  description.value = profileDescription;
};

function updateProfileInfo(evt) {
  evt.preventDefault();
  let name = document.querySelector('#name'),
      description = document.querySelector('#description');
  document.querySelector('.profile__name').textContent = name.value;
  document.querySelector('.profile__description').textContent = description.value;
  closeProfileEdit();
};

function openProfileEdit() {
  let popupBlock = document.querySelector('.popup');
  fillProfile();
  popupBlock.classList.add('popup_opened');
};

function closeProfileEdit() {
  let popupBlock = document.querySelector('.popup');
  popupBlock.classList.remove('popup_opened');
};

function addSomeLove() {
  console.log('❤️');
};