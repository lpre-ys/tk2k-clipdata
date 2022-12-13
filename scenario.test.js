import { jest } from "@jest/globals";
import { getEmptyData, makePair, read, tk2k, write } from "./src";
import { readFallback, writeFallback } from "./src/fallback";
import { parseList, parseBer, parseString } from "./src/parser";
import testdata from "./testdata.json";

jest.mock("./src/fallback", () => {
  return {
    __esModule: true,
    readFallback: jest.fn(),
    writeFallback: jest.fn(),
  };
});

test("fallback mocked", () => {
  readFallback.mockResolvedValue("test");
  expect(readFallback()).resolves.toBe("test");
});

describe("dageki_a", () => {
  let anime;
  test("call read", async () => {
    readFallback.mockResolvedValue(testdata.dageki_a);
    anime = await read(tk2k.ANIME);

    expect(readFallback).lastCalledWith(582);
  });
  test("result title is 打撃Ａ", () => {
    anime.title.data = parseString(anime.title.raw);

    expect(anime.title.data).toBe("打撃Ａ");
  });
  test("result material is 打撃", () => {
    anime.material.data = parseString(anime.material.raw);

    expect(anime.material.data).toBe("打撃");
  });
  test("result effectList is List and length is 3", () => {
    anime.effectList.data = parseList(anime.effectList.raw, tk2k.ANIME_EFFECT);

    expect(anime.effectList.data).toHaveLength(3);
  });
  test("result target is 0(one)", () => {
    anime.target.data = parseBer(anime.target.raw);
    expect(anime.target.data).toBe(0);
  });
  test("result yLine is 1(middle)", () => {
    anime.yLine.data = parseBer(anime.yLine.raw);
    expect(anime.yLine.data).toBe(1);
  });
  test("result frameList is List", () => {
    anime.frameList.data = parseList(anime.frameList.raw);
    expect(Array.isArray(anime.frameList.data)).toBeTruthy();
  });
  test("change data and write", async () => {
    writeFallback.mockResolvedValue();

    anime.title.data = "タイトル";
    anime.material.data = "剣1";
    anime.effectList.data[0].data.frame.data = 5; // 1個目のエフェクトのタイミングを5frへ
    anime.target.data = 1; // 全体
    anime.yLine.data = 2; // 足元

    await write(tk2k.ANIME, anime);

    expect(writeFallback).lastCalledWith(582, testdata.changed_dageki_a);
  });
});

describe("fire_all_a cels y up", () => {
  let anime;
  test("call read", async () => {
    readFallback.mockResolvedValue(testdata.fire_all_a);
    anime = await read(tk2k.ANIME);

    expect(readFallback).lastCalledWith(582);
  });
  test("result title is 炎魔法・全Ａ", () => {
    anime.title.data = parseString(anime.title.raw);

    expect(anime.title.data).toBe("炎魔法・全Ａ");
  });
  test("result material is 炎1", () => {
    anime.material.data = parseString(anime.material.raw, tk2k.ANIME_EFFECT);

    expect(anime.material.data).toBe("炎1");
  });
  test("result effectList is List and length is 7", () => {
    anime.effectList.data = parseList(anime.effectList.raw);

    expect(anime.effectList.data).toHaveLength(7);
  });
  test("result target is 1(all)", () => {
    anime.target.data = parseBer(anime.target.raw);
    expect(anime.target.data).toBe(1);
  });
  test("result yLine is 2(bottom)", () => {
    anime.yLine.data = parseBer(anime.yLine.raw);
    expect(anime.yLine.data).toBe(2);
  });
  test("result frameList is List", () => {
    anime.frameList.data = parseList(anime.frameList.raw);
    expect(Array.isArray(anime.frameList.data)).toBeTruthy();
  });
  test("change data and write", async () => {
    writeFallback.mockResolvedValue();
    anime.title.data = "Y座標更新テスト";
    anime.frameList.data = anime.frameList.data.map((frame) => {
      frame.data[1].data = parseList(frame.data[1].raw, tk2k.ANIME_CEL);
      frame.data[1].data = frame.data[1].data.map((cel) => {
        const value = parseBer(cel.data.y.raw) - 50;
        cel.data.y = makePair(tk2k.ANIME_CEL, "y", value);
        if (cel.data.y.data === 0) {
          // 無い場合は省略しておく
          delete cel.data.y;
        }
        return cel;
      });
      return frame;
    });

    await write(tk2k.ANIME, anime);

    expect(writeFallback).lastCalledWith(582, testdata.changed_fire_all_a);
  });
});
test("make new Anime", async () => {
  const anime = getEmptyData(tk2k.ANIME);
  anime.title.data = "新規アニメテスト";
  anime.material.data = "素材テスト";
  anime.target.data = 0; // 単体
  anime.yLine.data = 2; // 足元

  // エフェクトデータ
  const effectList = [];
  const effect = getEmptyData(tk2k.ANIME_EFFECT);
  effect.frame.data = 3;
  effect.area.data = 1;
  effect.r.data = 20;
  effectList.push({ data: effect });
  anime.effectList.data = effectList;

  // フレームデータ
  const cel1 = getEmptyData(tk2k.ANIME_CEL);
  cel1.pattern.data = 2;
  const cel2 = getEmptyData(tk2k.ANIME_CEL);
  cel2.pattern.data = 3;
  const frame1 = getEmptyData(tk2k.ANIME_FRAME);
  frame1.celList.data = [{ data: cel1 }];
  const frame2 = getEmptyData(tk2k.ANIME_FRAME);
  frame2.celList.data = [{ data: cel2 }];
  const frameList = [{ data: frame1 }, { data: frame2 }];
  anime.frameList.data = frameList;

  await write(tk2k.ANIME, anime);
  expect(writeFallback).lastCalledWith(582, testdata.make_new_anime);
});
