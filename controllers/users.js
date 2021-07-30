const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => new Error('User not found'))
    .then((user) => res.send(user))
    .catch((err) => next(err));
};
module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { runValidators: true, new: true })
    .orFail(() => new Error('User not found'))
    .then((user) => res.send(user))
    .catch((err) => next(err));
};
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then(() => res.send({ data: 'ok' }))
    .catch((err) => next(err));
};
module.exports.login = (req, res, next) => {
  const {
    email, password,
  } = req.body;

  User.findOne({ email }).select('+password')
    .orFail(() => new Error('No matches'))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('No matches'));
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'ssss-ssss-k', { expiresIn: '7d' });
        res.cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        }).send({ message: 'ok' });
      }))
    .catch((err) => next(err));
};

module.exports.logout = (req, res) => {
  res.cookie('jwt', 'none', {
    maxAge: 1,
    httpOnly: true,
  }).send({ message: 'ok' });
};
