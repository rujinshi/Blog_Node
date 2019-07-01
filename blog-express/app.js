var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
// redis 客户端连接对象
const redisClient = require("./db/redis");
var RedisStore = require("connect-redis")(session);

// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
var blogRouter = require("./routes/blog");
var userRouter = require("./routes/user");

var app = express();

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
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
// app.use("/", indexRouter);
// app.use("/users", usersRouter);
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
