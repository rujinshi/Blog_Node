// 登录验证函数
const { ErrorModel } = require("../model/resModel");

module.exports = (req, res, next) => {
  if (req.session.username) {
    next();
    return;
  }
  res.json(new ErrorModel("未登录"));
};
