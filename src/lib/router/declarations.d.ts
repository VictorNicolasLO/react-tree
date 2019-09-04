import LayoutService from '../service-manager/layout-service';
import React, { Component } from 'react';
export declare function useService<T>(Service, options: UseServiceOptions): T;
export declare function useController<T>(): T;
export interface ParamsFunctionalRouteMethod {
  useService: useService;
  useController: useController;
}
export const FunctionalRouteMethod = (params) => {};
export interface RouterOptions {
  path: string;
  component: Component;
  disableLayout?: LayoutService | Array<LayoutService>;
  guard?: ParamsFunctionalRouteMethod | Array<ParamsFunctionalRouteMethod>;
  onEnter?: ParamsFunctionalRouteMethod | Array<ParamsFunctionalRouteMethod>;
  onOut?: ParamsFunctionalRouteMethod | Array<ParamsFunctionalRouteMethod>;
  redirect?: string;
  exact?: boolean;
  appConfig: AppConfig;
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

export interface AppConfig {
  appId: string;
  controller: any;
  params: Object;
  keepController: boolean;
  keepStore: boolean;
}

export interface Config {
  default: DefaultRouterOptions;
  notFoundComponent: Component;
  notFoundTemplate: string;
  appConfig: AppConfig;
}
