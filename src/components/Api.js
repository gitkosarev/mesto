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
        name: name,
        about: about
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