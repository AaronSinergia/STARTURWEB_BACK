require('dotenv').config();
const express = require('express');
const { connectDB } = require('./src/config/db');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const bodyParser = require('body-parser');

const userRoutes = require('./src/api/routes/user');
const websiteRoutes = require('./src/api/routes/website');
const categoryRoutes = require('./src/api/routes/category');

const app = express();
connectDB();

app.use(
  cors({
    origin: 'https://starturweb-back.onrender.com/api',
  })
);

app.use(bodyParser.json());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(cors());

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/websites', websiteRoutes);
app.use('/api/categories', categoryRoutes);

app.use('*', (req, res, next) => {
  return res.status(404).json('Route Not Found');
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
