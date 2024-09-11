const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    description: { type: String, required: false },
    websites: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'WebSite' },
        projectName: String,
      },
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
