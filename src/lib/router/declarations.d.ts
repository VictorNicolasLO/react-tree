import LayoutService from '../service-manager/layout-service';
import React, { Component } from 'react';
export declare function useService<T>(Service): T;
export declare function useController<T>(): T;
export declare function useAppConfig(): AppConfig;
export interface AppConfig {
  appId: string;
  controller: any;
  params: Object;
  keepController?: boolean;
  keepStore?: boolean;
}

export interface ParamsFunctionalRouteMethod {
  useService: useService;
  useController: useController;
  useAppConfig: AppConfig;
}
export const FunctionalRouteMethod = (
  params: ParamsFunctionalRouteMethod,
) => {};
export interface RouterOptions {
  path: string;
  component?: any;
  disableLayout?: LayoutService | Array<LayoutService>;
  guard?: FunctionalRouteMethod | Array<FunctionalRouteMethod>;
  onEnter?: FunctionalRouteMethod | Array<FunctionalRouteMethod>;
  onOut?: FunctionalRouteMethod | Array<FunctionalRouteMethod>;
  redirect?: string;
  exact?: boolean;
  appConfig?: AppConfig;
}

export interface DefaultRouterOptions {
  component?: Component;
  disableLayout?: LayoutService | Array<LayoutService>;
  guard?: Function | Array<Function>;
  onEnter?: Function | Array<Function>;
  onOut?: Function | Array<Function>;
  redirect?: string;
  exact?: boolean;
}

export interface Config {
  default?: DefaultRouterOptions;
  notFoundComponent?: Component;
  notFoundTemplate?: string;
  appConfig?: AppConfig;
}
