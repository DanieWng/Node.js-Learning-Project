/**
 * 添加上传文件功能
 */

// 引入child_process模块，实现一个简单实用的非阻塞操作exec()
var exec = require("child_process").exec;

var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

function start(response, request){
    console.log("Request handler 'start' was called.");

  var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" '+
        'content="text/html; charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" enctype="multipart/form-data" '+
        'method="post">'+
        '<input type="file" name="upload">'+
        '<input type="submit" value="Upload file" />'+
        '</form>'+
        '</body>'+
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request){
    console.log("Request handler 'upload' was called.");

    var form = new formidable.IncomingForm();
    form.uploadDir = "tmp"; 

    if(!fs.existsSync("./tmp"))
    {
        fs.mkdirSync("./tmp");
    }

    console.log("about to parse");
    form.parse(request, function(error, fields, files) {
        
        console.log("parsing done");

        try{
            /**
             * 问题在这里如何上传文件后保存到本地中??????
             */

            // /**
            //  * fs.renameSync()函数仅能起到改变文件命名的作用，在本地文件系统内并没有
            //  * 文件被保存。
            //  */
            // fs.renameSync(files.upload.path, "/tmp/test.png");

            // 检测是否有相通名称的文件
            if(fs.exists("./tmp/test.png")){
                fs.unlink("./tmp/test.png");
            }

            // 保存文件到本地，并删除缓存文件
            var is = fs.createReadStream(files.upload.path);
            var os = fs.createWriteStream("./tmp/test.png");
            is.pipe(os);
            is.on('end',function(){
                fs.unlinkSync(files.upload.path);
                
                // 文件保存完成后， 跳转'/show'
                response.writeHead(200, {"Content-Type": "text/html"});
                response.write("received image:<br/>");
                response.write("<img src='/show'&gt/>");
                response.end();    
            });
            
        }catch(e)
        {
            console.log(e);
        }
    });
}

function show(response, postData){
    console.log("Request handler 'show' was called.");
    fs.readFile("./tmp/test.png", "binary", function(error, file) {
        if(error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;