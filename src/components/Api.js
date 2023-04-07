export default class Api {
  constructor(baseUrl, token, cohortId) {
    this._baseUrl = baseUrl;
    this._token = token;
    this._cohortId = cohortId;
  };

  getUserData() {
    return fetch(`${this._baseUrl}v1/${this._cohortId}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      });
  };

  getInitialCards() {
    return fetch(`${this._baseUrl}v1/${this._cohortId}/cards`, {
      method: "GET",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      });
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
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      });
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
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      });
  };

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}v1/${this._cohortId}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      });
  };

  putLike(cardId) {
    return fetch(`${this._baseUrl}v1/${this._cohortId}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      });
  };

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}v1/${this._cohortId}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      });
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
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      });
  };

}