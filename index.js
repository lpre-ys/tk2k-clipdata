import { buildRawData } from "./src/builder.js";
import { readFallback, writeFallback } from "./src/fallback.js";
import { parseRaw } from "./src/parser.js";
import config from "./src/config.json" assert {type: 'json'};

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
