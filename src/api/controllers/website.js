// const { deleteFile } = require('../../utils/deleteFile');
// const WebSite = require('../models/website');

// const getWebSites = async (req, res, next) => {
//   try {
//     const websites = await WebSite.find().populate('user');
//     return res.status(200).json(websites);
//   } catch (error) {
//     return res.status(400).json(error);
//   }
// };

// const postNewWebSite = async (req, res, next) => {
//   try {
//     const newWebSite = new WebSite(req.body);

//     const websiteDuplicated = await WebSite.findOne({
//       title: req.body.title,
//     });

//     if (websiteDuplicated) {
//       return res.status(400).json('Ese nombre ya existe');
//     }

//     const webSiteSaved = await newWebSite.save();

//     return res.status(201).json(webSiteSaved);
//   } catch (error) {
//     return res.status(400).json(error);
//   }
// };

// const modifyEvent = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const newWebSite = new WebSite(req.body);
//     newWebSite._id = id;

//     if (req.file) {
//       newWebSite.favicon = req.file.path; // si no funciona favicon poner de nuevo "img"
//     }

//     const websiteUpdated = await WebSite.findByIdAndUpdate(id, newWebSite, {
//       new: true,
//     });
//     return res.status(200).json(websiteUpdated);
//   } catch (error) {
//     return res.status(400).json('Ha fallado la petición');
//   }
// };

// const addUserToWebSite = async (req, res, next) => {
//   try {
//     const { id } = req.params; // id del evento
//     const userID = req.body.assistants;

//     const website = await WebSite.findOne({
//       _id: id,
//       users: userID,
//     });

//     if (website) {
//       alert('El usuario ya está como asistente al evento');
//     } else {
//       const websiteUpdated = await WebSite.findByIdAndUpdate(
//         id,
//         {
//           $push: { users: userID },
//         },
//         { new: true }
//       );
//       return res.status(200).json(websiteUpdated);
//     }
//   } catch (error) {
//     return res.status(400).json('Ha fallado la petición');
//   }
// };

// const deleteWebsite = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const websiteDeleted = await WebSite.findByIdAndDelete(id);

//     deleteFile(websiteDeleted.favicon); // si no funciona favicon poner de nuevo "img"

//     return res.status(200).json({
//       message: 'Event Already Deleted',
//       websiteDeleted,
//     });
//   } catch (error) {
//     return res.status(400).json(error);
//   }
// };

// const getWebSiteByUSERID = async (req, res, next) => {
//   const { id, userID } = req.params;

//   try {
//     const website = await WebSite.findOne({
//       _id: id,
//       users: userID,
//     });

//     if (website) {
//       return res.status(200).json({ isUserWebSite: true });
//     } else {
//       // El usuario no está en la lista de websites creadas
//       return res.status(200).json({ isUserWebSite: false });
//     }
//   } catch (error) {
//     return res.status(400).json(error);
//   }
// };

// module.exports = {
//   deleteWebsite,
//   getWebSiteByUSERID,
//   addUserToWebSite,
//   modifyEvent,
//   postNewWebSite,
//   getWebSites,
// }; // REVISAR ESTE CODIGO SI EL QUE TENGO NO FUNCIONA

const { deleteFile } = require('../../utils/deleteFile');
const WebSite = require('../models/website');

const getWebSites = async (req, res, next) => {
  try {
    const websites = await WebSite.find().populate('createdBy');
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

const modifyEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    let updateData = req.body;

    if (req.file) {
      updateData.favicon = req.file.path;
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
    const { userID } = req.body;

    const website = await WebSite.findOne({
      _id: id,
      createdBy: userID,
    });

    if (website) {
      return res.status(400).json('El usuario ya está asociado a este website');
    } else {
      const websiteUpdated = await WebSite.findByIdAndUpdate(
        id,
        {
          $push: { createdBy: userID },
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

    deleteFile(websiteDeleted.favicon);

    return res.status(200).json({
      message: 'Website eliminado correctamente',
      websiteDeleted,
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const getWebSiteByUSERID = async (req, res, next) => {
  try {
    const { id, userID } = req.params;

    const website = await WebSite.findOne({
      _id: id,
      createdBy: userID,
    });

    return res.status(200).json({ isUserWebSite: !!website });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  deleteWebsite,
  getWebSiteByUSERID,
  addUserToWebSite,
  modifyEvent,
  postNewWebSite,
  getWebSites,
};
