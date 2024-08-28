require('dotenv').config({
  path: require('path').resolve(__dirname, '../../../.env'),
});
const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');

const Category = require('../../api/models/category');
const csvFilePath = '../CSV/BBDD STARTURWEB - Category.csv';

const mongoPass = process.env.MONGO_PASS;

mongoose
  .connect(
    `mongodb+srv://aaronromeromusic:${mongoPass}@cluster0.otk092i.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(async () => {
    console.log('Conectado a MongoDB');

    const allCategories = await Category.find();
    if (allCategories.length) {
      await Category.collection.drop();
      console.log('Colección existente eliminada');
    }
  })
  .catch((err) => console.log(`Error conectando a la base de datos: ${err}`))
  .then(async () => {
    const categoriesDocuments = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        const websiteIds = row.websites
          ? row.websites.split(',').map((id) => ObjectId(id.trim()))
          : [];

        categoriesDocuments.push(
          new Category({
            name: row.name,
            description: row.description,
            websites: websiteIds,
          })
        );
      })
      .on('end', async () => {
        await Category.insertMany(categoriesDocuments);
        console.log('Datos insertados en la base de datos');
        mongoose.disconnect();
      });
  })
  .catch((err) => console.log(`Error procesando datos: ${err}`))
  .finally(() => {
    console.log('Proceso completado');
  });
