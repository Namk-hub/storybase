import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import cookieParser from "cookie-parser"

dotenv.config();

const app = express();

// Allowed origins for CORS - added your Vercel frontend URL
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://storybase-sigma.vercel.app',
  'https://storybase-frontend.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
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
