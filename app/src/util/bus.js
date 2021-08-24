const createEventBus = () => {
  const bus = [];

  const notify = (event) => {
    bus.forEach((listener) => {
      listener(event);
    });
  };

  const unSubscribe = (listener) => {
    bus.splice(bus.indexOf(listener), 1);
  };

  const subscribe = (listener) => {
    bus.push(listener);
  };

  return {
    notify,
    subscribe,
    unSubscribe,
  };
};

export { createEventBus };
