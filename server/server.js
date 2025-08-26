require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

// Connect to the database first; fail fast if the connection fails
connectDB();

const app = express();

const allowedOrigins = [
  'http://localhost:5173', // For local development
  'https://dear-regards-ku8pvu7jh-manyas-projects-0623e789.vercel.app/' // frontend's public URL on Render
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Basic health check route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'DearRegards API is running.' });
});

// Define and mount routes here as they are created
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));