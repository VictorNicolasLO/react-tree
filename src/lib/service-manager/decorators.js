import { instance } from './service-store';
import { observable } from 'mobx';
let id = 0;
export function ServiceDecorator(config) {
  return function(Target) {
    class Result extends Target {
      models = {};
      constructor(configService) {
        super(configService);
        for (let i in this) {
          this.models[i] = (e) => {
            this[i] = e.target.value;
          };
        }
        if (this.__servicesToInject)
          this.__servicesToInject.forEach(({ service, key }) => {
            this[key] = configService.store.get(service);
          });
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
      ready = false;
      error = false;
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
  return function(target, key, descriptor) {
    if (!target.__servicesToInject) {
      target.__servicesToInject = [{ service: Service, key }];
    } else target.__servicesToInject.push({ service: Service, key });
    //target[key] = instance.get(Service);
    return descriptor;
  };
}
