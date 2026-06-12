const fs=require("fs");

// this is syncronus call
fs.writeFileSync('./test.txt','Hey There!');    // "./" ka matlab hota hai current directly


//this is Asyncronous call
// fs.writeFile('./test.txt','Hey There!', (err) =>{});

// writeFileSync() -> Synchronous, blocks execution until task completes
// writeFile() -> Asynchronous, does not block execution,
// callback runs after file operation completes


// read
// const result = fs.readFileSync('./test.txt',"utf-8");
// console.log(result);    // Hey There!


// append
// fs.appendFileSync("./test.txt",new Date().getDate().toLocaleString());   // Hey There!12
