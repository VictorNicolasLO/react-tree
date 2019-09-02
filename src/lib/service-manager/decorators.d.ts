import { AppConfigCtx } from '../ctx';

export declare function ServiceDecorator(
  config: any,
): <T extends { new (...args: any[]): {} }>(constructor: T) => T;

export declare function ControllerDecorator(
  config: any,
): <T extends { new (...args: any[]): {} }>(constructor: T) => T;

export declare function injectDecorator(config: any): (Target) => {};

export const useAppConfig = () => {
  const appConfig = useContext(AppConfigCtx);
  return appConfig;
};
