export const RouterCtx = React.createContext({
  parent: '',
});

export const AppConfigCtx = React.createContext({
  appId: '',
  parentRoute: '',
  controller: undefined,
  params: {},
  store: {},
  parentApp: undefined,
});
