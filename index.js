import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';  // Import CORS
import cookieParser from 'cookie-parser';
import path from 'path';

// Import routes
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import mentorRoutes from './routes/mentor.route.js';
import commentRoutes from './routes/comment.route.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

// Configure CORS for your frontend origin
app.use(cors({
  origin: 'http://localhost:5173',  // Replace this with your deployed frontend URL if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDB is connected');
  })
  .catch((err) => {
    console.log(err);
  });

// Set static folder if needed for production (uncomment during deployment)
// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/mentor', mentorRoutes);

// Catch-all handler for frontend routing in production (uncomment during deployment)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!!!`);
});
