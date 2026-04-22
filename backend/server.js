import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';

const app=express();
dotenv.config();

app.use(cors());
app.use(express.json());

connectDB();

// starting server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/',(req,res)=>{
  res.send("welcome to storybase backend!")
})

//routers
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
