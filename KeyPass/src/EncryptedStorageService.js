import EncryptedStorage from 'react-native-encrypted-storage';
import User from './User';

export default class EncryptedStorageService {
  async setUser(user) {
    let result = await EncryptedStorage.setItem(
      'active_user',
      JSON.stringify({
        username: user.getUsername(),
        password: user.getPassword(),
      }),
    );
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  async removeUser() {
    let result = await EncryptedStorage.removeItem('active_user');
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  async getUser() {
    let item = await EncryptedStorage.getItem('active_user');
    if (item) {
      let user = JSON.parse(item);
      return new User(user.username, user.password);
    } else {
      return '';
    }
  }
}
