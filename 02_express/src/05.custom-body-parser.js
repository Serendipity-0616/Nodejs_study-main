
// 导入 Node.js 内置的 querystring 模块
const qs = require('querystring')
function bodyParser(req, res, next) {
    // 定义一个 str 字符串，专门用来存储客户端发送过来的请求体数据
    let str = ''
    // 监听 req 的 data 事件
    req.on('data', (chunk) => {
        str += chunk
    })
    // 监听 req 的 end 事件
    req.on('end', () => {
        // 在 str 中存放的是完整的请求体数据
        body = qs.parse(str)
        req.body = body
        next();
    })
   
}

module.exports = bodyParser;



