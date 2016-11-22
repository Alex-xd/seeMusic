# See Music

> 使用vue2.0 vuex webpack Electron搭建的跨平台云音乐播放器，网易云音乐接口强力支撑，可随意畅听收费歌曲


## 使用

``` bash
# 项目根目录安装依赖
npm install

# 浏览器访问localhost:8080
npm run dev

# 打包编译生成静态资源
npm run build

# 测试Electron应用
npm run test
```

## 跨平台开发

**重要！**

若要编译为可执行应用，必须先将`src/api/address.js`中`fullUrl`设为`true`，否则会请求不到数据！

```bash
# 在dist目录下安装electron相关依赖
npm run install

# 编译生成可执行文件
npm run build
```

项目还在开发中

预计将要开发以下功能

[x] 歌曲查询
- 歌词显示
- 用户登录/注册
- 收藏歌曲/歌单
- 显示歌曲评论（数据来自网易云音乐）