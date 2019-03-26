import { defaultConfig } from './default-config';

export class Defaults {
  data;

  constructor(defaults) {
    this.data = defaults;
  }

  setAll(data) {
    this.data = data;
  }

  set(value, key) {
    data[key] = value;
  }

  get(key) {
    data[key];
  }
}

export const defaultsInstance = new Defaults(defaultConfig);

export function setDefaults(defaults) {
  defaultsInstance.setAll(defaults);
}
