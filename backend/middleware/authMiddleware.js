import jwt from 'jsonwebtoken';

const authmiddleware=(req,res,next) =>{
 const token = req.cookies.token;
  if(!token){
    return res.status(401).json({message:'Unauthorized'})   
  }
  try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).json({message:'Invalid token'})   
  }
}

export default authmiddleware;