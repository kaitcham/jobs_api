const mangoose = require('mongoose');
mangoose.set('strictQuery', true);

const connectDB = (url) => {
  try {
    mangoose.connect(url);
    console.log('Connected to DB successfully! && ');
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
