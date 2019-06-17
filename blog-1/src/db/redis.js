const redis = require("redis");
const { REDIS_CONF } = require("../conf/db");

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF);
redisClient.on("error", err => {
  console.error(err);
});

function set(key, val) {
  if (typeof val === "object") {
    // 将对象转换成 JSON 字符串
    val = JSON.stringify(val);
  }
  redisClient.set(key, val, redis.print);
}
// get 是一个异步 用 promise 封装
function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }

      if (val == null) {
        resolve(null);
        return;
      }

      try {
        // 将 JSON 字符串 转换为对象
        resolve(JSON.parse(val));
      } catch (ex) {
        resolve(val);
      }
    });
  });
  return promise;
}

module.exports = {
  set,
  get
};
