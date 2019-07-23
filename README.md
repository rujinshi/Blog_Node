# Blog_Node

## 概况

本项目分别使用原生 Node.js、Express和koa2 框架开发 web Server，重点是 node 作为server 的应用，因此前端的交互以及样式没有过多的开发。

## 项目收益
1.从服务端角度出发，结合客户端，对整站开发加深认识，包括且不局限于接口设计、路由设计、日志记录、登录校验、抽象复用代码与具体业务解耦。

2.加深对中间件的认知，学习了中间件实现原理；

3.学习后端相关技术（redis、nginx、mysql）的初步使用。

## 项目架构
![项目架构](./img/blogArchitecture.png)

## 接口设计

| 功能               | 接口             | 方法 | params         |                      备注 |
| :----------------- | :--------------- | :--: | -------------- | ------------------------: |
| 登录               | /api/user/login  | POST |                | postData 中有用户名和密码 |
| 博客列表           | /api/blog/list   | GET  | author,keyword |  参数为空则不进行过滤查询 |
| 获取一篇博客的内容 | /api/blog/detail | GET  | id             |                           |
| 新增一篇博客       | /api/blog/new    | POST |                |       post 中有新增的信息 |
| 更新一篇博客       | /api/blog/update | POST | id             |   postData 中有更新的内容 |
| 删除一篇博客       | /api/blog/del    | POST | id             |                           |



## blog-1

### 运行


### 目录结构

```js
├── app.js
├── bin
│   └── www.js  //单纯的入口 与业务代码没有关系
├── logs  // 生产环境日志
│   ├── access.log
│   ├── error.log
│   └── event.log
├── src
│   ├── conf  // mySql 和 redis 配置文件
│   │   └── db.js
│   ├── controller  // controller 分发用户请求
│   │   ├── blog.js
│   │   └── user.js
│   ├── db   // 执行查询语句
│   │   ├── mysql.js
│   │   └── redis.js
│   ├── model
│   │   └── resModel.js
│   ├── router  // 处理路由
│   │   ├── blog.js
│   │   └── user.js
│   └── utils
│       ├── copy.sh
│       ├── cryp.js
│       ├── log.js
│       └── readline.js
└── yarn.lock
```

## blog-express

### 运行

### 目录结构
略

## blog-koa

### 运行

### 目录结构
略
