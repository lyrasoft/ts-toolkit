import { type Ref, ref } from 'vue';
import { simpleAlert, sleep } from '../generic';

type LoadingRunOptions = {
  errorAlert?: boolean;
  minLoadingTime?: number;
} | boolean;

export function useLoading(loading?: Ref<boolean>) {
  loading = loading || ref(false);

  const run = async function <T>(callback: () => Promise<T>, options: LoadingRunOptions = {}): Promise<T> {
    loading!.value = true;

    const handledOptions = typeof options === 'boolean' ? { errorAlert: options } : options;

    const errorAlert = handledOptions.errorAlert ?? true;
    const minLoadingTime = handledOptions.minLoadingTime ?? 0;

    const startTime = Date.now();

    try {
      return await callback();
    } catch (e: any) {
      console.error(e);
      if (errorAlert) {
        simpleAlert(e?.message || 'Unknown Error', '');
      }
      throw e;
    } finally {
      const elapsedTime = Date.now() - startTime;

      if (elapsedTime < minLoadingTime) {
        await sleep(minLoadingTime - elapsedTime);
      }

      loading!.value = false;
    }
  }

  const wrap = function <T, K extends ((...args: any[]) => any)>(
    callback: K,
    options: LoadingRunOptions = {}
  ): (...args: Parameters<K>) => Promise<ReturnType<K>> {
    return (...args: any[]) => {
      return run(async () => callback(...args), options);
    };
  };

  return { loading, run, wrap };
}
