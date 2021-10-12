import {openDatabase} from 'react-native-sqlite-storage';
import Account from './Account';
import User from './User';

export default class CRUDService {
  #db = '';

  constructor() {
    this.#db = openDatabase({name: 'KeyRingDB.db', location: 'default'});
  }

  async getUserId(user) {
    return new Promise((resolve, reject) => {
      this.#db.transaction(tx => {
        tx.executeSql(
          'SELECT Id_user FROM Users where Username =?',
          [user.getUsername()],
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

  async insertAccount(user, account) {
    return new Promise(async (resolve, reject) => {
      let userId = await this.getUserId(user);
      if (userId > -1) {
        this.#db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO Keys(Id_user, Context, Login, Password) VALUES (?,?,?,?)',
            [
              userId,
              account.getContext(),
              account.getLogin(),
              account.getPassword(),
            ],
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

  async updateAccount(user, oldAccount, newAccount) {
    return new Promise(async (resolve, reject) => {
      let userId = await this.getUserId(user);
      if (userId > -1) {
        this.#db.transaction(tx => {
          tx.executeSql(
            'UPDATE Keys SET Context=?, Login=?, Password=? WHERE Context=? AND Login=? AND Password=? AND Id_user=?',
            [
              newAccount.getContext(),
              newAccount.getLogin(),
              newAccount.getPassword(),
              oldAccount.getContext(),
              oldAccount.getLogin(),
              oldAccount.getPassword(),
              userId,
            ],
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

  async deleteAccount(account) {
    return new Promise((resolve, reject) => {
      this.#db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Keys where Context=? AND Login=?',
          [account.getContext(), account.getLogin()],
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

  async selectAccounts(user) {
    return new Promise((resolve, reject) => {
      this.#db.transaction(tx => {
        tx.executeSql(
          'SELECT Context, Login, Keys.Password FROM Keys inner join Users on Users.Id_user = Keys.Id_user where Username =?',
          [user.getUsername()],
          (tx, result) => {
            if (result.rows.length > 0) {
              let accounts = [];
              for (let i = 0; i < result.rows.length; i++) {
                accounts.push(
                  new Account(
                    result.rows.item(i).Context,
                    result.rows.item(i).Login,
                    result.rows.item(i).Password,
                  ),
                );
              }
              resolve(accounts);
            } else {
              resolve([]);
            }
          },
        );
      });
    });
  }

  async insertUser(user) {
    return new Promise((resolve, reject) => {
      this.#db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO Users(Username, Password) VALUES (?,?)',
          [user.getUsername(), user.getPassword()],
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

  async updateUser(user) {
    return new Promise(async (resolve, reject) => {
      this.#db.transaction(tx => {
        tx.executeSql(
          'UPDATE Users SET Password =? WHERE Username =?',
          [user.getPassword(), user.getUsername()],
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

  async deleteUser(user) {
    return new Promise(async (resolve, reject) => {
      let userId = await this.getUserId(user);
      if (userId > -1) {
        this.#db.transaction(tx => {
          tx.executeSql(
            'DELETE FROM Keys where Id_user=?',
            [userId],
            (tx, result) => {},
            err => {
              resolve(false);
            },
          );
        });
        this.#db.transaction(tx => {
          tx.executeSql(
            'DELETE FROM Users where Id_user=?',
            [userId],
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

  async selectUser(user) {
    return new Promise((resolve, reject) => {
      this.#db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM Users WHERE Username =? and Password =?',
          [user.getUsername(), user.getPassword()],
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

  async createTables() {
    this.#db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Users(' +
          'Id_user	INTEGER NOT NULL UNIQUE, ' +
          'Username	TEXT NOT NULL UNIQUE, ' +
          'Password	TEXT NOT NULL, ' +
          'PRIMARY KEY(Id_user AUTOINCREMENT)); ',
      );
    });
    this.#db.transaction(tx => {
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
}
