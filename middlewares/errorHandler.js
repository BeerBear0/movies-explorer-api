const ERROR_400 = { code: 400, message: 'Переданы некорректные данные' };
const ERROR_401 = { code: 401, message: 'Неправильные почта или пароль' };
const ERROR_403 = { code: 403, message: 'Доступ запрещён' };
const ERROR_404 = { code: 404, message: ['Пользователь не найден', 'Фильм не найдена', 'Ресурс не найден'] };
const ERROR_409 = { code: 409, message: 'Уже существует' };
const ERROR_500 = { code: 500, message: 'Внутренняя ошибка сервера' };

module.exports.errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError' || (err._message && err._message.includes('failed'))) {
    return res.status(ERROR_400.code).send({ message: ERROR_400.message });
  }

  if (err.name === 'MongoError' && err.code === 11000) {
    return res.status(ERROR_409.code).send({ message: ERROR_409.message });
  }

  switch (err.message) {
    case 'No matches':
      res.status(ERROR_401.code).send({ message: ERROR_401.message });
      break;
    case 'Forbidden':
      res.status(ERROR_403.code).send({ message: ERROR_403.message });
      break;
    case 'User not found':
      res.status(ERROR_404.code).send({ message: ERROR_404.message[0] });
      break;
    case 'Movies not found':
      res.status(ERROR_404.code).send({ message: ERROR_404.message[1] });
      break;
    case 'Not found':
      res.status(ERROR_404.code).send({ message: ERROR_404.message[2] });
      break;
    default:
      res.status(ERROR_500.code).send({ message: ERROR_500.message });
      break;
  }

  next();
};
