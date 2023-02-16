require('dotenv').config();
require('express-async-errors');
const express = require('express');
const connectDB = require('./db/connect');

const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

const notFoundError = require('./middlewares/notFound');
const customErrorHandler = require('./middlewares/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

app.use(notFoundError);
app.use(customErrorHandler);

const checkConnectionAndStartServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`The server is running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

checkConnectionAndStartServer();
