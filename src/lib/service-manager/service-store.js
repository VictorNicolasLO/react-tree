import { initController } from './controller-initializer';

export default class ServiceStore {
  store = {};

  create = (Service) => {
    this.store[Service._id] = initController(Service, this);
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
