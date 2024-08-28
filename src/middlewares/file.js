const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storageWebSitesLogos = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'webSitesLogos',
    allow: ['jpg', 'jpeg', 'gif', 'png', 'webp'],
  },
});

const upload = multer({ storage: storageWebSitesLogos });

module.exports = upload;
