const querystring = require("querystring");
const handleBolgRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

// 获取 cookie 过期时间
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  return d.toUTCString();
};

// session 数据
let SESSION_DATA = {};

// 用于处理 post data
const getPostData = req => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({});
      return;
    }

    if (req.headers["content-type"] !== "application/json") {
      resolve({});
      return;
    }

    let postData = "";
    req.on("data", chunk => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
  });
  return promise;
};

const serverHandle = (req, res) => {
  // 设置返回 JSON 格式
  res.setHeader("Content-type", "application/json");
  //获取 path
  const url = req.url;
  req.path = url.split("?")[0];

  // 解析 query
  req.query = querystring.parse(url.split("?")[1]);

  // 解析cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || "";
  cookieStr.split(";").forEach(element => {
    if (!element) {
      return;
    }
    const arr = element.split("=");
    const key = arr[0].trim();
    const val = arr[1].trim();
    req.cookie[key] = val;
  });

  // 解析 session
  let needSetCookie = false;
  let { userid: userId } = req.cookie;
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {};
    }
  } else {
    // 初始化时 cookie 中无 userId 所以在后续要种 cookie
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    SESSION_DATA[userId] = {};
  }
  // 根据 userId 访问 SESSION_DATA 中的值并赋给 req.session
  req.session = SESSION_DATA[userId];

  // 处理 post data
  getPostData(req).then(postData => {
    req.body = postData;

    // 处理 blog 路由
    const blogResult = handleBolgRouter(req, res);

    if (blogResult) {
      blogResult.then(blogData => {
        if (needSetCookie) {
          res.setHeader(
            "Set-Cookie",
            `userid=${userId};path=/;HttpOnly;expires=${getCookieExpires()}`
          );
        }
        res.end(JSON.stringify(blogData));
      });
      return;
    }

    // 处理 user 路由
    const userrResult = handleUserRouter(req, res);
    if (userrResult) {
      userrResult.then(userData => {
        if (needSetCookie) {
          res.setHeader(
            "Set-Cookie",
            `userid=${userId};path=/;HttpOnly;expires=${getCookieExpires()}`
          );
        }
        res.end(JSON.stringify(userData));
      });
      return;
    }

    // 未命中路由返回404
    res.writeHead(404, {
      "Content-type": "text/plain"
    });
    res.write("404 Not Found \n");
    res.end();
  });
};

module.exports = serverHandle;
