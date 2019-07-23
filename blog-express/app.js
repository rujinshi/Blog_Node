var createError = require("http-errors");
var express = require("express");
var path = require("path");
const fs = require("fs");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
// 创建 RedisStore constructor
var RedisStore = require("connect-redis")(session);

var blogRouter = require("./routes/blog");
var userRouter = require("./routes/user");

var app = express();
const ENV = process.env.NODE_ENV;
if (ENV !== "production") {
  // 开发环境
  app.use(logger("dev"));
} else {
    // 线上环境 写日志
  const fileName = path.join(__dirname, "logs", "access.log");
  const writeStream = fs.createWriteStream(fileName, {
    flags: "a"
  });
  app.use(
    logger("combined", {
      stream: writeStream
    })
  );
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// redis 客户端连接对象
const redisClient = require("./db/redis");
const sessionStore = new RedisStore({
  client: redisClient
});

app.use(
  session({
    secret: "yuchunjiao#3306",
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    },
    store: sessionStore
  })
);

// 处理路由
app.use("/api/blog", blogRouter);
app.use("/api/user", userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "dev" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
