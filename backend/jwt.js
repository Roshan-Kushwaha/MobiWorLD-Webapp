import jwt from "jsonwebtoken";


export const generateToken = (user) => {
    return jwt.sign({_id : user._id,
    email : user.email,
    name : user.name,
    isAdmin : user.isAdmin,
    },`${process.env.JWT_SECRET}`,{
       expiresIn: "30d" 
    })
}



export const isAuth = (req,res,next)=>{
    const authorization = req.headers.authorization;
    const token = authorization.slice(7 , authorization.length); //Bearer XXXXXX
    if(authorization){
        jwt.verify(token , `${process.env.JWT_SECRET}`,(err,decode)=>{
            if(err){
                res.status(401).send({message:"Invalid token"})
            }else{
                req.user=decode
                next();
            }
        })
    }else{
        res.status(401).send({message:"No token"});
    }
   

}