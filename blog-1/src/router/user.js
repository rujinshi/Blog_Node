const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

// 获取cookie 过期时间
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  return d.toUTCString();
};

const handleUserRouter = (req, res) => {
  const method = req.method;
  // 登录
  if (method === "GET" && req.path === "/api/user/login") {
    // const { username, password } = req.body;
    const { username, password } = req.query;
    const result = login(username, password);
    // result 是执行 sql 查询语句的结果 是一个 promise
    return result.then(data => {
      if (data.username) {
        // 设置 session
        req.session.username = data.username;
        req.session.realname = data.realname;
        return new SuccessModel();
      }
      return new ErrorModel("登录失败");
    });
  }

  // 登录的测试
  if (method === "GET" && req.path === "/api/user/login-test") {
    const { username } = req.session;
    if (username) {
      return Promise.resolve(
        new SuccessModel({
          session: req.session
        })
      );
    }
    return Promise.resolve(new ErrorModel("登录失败"));
  }
};

module.exports = handleUserRouter;
