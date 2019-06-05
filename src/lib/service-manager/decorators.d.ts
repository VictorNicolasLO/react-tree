export declare function ServiceDecorator(
  config: any,
): <T extends { new (...args: any[]): {} }>(constructor: T) => T;

export declare function ControllerDecorator(
  config: any,
): <T extends { new (...args: any[]): {} }>(constructor: T) => T;

export declare function injectDecorator(config: any): (Target) => {};
