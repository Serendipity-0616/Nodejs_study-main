const express = require('express')
const app = express()

// // 这是定义全局中间件的简化形式
// app.use((req, res, next) => {
//   // 获取到请求到达服务器的时间
//   const time = Date.now()
//   // 为 req 对象，挂载自定义属性，从而把时间共享给后面的所有路由
//   req.startTime = time
//   next()
// })

// 定义第一个全局中间件
app.use((req, res, next) => {
  console.log('调用了第1个全局中间件')
  next()
})
// 定义第二个全局中间件
app.use((req, res, next) => {
  console.log('调用了第2个全局中间件')
  next()
})


// 1. 定义中间件函数
const mv1 = (req, res, next) => {
  console.log('调用了局部生效的中间件')
  next()
}
// 2.使用局部中间件函数
app.get('/', mv1,(req, res) => {
  res.send('Home page.' + req.startTime)
})


// 1. 定义中间件函数
const mw1 = (req, res, next) => {
  console.log('调用了第一个局部生效的中间件')
  next()
}

const mw2 = (req, res, next) => {
  console.log('调用了第二个局部生效的中间件')
  next()
}


// 多个中间件
// 调用方式一：
// app.get('/user',[mw1,mw2], (req, res) => {
//   res.send('User page.' + req.startTime)
// })
// 调用方式二：
app.get('/user',mw1,mw2, (req, res) => {
  res.send('User page.' + req.startTime)
})



// 1. 定义路由
app.get('/err', (req, res) => {
  // 1.1 人为的制造错误
  throw new Error('服务器内部发生了错误！')
  res.send('Home page.')
})

// 注意！！！！！ 错误级别的中间件，放到所有路由之后
// 2. 定义错误级别的中间件，捕获整个项目的异常错误，从而防止程序的崩溃
app.use((err, req, res, next) => {
  console.log('发生了错误！' + err.message)
  res.send('Error：' + err.message)
})


app.listen(12138, () => {
  console.log('http://127.0.0.1')
})

