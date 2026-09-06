const express = require('express');
const morgan = require('morgan');
const patientRoutes = require('./routes/patientRoutes');

const app = express();

// Global Middleware
app.use(express.json());

app.use(morgan('dev'));

// Base Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Server is awake and operational', 
    timestamp: new Date().toISOString() 
  });
});

// Mount Resource Routes
app.use('/api/patients', patientRoutes);

module.exports = app;