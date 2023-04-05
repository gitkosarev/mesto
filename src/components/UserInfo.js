export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._profileNameEl = document.querySelector(nameSelector);
    this._profileDescriptionEl = document.querySelector(descriptionSelector);
    this._avatarSelectorEl = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const info = {
      name: this._profileNameEl.textContent,
      description: this._profileDescriptionEl.textContent,
      avatar: this._avatarSelectorEl.src
    };
    return info;
  };

  setUserInfo({ name, description }) {
    this._profileNameEl.textContent = name;
    this._profileDescriptionEl.textContent = description;
  };

  setUserAvatar(avatar) {
    this._avatarSelectorEl.src = avatar;
  };
  
}