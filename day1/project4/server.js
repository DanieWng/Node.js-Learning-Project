/**
 * 如何来进行请求的“路由”
 * 
 * 给onRequest函数添加一些逻辑，来找出浏览器请求的url路径
 * 在这里从http请求中提取url和get／post参数的过程由http服务器来进行
 */

var http = require("http");
var url = require("url");

// 使用依赖注入的方式添加路由模块
function start(route, handle){
    function onRequest(request, response){
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received");
        
        route(handle, pathname, response);
    }

    http.createServer(onRequest).listen(8888);

    console.log("Server has started");
}

exports.start = start;
