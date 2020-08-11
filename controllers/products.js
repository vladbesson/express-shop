const Product = require('../models/product');

module.exports.getProducts = (req, res) => {
  Product.find({})
    .populate('category')
    .then((products) => {
      if (!products.length) {
        res.status(404).send({ message: 'Нет товаров' });
        return;
      }
      res.send({ data: products });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createProduct = (req, res) => {
  const { name, cost, category, photo } = req.body;

  Product.create({ name, cost, category, photo })
    .then((product) => res.send({ data: product }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getProduct = (req, res) => {
  Product.findById(req.params.id)
    .populate('category')
    .then((product) => res.send({ data: product }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.updateProduct = (req, res) => {
  const { name } = req.body;

  Product.findByIdAndUpdate(req.params.id, { name })
    .then((product) => res.send({ data: product }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteProduct = (req, res, next) => {
  Product.findById(req.params.id)
    .orFail(() => {
      res.status(404).send({ message: 'Нет такого продукта' });
    })
    .then((product) => {
      product.remove();
      return res.send({ data: product });
    })
    .catch(next);
};
