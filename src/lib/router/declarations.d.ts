import LayoutService from '../service-manager/layout-service';

export interface RouterOptions {
  path: string;
  component: Component;
  disableLayout?: LayoutService | Array<LayoutService>;
  guard?: Function<Boolean> | Array<Function<Boolean>>;
  onEnter?: Function<Boolean> | Array<Function>;
  onOut?: Function<Boolean> | Array<Function>;
  exact?: boolean;
}

export interface Config {
  default: Component;
  notFoundComponent: Component;
}
