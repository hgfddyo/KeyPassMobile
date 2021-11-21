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
import CRUDService from '../src/CRUDService';
import RNEncryptedStorage from '../__mocks__/react-native-encrypted-storage';
import EncryptedStorageService from '../src/EncryptedStorageService';
import 'react-native-get-random-values';

jest.mock('../src/CRUDService');
jest.mock('../src/EncryptedStorageService');

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  CRUDService.mockClear();
  EncryptedStorageService.mockClear();
});

it('Set/Get current user: should set and get current user', () => {
  let service = new UserService();
  let currentUser = service.getCurrentUser();
  expect(currentUser).toBe('');
  service.setCurrentUser(new User('1', '2', '3'));
  let user = service.getCurrentUser();
  expect(user.getUsername().concat(user.getPassword())).toBe('23');
});

it('Register user: should call CRUD method and return User if user doesnt exist', async () => {
  const mockInsertUser = jest.fn();
  CRUDService.mockImplementation(() => {
    return {
      insertUser: mockInsertUser,
    };
  });
  mockInsertUser.mockResolvedValue(new User('1', 'sad', '123'));
  let service = new UserService();
  let result = await service.registerUser(new User('1', 'sad', '123'));
  expect(mockInsertUser).toHaveBeenCalledWith(new User('1', 'sad', '123'));
  expect(result.getUsername()).toBe('sad');
});

it('Register user: should call CRUD method and return false if user exists', async () => {
  const mockInsertUser = jest.fn();
  CRUDService.mockImplementation(() => {
    return {
      insertUser: mockInsertUser,
    };
  });
  mockInsertUser.mockResolvedValue(false);
  let service = new UserService();
  let result = await service.registerUser(new User('1', 'sad', '123'));
  expect(mockInsertUser).toHaveBeenCalledWith(new User('1', 'sad', '123'));
  expect(result).toBe(false);
});

it('Login user: should call CRUD method and return User if user exists', async () => {
  const mockSelectUser = jest.fn();
  CRUDService.mockImplementation(() => {
    return {
      selectUser: mockSelectUser,
    };
  });
  mockSelectUser.mockResolvedValue(new User('1', '1', '2'));
  let service = new UserService();
  let result = await service.loginUser(new User('1', '1', '2'));
  expect(mockSelectUser).toHaveBeenCalledWith(new User('1', '1', '2'));
  expect(result.getUsername().concat(result.getPassword())).toBe('12');
});

it('Login user: should call CRUD method and return false if user doesnt exist', async () => {
  const mockSelectUser = jest.fn();
  CRUDService.mockImplementation(() => {
    return {
      selectUser: mockSelectUser,
    };
  });
  mockSelectUser.mockResolvedValue(false);
  let service = new UserService();
  let result = await service.loginUser(new User('1', '1', '2'));
  expect(mockSelectUser).toHaveBeenCalledWith(new User('1', '1', '2'));
  expect(result).toBe(false);
});

it('Delete user: should call CRUD method and return true if user was deleted', async () => {
  const mockDeleteUser = jest.fn();
  CRUDService.mockImplementation(() => {
    return {
      deleteUser: mockDeleteUser,
    };
  });
  mockDeleteUser.mockResolvedValue(true);
  let service = new UserService();
  let result = await service.deleteUser(new User('1', '1', '2'));
  expect(mockDeleteUser).toHaveBeenCalledWith(new User('1', '1', '2'));
  expect(result).toBe(true);
});

it('Delete user: should call CRUD method and return false if user wasnt deleted', async () => {
  const mockDeleteUser = jest.fn();
  CRUDService.mockImplementation(() => {
    return {
      deleteUser: mockDeleteUser,
    };
  });
  mockDeleteUser.mockResolvedValue(false);
  let service = new UserService();
  let result = await service.deleteUser(new User('1', '1', '2'));
  expect(mockDeleteUser).toHaveBeenCalledWith(new User('1', '1', '2'));
  expect(result).toBe(false);
});

it('Update password: should call CRUD method and return false if password wasnt updated', async () => {
  const mockUpdateUser = jest.fn();
  CRUDService.mockImplementation(() => {
    return {
      updateUser: mockUpdateUser,
    };
  });
  mockUpdateUser.mockResolvedValue(false);
  let service = new UserService();
  let result = await service.updatePassword(new User('1', '1', '2'));
  expect(mockUpdateUser).toHaveBeenCalledWith(new User('1', '1', '2'));
  expect(result).toBe(false);
});

it('Update password: should call CRUD method and return true if password was updated', async () => {
  const mockUpdateUser = jest.fn();
  CRUDService.mockImplementation(() => {
    return {
      updateUser: mockUpdateUser,
    };
  });
  mockUpdateUser.mockResolvedValue(true);
  let service = new UserService();
  let result = await service.updatePassword(new User('1', '1', '2'));
  expect(mockUpdateUser).toHaveBeenCalledWith(new User('1', '1', '2'));
  expect(result).toBe(true);
});

it('Load user: should call Storage method and return User if user exists', async () => {
  const mockGetUser = jest.fn();
  EncryptedStorageService.mockImplementation(() => {
    return {
      getUser: mockGetUser,
    };
  });
  mockGetUser.mockResolvedValue(new User('1', '2', '3'));
  let service = new UserService();
  let result = await service.loadUser();
  expect(result.getUsername().concat(result.getPassword())).toBe('23');
});

it('Load user: should call Storage method and return empty string if user doesnt exist', async () => {
  const mockGetUser = jest.fn();
  EncryptedStorageService.mockImplementation(() => {
    return {
      getUser: mockGetUser,
    };
  });
  mockGetUser.mockResolvedValue('');
  let service = new UserService();
  let result = await service.loadUser();
  expect(result).toBe('');
});

it('Save user: should call Storage method and return true if user was saved', async () => {
  const mockSetUser = jest.fn();
  EncryptedStorageService.mockImplementation(() => {
    return {
      setUser: mockSetUser,
    };
  });
  mockSetUser.mockResolvedValue(true);
  let service = new UserService();
  let result = await service.saveUser(new User('1', '2', '3'));
  expect(mockSetUser).toHaveBeenCalledWith(new User('1', '2', '3'));
  expect(result).toBe(true);
});

it('Save user: should call Storage method and return false if user wasnt saved', async () => {
  const mockSetUser = jest.fn();
  EncryptedStorageService.mockImplementation(() => {
    return {
      setUser: mockSetUser,
    };
  });
  mockSetUser.mockResolvedValue(false);
  let service = new UserService();
  let result = await service.saveUser(new User('1', '2', '3'));
  expect(mockSetUser).toHaveBeenCalledWith(new User('1', '2', '3'));
  expect(result).toBe(false);
});

it('Remove user: should call Storage method and return false if user wasnt removed', async () => {
  const mockRemoveUser = jest.fn();
  EncryptedStorageService.mockImplementation(() => {
    return {
      removeUser: mockRemoveUser,
    };
  });
  mockRemoveUser.mockResolvedValue(false);
  let service = new UserService();
  let result = await service.removeUser();
  expect(result).toBe(false);
});

it('Remove user: should call Storage method and return true if user was removed', async () => {
  const mockRemoveUser = jest.fn();
  EncryptedStorageService.mockImplementation(() => {
    return {
      removeUser: mockRemoveUser,
    };
  });
  mockRemoveUser.mockResolvedValue(true);
  let service = new UserService();
  let result = await service.removeUser();
  expect(result).toBe(true);
});
