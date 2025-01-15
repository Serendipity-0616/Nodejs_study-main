const fs = require('fs');
const path = require('path')



// fs 读文件
// fs.readFile('./test.js', 'utf8', function (err, dataStr) {
//     // 如果读取成功，则err为null
//     // 如果读取失败，err的值为错误对象,dataStr 为undefined
//     if (err) {
//         console.log(err)
//     }
//     console.log('+++++++++')
//     // 打印成功的结果
//     console.log(dataStr)
// })

// fs 写文件
// fs.writeFile('./write.text', 'Hello FS Module!', 'utf8', function (err) {
//     // 如果写入成功，则err为null
//     // 如果写入失败，err的值为错误对象
//     if (err) {
//         console.log(err)
//     }
//     console.log(__dirname);
// })



// 案例一：考试成绩整理
fs.readFile('./成绩.txt', 'utf8', function (err, dataStr) {
    // 如果读取成功，则err为null
    // 如果读取失败，err的值为错误对象,dataStr 为undefined
    if (err) {
        return console.log('读取文件失败' + err.message);
    }
    console.log("读取文件成功" + dataStr);

    const arrOld = dataStr.split(' ').map(i => i.replace('=', ":"));
    fs.writeFile('./成绩-ok.txt', arrOld.join('\n'), 'utf8', function (err) {
        // 如果写入成功，则err为null
        // 如果写入失败，err的值为错误对象
        if (err) {
            console.log(err)
        }
        console.log('写入文件成功')
    })


});


const pathStr = path.join('/a', '/b/c', '../', './d', 'e')
console.log(pathStr) // \a\b\d\e

const pathStr2 = path.join(__dirname, './files/1.text')
console.log(pathStr2) // 将相对路径转化为绝对路径

const fpath = '/a/b/c/index.html'

let fullName = path.basename(fpath)
console.log(fullName) // index.html


let nameWithoutExt = path.basename(fpath, '.html')
console.log(nameWithoutExt) // index


// 获取文件的拓展名称
let fext = path.extname(fpath)
console.log(fext) // .html


// 案例二：时钟案例
// 将素材目录下的index.html页面，拆分成三个文件，分别是：index.css，index.js，index.html

// 并且将拆分出的三个文件存放到clock目录中。

// 1.创建两个正则表达式，分别用来匹配<style>和<script>标签。
// 2.使用fs模块，读取需要被处理的html文件。
// 3.自定义resolveCSS方法，来写入index.css样式文件
// 4.自定义resolveJS方法，来写入index.js脚本文件
// 5.自定义resolveHTML方法，来写入index.html文件


//定义正则表达式
// 其中\s表示空白字符，\S表示非空白字符，*表示匹配任意次
const restyle = /<style>[\s\S]*<\/style>/
const rescript = /<script>[\s\S]*<\/script>/
fs.readFile(path.join(__dirname, '/index.html'), 'utf-8', function (err, dataStr) {
    if (err) {
        console.log(err);
    }
    console.log("文件读取成功==>index.html");


    resolveCSS(dataStr);
    resolveJS(dataStr);
    resolveHtml(dataStr);


})

function resolveCSS(dataStr) {
    const cssStr = restyle.exec(dataStr);
    //   去掉<style> </style>
    const newCss = cssStr[0].replace('<style>', '').replace('</style>', '');
    //将提取内容写入到clock目录中一个index.css中
    fs.writeFile(path.join(__dirname, '/clock/index.css'), newCss, 'utf-8', function (err) {
        if (err) {
            return console.log('导入css样式失败' + err.message);
        } else {
            console.log('写入样式成功');
        }

    })
}

function resolveJS(dataStr) {
    const jsStr = rescript.exec(dataStr);
    //   去掉<script> </script>
    const newJs = jsStr[0].replace('<script>', '').replace('</script>', '');
    //将提取内容写入到clock目录中一个index.css中
    fs.writeFile(path.join(__dirname, '/clock/index.js'), newJs, 'utf-8', function (err) {
        if (err) {
            return console.log('导入js失败' + err.message);
        } else {
            console.log('写入js成功');
        }

    })
}

function resolveHtml(htmlStr) {
    const newHtml = htmlStr.replace(restyle, '<link rel="stylesheet" href="./index.css"/>')
        .replace(rescript, '<script src = "./index.js"></script>')
    fs.writeFile(path.join(__dirname, '/clock/index.html'), newHtml, function (err) {
        if (err) {
            console.log('导入html文件失败' + err);
        } else {
            console.log('导入html成功');
        }
    })
}




// 1.导入模块
const http = require('http')

// 2.创建web服务器实例
const server = http.createServer()
// 3.为服务器绑定request事件，监听客户端的请求
server.on('request', (req, res) => {
    console.log('Someone visit our web server.')
    const url = req.url // 请求地址
    const method = req.method // 请求方式
    const str = 'Your request url is ${req.url},and request method is ${req.method}'
    // conststr='您请求的url地址是${req.url},请求的method类型是${req.method}'
    console.log(str)

    // 根据路径判断返回不同内容
    let content = '<h1>404 Not found!</h1>'
    if (url === '/' || url === '/index.html') {
        content = '<h1>首页</h1>'
    }else if(url==='/about.html'){
        content = '<h1>关于</h1>'
    }
    //为了防止中文显示乱码的问题，需要设置响应头
    res.setHeader('Content-Type', 'text/html; charset=utf-8') // 设置响应头
    res.end(content) // 向客户端响应内容
})
// 4.启动服务器
// server.listen(12138, () => {
//     console.log('http server running at http://127.0.0.1')
// })


// 导入并使用变量
const moduleA = require('./moduleA.js')

console.log(moduleA);
// moduleA.sayHello()


const moment = require('moment')

const dt = moment().format('YYYY-MM-DD HH:mm:ss');
console.log(dt);