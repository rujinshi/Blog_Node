const env = process.env.NODE_ENV;
let MYSQL_CONF;
let REDIS_CONF;

// 开发环境
if (env === "dev") {
  // mysql
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "54029886",
    database: "myblog"
  };
  // redis
  REDIS_CONF = {
    host: "127.0.0.1",
    port: "6379"
  };
}

// 生产环境
if (env === "production") {
  // mysql
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "54029886",
    database: "myblog"
  };
  // redis
  REDIS_CONF = {
    host: "127.0.0.1",
    port: "6379"
  };
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
};
