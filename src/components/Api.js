export default class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
  };

  getUserInfo() {
    return fetch(this._url, {
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
    return fetch(this._url, {
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
    return fetch(this._url, {
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
    return fetch(this._url, {
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

  deleteCard() {
    return fetch(this._url, {
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

  putLike() {
    return fetch(this._url, {
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

  deleteLike() {
    return fetch(this._url, {
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

}