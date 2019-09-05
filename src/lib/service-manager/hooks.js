import { useMemo, useEffect, useState, useContext } from 'react';
import { initController } from './controller-initializer';
import ServiceStore, { instance } from './service-store';
import { AppConfigCtx } from '../ctx';
import { RouterCtx } from '../ctx';
import { navigator } from '../router';

export const useServiceHook = (Service, opt = {}) => {
  const { store } = useContext(AppConfigCtx);
  useEffect(() => {
    return () => {
      if (opt.attach) {
        store.destroy(Service);
      }
    };
  }, []);

  return useMemo(() => store.get(Service), [Service]);
};

export const useControllerHook = (Controller) => {
  const { controller } = useContext(AppConfigCtx);
  return controller;
};

export const useAppConfigHook = () => {
  const appConfig = useContext(AppConfigCtx);
  return appConfig;
};

export const useRouterHook = () => {
  const { parent } = useContext(RouterCtx);
};

export const useNavigatorHook = () => {
  const { parent } = useContext(RouterCtx);
  return {
    nav: navigator,
    push: (path) => navigator.push(parent + path),
  };
};
