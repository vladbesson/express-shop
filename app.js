/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const products = require('./routes/products');

const { PORT = 3000 } = process.env;

const app = express();

const logger = (req, res, next) => {
  console.log('Запрашиваемый путь — ', req.path);
  next();
};

app.use(logger);
app.use(bodyParser());

app.get('/', (req, res) => {
  res.send('<html><body><h1>Express-Shop к вашим услугам 👌</h1></body></html>');
});

app.use('/products', products);

app.use((req, res) => {
  res.status('404');
  res.send({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен, порт: ${PORT}.`);
});
