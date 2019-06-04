export function initController(Controller) {
  const newController = new Controller();
  (async () => {
    try {
      await newController.init();
      if ('ready' in newController) {
        newController.ready = true;
      }
    } catch (e) {
      if ('error' in newController) {
        newController.error = e;
      }
    }
  })();
  return newController;
}
