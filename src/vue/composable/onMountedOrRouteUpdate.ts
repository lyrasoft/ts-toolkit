import { onMounted } from 'vue';
import {
  onBeforeRouteUpdate,
  type RouteLocationNormalized,
  type RouteLocationNormalizedLoaded,
  useRoute
} from 'vue-router';

export default function (handler: (to?: RouteLocationNormalized, from?: RouteLocationNormalizedLoaded) => any) {
  const route = useRoute();

  onMounted(() => {
    handler(route);
  });

  onBeforeRouteUpdate((to, from) => {
    handler(to, from);
  });
}

