import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import authRoutes from './routes/authRoutes.js';
import { connectDB } from './lib/db.js';


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);



connectDB().then(() => // Start the server
app.listen(port, async() => {
    console.log(`Server is running on http://localhost:${port}`);
}));

// Graceful shutdown
const shutdown = () => {
  console.log('Shutting down...');
  server.close(() => process.exit(0));
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);