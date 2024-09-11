const Category = require('../models/category');

const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const newCategory = new Category({ name, description });
    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear la categoría' });
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().populate('websites');
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id).populate('websites');

    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la categoría' });
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { websites } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        $push: {
          websites: { id: websites.id, projectName: websites.projectName },
        },
      },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    } else {
      const categoryUpdated = await Category.findByIdAndUpdate(
        id,
        {
          $push: { websites: websites },
        },
        { new: true }
      );
      return res.status(200).json(categoryUpdated);
    }
  } catch (error) {
    return res.status(400).json('Ha fallado la petición');
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.status(200).json({ message: 'Categoría eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar la categoría' });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
