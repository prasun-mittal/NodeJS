const http = require('http')
const fs = require('fs')
const url = require('url')

const myServer = http.createServer((req,res) => {
    if(req.url === '/favicon.ico') return res.end();
    const log=`${Date.now()}:${req.method} ${req.url} New Request Recieved\n\n`;
    const myurl = url.parse(req.url,true)
    // console.log(myurl);
    
    fs.appendFile('log.txt',log,(err,data)=>{
        switch(myurl.pathname){
            case '/':
                if(req.method ==="GET")    res.end("this is homePage");
                break

            case '/about':
                const username=myurl.query.myname;
                res.end(`this is AboutPage, ${username}`);
                      break

            case '/new': res.end("this is newPage");
                      break

            case '/signup':
                if(req.method==='GET')  res.end('this is a sinup form')
                else if(req.method==='POST'){
                    // DB query
                    res.end('success');    
                }
                break

            default: res.end("404 not found");
        }
    })
})

myServer.listen(8001, () => console.log("Server Started"));