const mysql = require("mysql");
const { MYSQL_CONF } = require("../conf/db");

// 创建连接对象
const connection = mysql.createConnection(MYSQL_CONF);

// 开始连接
connection.connect();

// 执行 sql 查询函数
function exec(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

module.exports = {
  exec,
  escape: mysql.escape
};
