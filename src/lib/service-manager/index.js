import Ss, { instance } from './service-store';
import {
  ServiceDecorator,
  injectDecorator,
  ControllerDecorator,
} from './decorators';
import LayoutServiceLib from './layout-service';
import { useServiceHook, useControllerHook } from './hooks';

export { component } from './component';
export const ServiceStore = Ss;
export const serviceStore = instance;

export const injectService = serviceStore.get;

export const useService = useServiceHook;
export const useController = useControllerHook;
export const LayoutService = LayoutServiceLib;

// Decorators
export const service = ServiceDecorator;
export const controller = ControllerDecorator;
export const inject = injectDecorator;
