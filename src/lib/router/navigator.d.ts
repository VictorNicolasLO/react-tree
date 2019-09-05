import { History } from 'history';
class Navigator {
  location = {};
  match = {};
  history: History;
  setRoute(location: any, match: any, history: any);
  push = this.history.push;
}

export interface InjectedNavigator {
  nav: Navigator;
  push: Function;
}

const navigator: Navigator;
export default navigator;
