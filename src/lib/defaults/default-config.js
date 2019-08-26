import React from 'react';
export const defaultConfig = {
  notFound: {
    default: () => <div>Not found</div>,
    templates: {},
  },
  waitFor: {
    default: () => <div>Loading</div>,
    templates: {},
  },
  wip: {
    default: () => <div>WIP</div>,
    templates: {},
  },
};
