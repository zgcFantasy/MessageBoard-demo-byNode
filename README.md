## 简介

这是一个简易的留言板 demo 项目，具有基本的登录、注册功能，留言可以增删改查，详细内容看后面的图示就会一目了然。

项目前端主要使用 Vue + Element + axios 开发，由 Vue CLI 生成项目结构。后端语言为 Node.js，框架采用 Koa2 ，通过 koa-generator 生成项目结构。数据库选择 MongoDB，通过 mongoose  与后端进行数据交互。



### 前端页面

#### 注册页

<img src=".\images\注册页原型.png" alt="image-20210224184839840" style="zoom: 80%;" />

#### 登录页

<img src=".\images\登录页原型.png" alt="image-20210224185103135" style="zoom: 50%;" />

#### 留言主页

<img src=".\images\留言板主页原型.png" alt="image-20210224185200058" style="zoom:67%;" />

### 功能描述

#### 注册与登录

+ 用户名唯一，不能重复注册
+ 用户名和密码匹配，即可登录
+ 登陆成功后，跳转到首页

#### 首页

+ 非登录用户不能进入首页，登录用户可发布留言
+ 可查看全部留言，或自己的留言
+ 只能编辑和删除自己的留言，不能操作他人留言

## 数据库设计

### 选型：

MongoDB

### 表设计

+ comments 存储评论信息

  | 字段     | 类型   | 意义     |
  | -------- | ------ | -------- |
  | content  | String | 评论内容 |
  | username | String | 用户名   |

+ users 用户信息

  | 字段     | 类型   | 意义   |
  | -------- | ------ | ------ |
  | username | String | 用户名 |
  | password | String | 密码   |
  | age      | Number | 年龄   |
  | city     | String | 城市   |
  | gender   | Number | 性别   |


每个 collection 都会添加 timestamps 和 id，这点在 mongoose 中进行设置。

## 接口/路由设计

所有的 request 和 response 的 body 均采用 json 格式。例如：

```javascript
// 成功时
ctx.body = {
    errno:0, // 错误码
    data // 数据
}
// 失败时
ctx.body = {
    errno:-1, // 错误码
    message // 错误消息
}
```



+ 注册，无登录校验 

  post，/users/register，前端发送所有注册信息，后端返回数据库内容

+ 登录，无登录校验

  post，/users/login，前端发送 username 与 password，后端校验成功则在 session 中设置 userInfo 对象，包含 username

+ 获取用户信息

  get，/users/getUserInfo，直接从 session 获取用户名即可

+ 获取留言列表

  get，/comment/list?filterType = {x}，x = 1 表示查看所有留言，2 表示只查看自己留言，用 username 进行区分

+ 创建留言

  post，/comment/list，前端发送 content 和 username，后端返回新的数据库结果

+ 更新

  post，/comment/update，前端发送留言的 id 与·修改后的 content，后端进行修改

+ 删除

  post，/comment/del，前端发送留言的 id，后端根据 id 进行删除

### 关于登录校验

登录校验采用 cookie + session 机制，由于前后端分离，需要注意跨域传输 cookie 问题。

前端使用 axios，设置 `axios.defaults.withCredentials = true` 可以在跨端访问时携带 cookie

后端使用 koa2，安装 koa2-cors 和 koa-generic-session 解决相关问题，这样配置后 koa 会自动帮我们识别 cookie 和 session 的关系。代码实例如下：

```javascript
const cors = require('koa2-cors')
const session = require('koa-generic-session')

// 服务端支持跨域的配置
app.use(cors({
  origin: 'http://localhost:8080', // 允许访问的域，若为 * 表示接受所有域的访问
  credentials: true // 允许跨域时带 cookie
}))

// session
app.keys = ['thisismykeys'] // 设定一个加密用的 key，实际生产中应该更复杂一些
app.use(session({
  cookie: {
    path: '/', 
    httpOnly: true, // 只有服务器可访问cookie
    maxAge: 24 * 60 * 60 * 1000 // 等价于有效期一天
  }
}))
```



