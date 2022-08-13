import express, { request } from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";
import mongosh from "mongodb";


const productRouter = express.Router();


productRouter.get("/" , expressAsyncHandler(async(req,res)=>{
    // const products = await Product.find({});
    const products = await Product.find();
    res.send(products);
}))

productRouter.get("/seed" , expressAsyncHandler(async(req,res)=>{
    // await Product.remove({});
    const createProducts = await Product.insertMany(data.products);
    res.send({createProducts});
}))


productRouter.get("/:id" ,expressAsyncHandler(async(req,res)=>{
    const id = req.params.id
    // console.log(mongosh.ObjectId(id))
    const product = await Product.findById(mongosh.ObjectId(id));
    if(product){ 
    res.send(product);
    }else{
        res.status(404).send({message:"Product Not Found"});
    }
})) 


export default productRouter;