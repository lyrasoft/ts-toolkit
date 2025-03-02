import {
  onBeforeRouteUpdate,
  type RouteLocationNormalized,
  type RouteLocationNormalizedLoaded,
  useRoute,
} from 'vue-router';
import { type WrapRefs, wrapRefs } from '../reactives';

export async function loadInstantAndRouteUpdate<T extends Record<string, any> = Record<string, any>>(
  handler: (to: RouteLocationNormalized, from?: RouteLocationNormalizedLoaded) => Promise<undefined> | undefined,
): Promise<undefined>
export async function loadInstantAndRouteUpdate<T extends Record<string, any> = Record<string, any>>(
  handler: (to: RouteLocationNormalized, from?: RouteLocationNormalizedLoaded) => Promise<T> | T,
): Promise<WrapRefs<T>>
export async function loadInstantAndRouteUpdate<T extends Record<string, any> = Record<string, any>>(
  handler: (to: RouteLocationNormalized,
            from?: RouteLocationNormalizedLoaded) => Promise<T | undefined> | T | undefined,
): Promise<WrapRefs<T> | undefined> {
  const route = useRoute();

  let returnValue: WrapRefs<T> | undefined = undefined;

  onBeforeRouteUpdate(async (to, from) => {
    const r = await handler(to, from);

    if (r && returnValue) {
      for (const rKey in r) {
        returnValue[rKey].value = r[rKey];
      }
    }
  });

  const r = await handler(route);

  if (r) {
    return returnValue = wrapRefs(r);
  }

  return undefined;
}
