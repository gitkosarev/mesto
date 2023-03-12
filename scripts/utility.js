export const initialCards = [
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

export const cardTemplate = document.querySelector('#cardTemplate');
const openImagePopup = document.querySelector('#openImagePopup');
const popupImageEl = openImagePopup.querySelector('.popup__image');
const popupImageCaptionEl = openImagePopup.querySelector('.popup__caption');

export function handleImageClick(cardConfig) {
  popupImageEl.src = cardConfig.link;
  popupImageEl.alt = cardConfig.alt;
  popupImageCaptionEl.textContent = cardConfig.name;
  openPopup(openImagePopup);
};

export function openPopup(popupEl) {
  popupEl.classList.add('popup_opened');
  document.addEventListener('keydown', handleKeydown);
};

export function closePopup(popupEl) {
  popupEl.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleKeydown);
};

export function handleKeydown(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};