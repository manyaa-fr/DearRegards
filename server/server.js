require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

// Connect to the database first; fail fast if the connection fails
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Basic health check route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'DearRegards API is running.' });
});

// Define and mount routes here as they are created
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));