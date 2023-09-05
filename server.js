const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

// Import the MongoDB connection module (assuming it's in the same directory as server.js)
const db = require('./db'); // Import your MongoDB connection file (e.g., db.js)

// Define the MongoDB connection URL
const mongoURI = 'mongodb://<db-connection-url>';

// Establish a connection to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Get the default Mongoose connection
const dbConnection = mongoose.connection;

// Event listeners for MongoDB connection
dbConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
dbConnection.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const slotRoutes = require('./routes/slotRoutes');

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/slots', slotRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
