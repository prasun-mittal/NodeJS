const express = require("express");

const { connectMongoDb } = require("./connection");
const logReqRes = require("./middlewares");
const UserRouter = require("./routes/user");

const app = express();
const PORT = 8000;

// MongoDB Connection
connectMongoDb("mongodb://127.0.0.1:27017/node-practice");

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

// Routes
app.use("/user", UserRouter);

// Start Server
app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});