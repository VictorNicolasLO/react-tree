import React from 'react';
import { RouterOptions, Config } from './declarations';
import { Switch, Route } from 'react-router-dom';
import { createRouteComponent } from './utils';

export declare function createRouter(
  router: Array<RouterOptions>,
  config?: Config = {}
): Component;
