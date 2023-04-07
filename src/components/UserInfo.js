export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarImageSelector }) {
    this._profileNameEl = document.querySelector(nameSelector);
    this._profileDescriptionEl = document.querySelector(descriptionSelector);
    this._avatarImageEl = document.querySelector(avatarImageSelector);
  }

  getUserInfo() {
    const info = {
      name: this._profileNameEl.textContent,
      description: this._profileDescriptionEl.textContent,
      avatar: this._avatarImageEl.src
    };
    return info;
  };

  setUserInfo({ name, description }) {
    if (name) { this._profileNameEl.textContent = name; }
    if (description) { this._profileDescriptionEl.textContent = description; }
  };

  setUserAvatar(avatar) {
    if (avatar) { this._avatarImageEl.src = avatar; }
  };
  
}