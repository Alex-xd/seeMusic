# See Music

# 重要

本项目正在进行二次重新开发，当前开发分支为dev分支，老版的源码在old-version分支上，如需老版的源码可直接下载最新[release]()，老版不再更新。

- - -

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

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

当前配置仅编译为mac端桌面程序，如需window、linux版本只需在`build/package.json`中`script`字段下的`--platform=darwin`后添加对应平台名称即可。

**重要！**

第一步：请先将`build.option.js`中`MODE`设为`1`

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

短期：

- ~~播放~~
- ~~暂停~~
- ~~上一首、下一首~~
- ~~随机、单曲循环播放~~
- ~~查询(支持歌名，歌手，歌词，专辑查询)~~
- ~~下载歌曲~~
- ~~高品质音乐支持~~
- ~~显示歌曲评论（数据来自网易云音乐）~~
- ~~优化移动端体验~~
- ~~将SongList组件中的ListItem抽象为一个通用组件~~
- 参考Vue HackerNews，对代码结构进行优化
- 缓冲进度条
- 用beforeMount优化SongList组件
- webpack code spliting优化

长期：

- 后台用Node重写并开源（后台目前为java实现，暂时闭源）
- 完善测试
- 榜单
- 用户登录/注册
- 支持用户自定义歌单（可添加歌曲进用户歌单）
- 收藏歌曲/歌单
- 歌词显示
- 歌单和评论滚动加载更多

## bugs & issues

1. ~~部分收费歌曲的普通品质（96kbps）的音源不存在（404），在播放时应自动切换品质~~

2. 正在播放时去搜索歌曲，如果关键词为空，会自动切换到默认列表里的歌曲播放

3. 点击导航栏后应保留字体颜色以显示说明在当前板块下

4. ~~评论区切歌，评论也应切换~~

## LISENCE

[MIT](https://opensource.org/licenses/MIT)

本项目仅供交流学习之用
