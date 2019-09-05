import { useMemo } from 'react';
import Ss from './service-store';
import {
  ServiceDecorator,
  injectDecorator,
  injectAppConfigDecorator,
  injectControllerDecorator,
} from './decorators';

export { component } from './component';

import LayoutServiceLib from './layout-service';
import { ControllerDecorator } from './decorators';
import { injectNavigatorDecorator } from './decorators';
export const ServiceStore = Ss;
export declare const serviceStore: Ss;

export declare function injectService<T>(Service): T;

export interface UseServiceOptions {
  attach: Boolean;
}
export interface Navigator {
  nav: nav;
  push: (path: string) => {};
}
export interface Router {
  parent: string;
}
export interface AppConfig {
  parent: string;
  appId: string;
  parentRoute: string;
  controller: any;
  params: object;
  store: object;
  parentApp: AppConfig;
}
export declare function useService<T>(Service, options: UseServiceOptions): T;
export declare function useController<T>(): T;
export declare function useNavigator(): Navigator;
export declare function useRouter(): Router;
export declare function useAppConfig(): AppConfig;

export const LayoutService: LayoutServiceLib;

// decorators

export const service = ServiceDecorator;
export const controller = ControllerDecorator;
export const injectNavigator = injectNavigatorDecorator;
export const injectAppConfig = injectAppConfigDecorator;
export const injectController = injectControllerDecorator;
export const inject = injectDecorator;
