import { observable, action } from 'mobx';

export default class LayoutService {
  @observable show;

  @action switch() {
    this.show = !this.show;
  }

  @action enable() {
    this.show = true;
  }

  @action disable() {
    this.show = false;
  }
}
