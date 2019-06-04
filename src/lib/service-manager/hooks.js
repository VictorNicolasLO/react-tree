import { initController } from './controller-initializer';

export const useServiceHook = (Service, opt = {}) => {
  useEffect(() => {
    return () => {
      if (opt.attach) {
        serviceStore.destroy(Service);
      }
    };
  }, []);
  return useMemo(() => injectService(Service), [Service]);
};

export const useControllerHook = (Controller) => {
  const [controller, setController] = useState(initController(Controller));
  return controller;
};
