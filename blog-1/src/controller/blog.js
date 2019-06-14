/**
 * @description 只关心数据
 */
const getList = (author, keyword) => {
  // 先返回假数据
  return [
    {
      id: 1,
      title: "标题A",
      content: "内容A",
      createTime: 1559825615848,
      author: "zhangsan"
    },
    {
      id: 2,
      title: "标题B",
      content: "内容B",
      createTime: 1559825651184,
      author: "lisi"
    }
  ];
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
  console.log("updateBlog", id, blogData);
  return true;
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog
};
