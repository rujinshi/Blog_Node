const redis = require("redis");
const { REDIS_CONF } = require("../conf/db");

// 创建客户端连接对象
const redisClient = redis.createClient(REDIS_CONF);
redisClient.on("error", err => {
  cosnole.error(err);
});

module.exports = redisClient;
