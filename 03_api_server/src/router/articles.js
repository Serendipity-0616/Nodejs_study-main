// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入验证数据中间件 
const expressJoi = require('@escook/express-joi')

const articles_handler = require('../router_handler/articles')
// 导入文章的验证模块
const { add_article_schema, get_articleById_schema, delete_schema, update_article_schema } = require('../schema/articles')

// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
// 导入处理路径的核心模块
const path = require('path')

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })

// 发布新文章的路由
// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), articles_handler.addArticle)
router.get('/list', articles_handler.getArticleList)
//根据Id查询文章
router.get('/:id',expressJoi(get_articleById_schema),articles_handler.getArticleById)
//根据ID删除文章的路由
router.get('/delete/:id', expressJoi(delete_schema), articles_handler.deleteById)
//更新文章的路由
router.post('/edit',upload.single('cover_img'),expressJoi(update_article_schema),articles_handler.editArticle)
// 向外共享路由对象
module.exports = router