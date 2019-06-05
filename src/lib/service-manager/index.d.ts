import { useMemo } from 'react';
import ServiceStore from './service-store';
import { ServiceDecorator, injectDecorator } from './decorators';

export { component } from './component';

import LayoutServiceLib from './layout-service';
import { ControllerDecorator } from './decorators';

export declare const serviceStore: ServiceStore;

export declare function injectService<T>(Service): T;

export interface UseServiceOptions {
  attach: Boolean;
}

export declare function useService<T>(Service, options: UseServiceOptions): T;

export declare function useController<T>(Controller): T;

export const LayoutService: LayoutServiceLib;

// decorators

export const service = ServiceDecorator;
export const controller = ControllerDecorator;

export const inject = injectDecorator;
