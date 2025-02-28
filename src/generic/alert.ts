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
