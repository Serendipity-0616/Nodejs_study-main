//1.导入express
const express = require('express')
//2.创建web服务器
const app = express()


// 全局中间件
app.use((req, res, next) => {
    console.log('全局中间件')
    next()
});


//3.启动web服务器
app.listen(12138, () => {
    console.log('express server running at http://127.0.0.1')
})


// 1.监听GET请求
//参数1：客户端请求的url地址
//参数2：请求对应的处理函数
//req：请求对象（包含了与请求属性相关的属性与方法）
//res:响应对象（包含了与响应对象相关的属性与方法）
app.get('/user', function (req, res) {
    /*处理函数*/
    //向客户发送json请求
    res.send({ name: 'zs', age: 20, gender: '男' })
})

// 2.监听POST请求
//参数1：客户端请求的url地址
//参数2：请求对应的处理函数
//req：请求对象（包含了与请求属性相关的属性与方法）
//res:响应对象（包含了与响应对象相关的属性与方法）
app.post('/user', function (req, res) {
    /*处理函数*/
    //向客户端发送文本内容
    res.send('请求帮助')
})

// 3.获取URL中携带的查询参数  req.query

app.get('/', (req, res) => {
    //通过req.query可以获取到客户端发送过来的查询参数
    //注意：在默认情况下，req.query是一个空对象
    //客户端使用?name=zs&age=20这种查询字符串形式，发送到服务器参数
    //可以通过req.query对象访问到，例如：
    //req.query.name req.query.age
    console.log(req.query)
    res.send(req.query)

})
// 4.获取URL的动态参数   req.params

//url地址中，我们可以通过：参数名的形式，匹配动态参数值
app.get('/user1/:id', (req, res) => {
    //req.params默认是一个空对象
    //里面存放这通过：动态匹配到的参数值
    console.log(req.params)
})


app.use(express.static('public'))
// 挂载路径前缀
// app.use("/public",express.static('public'))

// // 1.导入路由模块
// const router = require('./01.router')
// // 2.注册路由模块
// app.use(router)

// 1. 导入路由模块
const router = require('./01.router')
// 2. 注册路由模块，使用app.use()注册路由模块，并添加统一的访问前缀/api
app.use('/api', router)


