import { App } from '@capacitor/app';
import { isPlatform } from '@ionic/vue';
import { type Ref, ref } from 'vue';

export function getAppVersion(): Ref<string> {
  const ver = ref('');

  if (!isPlatform('capacitor')) {
    ver.value = 'dev';
  } else {
    App.getInfo().then((info) => {
      ver.value = `${info.version}-${info.build}`;
    });
  }

  return ver;
}

