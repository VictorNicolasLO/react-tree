import { History } from 'history';
export class Navigator {
  location = {};
  match = {};
  history: History;
  setRoute(location: any, match: any, history: any);
  push = this.history.push;
}

const navigator: Navigator;
export default navigator;
