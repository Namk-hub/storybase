import jwt from 'jsonwebtoken';

const authmiddleware=(req,res,next) =>{
  const token =jwt.headers.authorization?.split(' ')[1];
  if(!token){
    return res.status(401).json({message:'Unauthorized'})   
  }
  try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.userId=decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({message:'Invalid token'})   
  }
}

export default authmiddleware;