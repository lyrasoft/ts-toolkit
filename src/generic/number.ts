export function numberFormat(number: string | number, decimals = 0, decPoint = '.', thousandsSep = ',') {
  number = Number(number);

  const str = number.toFixed(decimals ? decimals : 0).toString().split('.');
  const parts = [];

  for (var i = str[0].length; i > 0; i -= 3) {
    parts.unshift(str[0].substring(Math.max(0, i - 3), i));
  }

  str[0] = parts.join(thousandsSep ? thousandsSep : ',');

  return str.join(decPoint ? decPoint : '.');
}
