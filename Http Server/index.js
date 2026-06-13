const http = require('http');

const myServer = http.createServer((req,res) => {
    // console.log("new Request Recieve");
    console.log(req);
    res.end("Hello from Server");    
});
myServer.listen(8000, () => console.log("Server Started")); // 8000 is port no. and "Server Started" is for my convinient so that i know my server is started and has no error


