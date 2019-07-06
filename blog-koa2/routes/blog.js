const router = require("koa-router")();
router.prefix("/api/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const loginCheck = require("../middleware/loginCheck");
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require("../controller/blog");

router.get("/list", async (ctx, next) => {
  let author = ctx.query.author || "";
  const keyword = ctx.query.keyword || "";

  // 管理员界面
  if (ctx.query.isadmin) {
    // 未登录
    if (ctx.session.username == null) {
      ctx.body = new ErrorModel("未登录");
      return;
    }
    // 强制查询自己的博客
    author = ctx.session.username;
  }
  const listData = await getList(author, keyword);
  ctx.body = new SuccessModel(listData);
});

router.get("/detail", async (ctx, next) => {
  const detailData = await getDetail(ctx.query.id);
  ctx.body = new SuccessModel(detailData);
});

router.post("/new", loginCheck, async (ctx, next) => {
  ctx.request.body.author = ctx.session.username;
  // post请求：使用ctx.request.body
  const insertId = await newBlog(ctx.request.body);
  ctx.body = new SuccessModel(insertId);
});

router.post("/update", loginCheck, async (ctx, next) => {
  const affectedRows = await updateBlog(ctx.query.id, ctx.request.body);
  if (affectedRows) {
    ctx.body = new SuccessModel();
  } else {
    ctx.body = new SuccessModel("更新博客失败");
  }
});

router.post("/del", loginCheck, async (ctx, next) => {
  author = ctx.session.username;
  const affectedRows = await delBlog(ctx.query.id, author);
  if (affectedRows) {
    ctx.body = new SuccessModel();
  } else {
    ctx.body = new SuccessModel("删除博客失败");
  }
});
module.exports = router;
