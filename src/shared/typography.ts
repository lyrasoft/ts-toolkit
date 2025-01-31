import { escape, truncate } from 'lodash-es';

export function nl2br(text: string) {
  return text.replace(/\n/g, '<br>');
}

export function htmlEscape(text: string, br = true) {
  let str = escape(text);

  if (br) {
    str = nl2br(str);
  }

  return str;
}

export function summaryText(str: string, length?: number) {
  str = stripHtml(str);

  if (length === undefined) {
    return str;
  }

  return truncate(str, { length: length, omission: '...' });
}

export function stripHtml(str: string) {
  return str.replace(/(<([^>]+)>)/ig, '');
}


