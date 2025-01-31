import {
  onBeforeRouteUpdate,
  type RouteLocationNormalized,
  type RouteLocationNormalizedLoaded,
  useRoute
} from 'vue-router';

export default async function (handler: (to: RouteLocationNormalized, from?: RouteLocationNormalizedLoaded) => any) {
  const route = useRoute();

  onBeforeRouteUpdate((to, from) => {
    handler(to, from);
  });

  return handler(route);
}

