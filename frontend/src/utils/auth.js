const API_ROOT = process.env.REACT_APP_API_ROOT;

class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  register({ email, password }) {
    return fetch(this._baseUrl + "/signup", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((resp) => this._checkResp(resp, "Ошибка при регистрации"));
  }

  authorize({ email, password }) {
    return fetch(this._baseUrl + "/signin", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((resp) => this._checkResp(resp, "Ошибка при авторизации"));
  }

  checkToken({ token }) {
    const headers = { ...this._headers, Authorization: `Bearer ${token}` };

    return fetch(this._baseUrl + "/users/me", {
      method: "GET",
      headers: headers,
    }).then((resp) => this._checkResp(resp, "Ошибка при валидации токена"));
  }

  _checkResp(resp, errorMessage) {
    if (resp.ok) {
      return resp.json();
    }
    return Promise.reject(`${errorMessage}: ${resp.status}`);
  }
}

const auth = new Auth({
  baseUrl: API_ROOT,
  headers: {
    "Content-Type": "application/json",
  },
});

export default auth;
