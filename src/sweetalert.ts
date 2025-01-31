import swal from 'sweetalert';
export function simpleAlert(title: string, text: string = '', icon: string = 'info') {
  return swal({
    title,
    text,
    icon,
    buttons: [
      '確認'
    ]
  });
}

export function simpleConfirm(title: string, text: string = '', icon: string = 'info') {
  return swal({
    title,
    text,
    icon,
    buttons: [
      '取消',
      '確認',
    ]
  })
}
