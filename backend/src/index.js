import express from 'express';
import dotenv from 'dotenv';
import connectDB from './lib/db.js';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import locationRoutes from './routes/locationRoutes.js';

const app = express();
dotenv.config();

const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    error: 'Too many requests, please try again later.',
  },
});

app.use(express.json());
app.use(limiter);

const PORT = process.env.PORT;

app.use(cors({
  credentials: true,
}));

app.get('/', (req, res) => {
  res.send('API is working111111111111111');
});

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' data:;");
  next();
});


app.use('/api/locations', locationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
