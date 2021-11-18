/**
 * @format
 */

import 'react-native';
import React from 'react';
import ProfileService from '../src/ProfileService';
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

it('Create profile: should call CRUD method and return true if profile doesnt exist', async () => {
  const mockInsertProfile = jest.fn();
  CRUDService.mockImplementation(() => {
    return {
      insertProfile: mockInsertProfile,
    };
  });
  mockInsertProfile.mockResolvedValue(true);
  let service = new ProfileService();
  let result = await service.createProfile(
    new User('1', 'sad', '123'),
    new Profile('1', '1'),
  );
  expect(mockInsertProfile).toHaveBeenCalledWith(
    new User('1', 'sad', '123'),
    new Profile('1', '1'),
  );
  expect(result).toBe(true);
});

it('Create profile: should call CRUD method and return false if profile exist', async () => {
  const mockInsertProfile = jest.fn();
  CRUDService.mockImplementation(() => {
    return {
      insertProfile: mockInsertProfile,
    };
  });
  mockInsertProfile.mockResolvedValue(false);
  let service = new ProfileService();
  let result = await service.createProfile(
    new User('1', 'sad', '123'),
    new Profile('1', '1'),
  );
  expect(mockInsertProfile).toHaveBeenCalledWith(
    new User('1', 'sad', '123'),
    new Profile('1', '1'),
  );
  expect(result).toBe(false);
});

it('Update profile: should call CRUD method and return false if profile wasnt updated', async () => {
  const mockUpdateProfile = jest.fn();
  CRUDService.mockImplementation(() => {
    return {
      updateProfile: mockUpdateProfile,
    };
  });
  mockUpdateProfile.mockResolvedValue(false);
  let service = new ProfileService();
  let result = await service.updateProfile(new Profile('1', '1'));
  expect(mockUpdateProfile).toHaveBeenCalledWith(new Profile('1', '1'));
  expect(result).toBe(false);
});

it('Update profile: should call CRUD method and return true if profile was updated', async () => {
  const mockUpdateProfile = jest.fn();
  CRUDService.mockImplementation(() => {
    return {
      updateProfile: mockUpdateProfile,
    };
  });
  mockUpdateProfile.mockResolvedValue(true);
  let service = new ProfileService();
  let result = await service.updateProfile(new Profile('1', '1'));
  expect(mockUpdateProfile).toHaveBeenCalledWith(new Profile('1', '1'));
  expect(result).toBe(true);
});

it('Delete profile: should call CRUD method and return true if profile was deleted', async () => {
  const mockDeleteProfile = jest.fn();
  CRUDService.mockImplementation(() => {
    return {
      deleteProfile: mockDeleteProfile,
    };
  });
  mockDeleteProfile.mockResolvedValue(true);
  let service = new ProfileService();
  let result = await service.deleteProfile(new Profile('1', '1'));
  expect(mockDeleteProfile).toHaveBeenCalledWith(new Profile('1', '1'));
  expect(result).toBe(true);
});

it('Delete profile: should call CRUD method and return false if profile wasnt deleted', async () => {
  const mockDeleteProfile = jest.fn();
  CRUDService.mockImplementation(() => {
    return {
      deleteProfile: mockDeleteProfile,
    };
  });
  mockDeleteProfile.mockResolvedValue(false);
  let service = new ProfileService();
  let result = await service.deleteProfile(new Profile('1', '1'));
  expect(mockDeleteProfile).toHaveBeenCalledWith(new Profile('1', '1'));
  expect(result).toBe(false);
});

it('Get profiles: should call CRUD method and return profiles', async () => {
  const mockSelectProfiles = jest.fn();
  CRUDService.mockImplementation(() => {
    return {
      selectProfiles: mockSelectProfiles,
    };
  });
  let fakeProfiles = [new Profile('1', '1'), new Profile('b', 'c')];
  mockSelectProfiles.mockResolvedValue(fakeProfiles);
  let service = new ProfileService();
  let result = await service.getProfiles(new User('', 'sad', '123'));
  expect(mockSelectProfiles).toHaveBeenCalledWith(new User('', 'sad', '123'));
  expect(result).toBe(fakeProfiles);
});

it('Set/Get current profile: should set and get current profile', () => {
  let service = new ProfileService();
  let currentProfile = service.getCurrentProfile();
  expect(currentProfile).toBe('');
  service.setCurrentProfile(new Profile('1', '1'));
  let profile = service.getCurrentProfile();
  expect(profile.getName()).toBe('1');
});
