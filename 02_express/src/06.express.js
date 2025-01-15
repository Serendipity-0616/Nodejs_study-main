// 导入 express 模块
const express = require('express')
const cors = require('cors') //1.安装 npm i cors 2.导入跨域中间件
// 创建 express 的服务器实例
const app = express()


// 实现JSONP接口的步骤
// 1.获取客户端发送过来的回调函数的名字
// 2.得到要通过JSONP形式发送给客户端的数据
// 3.根据前两步得到的数据，拼接出一个函数调用的字符串
// 4.把上一步拼接得到的字符串，响应给客户端的<script>标签进行解析执行
app.get('/api/jsonp', (req, res) => {

    // 1.获取客户端发送过来的回调函数的名字
    const funcName = req.query.callback
    console.log(funcName,111);
    // 2.得到要通过JSONP形式发送给客户端的数据
    const data  ={name:'张三', age: 18, sex: '男'}
    // 3.根据前两步得到的数据，拼接出一个函数调用的字符串
    const scriptStr = `${funcName}(${JSON.stringify(data)})`
    console.log(scriptStr,222);
    // 4.把上一步拼接得到的字符串，响应给客户端的<script>标签进行解析执行
    res.send(scriptStr)


})



app.use(cors()) //2.配置跨域中间件
// 1. 导入自己封装的中间件模块
const customBodyParser = require('./05.custom-body-parser')

// 2. 将自定义的中间件函数，注册为全局可用的中间件
app.use(customBodyParser)

app.post('/user', (req, res) => {
    res.send(req.body)
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(12138, function () {
    console.log('Express server running at http://127.0.0.1')
})