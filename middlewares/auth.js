const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let payload;
  if (!req.cookies.jwt) {
    return next(new Error('No matches'));
  }
  try {
    payload = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET || 'ssss-ssss-k');
  } catch (err) {
    next(new Error('No matches'));
  }
  req.user = payload;
  next();
};
