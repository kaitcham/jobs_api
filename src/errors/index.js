const NotFoundError = require('./notFound');
const CustomAPIError = require('./customAPIError');
const BadRequestError = require('./badRequest');
const UnauthenticatedError = require('./unauthenticated');

module.exports = {
  NotFoundError,
  CustomAPIError,
  BadRequestError,
  UnauthenticatedError,
};
