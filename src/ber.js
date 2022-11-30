const BER_RADIX = 128;
const MAX_INT = 2147483647;
const TURN_NUM = 4294967296;

export function berToIntData(ber) {
  const dataList = [];
  let i = 0;
  let num = ber[i];
  dataList.push(num);
  while (num > (BER_RADIX - 1)) {
    i++;
    num = ber[i];
    dataList.push(num);
  }
  dataList.reverse();
  let result = dataList[0];
  for (let i = 1; i < dataList.length; i++) {
    result += (dataList[i] - BER_RADIX) * Math.pow(BER_RADIX, i);
  }

  // minus
  if (result > MAX_INT) {
    result -= TURN_NUM;
  }

  return { result, length: dataList.length };
}

export function intToBer(number) {
  // 数字がマイナスの場合、反転させるため数字を足す
  if (number < 0) {
    number += TURN_NUM;
  }
  const result = [];
  let rem = number % BER_RADIX;
  let div = parseInt(number / BER_RADIX);
  result.push(rem);
  while (div > 0) {
    rem = div % BER_RADIX;
    div = parseInt(div / BER_RADIX);
    result.push(rem + BER_RADIX);
  }

  return result.reverse();
}