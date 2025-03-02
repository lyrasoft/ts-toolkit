import {
  onBeforeRouteUpdate,
  type RouteLocationNormalized,
  type RouteLocationNormalizedLoaded,
  useRoute
} from 'vue-router';

export function onCreatedOrRouteUpdate<T = any>(handler: (to: RouteLocationNormalized, from?: RouteLocationNormalizedLoaded) => T): T {
  const route = useRoute();

  onBeforeRouteUpdate((to, from) => {
    handler(to, from);
  });

  return handler(route);
}

