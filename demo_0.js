const fs = require('fs');
const http = require('http');

var file = './login.html';
fs.createReadStream(file).pipe(process.stdout);
var server = http.createServer();
server.on('request',function(req,res){
    console.log('request'+JSON.stringify(req.headers));  //输出请求头
    req.pipe(process.stdout);
    req.end('hello world');
});
server.listen(8080,function(){
    console.log('listening on %d',this.address().port)
});
