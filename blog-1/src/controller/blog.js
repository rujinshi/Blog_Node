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

module.exports = {
  getList,
  getDetail
};
