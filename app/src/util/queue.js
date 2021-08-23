const createQueue = (values) => {
  const queue = [];

  const push = (element) => {
    queue.push(element);
  };

  const shift = () => {
    const element = queue[0];
    queue.splice(0, 1);
    return element;
  };

  const isEmpty = () => {
    return queue.length === 0;
  };

  const length = () => {
    return queue.length;
  };

  // add values to queue
  if (values) {
    values.forEach(push);
  }

  return {
    push,
    shift,
    isEmpty,
    length
  };
}

export {
  createQueue
}