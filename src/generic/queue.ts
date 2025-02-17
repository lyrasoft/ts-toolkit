export class TaskQueue {
  items: (() => Promise<any>)[] = [];

  currentRunning = 0;

  running = false;

  observers: {
    handler: Function;
    once: boolean;
  }[] = [];

  constructor(public maxRunning = 1) {
    //
  }

  push<T extends ((...args: any[]) => any)>(callback: T): Promise<Awaited<ReturnType<T>>> {
    const p = new Promise<Awaited<ReturnType<T>>>((resolve, reject) => {
      this.items.push(() => {
        return Promise.resolve(callback()).then(resolve);
      });
    });

    this.run();

    return p;
  }

  run(): void {
    if (!this.running) {
      this.running = true;
    }

    this.pop();
  }

  async pop() {
    const callback = this.items.shift();

    // If empty, stop running.
    if (!callback) {
      this.running = false;
      return Promise.resolve();
    }

    // If current running full, set back to queue and leave.
    if (this.currentRunning >= this.maxRunning) {
      this.items.unshift(callback);
      return Promise.resolve();
    }

    this.currentRunning++;

    this.notice();

    try {
      return await callback();
    } catch (e) {
      throw e;
    } finally {
      this.endPop();
    }
  }

  endPop() {
    this.currentRunning--;
    this.notice();
    this.pop();
  }

  clear() {
    this.items = [];

    this.notice();

    return this;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  get length(): number {
    return this.items.length;
  }

  peek() {
    return this.items;
  }

  observe(handler: ObserverFunction, options: { once?: boolean } = {}): () => void {
    this.observers.push({
      handler,
      once: options.once || false,
    });

    return () => {
      this.off(handler);
    };
  }

  once(handler: ObserverFunction, options: { once?: boolean } = {}): () => void {
    options.once = true;

    return this.observe(handler, options);
  }

  onEnd(callback: ObserverFunction, options: { once?: boolean } = {}) {
    return this.observe((queue, length, running) => {
      if (length === 0 && running === 0) {
        callback(queue, length, running);
      }
    }, options);
  }

  notice() {
    this.observers.forEach((observer) => {
      observer.handler(this, this.length, this.currentRunning);
    });

    this.observers = this.observers.filter((observer) => !observer.once);

    return this;
  }

  off(callback?: Function) {
    if (callback == null) {
      this.observers = [];
      return this;
    }

    this.observers = this.observers.filter((observer) => observer.handler !== callback);
    return this;
  }
}

declare type ObserverFunction = (queue: TaskQueue, length: number, running: number) => void

export function queue(maxRunning: number = 1) {
  return new TaskQueue(maxRunning);
}
