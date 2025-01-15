// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入验证数据中间件 
const expressJoi = require('@escook/express-joi')
// 导入文章分类的验证模块
const { add_cate_schema,delete_cate_schema,get_cate_schema,update_cate_schema   } = require('../schema/article')

const article_handler = require('../router_handler/article')

// 获取文章分类的列表数据
router.get('/cates', article_handler.getArticleCates)

// 新增文章分类
router.post('/addcates', expressJoi(add_cate_schema), article_handler.addArticleCates)

// 根据 Id 删除文章分类的路由
router.get('/deletecate/:id',expressJoi(delete_cate_schema), article_handler.deleteCateById)

// 根据 Id 获取文章分类的路由
router.get('/cates/:id', expressJoi(get_cate_schema), article_handler.getArticleById)

// 根据 Id 更新文章分类的路由
router.post('/updatecate', expressJoi(update_cate_schema), article_handler.updateCateById)












// 向外共享路由对象
module.exports = router