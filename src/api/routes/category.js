const { isAdmin, isUser } = require('../../middlewares/auth');
const { uploadCategories } = require('../../middlewares/file');

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
categoryRoutes.put(
  '/:id',
  uploadCategories.single('img'),
  [isUser],
  updateCategory
);
categoryRoutes.delete('/', [isAdmin], deleteCategory);

module.exports = categoryRoutes;
