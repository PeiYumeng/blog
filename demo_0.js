const fs = require('fs');
const http = require('http');
const titbit = require('titbit');

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

async function readFile(filename,encoding = 'utf8'){
    return new Promise((rv,rj)=>{
        fs.readFile(filename,{encoding:encoding},(err,data)=>{
            if(err){
                rj(err);
            }else{
                rv(data);
            }
        });
    });
}
//读取html页面数据
async function loadPage(pagename,pagedir = './login'){ //默认目录pages
    let pagefile = `${pagedir}/${pagename}.html`;
    return await readFile(pagefile);
}
var app = new titbit({
    //开启调试模式，输出错误信息
    debug:true,
    //不输出负载信息
    showLoadInfo:false,
});
//相当于 var router = app.router;
var {router} = app;

router.get('/',async c=>{
    try{
        c.res.body = await loadPage('/');
    }catch(err){
        c.res.body = await loadPage('404','errorpages');
        c.res.status(404);
    }
});