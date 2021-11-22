/**
 * @format
 */

import 'react-native';
import React from 'react';
import SQLite from 'react-native-sqlite-storage';
import User from '../src/User';
import Profile from '../src/Profile';
import Account from '../src/Account';
import renderer from 'react-test-renderer';
import CRUDService from '../src/CRUDService';
import 'react-native-get-random-values';

jest.mock('react-native-sqlite-storage');

it('Open database: database successfully was opened', async () => {
  const mockOpenDatabase = jest.fn();
  SQLite.openDatabase = mockOpenDatabase;
  let service = new CRUDService();
  expect(mockOpenDatabase).toHaveBeenCalledWith({
    name: 'KeyRingDB.db',
    location: 'default',
  });
});

it('Insert account: inserting account is correct', async () => {
  const mockExecuteSql = jest.fn();
  const mockTransaction = jest.fn(tran => {
    tx = {
      executeSql: mockExecuteSql,
    };
    tran(tx);
  });
  const mockOpenDatabase = jest.fn((...args) => {
    return {
      transaction: mockTransaction,
      cleanDb: () => Promise.resolve(),
      executeSql: mockExecuteSql,
    };
  });
  SQLite.openDatabase = mockOpenDatabase;
  let service = new CRUDService();
  service.insertAccount(
    new User('1', '1', '1'),
    new Account('a', 'a', 'a'),
    new Profile('t', 't'),
  );
  expect(mockExecuteSql).toHaveBeenCalledWith(
    'INSERT INTO Keys(Id_user, Context, Login, Password, Id_profile) VALUES (?,?,?,?,?)',
    ['1', 'a', 'a', 'a', 't'],
    expect.any(Function),
    expect.any(Function),
  );
});

it('Update account: updating account is correct', async () => {
  const mockExecuteSql = jest.fn();
  const mockTransaction = jest.fn(tran => {
    tx = {
      executeSql: mockExecuteSql,
    };
    tran(tx);
  });
  const mockOpenDatabase = jest.fn((...args) => {
    return {
      transaction: mockTransaction,
      cleanDb: () => Promise.resolve(),
      executeSql: mockExecuteSql,
    };
  });
  SQLite.openDatabase = mockOpenDatabase;
  let service = new CRUDService();
  service.updateAccount(
    new User('1', '1', '1'),
    new Account('a', 'a', 'a'),
    new Account('b', 'b', 'b'),
  );
  expect(mockExecuteSql).toHaveBeenCalledWith(
    'UPDATE Keys SET Context=?, Login=?, Password=? WHERE Context=? AND Login=? AND Password=? AND Id_user=?',
    ['b', 'b', 'b', 'a', 'a', 'a', '1'],
    expect.any(Function),
    expect.any(Function),
  );
});

it('Delete account: deleting account is correct', async () => {
  const mockExecuteSql = jest.fn();
  const mockTransaction = jest.fn(tran => {
    tx = {
      executeSql: mockExecuteSql,
    };
    tran(tx);
  });
  const mockOpenDatabase = jest.fn((...args) => {
    return {
      transaction: mockTransaction,
      cleanDb: () => Promise.resolve(),
      executeSql: mockExecuteSql,
    };
  });
  SQLite.openDatabase = mockOpenDatabase;
  let service = new CRUDService();
  service.deleteAccount(new Account('a', 'a', 'a'), new User('1', '1', '1'));
  expect(mockExecuteSql).toHaveBeenCalledWith(
    'DELETE FROM Keys where Context=? AND Login=? AND Id_user=?',
    ['a', 'a', '1'],
    expect.any(Function),
    expect.any(Function),
  );
});

it('Select accounts: selecting accounts is correct', async () => {
  const mockExecuteSql = jest.fn();
  const mockTransaction = jest.fn(tran => {
    tx = {
      executeSql: mockExecuteSql,
    };
    tran(tx);
  });
  const mockOpenDatabase = jest.fn((...args) => {
    return {
      transaction: mockTransaction,
      cleanDb: () => Promise.resolve(),
      executeSql: mockExecuteSql,
    };
  });
  SQLite.openDatabase = mockOpenDatabase;
  let service = new CRUDService();
  service.selectAccounts(new User('1', '1', '1'), new Profile('r', 'r'));
  expect(mockExecuteSql).toHaveBeenCalledWith(
    'SELECT Context, Login, Keys.Password FROM Keys inner join Users on Users.Id_user = Keys.Id_user where Id_user =? AND Id_profile=?',
    ['1', 'r'],
    expect.any(Function),
  );
});

it('Insert user: inserting user is correct', async () => {
  const mockExecuteSql = jest.fn();
  const mockTransaction = jest.fn(tran => {
    tx = {
      executeSql: mockExecuteSql,
    };
    tran(tx);
  });
  const mockOpenDatabase = jest.fn((...args) => {
    return {
      transaction: mockTransaction,
      cleanDb: () => Promise.resolve(),
      executeSql: mockExecuteSql,
    };
  });
  SQLite.openDatabase = mockOpenDatabase;
  let service = new CRUDService();
  service.insertUser(new User('1', '1', '1'));
  expect(mockExecuteSql).toHaveBeenCalledWith(
    'INSERT INTO Users(Username, Password) VALUES (?,?)',
    ['1', '1'],
    expect.any(Function),
    expect.any(Function),
  );
});

