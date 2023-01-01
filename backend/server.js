import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";

dotenv.config({path:"../.env"});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


const DB = `${process.env.MONGODB_URL}`


mongoose.connect( "mongodb://localhost/MobiWorLD" || DB ).then(() => {
    console.log("Connection successfull"); 
 }).catch((e) => console.log("No connection"))


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

