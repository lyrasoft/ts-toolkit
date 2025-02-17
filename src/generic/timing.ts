export function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export function nextTick(callback = () => {}) {
  return Promise.resolve().then(callback);
}
