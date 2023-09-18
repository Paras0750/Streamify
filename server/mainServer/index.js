require('dotenv').config();
require('./modules/db')();
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use('/api', require('./routes/api'));


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
 