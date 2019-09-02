import { extendObservable } from 'mobx';

export function initController(Controller, store) {
  const newController = new Controller({ store });
  const extendData = {};
  if (!newController.hasOwnProperty('ready')) {
    extendData.ready = false;
  }
  if (!newController.hasOwnProperty('error')) {
    extendData.error = undefined;
  }
  extendObservable(newController, extendData);
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
