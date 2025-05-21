import express from 'express';
import dotenv from 'dotenv';
import connectDB from './lib/db.js';

import locationRoutes from './routes/locationRoutes.js';

const app = express();
dotenv.config();

app.use(express.json());

const PORT = process.env.PORT;

app.use('/api/locations', locationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
