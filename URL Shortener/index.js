const express = require('express');
const app=express();
const PORT = 8001;
const urlRoutes = require('./routes/url')
const {connectToMongoDb} = require('./connection')
const URL = require('./models/url')

connectToMongoDb('mongodb://localhost:27017/short-url')
.then(()=> console.log("MongoDb connected")
);

app.use(express.json());

app.use("/url",urlRoutes);
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