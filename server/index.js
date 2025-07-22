import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoute.js';

dotenv.config();

// Set up server
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.use('/user', userRoutes)

// MongoDB setup
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('🌸 MongoDB connected!'))
    .catch(err => console.error(err));

// Run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🎀 Server is running on Port ${PORT}!`));