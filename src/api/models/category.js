const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    description: { type: String, required: false },
    websites: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'webSiteStartUrWeb' },
    ],
  },
  { timestamps: true, collection: 'categoryStartUrWeb' }
);

const Category = mongoose.model(
  'categoryStartUrweb',
  categorySchema,
  'categoryStartUrweb'
);

module.exports = Category;
