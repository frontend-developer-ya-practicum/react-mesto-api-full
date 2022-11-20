const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized');

module.exports = (req, res, next) => {
  let token = req.cookies.jwt;

  if (!token) {
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer ')) {
      token = authorization.replace('Bearer ', '');
    }
  }

  if (!token) {
    throw new UnauthorizedError('Authorization required');
  }

  try {
    const secret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
    req.user = jwt.verify(token, secret);
  } catch (err) {
    next(new UnauthorizedError('Authorization required'));
  }

  next();
};
