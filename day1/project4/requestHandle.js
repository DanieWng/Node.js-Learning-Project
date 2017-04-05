/**
 * 非阻塞方法
 */

// 引入child_process模块，实现一个简单实用的非阻塞操作exec()
var exec = require("child_process").exec;

function start(response){
    console.log("Request handler 'start' was called.");

    var content = "empty";

    // 它从node.js来执行一个shell命令。
    // 获取当前目录下所有的文件（ls -lah）， 然后当/start url请求的时候将文件信息输出到浏览器中
    exec("find /", 
        {timeout: 100000, maxBuffer: 20000*1024}, 
        function(error, stdout, stderr){
        response.writeHead(200, {"Content-Type": "Text/plain"});
        response.write(stdout);
        response.end();
    });
}

function upload(response){
    console.log("Request handler 'upload' was called.");

    response.writeHead(200, {"Content-Type": "Text/plain"});
    response.write("Hello Upload");
    response.end();
}

exports.start = start;
exports.upload = upload;