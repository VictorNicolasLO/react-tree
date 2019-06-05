import { defaultConfig } from './default-config';

export class Defaults {
  constructor(defaults) {
    this.data = defaults;
  }

  setAll = (data) => {
    this.data = data;
  };

  set = (value, key) => {
    this.data[key] = value;
  };

  get = (key) => this.data[key];
}

export const defaultsInstance = new Defaults(defaultConfig);

export function setDefaults(defaults) {
  defaultsInstance.setAll(defaults);
}
