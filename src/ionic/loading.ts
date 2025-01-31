import { loadingController, type LoadingOptions } from '@ionic/vue';
import { ref } from 'vue';
import { ionicAlert } from './alert';

export function useLoadingOverlay(message: string, options: LoadingOptions = {}) {
  const loading = ref(false);
  const loadingElement = ref<HTMLIonLoadingElement>();

  const creating = createLoadingOverlay(message, options).then((v) => {
    loadingElement.value = v;
  });

  const run = async function <T>(callback: () => Promise<T>): Promise<T> {
    loading!.value = true;
    await creating;
    await loadingElement.value?.present();

    try {
      return await callback();
    } catch (e: any) {
      console.error(e);
      ionicAlert(e?.message || 'Unknown Error', '');
      throw e;
    } finally {
      loadingElement.value?.dismiss();
      loading!.value = false;
    }
  }

  return { loading, loadingElement, run };
}

export async function createLoadingOverlay(message: string, options: LoadingOptions = {}): Promise<HTMLIonLoadingElement> {
  return await loadingController.create({
    message: message,
    showBackdrop: true,
    duration: 5000,
    ...options
  });
}


