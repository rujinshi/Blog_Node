const Koa = require("koa");
const app = new Koa();
const path = require("path");
const fs = require("fs");
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const morgan = require("koa-morgan");
const session = require("koa-generic-session");
const redisStore = require("koa-redis");
const blogRouter = require("./routes/blog");
const userRouter = require("./routes/user");
// 引入 redis 配置
const { REDIS_CONF } = require("./conf/db");
const env = process.env.NODE_ENV;
if (env !== "production") {
  // 开发环境
  app.use(morgan("dev"));
} else {
  // 生产环境
  const fileName = path.join(__dirname, "logs", "access.log");
  const accessLogStream = fs.createWriteStream(fileName, {
    flags: "a"
  });
  app.use(
    morgan("combined", {
      stream: accessLogStream
    })
  );
}

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"]
  })
);
app.use(json());

app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "pug"
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.keys = ["yuchunjiao#3306"];
app.use(
  session({
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    },
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
  })
);

// routes
app.use(blogRouter.routes(), blogRouter.allowedMethods());
app.use(userRouter.routes(), userRouter.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
