export default class Account {
  #context = '';
  #login = '';
  #password = '';

  constructor(context, login, password) {
    this.#context = context;
    this.#login = login;
    this.#password = password;
  }

  getContext() {
    return this.#context;
  }

  getLogin() {
    return this.#login;
  }

  getPassword() {
    return this.#password;
  }

  setContext(context) {
    this.#context = context;
  }

  setLogin(login) {
    this.#login = login;
  }

  setPassword(password) {
    this.#password = password;
  }
}
