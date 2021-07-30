const router = require('express').Router();
const { Joi, celebrate  } = require('celebrate');
const { login, createUser, logout } = require('../controllers/users');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
// const auth = require('../middlewares/auth');

router.post('/signin', celebrate({
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
}), login);
router.post('/signup', celebrate({
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
}), createUser);

// router.use(auth);

// router.use('/users', usersRouter);
// router.use('/movies', moviesRouter);
// router.use('/*', (req, res, next) => {
//     const err = new Error('Not Found');
//     next(err);
// });
// router.get('/signout', logout);

module.exports = router;