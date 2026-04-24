import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import cookieParser from "cookie-parser"

dotenv.config();

const app = express();


const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://storybase-sigma.vercel.app',
  'https://storybase-frontend.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

connectDB();

// starting server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send("welcome to storybase backend!")
});

//routers
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
