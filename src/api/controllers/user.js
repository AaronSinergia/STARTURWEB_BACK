// const { generateSign } = require('../../config/jwt');
// const bcrypt = require('bcrypt');
// const User = require('../models/user');

// const registerUser = async (req, res, next) => {
//   try {
//     const { username, password, isAdmin } = req.body;

//     const userDuplicate = await User.findOne({ username });
//     if (userDuplicate) {
//       return res.status(400).json('Ese nombre de usuario ya existe');
//     }

//     const newUser = new User({ username, password, isAdmin });
//     const userSaved = await newUser.save();

//     return res.status(201).json(userSaved);
//   } catch (error) {
//     return res.status(400).json(error.message);
//   }
// };

// const loginUser = async (req, res, next) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });

//     if (user && bcrypt.compareSync(password, user.password)) {
//       const token = generateSign(user._id);
//       return res.status(200).json({ user, token });
//     } else {
//       return res.status(400).json('El usuario o la contraseña son incorrectos');
//     }
//   } catch (error) {
//     return res.status(400).json(error.message);
//   }
// };

// const deleteUser = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const userDeleted = await User.findByIdAndDelete(id);

//     if (!userDeleted) {
//       return res.status(404).json('Usuario no encontrado');
//     }

//     return res.status(200).json({
//       message: 'Usuario eliminado correctamente',
//       userDeleted,
//     });
//   } catch (error) {
//     return res.status(400).json(error.message);
//   }
// };

// const getUser = async (req, res, next) => {
//   try {
//     const users = await User.find();
//     return res.status(200).json(users);
//   } catch (error) {
//     return res.status(400).json(error.message);
//   }
// };

// const getUserByID = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);

//     if (!user) {
//       return res.status(404).json('Usuario no encontrado');
//     }

//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(400).json(error.message);
//   }
// };

// module.exports = {
//   registerUser,
//   loginUser,
//   deleteUser,
//   getUser,
//   getUserByID,
// }; /// REVISAR ESTE CODIGO SI EL QUE TENGO NO FUNCIONA

const { generateSign } = require('../../config/jwt');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const registerUser = async (req, res, next) => {
  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      isAdmin: req.body.password,
    });

    const userDuplicate = await User.findOne({
      username: req.body.username,
    });

    if (userDuplicate) {
      return res.status(400).json('Ese nombre de usuario ya existe');
    }

    const userSaved = await newUser.save();

    return res.status(201).json(userSaved);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateSign(user._id);
        return res.status(200).json({ user, token });
      } else {
        return res
          .status(400)
          .json('El usuario o la contraseña són incorrectos');
      }
    } else {
      return res.status(400).json('El usuario o la contraseña són incorrectos');
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDeleted = await User.findByIdAndDelete(id);

    return res.status(200).json({
      message: 'User Already Deleted',
      userDeleted,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getUserByID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const users = await User.findById(id);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  deleteUser,
  getUser,
  getUserByID,
};
