# tk2k-clipdata

RPGツクール2000のクリップボード読み書きライブラリです。

Clipboard read/write library for RPG Maker 2000.

## usage

todo.

サンプルが出来るまでは、下記テストを参考にどうぞ。

[scenario.test.js](./scenario.test.js)

## 動作環境

ツクール本体同様、Windowsでしか動作しません。

## Electronで使う場合の注意

asarに含めると、fallbackが上手く行かないため、asarUnpackに本モジュールを入れてください。

### 記述例

```
  "build": {
    "asarUnpack": [
      "node_modules/tk2k-clipdata/"
    ],
  }
```