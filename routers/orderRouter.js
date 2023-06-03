import axios from "axios";
import express from "express"
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../jwt.js";
import Order from "../models/orderModel.js";

const orderRouter = express.Router();

orderRouter.post("/" ,isAuth ,  expressAsyncHandler(async(req,res)=>{
    if(req.body.cartItems.length === 0){
        res.status(400).send({message:"Cart is empty"})
    }else{
        const order = new Order({
            shippingAddress:req.body.shippingAddress,
            orderItems:req.body.orderItems,
            paymentMethod:req.body.paymentMethod,
            itemsPrice:req.body.itemsPrice,
            shipping:req.body.shipping,
            taxPrice:req.body.taxPrice,
            orderTotal:req.body.orderTotal,
            user:req.user._id,
        })
        const createOrder = await order.save();
        res.status(201).send({message:"New order created" , order:createOrder})
    }
}))

orderRouter.get("/:id" ,isAuth , expressAsyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        res.send(order);
    }else{
        res.status(404).send({message:"Order Not Found"})
    }
}));

orderRouter.put("/:id/pay" ,isAuth , expressAsyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt= Date.now(),
        order.paymentResult= {id : req.body.id,status:req.body.status , update_time:req.body.update_time , email_address:req.body.email_address,}
        const updatedOrder = await order.save();
        res.send({message:"Order Paid" , order:updatedOrder})
    }
    else{
        res.status(404).send({message:"Order not found"})
    }
}))

export default orderRouter;