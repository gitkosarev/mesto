export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._profileNameEl = document.querySelector(nameSelector);
    this._profileDescriptionEl = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    const info = { name: this._profileNameEl.textContent, description: this._profileDescriptionEl.textContent };
    return info;
  };

  setUserInfo({ name, description }) {
    this._profileNameEl.textContent = name;
    this._profileDescriptionEl.textContent = description;
  };
}