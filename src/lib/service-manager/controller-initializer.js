import { extendObservable } from 'mobx';

export function initController(Controller) {
  const newController = new Controller();
  extendObservable(newController, {
    ready: false,
    error: undefined,
  });
  (async () => {
    try {
      if (newController.init) await newController.init();
      newController.ready = true;
    } catch (e) {
      newController.error = e;
      throw e;
    }
  })();
  return newController;
}
