const User = require('../api/models/user');
const { verifyJWT } = require('../config/jwt');

const authenticate = (validateUser) => async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json('No estás autorizado');
    }

    const parsedToken = token.replace('Bearer ', '');
    const { id } = verifyJWT(parsedToken);
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json('No estás autorizado');
    }

    if (validateUser && !validateUser(user)) {
      return res.status(403).json('No tienes permisos suficientes');
    }

    user.password = null;
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json('No estás autorizado');
  }
};

const isUser = authenticate();
const isAdmin = authenticate((user) => user.isAdmin === 'Yes');

module.exports = { isAdmin, isUser };
