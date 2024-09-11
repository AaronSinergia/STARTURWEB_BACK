const { isAdmin, isUser } = require('../../middlewares/auth');
const { uploadWebsites } = require('../../middlewares/file');

const {
  deleteWebsite,
  getWebSiteBycreatedBy,
  addUserToWebSite,
  modifyWebSite,
  postNewWebSite,
  getWebSites,
} = require('../controllers/website');

const websiteRoutes = require('express').Router();

websiteRoutes.get('/', [isUser], getWebSites);
websiteRoutes.get('/:id', getWebSiteBycreatedBy);
websiteRoutes.post('/', postNewWebSite);
websiteRoutes.put('/webCreator/:id', addUserToWebSite);
websiteRoutes.put(
  '/:id',
  uploadWebsites.single('img'),
  [isUser],
  modifyWebSite
);
websiteRoutes.delete('/', [isAdmin], [isUser], deleteWebsite);

module.exports = websiteRoutes;
