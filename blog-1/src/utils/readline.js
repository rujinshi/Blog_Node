const fs = require("fs");
const path = require("path");
const readline = require("readline");

// 文件名
const filename = path.join(__dirname, "../", "../", "logs", "access.log");
// 创建 read stream
const readStream = fs.createReadStream(filename);

// 创建 read line
const rl = readline.createInterface({
  input: readStream
});

let chromeNum = 0;
let sum = 0;

// 逐行读取
rl.on("line", lineDate => {
  if (!lineDate) {
    return;
  }
  // 记录总行数
  sum++;
  const arr = lineDate.split(" -- ");
  if (arr[2] && arr[2].indexOf("Chrome") > 0) {
    // 累加 Chrome 数量
    chromeNum++;
  }
});

// 监听读取完成
rl.on("close", () => {
  console.log("Chrome 占比:" + chromeNum / sum);
});
