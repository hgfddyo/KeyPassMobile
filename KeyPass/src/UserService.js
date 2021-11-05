import EncryptedStorageService from './EncryptedStorageService';
import CRUDService from './CRUDService';
import User from './User';

export default class UserService {
  #currentUser = '';

  constructor() {
    this.#currentUser = new User('', '', '');
  }

  getCurrentUser() {
    return this.#currentUser;
  }

  setCurrentUser(user) {
    this.#currentUser = user;
  }

  async registerUser(user) {
    let crudService = new CRUDService();
    let result = await crudService.insertUser(user);
    if (result) {
      return result;
    } else {
      return false;
    }
  }

  async loginUser(user) {
    let crudService = new CRUDService();
    let result = await crudService.selectUser(user);
    if (result) {
      return result;
    } else {
      return false;
    }
  }

  async deleteUser(user) {
    let crudService = new CRUDService();
    let result = await crudService.deleteUser(user);
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  async updatePassword(user) {
    let crudService = new CRUDService();
    let result = await crudService.updateUser(user);
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  async loadUser() {
    let storageService = new EncryptedStorageService();
    let user = await storageService.getUser();
    if (user) {
      return user;
    } else {
      return '';
    }
  }

  async saveUser(user) {
    let storageService = new EncryptedStorageService();
    let result = await storageService.setUser(user);
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  async removeUser() {
    let storageService = new EncryptedStorageService();
    let result = await storageService.removeUser();
    if (result) {
      return true;
    } else {
      return false;
    }
  }
}
