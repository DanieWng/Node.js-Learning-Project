/**
 * 创建一个简单的http服务器
 */

// 请求http模块
var http = require('http');

// http实例创建一个server，并开启监听8888端口
http.createServer(function(request, response){
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
}).listen(8888);