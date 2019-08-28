import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createRouteComponent } from './utils';
import { defaultsInstance } from '../defaults';
import pathToRegexp from 'path-to-regexp';
import navigator from './navigator';
import { toJS } from 'mobx';
import { RouterCtx } from '../ctx/ctx';

function makeRoute(item, index) {
  // if wip is true display 'wip' template

  if (item.wip) {
    const WipComponent = defaultsInstance.get('wip').default;
    return (
      <Route
        exact={item.exact}
        key={index}
        path={item.path}
        component={WipComponent}
      />
    );
  }
  // if redirect is a path, change the route by the redirect string otherwise it doesn't anything
  if (item.redirect)
    item.component = () => (
      <Redirect
        to={pathToRegexp.compile(item.redirect)(navigator.match.params)}
      />
    );

  return (
    <RouterCtx.Consumer>
      {({ parent }) => (
        <RouterCtx.Provider value={{ parent: parent + item.path }}>
          <Route
            exact={item.exact}
            key={index}
            path={parent + item.path}
            component={createRouteComponent(item)}
          />
        </RouterCtx.Provider>
      )}
    </RouterCtx.Consumer>
  );
}

function sortRoutes(routes) {
  const nested = routes.map((route) => {
    return {
      ...route,
      ...{
        _nested: route.path.split('/').filter((ch) => ch != '').length,
      },
    };
  });
  return nested.sort(({ _nested: r1 }, { _nested: r2 }) => (r1 > r2 ? -1 : 1));
}

export function createRouter(router, config = {}) {
  const sortedRouter = sortRoutes(router);
  const routesComponent = sortedRouter.map(makeRoute);
  const ResultComponent = ({ routerConfig }) => {
    const { parent } = routerConfig | {};
    const notFoundTemplate = config.notFoundTemplate;
    const notFoundComponent = config.notFoundComponent;
    const notFoundDefault = defaultsInstance.get('notFound');
    return (
      <Switch>
        {routesComponent}
        {config.default ? (
          makeRoute({ ...config.default, ...{ path: '*' } }, 'default')
        ) : (
          <Route
            path="*"
            component={
              notFoundComponent ||
              (notFoundTemplate
                ? notFoundDefault.templates[notFoundTemplate]
                : notFoundDefault.default)
            }
          />
        )}
      </Switch>
    );
  };

  return ResultComponent;
}
