import { buildRawData } from "./builder.js";
import { readFallback, writeFallback } from "./fallback.js";
import { parseRaw } from "./parser.js";
import * as parser from "./parser.js";
import { getEmptyData, getHeader, getId, getIdList } from "./header.js";

export async function read(type) {
  const id = getId(type);
  const raw = await readFallback(id);

  return parseRaw(raw, type);
}

export async function write(type, data) {
  const id = getId(type);
  const raw = buildRawData(data);
  await writeFallback(id, raw);
}

export function makePair(type, target, value) {
  const header = getHeader(type);
  return { no: header[target], data: value };
}

export { parser };

export { getEmptyData };

// ID list
export const tk2k = getIdList();
