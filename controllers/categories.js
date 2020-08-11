const Category = require('../models/category');

module.exports.getCategories = (req, res) => {
  Category.find({})
    .then((categories) => {
      if (!categories.length) {
        res.status(404).send({ message: 'Нет товаров' });
        return;
      }
      res.send({ data: categories });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCategory = (req, res) => {
  const { name, description } = req.body;

  Category.create({ name, description })
    .then((category) => res.send({ data: category }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getCategory = (req, res) => {
  Category.findById(req.params.id)
    .then((category) => res.send({ data: category }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteCategory = (req, res) => {
  Category.findById(req.params.id)
    .orFail(new Error('Нет такой категории'))
    .then((category) => {
      category.remove();
      return res.send({ data: category });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};
