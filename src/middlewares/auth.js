const User = require('../api/models/user');
const { verifyJWT } = require('../config/jwt');

const isUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json('No estás autorizado');
    }

    const parsedToken = token.replace('Bearer ', '');
    const { id } = verifyJWT(parsedToken);
    const user = await User.findById(id);

    user.password = null;
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json('No estás autorizado');
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json('No estás autorizado');
    }

    const parsedToken = token.replace('Bearer ', '');
    const { id } = verifyJWT(parsedToken);
    const user = await User.findById(id);

    // Con esto puedo hacer que sólo X usuario previamente logueado, pueda borrar a otros usuarios por ejemplo
    if (user.isAdmin === 'Yes') {
      user.password = null;
      req.user = user;
      next();
    }
  } catch (error) {
    return res.status(400).json('No estás autorizado');
  }
};

module.exports = { isAdmin, isUser };
