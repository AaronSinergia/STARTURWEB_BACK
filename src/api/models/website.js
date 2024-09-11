const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema(
  {
    img: { type: String, required: false },
    projectName: { type: String, required: false },
    html: { type: String, required: false },
    css: { type: String, required: false },
    javascript: { type: String, required: false },
    createdBy: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'userStartUrWeb' },
    ],
  },
  { timestamps: true, collection: 'webSiteStartUrWeb' }
);

const WebSite = mongoose.model(
  'webSiteStartUrWeb',
  websiteSchema,
  'webSiteStartUrWeb'
);

module.exports = WebSite;
