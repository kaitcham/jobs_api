const notFoundError = (req, res, next) => {
  const error = new Error(`${req.originalUrl} - Not Found`);
  res.status(404);
  next(error);
};

module.exports = notFoundError;
