const { exec } = require("../db/mysql");
const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `;
  if (author) {
    sql += `and author='${author}'`;
  }
  if (keyword) {
    sql += `and title like'%${keyword}%'`;
  }
  sql += `order by createtime desc;`;

  // 返回 promise
  return exec(sql);
};

const getDetail = id => {
  // 先返回假数据
  return {
    id: 1,
    title: "标题A",
    content: "内容A",
    createTime: 1559825615848,
    author: "zhangsan"
  };
};

const newBlog = (blogData = {}) => {
  // blogData 应该是一个对象 包含 title content 属性
  return {
    id: 3 // 新建博客 插入到数据库表里的 id
  };
};

const updateBlog = (id, blogData = {}) => {
  // id 要更新博客的id
  // blogData 应该是一个对象 包含 title content 属性
  return true;
};

const delBlog = id => {
  // 要删除的博客 id
  return true;
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
};
