const { deleteFile } = require('../../utils/deleteFile');
const WebSite = require('../models/website');

const getWebSites = async (req, res, next) => {
  const { id } = req.params;

  try {
    const websites = await WebSite.find(id).populate('createdBy');
    return res.status(200).json(websites);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const postNewWebSite = async (req, res, next) => {
  try {
    const { projectName, createdBy } = req.body;

    const websiteDuplicated = await WebSite.findOne({ projectName });
    if (websiteDuplicated) {
      return res.status(400).json('Ese nombre ya existe');
    }

    const newWebSite = new WebSite({ ...req.body, createdBy });
    const webSiteSaved = await newWebSite.save();

    return res.status(201).json(webSiteSaved);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const modifyWebSite = async (req, res, next) => {
  try {
    const { id } = req.params;

    let updateData = req.body;

    // if (req.file) { /// si falla volver a esto
    if (req.file && req.file.path) {
      updateData.img = req.file.path;
    }

    const websiteUpdated = await WebSite.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!websiteUpdated) {
      return res.status(404).json('Website no encontrado');
    }

    return res.status(200).json(websiteUpdated);
  } catch (error) {
    return res.status(400).json('Ha fallado la petición');
  }
};

const addUserToWebSite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { createdBy } = req.body;

    const website = await WebSite.findOne({
      _id: id,
      createdBy: { $in: [createdBy] },
    });

    if (website) {
      return res.status(400).json('El usuario ya está asociado a este website');
    } else {
      const websiteUpdated = await WebSite.findByIdAndUpdate(
        id,
        {
          $push: { createdBy: createdBy },
        },
        { new: true }
      );
      return res.status(200).json(websiteUpdated);
    }
  } catch (error) {
    return res.status(400).json('Ha fallado la petición');
  }
};

const deleteWebsite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const websiteDeleted = await WebSite.findByIdAndDelete(id);

    if (!websiteDeleted) {
      return res.status(404).json('Website no encontrado');
    }

    deleteFile(websiteDeleted.img);

    return res.status(200).json({
      message: 'Website eliminado correctamente',
      websiteDeleted,
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const getWebSiteBycreatedBy = async (req, res, next) => {
  try {
    const { id, createdBy } = req.params;

    const website = await WebSite.findOne({
      _id: id,
      createdBy: createdBy,
    });

    return res.status(200).json({ isUserWebSite: !!website });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  deleteWebsite,
  getWebSiteBycreatedBy,
  addUserToWebSite,
  modifyWebSite,
  postNewWebSite,
  getWebSites,
};
