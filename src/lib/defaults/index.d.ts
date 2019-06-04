import { Component } from 'react';
export declare interface NotFound {
  default: Component;
  templates: Object;
}
export declare interface WaitFor {
  default: Component;
  templates: Object;
}

export declare interface RRSXDefaults {
  notFound: NotFound;
  waitFor: WaitFor;
}

export declare function setDefaults(params: RRSXDefaults);

export declare const defaultsInstance;
