import { type App, type Ref, ref } from 'vue';
import { simpleAlert } from '../generic';


export function useLoadingOverlay(message?: string, options: LoadingOverlayOptions = {}) {
  const loading = ref(false);

  if (message) {
    options.slots ??= {};
    options.slots.after = message;
  }

  type LoadingInstance = ReturnType<Awaited<typeof import('vue-loading-overlay')>['useLoading']>;
  const $instance = ref<LoadingInstance>();
  const importing: Promise<LoadingInstance> = import('vue-loading-overlay').then(({ useLoading }) => {
    return $instance.value = useLoading();
  });

  const run = async function <T>(callback: () => Promise<T>, errorAlert = true): Promise<T> {
    loading!.value = true;
    const $inc = await importing;
    const loader = $inc.show(
      options,
      options.slots || {}
    );

    try {
      return await callback();
    } catch (e: any) {
      console.error(e);
      if (errorAlert) {
        simpleAlert(e?.message || 'Unknown Error', '');
      }
      throw e;
    } finally {
      loader.hide();
      loading!.value = false;
    }
  }

  const wrap = function <T, R, K extends ((...args: any[]) => R)>(
    callback: K,
    errorAlert = true
  ): (...args: Parameters<K>) => Promise<R> {
    return (...args: any[]) => {
      return run(async () => callback(...args), errorAlert);
    };
  };

  return { loading, run, $instance, wrap };
}

declare type LoadingOverlayOptions = {
  active?: boolean,
  canCancel?: boolean,
  onCancel?: () => any,
  isFullPage?: boolean,
  transition?: string,
  color?: string,
  height?: number,
  width?: number,
  loader?: 'spinner' | 'dots' | 'bars' | string,
  backgroundColor?: string,
  opacity?: number,
  zIndex?: number,
  enforceFocus?: boolean,
  lockScroll?: boolean,
  pauseOnHover?: boolean,
  container?: Object | HTMLElement | Function,

  slots?: {
    default?: any
    before?: any
    after?: any
  };
};

export async function createVueLoadingOverlay() {
  // @ts-ignore
  import('vue-loading-overlay/dist/css/index.css');
  const module = await import('vue-loading-overlay');

  return (app: App) => {
    app.use(module.LoadingPlugin);
  };
}
