var http = require('http')
const counter = {}
counter.counter = 0
 
// 1. 创建 Server
var server = http.createServer()

server.listen(8081, function () {
    console.log('Server init success....')
  })

server.on('request', function(req, res) {
    // console.log(req)
    console.log('------------------------')
    console.log(req.headers.cookie)
    // console.log(req.url)
    req.on('data', function(data) {
        // console.log('------------------------')
        console.log(data.toString())
        // console.log(req.headers.cookie)
    })
    
    //res.setHeader("Content-Type", "text/html");
    //或者使用数组形式
    if (counter.counter % 2 == 0) {
        res.setHeader("Set-Cookie", ["type=ninja; path=/", "language=javascript; path=/"]);
    } else {
        res.setHeader("Set-Cookie", ["type=lpx; path=/", "language=python; path=/"])
    }
    counter.counter += 1
    if (req.url == "/user/info?") {
        res.setHeader("Access-Control-Allow-Credentials","true")
        res.setHeader("Access-Control-Allow-Origin", req.headers.origin)
        res.end('{code: -101,message: "auth fail,data: {}"}')
    } else {
        res.setHeader("Access-Control-Allow-Credentials","true")
        res.setHeader("Access-Control-Allow-Origin", req.headers.origin)
        res.end('{code: 0,message: "success",data:{user_id: 0, user_name: "test"}}')
    }
})
