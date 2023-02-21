const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Unauthorized');
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    throw new UnauthenticatedError('Invalid token');
  }
};

module.exports = authenticate;
