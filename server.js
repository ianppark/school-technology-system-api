const express = require('express');
const config = require('config');
const colors = require('colors');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');

const connectDB = require('./config/db');

// Check for dev mode
const isDev = config.get('env') === 'development';

// Initialize Express App
const app = express();

// Connect DB
connectDB();

// Load Route Files
const students = require('./routes/students');
const devices = require('./routes/devices');
const auth = require('./routes/auth');

// Init Middleware
app.use(express.json({ extended: false }));

if (isDev) {
  app.use(morgan('dev'));
}

// Mount Routers
app.use('/api/v1/students', students);
app.use('/api/v1/devices', devices);
app.use('/api/v1/auth', auth);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server started on port ${PORT} in ${config.get('env')} mode`.cyan.bold
  );
});

// Unhandled Promise Rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.bgRed.white.bold);
  // Close server
  server.close(() => process.exit(1));
});
