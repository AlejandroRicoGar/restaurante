import express from 'express';
import {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
} from '../controllers/recipesController.js';

const router = express.Router();

router.post('/', createRecipe);       // Crear nueva receta
router.get('/', getRecipes);          // Listar todas las recetas
router.get('/:id', getRecipeById);    // Obtener receta por ID
router.put('/:id', updateRecipe);     // Actualizar receta existente
router.delete('/:id', deleteRecipe);  // Eliminar receta por ID

export default router;