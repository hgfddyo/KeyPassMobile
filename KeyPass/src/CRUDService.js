import SQLite from 'react-native-sqlite-storage';
import Account from './Account';
import User from './User';
import Profile from './Profile';

export default class CRUDService {
  #db = '';

  constructor() {
    this.#db = SQLite.openDatabase({name: 'KeyRingDB.db', location: 'default'});
  }

  async insertAccount(user, account, profile) {
    return new Promise(async (resolve, reject) => {
      this.#db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO Keys(Id_user, Context, Login, Password, Id_profile) VALUES (?,?,?,?,?)',
          [
            user.getId(),
            account.getContext(),
            account.getLogin(),
            account.getPassword(),
            profile.getId(),
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
    });
  }

  async updateAccount(user, oldAccount, newAccount) {
    return new Promise(async (resolve, reject) => {
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
            user.getId(),
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
    });
  }

  async deleteAccount(account, user) {
    return new Promise((resolve, reject) => {
      this.#db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Keys where Context=? AND Login=? AND Id_user=?',
          [account.getContext(), account.getLogin(), user.getId()],
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

  async selectAccounts(user, profile) {
    return new Promise((resolve, reject) => {
      this.#db.transaction(tx => {
        tx.executeSql(
          'SELECT Context, Login, Keys.Password FROM Keys inner join Users on Users.Id_user = Keys.Id_user where Id_user =? AND Id_profile=?',
          [user.getId(), profile.getId()],
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
              resolve(
                new User(result.insertId, user.getUsername, user.getPassword),
              );
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
          'UPDATE Users SET Password =? WHERE Id_user =?',
          [user.getPassword(), user.getId()],
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
      this.#db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Keys where Id_user=?',
          [user.getId()],
          (tx, result) => {},
          err => {
            resolve(false);
          },
        );
      });
      this.#db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Profiles where Id_user=?',
          [user.getId()],
          (tx, result) => {},
          err => {
            resolve(false);
          },
        );
      });
      this.#db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Users where Id_user=?',
          [user.getId()],
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

  async selectUser(user) {
    return new Promise((resolve, reject) => {
      this.#db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM Users WHERE Username =? and Password =?',
          [user.getUsername(), user.getPassword()],
          (tx, result) => {
            if (result.rows.length > 0) {
              resolve(
                new User(
                  result.rows.item(0).Id_user,
                  result.rows.item(0).Username,
                  result.rows.item(0).Password,
                ),
              );
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
        'CREATE TABLE IF NOT EXISTS Profiles(' +
          'Id_profile	INTEGER NOT NULL UNIQUE, ' +
          'Name	TEXT NOT NULL UNIQUE, ' +
          'Id_user INTEGER NOT NULL, ' +
          'FOREIGN KEY(Id_user) REFERENCES Users(Id_user),' +
          'PRIMARY KEY(Id_profile AUTOINCREMENT, Id_user)); ',
      );
    });
    this.#db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Keys(' +
          'Id_user INTEGER NOT NULL,' +
          'Id_profile INTEGER NOT NULL,' +
          'Context TEXT NOT NULL, ' +
          'Login	TEXT NOT NULL, ' +
          'Password	TEXT NOT NULL, ' +
          'FOREIGN KEY(Id_user) REFERENCES Users(Id_user),' +
          'FOREIGN KEY(Id_profile) REFERENCES Profiles(Id_profile),' +
          'PRIMARY KEY(Context, Login, Id_user));',
      );
    });
  }
  async insertProfile(user, profile) {
    return new Promise(async (resolve, reject) => {
      this.#db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO Profiles(Id_user, Name) VALUES (?,?)',
          [user.getId(), profile.getName()],
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

  async updateProfile(profile) {
    return new Promise(async (resolve, reject) => {
      this.#db.transaction(tx => {
        tx.executeSql(
          'UPDATE Profiles SET Name=? WHERE Id_profile=?',
          [profile.getName(), profile.getId()],
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

  async deleteProfile(profile) {
    return new Promise((resolve, reject) => {
      this.#db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Keys where Id_profile=?',
          [profile.getId()],
          (tx, result) => {
            if (result.rowsAffected > 0) {
            }
          },
          err => {
            resolve(false);
          },
        );
      });
      this.#db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Profiles where Id_profile=?',
          [profile.getId()],
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

  async selectProfiles(user) {
    return new Promise((resolve, reject) => {
      this.#db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM Profiles where Id_user =?',
          [user.getId()],
          (tx, result) => {
            if (result.rows.length > 0) {
              let profiles = [];
              for (let i = 0; i < result.rows.length; i++) {
                profiles.push(
                  new Profile(
                    result.rows.item(i).Id_profile,
                    result.rows.item(i).Name,
                  ),
                );
              }
              resolve(profiles);
            } else {
              resolve([]);
            }
          },
        );
      });
    });
  }
}
