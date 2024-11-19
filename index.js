// require('dotenv').config();
// const express = require('express');
// const { connectDB } = require('./src/config/db');
// const cors = require('cors');
// const cloudinary = require('cloudinary').v2;
// const bodyParser = require('body-parser');

// const userRoutes = require('./src/api/routes/user');
// const websiteRoutes = require('./src/api/routes/website');
// const categoryRoutes = require('./src/api/routes/category');

// const app = express();
// connectDB();

// // app.use(cors());
// const corsOptions = {
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// };
// app.options('*', cors(corsOptions));

// app.use(cors(corsOptions));

// app.use(bodyParser.json());

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

// app.use(express.json());

// app.use('/api/users', userRoutes);
// app.use('/api/websites', websiteRoutes);
// app.use('/api/categories', categoryRoutes);

// app.use('*', (req, res, next) => {
//   return res.status(404).json('Route Not Found');
// });

// app.listen(3000, () => {
//   console.log('http://localhost:3000');
// });

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose'); // Importamos mongoose para conectar con MongoDB
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const bodyParser = require('body-parser');

const userRoutes = require('./src/api/routes/user');
const websiteRoutes = require('./src/api/routes/website');
const categoryRoutes = require('./src/api/routes/category');

const app = express();

// Función para conectar a MongoDB
const connectDB = async () => {
  try {
    // Conexión a MongoDB usando la variable de entorno MONGO_URI
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Finaliza el proceso si la conexión falla
  }
};

// Llamamos a la función de conexión
connectDB();

// Configuración de CORS
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
app.options('*', cors(corsOptions));

app.use(cors(corsOptions));

app.use(bodyParser.json());

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/websites', websiteRoutes);
app.use('/api/categories', categoryRoutes);

// Manejo de rutas no encontradas
app.use('*', (req, res, next) => {
  return res.status(404).json('Route Not Found');
});

// Puerto para escuchar las solicitudes
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
