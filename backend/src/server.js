import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import chatRoute from './routes/chatRoute.js';

import { connectDB } from './lib/db.js';


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173/',
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true }));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/chat', chatRoute);





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