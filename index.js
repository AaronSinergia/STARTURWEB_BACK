require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const bodyParser = require('body-parser');
const userRoutes = require('./src/api/routes/user');
const websiteRoutes = require('./src/api/routes/website');
const categoryRoutes = require('./src/api/routes/category');
const { connectDB } = require('./src/config/db');

const app = express();

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
