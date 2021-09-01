import {openDatabase} from 'react-native-sqlite-storage';

export default class DBUtils {
  constructor() {
    this.db = openDatabase({name: 'KeyRingDB.db', location: 'default'});
    // prettier-ignore
    this.passwordVocabulary = [
    '!', '#', '$', '%', '&', '(', ')', '*', '+', '-',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    ':', ';', '<' ,'=', '>', '?', '@',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  }

  createTables() {
    this.db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Users(' +
          'Id_user	INTEGER NOT NULL UNIQUE, ' +
          'Username	TEXT NOT NULL UNIQUE, ' +
          'Password	TEXT NOT NULL, ' +
          'PRIMARY KEY(Id_user AUTOINCREMENT)); ',
      );
    });
    this.db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Keys(' +
          'Id_user INTEGER NOT NULL,' +
          'Context TEXT NOT NULL, ' +
          'Login	TEXT NOT NULL, ' +
          'Password	TEXT NOT NULL, ' +
          'FOREIGN KEY(Id_user) REFERENCES Users(Id_user),' +
          'PRIMARY KEY(Context, Login));',
      );
    });
  }

  async login(username, password) {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM Users WHERE Username =? and Password =?',
          [username, password],
          (tx, result) => {
            if (result.rows.length > 0) {
              resolve(true);
            } else {
              resolve(false);
            }
          },
        );
      });
    });
  }

  async registration(username, password) {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO Users(Username, Password) VALUES (?,?)',
          [username, password],
          (tx, result) => {
            if (result.rowsAffected > 0) {
              resolve(true);
            }
          },
          err => {
            resolve(false);
          },
        );
      });
    });
  }

  async deleteKey(context, login) {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Keys where Context=? AND Login=?',
          [context, login],
          (tx, result) => {
            if (result.rowsAffected > 0) {
              resolve(true);
            }
          },
          err => {
            resolve(false);
          },
        );
      });
    });
  }

  async getKeys(username) {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          'SELECT Context, Login, Keys.Password FROM Keys inner join Users on Users.Id_user = Keys.Id_user where Username =?',
          [username],
          (tx, result) => {
            if (result.rows.length > 0) {
              let keys = [];
              for (let i = 0; i < result.rows.length; i++) {
                keys.push({
                  context: result.rows.item(i).Context,
                  login: result.rows.item(i).Login,
                  password: result.rows.item(i).Password,
                });
              }
              resolve(keys);
            } else {
              resolve([]);
            }
          },
        );
      });
    });
  }

  async getUserId(username) {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          'SELECT Id_user FROM Users where Username =?',
          [username],
          (tx, result) => {
            if (result.rows.length > 0) {
              resolve(result.rows.item(0).Id_user);
            } else {
              resolve(-1);
            }
          },
        );
      });
    });
  }

  async addKey(username, context, login, password) {
    return new Promise(async (resolve, reject) => {
      let userId = await this.getUserId(username);
      if (userId > -1) {
        this.db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO Keys(Id_user, Context, Login, Password) VALUES (?,?,?,?)',
            [userId, context, login, password],
            (tx, result) => {
              if (result.rowsAffected > 0) {
                resolve(true);
              }
            },
            err => {
              resolve(false);
            },
          );
        });
      } else {
        resolve(false);
      }
    });
  }

  generatePassword() {
    let res = new Uint32Array(21);
    window.crypto.getRandomValues(res);
    let password = '';
    for (var i = 0; i < res.length; i++) {
      let code = res[i];
      let index = code % this.passwordVocabulary.length;
      password = password + this.passwordVocabulary[index];
    }
    return password;
  }
}
