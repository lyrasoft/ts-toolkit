import { actionSheetController } from '@ionic/vue';
import type { ActionSheetOptions } from '@ionic/vue';

export async function ionicActionSheetConfirm(
  title: string,
  buttons: string[] = [],
  options: Partial<ActionSheetOptions> = {}
): Promise<boolean> {
  return new Promise((resolve) => {
    const alert = actionSheetController
      .create({
        // cssClass: 'my-custom-class',
        header: title,
        buttons: [
          {
            text: buttons[0] || 'OK',
            role: 'destructive',
            handler: () => {
              resolve(true);
            },
          },
          {
            text: buttons[1] || 'Cancel',
            role: 'cancel',
            handler: () => {
              resolve(false);
            },
          },
        ],
        ...options
      });

    alert.then((alert) => alert.present());
  });
}
