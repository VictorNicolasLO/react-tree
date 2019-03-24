import React, { useState } from 'react';
import { observer, useObserver } from 'mobx-react-lite';
import { Component } from 'react';

export function component(Target) {
  return observer(Target);
}
