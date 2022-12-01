const path = require('path');

module.exports = {
  mode: "development",

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: "./src/index.js",

  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        use: [
          {
            // Babel を利用する
            loader: "babel-loader",
            // Babel のオプションを指定する
            options: {
              presets: [
                // プリセットを指定することで、ES2021 を ES5 に変換
                "@babel/preset-env",
              ],
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'Tk2kClip',
    libraryTarget: 'umd',
    // globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  target: "node",
};