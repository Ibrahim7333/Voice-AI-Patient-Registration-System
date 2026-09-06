require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/connection');

const PORT = process.env.PORT || 3000;

// Connect to MongoDB Atlas first, then start listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});