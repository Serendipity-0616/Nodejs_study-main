// 这是路由模块
// 1. 导入 express
const express = require('express')
// 2. 创建路由对象
const router = express.Router()

// 3. 挂载具体的路由
router.get('/user/list', (req, res) => {
  res.send('Get user list.')
})//获取挂载用户列表的路由
router.post('/user/add', (req, res) => {
  res.send('Add new user.')
})//获取添加用户的路由
// 4. 向外导出路由对象
module.exports = router

