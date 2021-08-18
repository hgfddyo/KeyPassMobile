import { openDatabase } from 'react-native-sqlite-storage';

export default class DBUtils {
  db: any;

  constructor() {
    this.db = openDatabase({ name: 'KeyRingDB.db', location: 'default' });
  }

  createTables(){
    this.db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Users(" +
        "Id_user	INTEGER NOT NULL UNIQUE, " +
        "Username	TEXT NOT NULL UNIQUE, " +
        "Password	TEXT NOT NULL, " +
        "PRIMARY KEY(Id_user AUTOINCREMENT)); "
      );
    });
    this.db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Keys(" +
        "Id_key	INTEGER NOT NULL UNIQUE, " +
        "Id_user INTEGER NOT NULL," +
        "Context TEXT, " +
        "Login	TEXT NOT NULL, " +
        "Password	TEXT NOT NULL, " +
        "FOREIGN KEY(Id_user) REFERENCES Users(Id_user)," +
        "PRIMARY KEY(Id_key AUTOINCREMENT));"
      );
    });
  }
}
