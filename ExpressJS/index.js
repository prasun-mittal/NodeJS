const http = require('http')
// const fs = require('fs')
// const url = require('url')
const express=require('express')

const app = express();
app.get('/',(req,res)=> {
    return res.send("Hello from home page")
})
app.get('/about',(req,res)=>{
    return res.send("Hello from about page"+" hey, "+req.query.name+" you are "+req.query.age);     
    // http://localhost:8002/about?name=prasun&age=23   -> is url par ye output aaya hai next line wala
    // Hello from about page hey, prasun you are 23
})
// app.post('/name......')

app.listen(8002, () => console.log("Server Started"))   // line no. 19 and 21 ka kaam ke sath karegi ye line

// const myServer = http.createServer(app);

// myServer.listen(8002, () => console.log("Server Started"));