import CRUDService from './CRUDService';

export default class ProfileService {
  #currentProfile = '';

  async createProfile(user, profile) {
    let crudService = new CRUDService();
    let result = await crudService.insertProfile(user, profile);
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  async updateProfile(profile, user) {
    let crudService = new CRUDService();
    let result = await crudService.updateProfile(profile, user);
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  async deleteProfile(profile) {
    let crudService = new CRUDService();
    let result = await crudService.deleteProfile(profile);
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  async getProfiles(user) {
    let crudService = new CRUDService();
    let profiles = await crudService.selectProfiles(user);
    return profiles;
  }

  setCurrentProfile(profile) {
    this.#currentProfile = profile;
  }

  getCurrentProfile() {
    return this.#currentProfile;
  }
}
