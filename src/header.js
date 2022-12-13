import config from "./config.json";

export function getHeader(type) {
  return config[type] ? config[type].header : {};
}

export function getRevHeader(type) {
  const header = getHeader(type);
  return Object.fromEntries(
    Object
      .entries(header)
      .map(([key, value]) => [value, key])
  );
}

export function getEmptyData(type) {
  const result = {};
  if (type) {
    const header = getHeader(type);

    Object.keys(header).forEach((name) => {
      result[name] = { no: header[name], raw: [] };
    });
  }

  return result;
}

export function getId(type) {
  return config[type] ? config[type].id : type;
}

export function getIdList() {
  const result = {};
  Object.keys(config).forEach((name) => {
    result[name] = name;
  });

  return result;
}