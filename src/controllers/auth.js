const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const formattedUser = user.formatUserResponse();
  res.status(StatusCodes.CREATED).json({ user: formattedUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    // return res
    //   .status(StatusCodes.BAD_REQUEST)
    //   .json({ message: 'Email and password are required' });
    throw new BadRequestError('Email and password are required');
  }

  const checkUser = await User.findOne({ email });
  if (!checkUser) {
    throw new UnauthenticatedError('Invalid email');
  }

  const isMatch = await checkUser.checkPassword(password);
  if (!isMatch) {
    throw new UnauthenticatedError('Invalid password');
  }

  const formattedUser = checkUser.formatUserResponse();
  res.status(StatusCodes.OK).json({ user: formattedUser });
};

module.exports = {
  login,
  register,
};
