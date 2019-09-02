export const RouterCtx = React.createContext({
  parent: '',
});

export const AppConfigCtx = React.createContext({
  appId: '',
  controller: undefined,
  params: {},
  store: {},
  parentApp: undefined,
});
