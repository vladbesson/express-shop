/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const products = require('./routes/products');
const categories = require('./routes/categories');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/expressShop', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const logger = (req, res, next) => {
  console.log('Запрашиваемый путь — ', req.path);
  next();
};

app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('<html><body><h1>Express-Shop к вашим услугам 👌</h1></body></html>');
});

app.use('/products', products);
app.use('/categories', categories);

app.use((req, res) => {
  res.status('404');
  res.send({ message: 'Страница не найдена' });
});

app.use(function(err, req, res, next) {
  if (err instanceof mongoose.Error.CastError) {
    res.status(400).send({ message: ' Не валидные данные' })
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен, порт: ${PORT}.`);
});
