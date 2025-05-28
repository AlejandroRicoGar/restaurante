import db from '../database/database.js';

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const [result] = await db.query(
      'INSERT INTO categories (name) VALUES (?)',
      [name]
    );

    const [rows] = await db.query(
      'SELECT * FROM categories WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      ok: true,
      message: 'Category created successfully',
      data: rows[0]
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categories');

    if (!Array.isArray(rows)) {
      return res.status(500).json({ ok: false, error: 'Unexpected result from database' });
    }

    res.status(200).json({ ok: true, data: rows });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      'SELECT * FROM categories WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ ok: false, error: 'Category not found' });
    }

    res.status(200).json({ ok: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const [result] = await db.query(
      'UPDATE categories SET name = ? WHERE id = ?',
      [name, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ ok: false, error: 'Category not found' });
    }

    const [updatedRows] = await db.query(
      'SELECT * FROM categories WHERE id = ?',
      [id]
    );

    res.status(200).json({
      ok: true,
      message: 'Category updated successfully',
      data: updatedRows[0]
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(
      'DELETE FROM categories WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ ok: false, error: 'Category not found' });
    }

    res.status(200).json({ ok: true, message: 'Category deleted successfully', id });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};