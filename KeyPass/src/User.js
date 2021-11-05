export default class User {
  #id = '';
  #username = '';
  #password = '';

  constructor(id, username, password) {
    this.#id = id;
    this.#username = username;
    this.#password = password;
  }

  getUsername() {
    return this.#username;
  }

  getId() {
    return this.#id;
  }

  getPassword() {
    return this.#password;
  }

  setPassword(password) {
    this.#password = password;
  }

  setUsername(username) {
    this.#username = username;
  }
}
