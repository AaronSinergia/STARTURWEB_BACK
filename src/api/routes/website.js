const { isUser } = require('../../middlewares/auth');
const upload = require('../../middlewares/file');

const {
  deleteWebsite,
  getWebSiteByUSERID,
  addUserToWebSite,
  modifyEvent,
  postNewWebSite,
  getWebSites,
} = require('../controllers/website');

const websiteRoutes = require('express').Router();

websiteRoutes.get('/', getWebSites);
websiteRoutes.get('/:id', getWebSiteByUSERID);
websiteRoutes.post('/', postNewWebSite);
websiteRoutes.put('/newAssistant/:id', addUserToWebSite);
websiteRoutes.put('/:id', upload.single('img'), [isUser], modifyEvent);
websiteRoutes.delete('/:id', deleteWebsite);

module.exports = websiteRoutes;
