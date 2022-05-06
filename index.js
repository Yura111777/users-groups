const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const groupRoute = require('./routes/groupRoute');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10kb' }));

app.use('/api/users', userRoute);
app.use('/api/groups', groupRoute);

app.use(globalErrorHandler);
module.exports = app;