const { isAdmin, isUser } = require('../../middlewares/auth');

const {
  registerUser,
  loginUser,
  deleteUser,
  getUser,
  getUserByID,
} = require('../controllers/user');

const userRoutes = require('express').Router();

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.get('/', getUser);
userRoutes.get('/:id', getUserByID);
userRoutes.delete('/:id', [isAdmin], [isUser], deleteUser);

module.exports = userRoutes;
