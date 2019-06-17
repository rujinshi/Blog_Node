const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const { set } = require("../db/redis");

const handleUserRouter = (req, res) => {
  const method = req.method;
  // 登录
  if (method === "POST" && req.path === "/api/user/login") {
    const { username, password } = req.body;
    const result = login(username, password);

    // result 是执行 sql 查询语句的结果 是一个 promise
    return result.then(data => {
      if (data.username) {
        // 设置 session
        req.session.username = data.username;
        req.session.realname = data.realname;
        // 同步到 redis
        set(req.sessionId, req.session);
        return new SuccessModel();
      }
      return new ErrorModel("登录失败");
    });
  }
};

module.exports = handleUserRouter;
