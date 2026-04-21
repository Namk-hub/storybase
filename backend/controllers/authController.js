import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken'; 

const register=async(req,res) =>{
  try {
    const {name,email,password}=req.body;

    const passwordHash=await bcrypt.hash(password,10);

    const user = await User.create({name,email,password:passwordHash})
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})

    res.json({
      message:'User registered successfully',
      token,
      user: { id: user._id, name: user.name, email: user.email }
    })
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error registering user' });
  }
}

const login=async (req,res)=>{
  try {
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
    res.json({
      message:'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email }
    })
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error logging in' });
  }
}

export {register,login}