it('Update user: updating user is correct', async () => {
  const mockExecuteSql = jest.fn();
  const mockTransaction = jest.fn(tran => {
    tx = {
      executeSql: mockExecuteSql,
    };
    tran(tx);
  });
  const mockOpenDatabase = jest.fn((...args) => {
    return {
      transaction: mockTransaction,
      cleanDb: () => Promise.resolve(),
      executeSql: mockExecuteSql,
    };
  });
  SQLite.openDatabase = mockOpenDatabase;
  let service = new CRUDService();
  service.updateUser(new User('1', '1', '1'));
  expect(mockExecuteSql).toHaveBeenCalledWith(
    'UPDATE Users SET Password =? WHERE Id_user =?',
    ['1', '1'],
    expect.any(Function),
    expect.any(Function),
  );
});

it('Delete user: deleting user is correct', async () => {
  const mockExecuteSql = jest.fn();
  const mockTransaction = jest.fn(tran => {
    tx = {
      executeSql: mockExecuteSql,
    };
    tran(tx);
  });
  const mockOpenDatabase = jest.fn((...args) => {
    return {
      transaction: mockTransaction,
      cleanDb: () => Promise.resolve(),
      executeSql: mockExecuteSql,
    };
  });
  SQLite.openDatabase = mockOpenDatabase;
  let service = new CRUDService();
  service.deleteUser(new User('1', '1', '1'));
  expect(mockExecuteSql.mock.calls.length).toBe(3);
  expect(mockExecuteSql.mock.calls[0]).toEqual([
    'DELETE FROM Keys where Id_user=?',
    ['1'],
    expect.any(Function),
    expect.any(Function),
  ]);
  expect(mockExecuteSql.mock.calls[1]).toEqual([
    'DELETE FROM Profiles where Id_user=?',
    ['1'],
    expect.any(Function),
    expect.any(Function),
  ]);
  expect(mockExecuteSql.mock.calls[2]).toEqual([
    'DELETE FROM Users where Id_user=?',
    ['1'],
    expect.any(Function),
    expect.any(Function),
  ]);
});

it('Select user: selecting user is correct', async () => {
  const mockExecuteSql = jest.fn();
  const mockTransaction = jest.fn(tran => {
    tx = {
      executeSql: mockExecuteSql,
    };
    tran(tx);
  });
  const mockOpenDatabase = jest.fn((...args) => {
    return {
      transaction: mockTransaction,
      cleanDb: () => Promise.resolve(),
      executeSql: mockExecuteSql,
    };
  });
  SQLite.openDatabase = mockOpenDatabase;
  let service = new CRUDService();
  service.selectUser(new User('1', '1', '1'));
  expect(mockExecuteSql).toHaveBeenCalledWith(
    'SELECT * FROM Users WHERE Username =? and Password =?',
    ['1', '1'],
    expect.any(Function),
  );
});

it('Create tables: creating tables is correct', async () => {
  const mockExecuteSql = jest.fn();
  const mockTransaction = jest.fn(tran => {
    tx = {
      executeSql: mockExecuteSql,
    };
    tran(tx);
  });
  const mockOpenDatabase = jest.fn((...args) => {
    return {
      transaction: mockTransaction,
      cleanDb: () => Promise.resolve(),
      executeSql: mockExecuteSql,
    };
  });
  SQLite.openDatabase = mockOpenDatabase;
  let service = new CRUDService();
  service.createTables();
  expect(mockExecuteSql.mock.calls.length).toBe(3);
  expect(mockExecuteSql.mock.calls[0]).toEqual([
    'CREATE TABLE IF NOT EXISTS Users(' +
      'Id_user	INTEGER NOT NULL UNIQUE, ' +
      'Username	TEXT NOT NULL UNIQUE, ' +
      'Password	TEXT NOT NULL, ' +
      'PRIMARY KEY(Id_user AUTOINCREMENT)); ',
  ]);
  expect(mockExecuteSql.mock.calls[1]).toEqual([
    'CREATE TABLE IF NOT EXISTS Profiles(' +
      'Id_profile	INTEGER NOT NULL UNIQUE, ' +
      'Name	TEXT NOT NULL, ' +
      'Id_user INTEGER NOT NULL, ' +
      'FOREIGN KEY(Id_user) REFERENCES Users(Id_user),' +
      'PRIMARY KEY(Id_profile AUTOINCREMENT)); ',
  ]);
  expect(mockExecuteSql.mock.calls[2]).toEqual([
    'CREATE TABLE IF NOT EXISTS Keys(' +
      'Id_user INTEGER NOT NULL,' +
      'Id_profile INTEGER NOT NULL,' +
      'Context TEXT NOT NULL, ' +
      'Login	TEXT NOT NULL, ' +
      'Password	TEXT NOT NULL, ' +
      'FOREIGN KEY(Id_user) REFERENCES Users(Id_user),' +
      'FOREIGN KEY(Id_profile) REFERENCES Profiles(Id_profile),' +
      'PRIMARY KEY(Context, Login, Id_user));',
  ]);
});

