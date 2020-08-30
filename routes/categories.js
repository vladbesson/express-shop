const router = require('express').Router();
const {
  getCategories,
  getCategory,
  createCategory,
  deleteCategory,
} = require('../controllers/categories');

router.get('/', getCategories);
router.post('/', createCategory);
router.get('/:id', getCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
