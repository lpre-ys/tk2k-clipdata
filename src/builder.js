import iconv from "iconv-lite";
import { intToBer } from "./ber.js";

export function buildRawData(input) {
  const result = buildObject(input);

  // ヘッダを作る
  const header = new ArrayBuffer(4);
  const view = new DataView(header);
  view.setUint32(0, result.length, true);
  result.unshift(1, 0, 0, 0);
  result.unshift(...new Uint8Array(header));

  return result;
}

function buildObject(input) {
  const result = [];
  Object.keys(input).forEach((key) => {
    if (key === "length") {
      return;
    }

    const { no, data } = input[key];
    let { raw } = input[key];

    // dataがある場合、dataの内容でrawを上書きする
    if (typeof data !== "undefined") {
      if (typeof data === "string") {
        // String
        raw = new Uint8Array(iconv.encode(data, "Shift_JIS"));
      } else if (Number.isInteger(data)) {
        raw = intToBer(data);
      } else if (Array.isArray(data)) {
        raw = [data.length];
        // LIST
        data.forEach((listData) => {
          raw.push(listData.id);
          if (listData.data) {
            raw.push(...buildObject(listData.data));
          } else {
            raw.push(...listData.raw);
          }
        });
      } else {
        // その他の場合、オブジェクト
        raw = buildObject(data);
      }
    }
    result.push(parseInt(no));
    result.push(...intToBer(raw.length));
    result.push(...raw);
  });
  result.push(0); // 最終データ

  return result;
}
