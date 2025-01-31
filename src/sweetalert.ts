import swal from 'sweetalert';

type SwalParams = Exclude<Parameters<typeof swal>[0], string>;

export function simpleAlert(
  title: string,
  text: string = '',
  icon: string = 'info',
  extra?: Partial<SwalParams>
) {
  const params = {
    title,
    text,
    icon,
    buttons: [
      '確認',
    ],
  };

  if (extra) {
    Object.assign(params, extra);
  }

  return swal(params);
}

export function simpleConfirm(
  title: string,
  text: string = '',
  icon: string = 'info',
  extra?: Partial<SwalParams>,
) {
  const params = {
    title,
    text,
    icon,
    buttons: [
      '取消',
      '確認',
    ],
  };

  if (extra) {
    Object.assign(params, extra);
  }

  return swal(params);
}

export function deleteConfirm(
  title: string,
  text: string = '',
  icon: string = 'info',
  extra?: Partial<SwalParams>,
) {
  const params = {
    title,
    text,
    icon,
    buttons: {
      cancel: {
        text: '取消',
        value: false,
        visible: true
      },
      delete: {
        text: '刪除',
        value: true,
      },
    },
  };

  if (extra) {
    Object.assign(params, extra);
  }

  return swal(params);
}
