const mongoose = require('mongoose');

// Define the MongoDB connection URI. Replace 'your-database-name' with your actual database name.
const mongoURI = 'mongodb://localhost:27017/your-database-name';

// Establish a connection to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default Mongoose connection
const db = mongoose.connection;

// Event listeners for MongoDB connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Export the MongoDB connection object for use in other parts of your application
module.exports = db;
