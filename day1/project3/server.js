/**
 * 封装request函数，并导出函数
 */

var http = require("http");

function start(){
    function onRequest(request, response){
        console.log("Request received");
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello world - 封装request函数，在index.js中启动http");
        response.end();
    }

    http.createServer(onRequest).listen(8888);

    console.log("Server has started");
}

exports.start = start;
