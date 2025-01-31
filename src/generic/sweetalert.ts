import { AlertAdapter } from '../shared';

type SwalParams = Exclude<Parameters<typeof swal>[0], string>;

export async function sweetAlert(
  title: string,
  text: string = '',
  icon: string = 'info',
  extra?: Partial<SwalParams>
) {
  const swal = await loadSweetAlert();

  const params = {
    title,
    text,
    icon,
    buttons: [
      AlertAdapter.confirmText(),
    ],
  };

  if (extra) {
    Object.assign(params, extra);
  }

  return swal(params);
}

export async function sweetConfirm(
  title: string,
  text: string = '',
  icon: string = 'info',
  extra?: Partial<SwalParams>,
) {
  const swal = await loadSweetAlert();

  const params = {
    title,
    text,
    icon,
    buttons: [
      AlertAdapter.cancelText(),
      AlertAdapter.confirmText(),
    ],
  };

  if (extra) {
    Object.assign(params, extra);
  }

  return swal(params);
}

export async function sweetDeleteConfirm(
  title: string,
  text: string = '',
  icon: string = 'info',
  extra?: Partial<SwalParams>,
) {
  const swal = await loadSweetAlert();

  const params = {
    title,
    text,
    icon,
    buttons: {
      cancel: {
        text: AlertAdapter.cancelText(),
        value: false,
        visible: true
      },
      delete: {
        text: AlertAdapter.deleteText(),
        value: true,
      },
    },
  };

  if (extra) {
    Object.assign(params, extra);
  }

  return swal(params);
}

export async function useSweetAlertAdapter(preload = false) {
  AlertAdapter.alert = sweetAlert;
  AlertAdapter.confirm = sweetConfirm;
  AlertAdapter.deleteConfirm = sweetDeleteConfirm;

  if (preload) {
    await loadSweetAlert();
  }
}

async function loadSweetAlert() {
  const module = await import('sweetalert');

  return module.default;
}
