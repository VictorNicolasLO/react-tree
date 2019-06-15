import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createRouteComponent } from './utils';
import { defaultsInstance } from '../defaults';

function makeRoute(item, index) {
  if (item.redirect) item.component = () => <Redirect to={item.redirect} />;
  return (
    <Route
      exact={item.exact}
      key={index}
      path={item.path}
      component={createRouteComponent(item)}
    />
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
  const ResultComponent = () => {
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
