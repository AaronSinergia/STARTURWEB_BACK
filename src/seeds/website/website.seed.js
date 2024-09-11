require('dotenv').config({
  path: require('path').resolve(__dirname, '../../../.env'),
});
const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');

const WebSite = require('../../api/models/website');
const csvFilePath = '../CSV/BBDD STARTURWEB - Websites.csv';

const mongoPass = process.env.MONGO_PASS;

mongoose
  .connect(
    `mongodb+srv://aaronromeromusic:${mongoPass}@cluster0.otk092i.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(async () => {
    console.log('Conectado a MongoDB');

    const allWebsites = await WebSite.find();
    if (allWebsites.length) {
      await WebSite.collection.drop();
      console.log('Colección existente eliminada');
    }
  })
  .catch((err) => console.log(`Error conectando a la base de datos: ${err}`))
  .then(async () => {
    const websitesDocuments = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        const createdByIds =
          row.createdBy && row.createdBy.trim() !== '[]'
            ? ObjectId(row.createdBy.trim())
            : undefined;

        websitesDocuments.push(
          new WebSite({
            img: row.img,
            projectName: row.projectName,
            html: row.html,
            css: row.css,
            javascript: row.javascript,
            createdBy: createdByIds,
          })
        );
      })
      .on('end', async () => {
        await WebSite.insertMany(websitesDocuments);
        console.log('Datos insertados en la base de datos');
        mongoose.disconnect();
      });
  })
  .catch((err) => console.log(`Error procesando datos: ${err}`))
  .finally(() => {
    console.log('Proceso completado');
  });
