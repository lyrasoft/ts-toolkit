declare type StackHandler<T> = (stack: Stack<T>, length: number) => void;

declare type StackValue<V> = V | true;

export class Stack<T = any> {
  observers: { handler: StackHandler<T>, once: boolean }[] = [];

  constructor(protected store: StackValue<T>[] = []) {
    //
  }

  push(value?: T): number {
    const r = this.store.push(value ?? true);

    this.notice();

    return r;
  }

  pop(): T | true | undefined {
    const r = this.store.pop();

    this.notice();

    return r;
  }

  clear(): this {
    this.store = [];

    this.notice();

    return this;
  }

  isEmpty(): boolean {
    return this.store.length === 0;
  }

  get length() {
    return this.store.length;
  }

  peek(): StackValue<T>[] {
    return this.store;
  }

  observe(handler: (stack: Stack, length: number) => void): () => void {
    this.observers.push({
      handler,
      once: false
    });

    return () => {
      this.off(handler);
    };
  }

  once(handler: StackHandler<T>): () => void {
    this.observers.push({
      handler,
      once: true
    });

    return () => {
      this.off(handler);
    };
  }

  notice(): this {
    this.observers.forEach((observer) => {
      observer.handler(this, this.length);
    });

    this.observers = this.observers.filter((observer) => observer.once !== true);

    return this;
  }

  off(callback?: StackHandler<T>): this {
    this.observers = this.observers.filter((observer) => observer.handler !== callback);
    return this;
  }
}

export function stack<T = any>(store: any[] = []) {
  return new Stack<T>(store);
}
