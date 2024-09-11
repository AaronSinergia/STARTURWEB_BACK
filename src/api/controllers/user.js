const { generateSign } = require('../../config/jwt');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const registerUser = async (req, res, next) => {
  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
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

    console.log(user);

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

// const addAdmin = async (req, res, next) => {
//   const { id } = req.params;

//   console.log(id);

//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       id,
//       { isAdmin: 'Yes' },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json('Usuario no encontrado');
//     }

//     return res.status(200).json(updatedUser);
//   } catch (error) {
//     return res.status(400).json(error);
//   }
// };

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { isAdmin, username, password } = req.body;

  console.log(id);

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json('Usuario no encontrado');
    }

    const updates = {};
    if (isAdmin !== undefined) {
      updates.isAdmin = isAdmin;
    }
    if (username) {
      updates.username = username;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error al actualizar el usuario', error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  deleteUser,
  getUser,
  updateUser,
};
