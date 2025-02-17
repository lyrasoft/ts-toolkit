
export function base64UrlEncode(string: string): string {
  return btoa(String(string))
    .replace(/\+/, '-')
    .replace(new RegExp('\\/'), '_')
    .replace(/=+$/, '');
}

export function base64UrlDecode(string: string): string {
  return atob(
    String(string)
      .replace(/-/, '+')
      .replace(/_/, '/')
  );
}

export function uid(prefix: string = '', timebase: boolean = false): string {
  if (timebase) {
    const start = performance?.timeOrigin
      ? Math.round(performance.timeOrigin)
      : performance.timing.navigationStart;

    const time = (start * 100000) + (performance.now() * 100);

    return prefix + time.toString(12) + (randomBytesString(4));
  }

  return prefix + randomBytesString(12);
}

export function tid(prefix: string = ''): string {
  return uid(prefix, true);
}

export function randomBytesString(n: number = 12): string {
  const QUOTA = 65536;
  const crypto = window.crypto;

  if (!crypto) {
    return String(Math.floor(Math.random() * (n ** 10)));
  }

  const a = new Uint8Array(n);

  for (let i = 0; i < n; i += QUOTA) {
    crypto.getRandomValues(a.subarray(i, i + Math.min(n - i, QUOTA)));
  }

  return Array.from(a)
    .map(x => x.toString(16).padStart(2, '0'))
    .join('');
}

export const STR_SEED_BASE32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
export const STR_SEED_BASE32HEX = '0123456789ABCDEFGHIJKLMNOPQRSTUV';
export const STR_SEED_BASE36 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
export const STR_SEED_BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
export const STR_SEED_BASE64SAFE = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const STR_SEED_BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function randomString(length: number, characters: string = STR_SEED_BASE62): string {
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
