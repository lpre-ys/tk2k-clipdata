import { spawn } from "child_process";

export function readFallback(id) {
  return new Promise((resolve, reject) => {
    const child = spawn("powershell.exe", [
      "-ExecutionPolicy",
      "RemoteSigned",
      "./fallback/read.ps1",
      id
    ]);

    let result = "";

    child.on("exit", (code) => {
      if (code === 0) {
        const raw = result.split(',');
        resolve(raw);
      }
    });

    child.stdout.setEncoding("utf-8");
    child.stdout.on("data", function (data) {
      // データ読み込み
      result += data;
    });

    child.stderr.on("data", function (data) {
      const decoder = new TextDecoder('shift-jis');
      reject(decoder.decode(data.buffer));
    });

    child.stdin.end();
  });
}

export function writeFallback(id, data) {
  return new Promise((resolve, reject) => {
    const child = spawn("powershell.exe", [
      "-ExecutionPolicy",
      "RemoteSigned",
      "./fallback/write.ps1",
      id,
      `"${data.join(',')}"`
    ]);

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      }
    });

    child.stdout.setEncoding("utf-8");

    child.stderr.on("data", function (data) {
      const decoder = new TextDecoder('shift-jis');
      reject(decoder.decode(data.buffer));
    });

    child.stdin.end();
  });
}