import { createBrowserHistory } from 'history';
import { observable, action } from 'mobx';

export class Navigator {
  @observable location = {};
  @observable match = {};
  history = createBrowserHistory({});

  @action setRoute(location, match, history) {
    this.location = location;
    this.match = match;
    this.history = history;
  }
  push = this.history.push;
}

export default new Navigator();
