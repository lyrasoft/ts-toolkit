import { isRef, type MaybeRef, type Ref, unref, ref } from 'vue';

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

export function wrapRef<T>(value: MaybeRef<T>): Ref<T> {
  if (typeof value === 'function') {
    value = ref((value as Function)());
  }

  return (isRef(value) ? value : ref(value)) as Ref<T>;
}

export function wrapRefs<T extends object>(object: T): WrapRefs<T> {
  const v: Record<string, any> = {};

  for (const key in object) {
    v[key] = wrapRef(object[key]);
  }

  return v as WrapRefs<T>;
}

export type WrapRefs<T = any> = {
  [K in keyof T]: Ref<T[K]>;
};
