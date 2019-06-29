const fs = require("fs");
const path = require("path");

// 写日志
function writeLog(writeStream, log) {
  writeStream.write(log + "\n"); //关键代码
}

// 生成 write Stream
function createWriteStream(fileName) {
  // 拼接日志文件的绝对路径地址
  const fullFileName = path.join(__dirname, "../", "../", "logs", fileName);
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: "a"
  });
  return writeStream;
}

// 写访问日志
const accessWriteStream = createWriteStream("access.log");
function access(log) {
  writeLog(accessWriteStream, log);
}

module.exports = {
  access
};
