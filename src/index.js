require('dotenv').config();
require('express-async-errors');
const express = require('express');
const connectDB = require('./db/connect');
const notFoundError = require('./middlewares/notFound');
const customErrorHandler = require('./middlewares/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

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
