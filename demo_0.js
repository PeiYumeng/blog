const fs = require('fs');
const http = require('http');

var server = http.createServer();
server.on('request',function(req,res){
    console.log('request'+JSON.stringify(req.headers));  //输出请求头
    req.pipe(process.stdout);
    req.end('hello world');
});
server.listen(8080,function(){
    console.log('listening on %d',this.address().port)
});

server.on('request',function(request,response){
		
    var url = request.url;
    if(url ==='/'){
        //response.writeHead(响应状态码，响应头对象): 发送一个响应头给请求。
        response.writeHead(200,{'Content-Type':'text/html'});
        // 如果url=‘/’ ,读取指定文件下的html文件，渲染到页面。
        fs.readFile('./login.html','utf-8',function(err,data){
            if(err){
                throw err ;
            }
            response.end(data);
        });
    }
});
