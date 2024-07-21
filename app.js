const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./src/config/database');
const seatRoutes = require('./src/routes/seatRoutes');
const errorHandler = require('./src/middleware/errorHandler');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(cors()); 

app.use(bodyParser.json());
app.use('/api/seats', seatRoutes); //default route

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
