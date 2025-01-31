import { unref } from 'vue';

export function unrefs<T extends object>(refs: T): UnRefs<T> {
  const newRefs: Record<string, any> = {};

  for (const k in refs) {
    newRefs[k] = unref(refs[k]);
  }

  return newRefs as UnRefs<T>;
}

export type UnRefs<T = any> = {
  [K in keyof T]: UnRef<T[K]>;
};

export type UnRef<T> = T;
