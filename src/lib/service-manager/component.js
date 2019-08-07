import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Component } from 'react';
import { defaultsInstance } from '../defaults';

export function component(Target, config = {}) {
  if (config.wait) {
    const wait = config.wait;
    const waitForDefault = defaultsInstance.get('waitFor');
    const Template =
      wait.component ||
      (wait.template
        ? waitForDefault.templates[wait.template]
        : waitForDefault.default);

    const ObserverTarget = observer(Target);

    return observer((props) => {
      const isResolved = config.wait.for(props);
      if (!isResolved) return <Template {...props} />;
      else return <ObserverTarget {...props} />;
    });
  }
  return observer(Target);
}
