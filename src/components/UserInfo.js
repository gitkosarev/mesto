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
    this._profileNameEl.textContent = name;
    this._profileDescriptionEl.textContent = description;
  };

  setUserAvatar(avatar) {
    this._avatarImageEl.src = avatar;
  };
  
}