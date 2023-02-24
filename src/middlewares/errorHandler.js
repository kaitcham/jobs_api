const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong',
  };

  // Cast error
  if (err.name === 'CastError') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: `Resource with id: ${err.value} not found`,
    });
  }

  // Validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    return res.status(StatusCodes.BAD_REQUEST).json({ message });
  }

  // Duplicate key error
  if (err.code && err.code === 11000) {
    return res.status(StatusCodes.CONFLICT).json({
      message: `${Object.keys(err.keyValue)}: ${Object.values(
        err.keyValue
      )} already exists`,
    });
  }

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res
    .status(customError.statusCode)
    .json({ message: customError.message });
};

module.exports = errorHandlerMiddleware;
