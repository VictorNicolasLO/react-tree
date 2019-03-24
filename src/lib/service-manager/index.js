import { useMemo } from 'react';
import ServiceStore from './service-store';
import { ServiceDecorator } from './decorators';
import LayoutServiceLib from './layout-service';

export { component } from './component';

export const serviceStore = new ServiceStore();

export const injectService = serviceStore.get;

export const useService = (Service) => {
  return useMemo(() => injectService(Service), [Service]);
};

export const service = ServiceDecorator;

export const LayoutService = LayoutServiceLib;