it('Select profile by name: selecting profile by name is correct', async () => {
  const mockExecuteSql = jest.fn();
  const mockTransaction = jest.fn(tran => {
    tx = {
      executeSql: mockExecuteSql,
    };
    tran(tx);
  });
  const mockOpenDatabase = jest.fn((...args) => {
    return {
      transaction: mockTransaction,
      cleanDb: () => Promise.resolve(),
      executeSql: mockExecuteSql,
    };
  });
  SQLite.openDatabase = mockOpenDatabase;
  let service = new CRUDService();
  service.selectProfileByName(new User('1', '1', '1'), new Profile('a', 'a'));
  expect(mockExecuteSql).toHaveBeenCalledWith(
    'SELECT * FROM Profiles where Id_user=? AND Name=?',
    ['1', 'a'],
    expect.any(Function),
    expect.any(Function),
  );
});

it('Insert profile: inserting profile is correct', async () => {
  const mockExecuteSql = jest.fn();
  const mockTransaction = jest.fn(tran => {
    tx = {
      executeSql: mockExecuteSql,
    };
    tran(tx);
  });
  const mockOpenDatabase = jest.fn((...args) => {
    return {
      transaction: mockTransaction,
      cleanDb: () => Promise.resolve(),
      executeSql: mockExecuteSql,
    };
  });
  SQLite.openDatabase = mockOpenDatabase;
  let service = new CRUDService();
  service.insertProfile(new User('1', '1', '1'), new Profile('a', 'a'));
  expect(mockExecuteSql).toHaveBeenCalledWith(
    'SELECT * FROM Profiles where Id_user=? AND Name=?',
    ['1', 'a'],
    expect.any(Function),
    expect.any(Function),
  );
  expect(mockExecuteSql.mock.calls.length).toEqual(1);
});

it('Update profile: updating profile is correct', async () => {
  const mockExecuteSql = jest.fn();
  const mockTransaction = jest.fn(tran => {
    tx = {
      executeSql: mockExecuteSql,
    };
    tran(tx);
  });
  const mockOpenDatabase = jest.fn((...args) => {
    return {
      transaction: mockTransaction,
      cleanDb: () => Promise.resolve(),
      executeSql: mockExecuteSql,
    };
  });
  SQLite.openDatabase = mockOpenDatabase;
  let service = new CRUDService();
  service.updateProfile(new Profile('a', 'a'));
  expect(mockExecuteSql).toHaveBeenCalledWith(
    'UPDATE Profiles SET Name=? WHERE Id_profile=?',
    ['a', 'a'],
    expect.any(Function),
    expect.any(Function),
  );
});

it('Delete profile: deleting profile is correct', async () => {
  const mockExecuteSql = jest.fn();
  const mockTransaction = jest.fn(tran => {
    tx = {
      executeSql: mockExecuteSql,
    };
    tran(tx);
  });
  const mockOpenDatabase = jest.fn((...args) => {
    return {
      transaction: mockTransaction,
      cleanDb: () => Promise.resolve(),
      executeSql: mockExecuteSql,
    };
  });
  SQLite.openDatabase = mockOpenDatabase;
  let service = new CRUDService();
  service.deleteProfile(new Profile('a', 'a'));
  expect(mockExecuteSql.mock.calls[0]).toEqual([
    'DELETE FROM Keys where Id_profile=?',
    ['a'],
    expect.any(Function),
    expect.any(Function),
  ]);
  expect(mockExecuteSql.mock.calls[1]).toEqual([
    'DELETE FROM Profiles where Id_profile=?',
    ['a'],
    expect.any(Function),
    expect.any(Function),
  ]);
  expect(mockExecuteSql.mock.calls.length).toEqual(2);
});

it('Select profiles: selecting profiles is correct', async () => {
  const mockExecuteSql = jest.fn();
  const mockTransaction = jest.fn(tran => {
    tx = {
      executeSql: mockExecuteSql,
    };
    tran(tx);
  });
  const mockOpenDatabase = jest.fn((...args) => {
    return {
      transaction: mockTransaction,
      cleanDb: () => Promise.resolve(),
      executeSql: mockExecuteSql,
    };
  });
  SQLite.openDatabase = mockOpenDatabase;
  let service = new CRUDService();
  service.selectProfiles(new User('1', '1', '1'));
  expect(mockExecuteSql).toHaveBeenCalledWith(
    'SELECT * FROM Profiles where Id_user =?',
    ['1'],
    expect.any(Function),
  );
});
