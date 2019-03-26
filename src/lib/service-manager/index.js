import { useMemo } from 'react';
import ServiceStore, { instance } from './service-store';
import { ServiceDecorator, injectDecorator } from './decorators';
import LayoutServiceLib from './layout-service';

export { component } from './component';

export const serviceStore = instance;

export const injectService = serviceStore.get;

export const useService = (Service) => {
  return useMemo(() => injectService(Service), [Service]);
};

export const LayoutService = LayoutServiceLib;

// Decorators
export const service = ServiceDecorator;
export const inject = injectDecorator;
