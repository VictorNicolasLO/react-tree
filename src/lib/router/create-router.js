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
  const notFoundComponent = config.notFoundComponent;
  const notFoundDefault = defaultsInstance.get('notFound');
  const ResultComponent = () => {
    return (
      <Switch>
        {router.map(makeRoute)}
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
