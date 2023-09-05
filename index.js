const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware and route setup
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const slotRoutes = require('./routes/slotRoutes');

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/slots', slotRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
