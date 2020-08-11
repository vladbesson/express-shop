const router = require('express').Router();
const {
  getProducts, getProduct, createProduct, updateProduct, deleteProduct,
} = require('../controllers/products');

router.get('/', getProducts);
router.post('/', createProduct);
router.get('/:id', getProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
