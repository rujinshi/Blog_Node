const router = require("koa-router")();
router.prefix("/api/user");

const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

router.post("/login", async (ctx, next) => {
  // post请求：使用ctx.request.body
  const { username, password } = ctx.request.body;
  const userInfo = await login(username, password);
  if (userInfo.username) {
    // 设置 session
    ctx.session.username = userInfo.username;
    ctx.session.realname = userInfo.realname;
    ctx.body = new SuccessModel();
    return;
  }
  ctx.body = new SuccessModel("登录失败");
});

router.get("/login-test", async (ctx, next) => {
  if (ctx.session.username) {
    ctx.body = {
      errno: 0,
      msg: "已登录"
    };
    return;
  }
  ctx.body = {
    errno: -1,
    msg: "未登录"
  };
});

router.get("/session-test", async (ctx, next) => {
  if (ctx.session.viewCount == null) {
    ctx.session.viewCount = 0;
  }
  ctx.session.viewCount++;

  ctx.body = {
    errno: 0,
    viewCount: ctx.session.viewCount
  };
});

module.exports = router;
