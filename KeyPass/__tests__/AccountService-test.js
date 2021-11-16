/**
 * @format
 */

import 'react-native';
import React from 'react';
import AccountService from '../src/AccountService';
import User from '../src/User';
import Profile from '../src/Profile';
import Account from '../src/Account';
import renderer from 'react-test-renderer';
import CRUDService from '../src/CRUDService';
import 'react-native-get-random-values';

jest.mock('../src/CRUDService');

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  CRUDService.mockClear();
});

it('Create account: should call CRUD method and return true if account doesnt exist', async () => {
  const mockInsertAccount = jest.fn();
  CRUDService.mockImplementation(() => {
    return {
      insertAccount: mockInsertAccount,
    };
  });
  mockInsertAccount.mockResolvedValue(true);
  let service = new AccountService();
  let result = await service.createAccount(
    new User('', 'sad', '123'),
    new Account('1', '1', '1'),
    new Profile('1', '1'),
  );
  expect(mockInsertAccount).toHaveBeenCalledWith(
    new User('', 'sad', '123'),
    new Account('1', '1', '1'),
    new Profile('1', '1'),
  );
  expect(result).toBe(true);
});

it('Create account: should call CRUD method and return false if account exist', async () => {
  const mockInsertAccount = jest.fn();
  CRUDService.mockImplementation(() => {
    return {
      insertAccount: mockInsertAccount,
    };
  });
  mockInsertAccount.mockResolvedValue(false);
  let service = new AccountService();
  let result = await service.createAccount(
    new User('', 'sad', '123'),
    new Account('1', '1', '1'),
    new Profile('1', '1'),
  );
  expect(mockInsertAccount).toHaveBeenCalledWith(
    new User('', 'sad', '123'),
    new Account('1', '1', '1'),
    new Profile('1', '1'),
  );
  expect(result).toBe(false);
});

it('Update account: should call CRUD method and return false if account wasnt updated', async () => {
  const mockUpdateAccount = jest.fn();
  CRUDService.mockImplementation(() => {
    return {
      updateAccount: mockUpdateAccount,
    };
  });
  mockUpdateAccount.mockResolvedValue(false);
  let service = new AccountService();
  let result = await service.updateAccount(
    new User('', 'sad', '123'),
    new Account('1', '1', '1'),
    new Account('1', '1', '2'),
  );
  expect(mockUpdateAccount).toHaveBeenCalledWith(
    new User('', 'sad', '123'),
    new Account('1', '1', '1'),
    new Account('1', '1', '2'),
  );
  expect(result).toBe(false);
});

it('Update account: should call CRUD method and return true if account was updated', async () => {
  const mockUpdateAccount = jest.fn();
  CRUDService.mockImplementation(() => {
    return {
      updateAccount: mockUpdateAccount,
    };
  });
  mockUpdateAccount.mockResolvedValue(true);
  let service = new AccountService();
  let result = await service.updateAccount(
    new User('', 'sad', '123'),
    new Account('1', '1', '1'),
    new Account('1', '1', '2'),
  );
  expect(mockUpdateAccount).toHaveBeenCalledWith(
    new User('', 'sad', '123'),
    new Account('1', '1', '1'),
    new Account('1', '1', '2'),
  );
  expect(result).toBe(true);
});

it('Delete account: should call CRUD method and return true if account was deleted', async () => {
  const mockDeleteAccount = jest.fn();
  CRUDService.mockImplementation(() => {
    return {
      deleteAccount: mockDeleteAccount,
    };
  });
  mockDeleteAccount.mockResolvedValue(true);
  let service = new AccountService();
  let result = await service.deleteAccount(
    new Account('1', '1', '1'),
    new User('', 'sad', '123'),
  );
  expect(mockDeleteAccount).toHaveBeenCalledWith(
    new Account('1', '1', '1'),
    new User('', 'sad', '123'),
  );
  expect(result).toBe(true);
});

it('Delete account: should call CRUD method and return false if account wasnt deleted', async () => {
  const mockDeleteAccount = jest.fn();
  CRUDService.mockImplementation(() => {
    return {
      deleteAccount: mockDeleteAccount,
    };
  });
  mockDeleteAccount.mockResolvedValue(false);
  let service = new AccountService();
  let result = await service.deleteAccount(
    new Account('1', '1', '1'),
    new User('', 'sad', '123'),
  );
  expect(mockDeleteAccount).toHaveBeenCalledWith(
    new Account('1', '1', '1'),
    new User('', 'sad', '123'),
  );
  expect(result).toBe(false);
});

it('Get accounts: should call CRUD method and return accounts', async () => {
  const mockSelectAccounts = jest.fn();
  CRUDService.mockImplementation(() => {
    return {
      selectAccounts: mockSelectAccounts,
    };
  });
  let fakeAccounts = [new Account('1', '1', '1'), new Account('a', 'b', 'c')];
  mockSelectAccounts.mockResolvedValue(fakeAccounts);
  let service = new AccountService();
  let result = await service.getAccounts(
    new User('', 'sad', '123'),
    new Profile('1', '1'),
  );
  expect(mockSelectAccounts).toHaveBeenCalledWith(
    new User('', 'sad', '123'),
    new Profile('1', '1'),
  );
  expect(result).toBe(fakeAccounts);
});

it('Generate password: should generate password with length = 21', () => {
  let service = new AccountService();
  let result = service.generatePassword();
  expect(result.length).toBe(21);
});
