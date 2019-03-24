import React from 'react';

export default class NotFoundTemplate {
  template = () => <div>Not found!!</div>;
  get() {
    return this.template;
  }
  set(template) {
    this.template = template;
  }
}

export const NotFound = new NotFoundTemplate();
