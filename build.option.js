/**
 * 发布模式
 * @type {number}
 * MODE=0：开发模式/打包发布到服务器
 * MODE=1：打包为electron源文件
 */
let MODE = 0;

module.exports = {
    // 接口域名为相对路径或绝对路径（用于构建electron时请设置为true）
    absoluteURL: MODE,
    // publicPath: MODE ? '' : 'http://119.29.148.154/Server/build/static/'
    publicPath: MODE ? '' : ''
};