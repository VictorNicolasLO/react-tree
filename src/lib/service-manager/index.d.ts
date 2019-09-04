import { useMemo } from 'react';
import Ss from './service-store';
import { ServiceDecorator, injectDecorator } from './decorators';

export { component } from './component';

import LayoutServiceLib from './layout-service';
import { ControllerDecorator } from './decorators';
export const ServiceStore = Ss;
export declare const serviceStore: Ss;

export declare function injectService<T>(Service): T;

export interface UseServiceOptions {
  attach: Boolean;
}

export declare function useService<T>(Service, options: UseServiceOptions): T;

export declare function useController<T>(): T;

export const LayoutService: LayoutServiceLib;

// decorators

export const service = ServiceDecorator;
export const controller = ControllerDecorator;

export const inject = injectDecorator;
