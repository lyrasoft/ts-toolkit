import { uid } from '../generic';

type UniqItem<T, P extends string = 'uid'> = T & { [key in P]: string };

export function uniqueItem<T extends object, K extends string = 'uid'>(item: T, keyName: K = 'uid' as K): UniqItem<T, K> {
  (item as Record<K, unknown>)[keyName] ??= uid();

  return item as UniqItem<T, K>;
}

export function uniqueItemList<T extends object, K extends string = 'uid'>(items: T[], keyName: K = 'uid' as K): UniqItem<T, K>[] {
  return items.map((item) => uniqueItem<T, K>(item));
}

export function keep(...args: any[]) {
  return null;
}
