const express = require('express');
const patientRoutes = require('./routes/patientRoutes');

const app = express();

// Global Middleware
app.use(express.json());

// Base Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Mount Resource Routes
app.use('/patients', patientRoutes);

module.exports = app;