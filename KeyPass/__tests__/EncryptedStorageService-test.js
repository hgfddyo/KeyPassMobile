/**
 * @format
 */

import 'react-native';
import React from 'react';
import UserService from '../src/UserService';
import User from '../src/User';
import Profile from '../src/Profile';
import Account from '../src/Account';
import renderer from 'react-test-renderer';
import RNEncryptedStorage from '../__mocks__/react-native-encrypted-storage';
import EncryptedStorageService from '../src/EncryptedStorageService';
import 'react-native-get-random-values';

// beforeEach(() => {
//   // Clear all instances and calls to constructor and all methods:
//   RNEncryptedStorage.mockClear();
// });

it('Set user: must call Encrypted storage API and return true if user was saved', async () => {
  RNEncryptedStorage.setItem.mockResolvedValue(true);
  let service = new EncryptedStorageService();
  let result = await service.setUser(new User('1', '1', '2'));
  let mockedJSON = JSON.stringify({
    id: '1',
    username: '1',
    password: '2',
  });
  expect(RNEncryptedStorage.setItem).toHaveBeenCalledWith(
    'active_user',
    mockedJSON,
  );
  expect(result).toBe(true);
});

it('Set user: must call Encrypted storage API and return false if user wasnt saved', async () => {
  RNEncryptedStorage.setItem.mockResolvedValue(false);
  let service = new EncryptedStorageService();
  let result = await service.setUser(new User('1', '1', '2'));
  let mockedJSON = JSON.stringify({
    id: '1',
    username: '1',
    password: '2',
  });
  expect(RNEncryptedStorage.setItem).toHaveBeenCalledWith(
    'active_user',
    mockedJSON,
  );
  expect(result).toBe(false);
});

it('Remove user: must call Encrypted storage API and return false if user wasnt removed', async () => {
  RNEncryptedStorage.removeItem.mockResolvedValue(false);
  let service = new EncryptedStorageService();
  let result = await service.removeUser();
  expect(RNEncryptedStorage.removeItem).toHaveBeenCalledWith('active_user');
  expect(result).toBe(false);
});

it('Remove user: must call Encrypted storage API and return true if user was removed', async () => {
  RNEncryptedStorage.removeItem.mockResolvedValue(true);
  let service = new EncryptedStorageService();
  let result = await service.removeUser();
  expect(RNEncryptedStorage.removeItem).toHaveBeenCalledWith('active_user');
  expect(result).toBe(true);
});

it('Get user: must call Encrypted storage API and return empty string if user doesnt exist', async () => {
  RNEncryptedStorage.getItem.mockResolvedValue('');
  let service = new EncryptedStorageService();
  let result = await service.getUser();
  expect(RNEncryptedStorage.getItem).toHaveBeenCalledWith('active_user');
  expect(result).toBe('');
});

it('Get user: must call Encrypted storage API and return User if user exists', async () => {
  let mockedJSON = JSON.stringify({
    id: '1',
    username: '2',
    password: '3',
  });
  RNEncryptedStorage.getItem.mockResolvedValue(mockedJSON);
  let service = new EncryptedStorageService();
  let result = await service.getUser();
  expect(RNEncryptedStorage.getItem).toHaveBeenCalledWith('active_user');
  expect(result.getUsername().concat(result.getPassword())).toBe('23');
});
