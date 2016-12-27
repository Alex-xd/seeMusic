# See Music

> 使用vue2 vuex vue-router axios webpack Electron搭建的跨平台云音乐播放器，网易云音乐接口强力支撑，可随意畅听高品质收费歌曲

## Usage

``` bash
# 项目根目录安装依赖
npm install

# 浏览器访问localhost:8000
npm run dev

# 打包编译生成静态资源
npm run build
```

## 编译为桌面端应用

**重要！**

第一步：请先将`src/api/address.js`中`fullUrl`设为`true`

第二步：

```bash
# 重要！以下操作均在build目录下进行
# 安装electron相关依赖
npm run install

# 预览效果
npm run test

# 编译生成可执行文件
npm run build
```

## 开发计划

- ~~播放~~
- ~~暂停~~
- ~~上一首、下一首~~
- ~~随机、单曲循环播放~~
- ~~查询(支持歌名，歌手，歌词，专辑查询)~~
- ~~下载歌曲~~
- ~~高品质音乐支持~~
- ~~显示歌曲评论（数据来自网易云音乐）~~
- 歌词显示
- 用户登录/注册
- 支持用户自定义歌单（可添加歌曲进用户歌单）
- 收藏歌曲/歌单
- 榜单
- 优化移动端体验
- 歌单和评论滚动加载更多
- webpack code spliting优化
- 缓冲进度条
- 完善测试
- 后台用Node重写并开源（后台目前为java实现，暂时闭源）
- 将SongList组件中的ListItem抽象为一个通用组件
- 用beforeMount优化SongList组件

## bugs & issues

1. 部分收费歌曲的普通品质（96kbps）的音源不存在（404），在播放时应自动切换品质
2. 正在播放时去搜索歌曲，如果关键词为空，会自动切换到默认列表里的歌曲播放
3. 点击导航栏后应保留字体颜色以显示说明在当前板块下
4. 评论区切割，评论也应切换

## LISENCE

本项目仅供交流学习之用
