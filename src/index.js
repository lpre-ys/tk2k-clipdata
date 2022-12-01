import { buildRawData } from "./builder.js";
import { readFallback, writeFallback } from "./fallback.js";
import { parseRaw } from "./parser.js";
import * as parser from "./parser.js";
import config from "./config.json";

export async function read(id) {
  const raw = await readFallback(id);

  return parseRaw(raw, id);
}

export async function write(id, data) {
  const raw = buildRawData(data);
  await writeFallback(id, raw);
}

export function makePair(type, target, value) {
  const header = getHeader(type);
  return { no: header[target], data: value };
}

export { parser };

// ID list
export const tk2k = {};
Object.keys(config).forEach((id) => {
  const name = config[id].name;
  tk2k[name] = id;
});

function getHeader(type) {
  return Object.fromEntries(
    Object.entries(config[type].header).map(([key, value]) => [value, key])
  );
}
