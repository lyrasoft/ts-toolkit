import dayjs from 'dayjs';

export enum DateFormat {
  YMD = 'YYYY-MM-DD',
  YMD_HIS = 'YYYY-MM-DD HH:mm:ss',
  YMD_HI = 'YYYY-MM-DD HH:mm',
  ISO8601 = 'YYYY-MM-DDTHH:mm:ssZ[Z]',
}

export function dateToFormat(date: any, format: string = 'YYYY-MM-DD HH:mm') {
  if (date == null) {
    return '';
  }

  const d = dayjs(date);

  return d.format(format);
}
