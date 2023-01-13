let editProfileButton = document.querySelector('.profile__edit-button'),
    closeProfileButton = document.querySelector('.popup__close-button'),
    formElement = document.querySelector('.popup__form'),
    heartElement = document.querySelector('.card__like-button');

let nameInput = document.querySelector('.popup__input-value_name'),
    descriptionInput = document.querySelector('.popup__input-value_description');

function fillProfile() {
  let profileName = document.querySelector('.profile__name').textContent,
      profileDescription = document.querySelector('.profile__description').textContent;
  nameInput.value = profileName;
  descriptionInput.value = profileDescription;
};

function updateProfileInfo(evt) {
  evt.preventDefault();
  document.querySelector('.profile__name').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = descriptionInput.value;
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
  console.log('☮️ & ❤️');
};

editProfileButton.addEventListener('click', openProfileEdit);
closeProfileButton.addEventListener('click', closeProfileEdit);
formElement.addEventListener('submit', updateProfileInfo);
heartElement.addEventListener('click', addSomeLove);