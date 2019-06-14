const { getList, getDetail } = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleBolgRouter = (req, res) => {
  const method = req.method;

  // 获取博客列表
  if (method === "GET" && req.path === "/api/blog/list") {
    const author = req.query.author || "";
    const keyword = req.query.keyword || "";
    const listData = getList(author, keyword);
    return new SuccessModel(listData);
  }
  // 获取博客详情
  if (method === "GET" && req.path === "/api/blog/detail") {
    const id = req.query.id;
    const data = getDetail(id);
    return new SuccessModel(data);
  }
  // 新建博客的接口
  if (method === "POST" && req.path === "/api/blog/new") {
    return {
      msg: "这是新建博客的接口"
    };
  }
  // 更新博客的接口
  if (method === "POST" && req.path === "/api/blog/update") {
    return {
      msg: "这是更新博客的接口"
    };
  }
  // 删除博客的接口
  if (method === "POST" && req.path === "/api/blog/del") {
    return {
      msg: "这是删除博客的接口"
    };
  }
};

module.exports = handleBolgRouter;
