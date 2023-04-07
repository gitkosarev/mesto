export default class Api {
  constructor(baseUrl, token, cohortId) {
    this._baseUrl = baseUrl;
    this._token = token;
    this._cohortId = cohortId;
  };

  _handleResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response);
    }
  };

  getUserData() {
    return fetch(`${this._baseUrl}v1/${this._cohortId}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      }
    })
      .then(this._handleResponse);
  };

  getInitialCards() {
    return fetch(`${this._baseUrl}v1/${this._cohortId}/cards`, {
      method: "GET",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      }
    })
      .then(this._handleResponse);
  };

  updateProfile(name, about) {
    return fetch(`${this._baseUrl}v1/${this._cohortId}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._handleResponse);
  };

  saveCard(name, link) {
    return fetch(`${this._baseUrl}v1/${this._cohortId}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._handleResponse);
  };

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}v1/${this._cohortId}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      }
    })
      .then(this._handleResponse);
  };

  putLike(cardId) {
    return fetch(`${this._baseUrl}v1/${this._cohortId}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      }
    })
      .then(this._handleResponse);
  };

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}v1/${this._cohortId}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      }
    })
      .then(this._handleResponse);
  };

  updateAvatar(link) {
    return fetch(`${this._baseUrl}v1/${this._cohortId}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(this._handleResponse);
  };

}