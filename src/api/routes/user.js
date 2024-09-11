const { isAdmin } = require('../../middlewares/auth');

const {
  registerUser,
  loginUser,
  deleteUser,
  getUser,
  updateUser,
} = require('../controllers/user');

const userRoutes = require('express').Router();

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.get('/', getUser);
userRoutes.put('/:id', updateUser);
userRoutes.delete('/:id', [isAdmin], deleteUser);

module.exports = userRoutes;
