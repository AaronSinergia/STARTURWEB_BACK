const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../controllers/category');

const categoryRoutes = require('express').Router();

categoryRoutes.post('/', createCategory);
categoryRoutes.get('/', getCategories);
categoryRoutes.get('/:id', getCategoryById);
categoryRoutes.put('/login', updateCategory);
categoryRoutes.delete('/login', deleteCategory);

module.exports = categoryRoutes;
