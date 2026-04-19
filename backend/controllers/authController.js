import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken'; 

const register=async(req,res) =>{
  const {name,email,password}=req.body;

  passwordHash=await bcrypt.hash(password,10);

  const user = await User.create({name,email,password:passwordHash})

  res.json({message:'User registered successfully',user})
}

const login=async (req,res)=>{
  const{email,password}= req.body;
  const user=await User.findOne({email});
  if(!user){
    return res.status(400).json({message:'Invalid email or password'})
  }
  const validpassword=await bcrypt.compare(password,user.password) ;
  if(!validpassword){
    return res.status(400).json({message:'Invalid email or password'})
  }
  const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
  res.json({message:'Login successful',token})
}

export {register,login}