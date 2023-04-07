export const credential = {
  baseUrl: "https://mesto.nomoreparties.co/",
  cohort: "cohort-62",
  token: "09d5475f-e954-4f6d-9cca-0bea06143685"
};

export function toggleSubmitCaptionOnLoad(inProcess, popupOpenedSelector, submitSelector) {
  const buttonEl = document.querySelector(popupOpenedSelector).querySelector(submitSelector);
  buttonEl.textContent = inProcess ? 'Сохранение...' : 'Сохранить';
  buttonEl.disabled = inProcess;
};