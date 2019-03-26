import LayoutService from '../service-manager/layout-service';
import React, { Component } from 'react';
export interface RouterOptions {
  path: string;
  component: Component;
  disableLayout?: LayoutService | Array<LayoutService>;
  guard?: Function | Array<Function>;
  onEnter?: Function | Array<Function>;
  onOut?: Function | Array<Function>;
  redirect?: string;
  exact?: boolean;
}

export interface DefaultRouterOptions {
  component: Component;
  disableLayout?: LayoutService | Array<LayoutService>;
  guard?: Function | Array<Function>;
  onEnter?: Function | Array<Function>;
  onOut?: Function | Array<Function>;
  redirect?: string;
  exact?: boolean;
}

export interface Config {
  default: DefaultRouterOptions;
  notFoundComponent: Component;
  notFoundTemplate: string;
}
