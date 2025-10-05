import { AlertAdapter } from './alert-adapter';

export async function simpleAlert(
  title: string,
  text: string = '',
  icon: string = 'info',
  extra?: any
) {
  return AlertAdapter.alert(title, text, icon, extra);
}

export async function simpleConfirm(
  title: string,
  text: string = '',
  icon: string = 'info',
  extra?: any,
) {
  return AlertAdapter.confirm(title, text, icon, extra);
}

export async function deleteConfirm(
  title: string,
  text: string = '',
  icon: string = 'info',
  extra?: any,
) {
  return AlertAdapter.deleteConfirm(title, text, icon, extra);
}

export async function simpleNotify(
  title: string,
  text: string = '',
  type: string = 'info',
  extra?: any
) {
  return AlertAdapter.notify(title, text, type, extra);
}

export async function clearNotifies() {
  return AlertAdapter.clearNotifies();
}
