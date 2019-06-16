const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleBolgRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;

  // 获取博客列表
  if (method === "GET" && req.path === "/api/blog/list") {
    const author = req.query.author || "";
    const keyword = req.query.keyword || "";
    const result = getList(author, keyword);
    return result.then(listData => {
      return new SuccessModel(listData);
    });
  }
  // 根据 id 获取博客详情
  if (method === "GET" && req.path === "/api/blog/detail") {
    const result = getDetail(id);
    return result.then(data => {
      return new SuccessModel(data);
    });
  }
  // 新建博客
  if (method === "POST" && req.path === "/api/blog/new") {
    // const data = newBlog(req.body);
    // return new SuccessModel(data);
    req.body.author = "zhangsan"; // 待开发登录时 改为真实数据
    const result = newBlog(req.body);
    return result.then(data => {
      return new SuccessModel(data);
    });
  }
  // 更新博客
  if (method === "POST" && req.path === "/api/blog/update") {
    const result = updateBlog(id, req.body);
    return result.then(val => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModel("更新博客失败");
      }
    });
  }
  // 删除博客的接口
  if (method === "POST" && req.path === "/api/blog/del") {
    author = "zhangsan"; // 待开发登录时 改为真实数据
    const result = delBlog(id, author);
    return result.then(val => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModel("删除博客失败");
      }
    });
  }
};

module.exports = handleBolgRouter;
