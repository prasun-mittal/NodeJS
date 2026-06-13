const http = require('http');
const fs = require('fs');

const myServer = http.createServer((req,res) => {
    // console.log("new Request Recieve");
    // console.log(req);
    const log=`${Date.now()}: ${req.url} New Request Recieved\n\n`;
    fs.appendFile('log.txt',log,(err,data)=>{
        switch(req.url){
            case '/': res.end("this is homePage");
                      break
            case '/about': res.end("this is AboutPage");
                      break
            case '/new': res.end("this is newPage");
                      break
            default: res.end("404 not found");
        }    
    })
});

myServer.listen(8000, () => console.log("Server Started")); // 8000 is port no. and "Server Started" is for my convinient so that i know my server is started and has no error


