import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


const DB = `${process.env.MONGODB_URL}`

console.log("DB>>>>>>>",DB);
mongoose.connect(DB || "mongodb://localhost:27017/MobiWorLD").then(() => {
    console.log("Connection successfull"); 
}).catch((e) => console.log("No connection"))

app.use(express.static("build"))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, x-Requested-With,Content-Type, Accept, Authorization');
    next();
  });

app.use("/api/users" , userRouter);
app.use("/api/products", productRouter , ()=>{
    console.log("/api/products(Server)--->")    
});
app.use("/api/orders", orderRouter)
app.get("/api/config/paypal" , (req,res)=>{
    res.send(`${process.env.PAYPAL_CLIENT_ID}` || "sb")
})

app.get("/", (req , res) => {
    res.send("Server is ready");
})

app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})

const Port = process.env.PORT || 5000;
app.listen(Port,(req,res)=>{
    console.log(`Serve at htttp://localhost:${Port}`);
})

