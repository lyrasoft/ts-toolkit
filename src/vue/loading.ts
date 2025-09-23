import { type Ref, ref } from 'vue';
import { simpleAlert } from '../generic';

export function useLoading(loading?: Ref<boolean>) {
  loading = loading || ref(false);

  const run = async function <T>(callback: () => Promise<T>, errorAlert = true): Promise<T> {
    loading!.value = true;

    try {
      return await callback();
    } catch (e: any) {
      console.error(e);
      if (errorAlert) {
        simpleAlert(e?.message || 'Unknown Error', '');
      }
      throw e;
    } finally {
      loading!.value = false;
    }
  }

  const wrap = function <T, K extends ((...args: any[]) => any)>(
    callback: K,
    errorAlert = true
  ): (...args: Parameters<K>) => Promise<ReturnType<K>> {
    return (...args: any[]) => {
      return run(async () => callback(...args), errorAlert);
    };
  };

  return { loading, run, wrap };
}
