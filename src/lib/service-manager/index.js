import Ss, { instance } from './service-store';
import {
  ServiceDecorator,
  injectDecorator,
  ControllerDecorator,
  injectNavigatorDecorator,
  injectAppConfigDecorator,
  injectControllerDecorator,
} from './decorators';
import LayoutServiceLib from './layout-service';
import {
  useServiceHook,
  useControllerHook,
  useNavigatorHook,
  useRouterHook,
  useAppConfigHook,
} from './hooks';

export { component } from './component';
export const ServiceStore = Ss;
export const serviceStore = instance;

// Deprecated
export const injectService = serviceStore.get;
export const LayoutService = LayoutServiceLib;

// Hooks
export const useService = useServiceHook;
export const useController = useControllerHook;
export const useNavigator = useNavigatorHook;
export const useRouter = useRouterHook;
export const useAppConfig = useAppConfigHook;

// Decorators
export const service = ServiceDecorator;
export const controller = ControllerDecorator;
export const inject = injectDecorator;
export const injectNavigator = injectNavigatorDecorator;
export const injectAppConfig = injectAppConfigDecorator;
export const injectController = injectControllerDecorator;
