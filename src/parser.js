import { berToIntData } from "./ber.js";
import config from "./config.json";

const HEADER_LENGTH = 8;

export function parseRaw(raw, id) {
  const tArray = new Uint8Array(raw);

  // 実データの取得
  const dataTArray = tArray.slice(HEADER_LENGTH);

  return parseObject(dataTArray, id);
}

export function parseString(data) {
  const decoder = new TextDecoder("shift-jis");
  return decoder.decode(data.buffer);
}

export function parseBer(data) {
  const { result } = berToIntData(data);
  return result;
}

export function parseList(tArray, type = false) {
  const lengthBer = berToIntData(tArray);
  const listLength = lengthBer.result;
  let start = lengthBer.length;

  const result = [];
  for (let i = 0; i < listLength; i++) {
    const idBer = berToIntData(tArray.slice(start));
    const id = idBer.result;
    start += idBer.length;
    const data = parseObject(tArray.slice(start), type);
    start += data.length;
    result.push({ id, data });
  }
  return result;
}

export function parseObject(tArray, type = false) {
  const header = getHeader(type);
  const result = {};
  let start = 0;
  while (start < tArray.length) {
    const view = new DataView(tArray.buffer);
    const no = view.getUint8(start);
    if (no === 0) {
      break;
    }
    start += 1;
    const ber = berToIntData(tArray.slice(start));
    const length = ber.result;
    start += ber.length;

    const raw = tArray.slice(start, start + length);
    start += length;

    if (no in header) {
      result[header[no]] = { no, raw };
    } else {
      result[no] = { no, raw };
    }
  }

  result.length = start + 1; // 最後の0(spacer)の分足しておく

  return result;
}

function getHeader(type) {
  if (type && config[type]) {
    return config[type].header;
  }
  return {};
}
