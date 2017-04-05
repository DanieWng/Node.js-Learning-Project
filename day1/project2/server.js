/**
 * 测试事件驱动的异步服务器端javascript和它的回调
 */

var http = require("http");

function onRequest(request, response){
    console.log("Request received");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello world");
    response.end();
}

http.createServer(onRequest).listen(8888);

console.log("Server has started");