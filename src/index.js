require('dotenv').config();
require('express-async-errors');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const express = require('express');
const connectDB = require('./db/connect');
const rateLimiter = require('express-rate-limit');

const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

const notFoundError = require('./middlewares/notFound');
const customErrorHandler = require('./middlewares/errorHandler');
const authenticateUser = require('./middlewares/authentication');

const app = express();
const port = process.env.PORT || 3000;

app.use(xss());
app.use(cors());
app.use(helmet());
app.use(express.json());
app.set('trust proxy', 1);
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

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
