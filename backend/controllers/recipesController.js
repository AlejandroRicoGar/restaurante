import db from '../database/database.js';

const createRecipe = async (req, res) => {
  try {
    // Usa category_id en el body para mantener coherencia
    const { name, description, price, image_url, category_id } = req.body;
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    // Validación básica
    if (!name || !price || !category_id) {
      return res.status(400).json({
        ok: false,
        error: "Faltan campos requeridos: name, price o category_id"
      });
    }

    if (image_url && !urlRegex.test(image_url)) {
      return res.status(400).json({
        ok: false,
        message: "El formato del url de la imagen es incorrecto"
      });
    }

    const [result] = await db.query(
      'INSERT INTO recipes (name, description, price, category_id, image_url) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, category_id, image_url || null]
    );

    const [rows] = await db.query(
      'SELECT * FROM recipes WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      ok: true,
      message: "Recipe created successfully",
      data: rows[0]
    });

  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

const getRecipes = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM recipes');
    res.status(200).json({ ok: true, recipes: rows });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      'SELECT * FROM recipes WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ ok: false, error: 'Recipe not found' });
    }

    res.status(200).json({ ok: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    const { id } = req.params;
    const { name, description, price, image_url, category_id } = req.body;

    if (image_url && !urlRegex.test(image_url)) {
      return res.status(400).json({
        ok: false,
        message: "El formato del url de la imagen es incorrecto"
      });
    }

    const [result] = await db.query(
      'UPDATE recipes SET name = ?, description = ?, price = ?, category_id = ?, image_url = ? WHERE id = ?',
      [name, description, price, category_id || null, image_url || null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ ok: false, error: 'Recipe not found' });
    }

    const [updatedRows] = await db.query(
      'SELECT * FROM recipes WHERE id = ?',
      [id]
    );

    res.status(200).json({
      ok: true,
      message: 'Recipe updated successfully',
      data: updatedRows[0]
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(
      'DELETE FROM recipes WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ ok: false, error: 'Recipe not found' });
    }

    res.status(200).json({ ok: true, message: 'Recipe deleted successfully', id });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
};
