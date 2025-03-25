
export function getGlobalThis() {
  return globalThis;
}

export function isBrowser() {
  return typeof window !== 'undefined';
}

export function isNode() {
  return typeof window === 'undefined';
}
