import React, { useEffect, useContext } from 'react';
import { component, injectService, useService } from '../service-manager';
import LayoutService from '../service-manager/layout-service';
import { Redirect } from 'react-router-dom';
import navigator from './navigator';
import { AppConfigCtx } from '../ctx';
import ServiceStore from '../service-manager/service-store';
import { RouterCtx } from '../ctx';
function runOnEnter(onEnter, params) {
  if (onEnter) {
    if (onEnter.length) for (let i in onEnter) onEnter[i](params);
    else onEnter(params);
  }
}

function runOnOut(onOut, params) {
  if (onOut) {
    if (onOut.length) for (let i in onOut) onOut[i](params);
    else onOut(params);
  }
}

function runProtect(protect, params) {
  if (protect) {
    if (protect.length)
      for (let i in protect) {
        const protectRes = protect[i](params);
        if (protectRes) {
          return protectRes;
        }
      }
    else {
      const protectRes = protect(params);
      if (protectRes) {
        return protectRes;
      }
    }
  }
}

function runDisableLayout(services) {
  for (let i in services) services[i].disable();
}

function runEnableLayout(services) {
  for (let i in services) {
    services[i].enable();
  }
}

export function createRouteComponent(opt) {
  const Component = opt.component;
  let services = [];
  if (opt.disableLayout)
    services = !opt.disableLayout.length
      ? [injectService(opt.disableLayout)]
      : opt.disableLayout.map((item) => {
          return injectService(item);
        });

  let isDisableLayouRun = false;

  const RoutedComponent = (props) => {
    navigator.setRoute(props.location, props.match, props.history);
    // Crate optional params for onEnter, onOut and guards
    const appConfig = useContext(AppConfigCtx);
    const { store, controller } = appConfig;
    const useService = (service) => {
      return store.get(Service);
    };
    const useController = () => {
      return controller;
    };
    const useAppConfig = () => {
      return appConfig;
    };
    const params = { useController, useService, useAppConfig };

    useEffect(() => {
      runOnEnter(opt.onEnter, params);
      return () => {
        runOnOut(opt.onOut, params);
      };
    }, []);
    if (!isDisableLayouRun) {
      isDisableLayouRun = true;
    }
    if (opt.wait) {
      const isLoading = opt.wait.for();
      return;
    }

    const isProtected = runProtect(opt.guard, params);
    if (isProtected) {
      return <Redirect to={isProtected} />;
    }

    return (
      <Component
        location={props.location}
        match={props.match}
        history={props.history}
      />
    );
  };

  const appConfig = opt.appConfig;
  const FinalComponent = !appConfig
    ? RoutedComponent
    : (props) => {
        const controller = useService(appConfig.controller, {
          attach: !appConfig.keepController,
        });
        return (
          <RouterCtx.Consumer>
            {({ parent }) => (
              <AppConfigCtx.Consumer>
                {(parentAppConfig) => (
                  <AppConfigCtx.Provider
                    value={{
                      parentApp: parentAppConfig,
                      ...appConfig,
                      controller,
                      store: new ServiceStore({
                        parentApp: parentAppConfig,
                        ...appConfig,
                        controller,
                        parentRoute: parent,
                      }),
                      parentRoute: parent,
                    }}>
                    <RoutedComponent {...props} />
                  </AppConfigCtx.Provider>
                )}
              </AppConfigCtx.Consumer>
            )}
          </RouterCtx.Consumer>
        );
      };

  return React.memo(
    component(FinalComponent),
    (prev, next) => prev.location.pathname == next.location.pathname,
  );
}
