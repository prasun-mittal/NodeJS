const express=require('express');
const users=require('./MOCK_DATA.json');
const app=express();
const PORT=8000;

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
    return res.json({ status:"Pending"});
})
.delete((req,res)=>{
    // delete user with id
    return res.json({ status:"Pending"});
});


app.post('/api/users',(req,res)=>{
    // todo : create new user
    return res.json({ status:"Pending"});
})


app.listen(PORT,()=> console.log(`Server started at port: ${PORT}`));