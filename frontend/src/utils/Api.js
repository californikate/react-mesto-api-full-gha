class Api {
  constructor({ baseUrl }) {
    this._url = baseUrl;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  async getUserInfo() {
    const token = localStorage.getItem('token');

    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(res => this._getResponse(res))
  }

  async setUserInfo({ name, about }) {
    const token = localStorage.getItem('token');

    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(res => this._getResponse(res))
  }

  async setUserAvatar({ avatar }) {
    const token = localStorage.getItem('token');

    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',  
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: avatar
      })
    }).then(res => this._getResponse(res))
  }

  async getInitialCards() {
    const token = localStorage.getItem('token');

    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(res => this._getResponse(res))
  }

  async addNewCard(data) {
    const token = localStorage.getItem('token');
    
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `${data.place}`,
        link: `${data.link}`
      })
    }).then(res => this._getResponse(res))
  }

  async deleteCards(cardId) {
    const token = localStorage.getItem('token');

    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(res => this._getResponse(res))
  }

  async changeLikeCardStatus(cardId, isLiked) {
    const token = localStorage.getItem('token');

    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(res => this._getResponse(res))
  }
}

export const api = new Api({
  baseUrl: 'http://localhost:3000',
});

