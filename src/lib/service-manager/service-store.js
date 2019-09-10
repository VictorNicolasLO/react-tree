import { initController } from './controller-initializer';

export default class ServiceStore {
  store = {};
  constructor(appConfig) {
    this.appConfig = appConfig || { parent: '/' };

    this.appConfig.store = this;
  }
  create = (Service) => {
    this.store[Service._id] = initController(Service, this.appConfig);
    return this.store[Service._id];
  };

  get = (Service) => {
    if (this.store[Service._id]) {
      return this.store[Service._id];
    } else return this.create(Service);
  };

  destroy = (Service) => {
    if (this.store[Service._id]) {
      delete this.store[Service._id];
    }
  };
}

export const instance = new ServiceStore();
