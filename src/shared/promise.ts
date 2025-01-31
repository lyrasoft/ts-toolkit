export function promiseWithResolvers<T = void>() {
  let resolve: (value: T | PromiseLike<T>) => void;
  let reject: (reason?: any) => void;

  const promise = new Promise<T>((rs, rj) => {
    resolve = rs;
    reject = rj;
  });

  // @ts-ignore
  return { promise, resolve, reject };
}
