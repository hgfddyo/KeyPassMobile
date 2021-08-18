import { openDatabase } from 'react-native-sqlite-storage';

export default class DBUtils {
  db: any;

  constructor() {
    this.db = openDatabase({ name: 'KeyRingDB.db', location: 'default' });
  }

}
