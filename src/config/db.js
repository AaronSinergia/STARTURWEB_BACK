const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('La base de datos se ha conectado exitosamente');
  } catch (error) {
    console.log('La base de datos no ha funcionado');
  }
};

module.exports = { connectDB };
