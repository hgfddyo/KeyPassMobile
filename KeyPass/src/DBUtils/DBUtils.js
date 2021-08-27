import {openDatabase} from 'react-native-sqlite-storage';

export default class DBUtils {
  constructor() {
    this.db = openDatabase({name: 'KeyRingDB.db', location: 'default'});
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
}
