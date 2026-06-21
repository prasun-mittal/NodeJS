const express=require('express');
const fs=require('fs')
const users=require('./MOCK_DATA.json');
const { log } = require('console');
const app=express();
const PORT=8000;

// Middleware - plugin
app.use(express.urlencoded({extended: false}));

app.use((req,res,next)=>{
    fs.appendFile('log.txt',`${Date.now()}:${req.ip} ${req.method}: ${req.path}\n`,(err,data)=>{
        next();
    })
    // return res.json({msg: "Hello from middleware 1"})   // isme hamne res ko yji end kar dia next tak jane nhi dia
})
/*
app.use((req,res,next)=>{
    console.log("Hello from middleware 2",req.myUsername);
    return res.end("Hey")
    // Request ko yahi terminate kar diya.
    // next() nahi hai, isliye control aage nahi jayega.
})
*/
app.use((req,res,next)=>{
    console.log("Hello from middleware 2");
    next();
})

//ROUTES
app.get('/api/users',(req,res)=>{
    // res.setHeader('myname',"Prasun Mittal");
    // always add X to custom header like 'X-Myname'   // Good Practice
    // console.log(req.headers);
    
    return res.json(users);
})
app.get('/users',(req,res)=>{
    const html=`
        <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `;
    res.send(html);
})

app.route('/api/users/:id')
.get((req,res)=>{
    const id=Number(req.params.id);
    const user =users.find((user) => user.id === id);
    if(!user){
        return res.status(404).json({error:"User not found"});  // If user does not exist, return 404 Not Found
    }
    return res.json(user);
})
.patch((req,res) => {
    // edit user with id
    const id=Number(req.params.id);
     const body =req.body;
     const index=users.findIndex(user => user.id===id);
    if(index === -1){
        return res.status(404).json({
            message:"User not found"
        });
    }
    users[index]={
        ...users[index],
        ...body
    };
    fs.writeFile('./MOCK_DATA.json',
        JSON.stringify(users),
        (err)=>{
            return res.json({
                status:"Success"
            });
    });
})
.delete((req,res)=>{
    // delete user with id
    const id=Number(req.params.id);
    const index=users.findIndex(user=>user.id===id);
    users.splice(index,1);
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err)=>{
        return res.json({
            status:"Success"
        });
    });
});


app.post('/api/users',(req,res)=>{

    // Input validation
    // Check kar rahe hain ki required fields request body me present hain ya nahi.
    // Agar koi bhi field missing hai to 400 Bad Request return kar do.

    const body =req.body;
    if(!body || !body.first_name || !body.email || !body.last_name || !body.gender || !body.job_title){
        return res.status(400).json({msg: "All fields are required"});
    }
    users.push({...body, id:users.length+1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users), (err,data)=>{
        return res.status(201).json({ status:"Success",id:users.length});   // New user successfully create hua hai, isliye 201 status code return kar rahe hain.
    })   
})
/*
    200 → OK (GET, PATCH, DELETE)
    201 → Created (POST)
    400 →  User ne galat ya incomplete input bheja
    404 → Not Found
    500 → Internal Server Error
*/


app.listen(PORT,()=> console.log(`Server started at port: ${PORT}`));2