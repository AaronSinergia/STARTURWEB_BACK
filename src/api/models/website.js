const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema(
  {
    img: { type: String, required: false },
    projectName: { type: String, required: false },
    header: { type: String, required: false },
    body: { type: String, required: false },
    footer: { type: String, required: false },
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
