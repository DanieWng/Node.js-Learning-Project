/**
 * 创建主文件index.js, 并在其中启动http
 */

var server = require("./server");

// 扩展index.js使路由函数可以被注入到服务器中
var router = require("./router");

// 将一系列请求处理程序通过一个对象来传递，并使用松耦合的方式将这个对象注入到route函数中
var requestHandler = require("./requestHandle");

var handler = {}
handler["/"] = requestHandler.start;
handler["/start"] = requestHandler.start;
handler["/upload"] = requestHandler.upload;

server.start(router.route, handler);