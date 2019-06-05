import { instance } from './service-store';
let id = 0;
export function ServiceDecorator(config) {
  return function(Target) {
    class Result extends Target {
      models = {};
      constructor(config) {
        super(config);
        for (let i in this) {
          this.models[i] = (e) => {
            this[i] = e.target.value;
          };
        }
      }
    }
    Result._id = id;
    id++;
    return Result;
  };
}

export function ControllerDecorator(config) {
  return function(Target) {
    return class Result extends Target {
      models = {};
      constructor(config) {
        super(config);
        for (let i in this) {
          this.models[i] = (e) => {
            this[i] = e.target.value;
          };
        }
      }
    };
  };
}

export function injectDecorator(Service, config = {}) {
  return function(Target) {
    return instance.get(Service);
  };
}
