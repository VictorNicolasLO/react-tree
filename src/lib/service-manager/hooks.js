import { useMemo, useEffect, useState } from 'react';
import { initController } from './controller-initializer';
import ServiceStore, { instance } from './service-store';

export const useServiceHook = (Service, opt = {}) => {
  useEffect(() => {
    return () => {
      if (opt.attach) {
        serviceStore.destroy(Service);
      }
    };
  }, []);
  return useMemo(() => instance.get(Service), [Service]);
};

export const useControllerHook = (Controller) => {
  const [controller] = useState(initController(Controller));
  return controller;
};
