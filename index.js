const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const errorRouter = require('./routes/error');
const appRouter = require('./routes/app');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');
const limiter = require('./middlewares/rate-limiter');
const { allowAccess } = require('./middlewares/cors');

const app = express();

app.use(helmet());

app.use(cors(allowAccess));

const { PORT = 3000 } = process.env;
const { DATA_BASE, NODE_ENV } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(NODE_ENV === 'production' ? DATA_BASE : 'mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);

app.use(limiter);

app.use('/', appRouter);

app.use(auth);

app.use('/', usersRouter);
app.use('/', moviesRouter);
app.use('/', errorRouter);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {});
