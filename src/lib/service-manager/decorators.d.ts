import { AppConfigCtx } from '../ctx';

export declare function ServiceDecorator(
  config: any,
): <T extends { new (...args: any[]): {} }>(constructor: T) => T;

export declare function ControllerDecorator(
  config: any,
): <T extends { new (...args: any[]): {} }>(constructor: T) => T;

export declare function injectDecorator(config?: any): any;
export declare function inject(config?: any): any;
export declare function injectNavigatorDecorator(config?: any): any;
export declare function injectAppConfigDecorator(config?: any): any;
export declare function injectControllerDecorator(config?: any): any;
export const useAppConfig = () => {
  const appConfig = useContext(AppConfigCtx);
  return appConfig;
};
