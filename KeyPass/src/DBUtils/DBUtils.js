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
          'Id_key	INTEGER NOT NULL UNIQUE, ' +
          'Id_user INTEGER NOT NULL,' +
          'Context TEXT, ' +
          'Login	TEXT NOT NULL, ' +
          'Password	TEXT NOT NULL, ' +
          'FOREIGN KEY(Id_user) REFERENCES Users(Id_user),' +
          'PRIMARY KEY(Id_key AUTOINCREMENT));',
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
          'SELECT * FROM Keys inner join Users on Users.Id_user = Keys.Id_user where Username =?',
          [username],
          (tx, result) => {
            if (result.rows.length > 0) {
              resolve(result);
            } else {
              resolve([]);
            }
          },
        );
      });
    });
  }
}
