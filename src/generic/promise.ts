declare type WithResolversReturn<T> = {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}

export function promiseWithResolvers<T = void>(): WithResolversReturn<T> {
  let resolve: (value: T | PromiseLike<T>) => void;
  let reject: (reason?: any) => void;

  const promise = new Promise<T>((rs, rj) => {
    resolve = rs;
    reject = rj;
  });

  // @ts-ignore
  return { promise, resolve, reject };
}
