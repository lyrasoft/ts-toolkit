import { toastController } from '@ionic/vue';
import type { ToastOptions } from '@ionic/vue';

export async function ionicToast(
  message: string,
  position: 'top' | 'bottom' | 'middle' = 'bottom',
  duration = 1000,
  options: ToastOptions = {},
) {
  const toast = await toastController.create({
    ...options,
    message,
    position,
    duration,
    swipeGesture: 'vertical',
  });

  return toast.present();
}

