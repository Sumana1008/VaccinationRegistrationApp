const mongoose = require('mongoose');

// MongoDB connection URL (replace with your MongoDB Atlas URL)
const mongoURI = 'mongodb://<username>:<password>@<cluster-url>/<database-name>';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const dbConnection = mongoose.connection;

dbConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
dbConnection.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = dbConnection;
