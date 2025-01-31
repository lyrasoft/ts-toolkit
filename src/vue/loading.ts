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

  return { loading, run };
}
