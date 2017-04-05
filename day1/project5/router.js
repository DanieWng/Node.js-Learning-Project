/**
 * 路由文件
 */

function route(handle, pathname, response, request){
    // 通过请求的URL路径来区别不同请求
    console.log("About to route a request for " + pathname);

    if(typeof handle[pathname] === "function"){
        handle[pathname](response, request);
    }else{
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "Text/plain"});
        response.write("404 not found");
        response.end();
    }
}

exports.route = route;