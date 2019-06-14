const querystring = require("querystring");
const handleBolgRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

const serverHandle = (req, res) => {
  // 设置返回 JSON 格式
  res.setHeader("Content-type", "application/json");
  //获取 path
  const url = req.url;
  req.path = url.split("?")[0];
  
  // 解析 query
  req.query = querystring.parse(url.split("?")[1]);

  // 处理 blog 路由
  const blogDate = handleBolgRouter(req, res);
  if (blogDate) {
    res.end(JSON.stringify(blogDate));
    return;
  }

  // 处理 user 路由
  const userDate = handleUserRouter(req, res);
  if (userDate) {
    res.end(JSON.stringify(userDate));
    return;
  }

  // 未命中路由返回404
  res.writeHead(404, {
    "Content-type": "text/plain"
  });
  res.write("404 Not Found \n");
  res.end();
};

module.exports = serverHandle;

// process.env.NODE_ENV
