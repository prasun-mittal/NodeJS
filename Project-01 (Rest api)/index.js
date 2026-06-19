const express=require('express');
const fs=require('fs')
const users=require('./MOCK_DATA.json');
const app=express();
const PORT=8000;

// Middleware - plugin
app.use(express.urlencoded({extended: false}));

//ROUTES
app.get('/api/users',(req,res)=>{
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
    // todo : create new user
    const body =req.body;
    users.push({...body, id:users.length+1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users), (err,data)=>{
        return res.json({ status:"Success",id:users.length});
    })
    
})


app.listen(PORT,()=> console.log(`Server started at port: ${PORT}`));