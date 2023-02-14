require('dotenv').config();
require('express-async-errors');
const express = require('express');
const connectDB = require('./db/connect');

const app = express();
const port = process.env.PORT || 3000;

const checkConnectionAndStartServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`The server is running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

checkConnectionAndStartServer();
