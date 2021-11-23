import CRUDService from './CRUDService';

export default class AccountService {
  #passwordVocabulary = [];

  constructor() {
    // prettier-ignore
    this.#passwordVocabulary = [
    '!', '#', '$', '%', '&', '(', ')', '*', '+', '-',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    ':', ';', '<' ,'=', '>', '?', '@',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  }

  async createAccount(user, account, profile) {
    let crudService = new CRUDService();
    console.log(profile.getName());
    let result = await crudService.insertAccount(user, account, profile);
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  async updateAccount(user, oldAccount, newAccount) {
    let crudService = new CRUDService();
    let result = await crudService.updateAccount(user, oldAccount, newAccount);
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  async deleteAccount(account, user) {
    let crudService = new CRUDService();
    let result = await crudService.deleteAccount(account, user);
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  async getAccounts(user, profile) {
    let crudService = new CRUDService();
    let accounts = await crudService.selectAccounts(user, profile);
    return accounts;
  }

  generatePassword() {
    let res = new Uint32Array(21);
    crypto.getRandomValues(res);
    let password = '';
    for (var i = 0; i < res.length; i++) {
      let code = res[i];
      let index = code % this.#passwordVocabulary.length;
      password = password + this.#passwordVocabulary[index];
    }
    return password;
  }
}
