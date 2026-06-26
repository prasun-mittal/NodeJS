const express = require('express');
const path=require('path');
const app=express();
const PORT = 8001;
const urlRoutes = require('./routes/url')
const {connectToMongoDb} = require('./connection')
const URL = require('./models/url')

const staticRoute = require('./routes/staticRouter');
connectToMongoDb('mongodb://localhost:27017/short-url')
.then(()=> console.log("MongoDb connected")
);

app.set('view engine','ejs');
app.set('views',path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use('/',staticRoute);

/*
app.get('/test',async (req,res)=>{
    const allUrls= await URL.find({});
    // return res.end(`
    //     <html>
    //         <head></head>
    //         <body>
    //             <ol>
    //                 ${allUrls.map((url)=>`<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length} </li>`).join("")}
    //             </ol>
    //         </body>
    //     </html>    
    // `);   // this is without ejs 

    return res.render('home',{
        urls:allUrls });      // this is server side rendering
})
*/

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