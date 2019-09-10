import { instance } from './service-store';
import { observable } from 'mobx';
import navigator from '../router/navigator';

let id = 0;
export function ServiceDecorator(config) {
  return function(Target) {
    class Result extends Target {
      models = {};
      constructor(appConfig) {
        super(appConfig);
        for (let i in this) {
          this.models[i] = (e) => {
            this[i] = e.target.value;
          };
        }
        if (this.__servicesToInject) {
          this.__servicesToInject.forEach(({ service, key }) => {
            this[key] = appConfig.store.get(service);
          });
        }

        if (this.__injectAppConfig) {
          this.__injectAppConfig.forEach(({ key }) => {
            this[key] = appConfig;
          });
        }

        if (this.__injectController) {
          this.__injectController.forEach(({ key }) => {
            this[key] = appConfig.controller;
          });
        }

        if (this.__injectNavigator) {
          this.__injectNavigator.forEach(({ service, key }) => {
            this[key] = {
              nav: navigator,
              push: (path) => {
                navigator.push(appConfig.parentRoute + path);
              },
            };
          });
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

export function injectNavigatorDecorator(Service, config = {}) {
  return function(target, key, descriptor) {
    if (!target.__injectNavigator) {
      target.__injectNavigator = [{ key }];
    } else target.__injectNavigator.push({ key });
    return descriptor;
  };
}

export function injectAppConfigDecorator(Service, config = {}) {
  return function(target, key, descriptor) {
    if (!target.__injectAppConfig) {
      target.__injectAppConfig = [{ key }];
    } else target.__injectAppConfig.push({ key });
    //target[key] = instance.get(Service);
    return descriptor;
  };
}

export function injectControllerDecorator(Service, config = {}) {
  return function(target, key, descriptor) {
    if (!target.__injectController) {
      target.__injectController = [{ key }];
    } else target.__injectController.push({ key });
    //target[key] = instance.get(Service);
    return descriptor;
  };
}

// TODO inject controller decorator y terminar de exportar y resolver tipado para los controladores y appConfig (especialmente en hooks e inyecciones)
