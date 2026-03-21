export function numberFormat(number: string | number, decimals = 0, decPoint = '.', thousandsSep = ',') {
  number = Number(number);

  const sign = number < 0 ? '-' : '';
  number = Math.abs(number);

  const str: string[] = number.toFixed(decimals ? decimals : 0).toString().split('.');
  const parts = [];

  if (!str[0]) {
    return '0';
  }

  for (let i = str[0].length; i > 0; i -= 3) {
    parts.unshift(str[0].substring(Math.max(0, i - 3), i));
  }

  str[0] = parts.join(thousandsSep ? thousandsSep : ',');

  return sign + str.join(decPoint ? decPoint : '.');
}
