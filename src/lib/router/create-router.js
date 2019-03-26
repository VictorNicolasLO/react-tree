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

export function createRouter(router, config = {}) {
  const notFoundTemplate = config.notFoundTemplate;
  const ResultComponent = () => {
    return (
      <Switch>
        {router.map(makeRoute)}
        {config.default
          ? makeRoute({ ...config.default, ...{ path: '*' } }, 'default')
          : null}
        <Route
          path="*"
          component={
            notFoundComponent || notFoundTemplate
              ? defaultsInstance.get('notFound').templates[notFoundTemplate]
              : defaultsInstance.get('notFound').default
          }
        />
      </Switch>
    );
  };

  return ResultComponent;
}
