const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const createStorage = (folder) => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folder,
      allow: ['jpg', 'jpeg', 'gif', 'png', 'webp'],
    },
  });
};

const uploadCategories = multer({
  storage: createStorage('startUrWeb/categories'),
});
const uploadWebsites = multer({
  storage: createStorage('startUrWeb/webSites'),
});

module.exports = { uploadCategories, uploadWebsites };
