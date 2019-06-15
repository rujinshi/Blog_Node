/**
 * 单纯的入口 与业务代码没有关系
 */
const http = require("http");
const PORT = 8000;
const serverHandle = require("../app");

const server = http.createServer(serverHandle);
server.listen(PORT);
