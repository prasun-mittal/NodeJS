const express = require('express');
const path=require('path');
const cookieParser = require('cookie-parser')

const app=express();
const PORT = 8001;
const {connectToMongoDb} = require('./connection')
const URL = require('./models/url')
const {restrictToLoggedinUserOnly,checkAuth} = require('./middleware/auth')

const staticRoute = require('./routes/staticRouter');
const urlRoutes = require('./routes/url')
const userRoute = require('./routes/user');

connectToMongoDb('mongodb://localhost:27017/short-url')
.then(()=> console.log("MongoDb connected")
);

app.set('view engine','ejs');
app.set('views',path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


app.use("/url",restrictToLoggedinUserOnly, urlRoutes);
app.use("/user", userRoute);
app.use('/', checkAuth, staticRoute);

app.get('/:shortId',async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{$push: {
        visitHistory: {
            timestamp: Date.now()
        }
      }
     }
    );
    res.redirect(entry.redirectURL);
})

app.listen(PORT, ()=> console.log(`Server started at port: ${PORT}`));