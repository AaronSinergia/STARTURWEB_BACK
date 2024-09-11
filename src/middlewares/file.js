const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storageCategoriesLogos = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'startUrWeb/categories',
    allow: ['jpg', 'jpeg', 'gif', 'png', 'webp'],
  },
});

const uploadCategories = multer({ storage: storageCategoriesLogos });

const storageWebsitesLogos = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'startUrWeb/webSites',
    allow: ['jpg', 'jpeg', 'gif', 'png', 'webp'],
  },
});

const uploadWebsites = multer({ storage: storageWebsitesLogos });

module.exports = { uploadCategories, uploadWebsites };
