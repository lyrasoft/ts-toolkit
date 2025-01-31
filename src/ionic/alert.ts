import { alertController, } from '@ionic/vue';
import { AlertAdapter } from '../shared';
import { sweetAlert, sweetConfirm, sweetDeleteConfirm } from '../generic/sweetalert.ts';

export async function ionicAlert(title: any, text?: string, type = 'warning'): Promise<void> {
  if (title instanceof Error || title.message) {
    title = title.message;
  }

  return new Promise((resolve) => {
    const alert = alertController
      .create({
        // cssClass: 'my-custom-class',
        header: title,
        // subHeader: 'Subtitle',
        message: text,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              resolve();
            },
          },
        ],
      });

    alert.then((alert) => alert.present());
  });
}

export async function ionicConfirm(title: string, text?: string): Promise<boolean> {
  return new Promise((resolve) => {
    const alert = alertController
      .create({
        // cssClass: 'my-custom-class',
        header: title,
        // subHeader: 'Subtitle',
        message: text,
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              resolve(false);
            },
          },
          {
            text: 'OK',
            handler: () => {
              resolve(true);
            },
          },
        ],
      });

    alert.then((alert) => alert.present());
  });
}

export function useIonicAlertAdapter() {
  AlertAdapter.alert = ionicAlert;
  AlertAdapter.confirm = ionicConfirm;
  AlertAdapter.deleteConfirm = ionicConfirm;
}
