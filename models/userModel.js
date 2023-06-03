import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type:"string" , required:true},
    email:{type:"string" , required:true , unique:true},
    password:{type:"string" , required:true},
    isAdmin:{type:Boolean , default:false , required:true},
},{ 
       timestamp:true,
})

const User = mongoose.model("User",userSchema);
export default User;