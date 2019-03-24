import { useMemo } from 'react';
import ServiceStore from './service-store';
import { ServiceDecorator } from './decorators';

export { component } from './component';

import LayoutServiceLib from './layout-service';

export declare const serviceStore: ServiceStore;

export declare function injectService<T>(Service): T;

export declare function useService<T>(Service): T;

export const service;

export const LayoutService: LayoutServiceLib;
