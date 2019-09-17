//@flow

import React, { Component } from 'react';

export interface For {
  for: Function;
  template: string;
  component: Component;
}
export interface Config {
  wait: For;
}

export declare function component<T>(
  Target: React.StatelessComponent<T>,
  config?: Config,
): React.StatelessComponent<T | null>;
