const API = 'http://localhost:3000/api';

/* -------------------------- RECIPES -------------------------- */
export const getRecipes = async () => {
  const res = await fetch(`${API}/recipes`);
  if (!res.ok) throw new Error('Error al cargar recetas');
  const data = await res.json();
  return data.recipes || [];
};

export const createRecipe = async (recipeData) => {
  const res = await fetch(`${API}/recipes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipeData)
  });
  if (!res.ok) throw new Error('Error creando receta');
  return await res.json();
};

export const updateRecipe = async (id, recipeData) => {
  const res = await fetch(`${API}/recipes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipeData)
  });
  if (!res.ok) throw new Error('Error actualizando receta');
  return await res.json();
};

export const getRecipeById = async (id) => {
  const res = await fetch(`${API}/recipes/${id}`);
  if (!res.ok) throw new Error('Error cargando receta');
  const data = await res.json();
  return data.recipe || data; // Ajusta según la respuesta real
};

/* -------------------------- CATEGORIES -------------------------- */
export const getCategories = async () => {
  const res = await fetch(`${API}/categories`);
  if (!res.ok) throw new Error('Error al cargar categorías');
  const data = await res.json();
  return data.data || [];
};

/* -------------------------- AGRUPACIÓN -------------------------- */
export const getRecipesGroupedByCategory = async () => {
  const [recipes, categories] = await Promise.all([
    getRecipes(),
    getCategories()
  ]);
  
  const catDict = Object.fromEntries(
    categories.map(cat => [cat.id, cat.name])
  );

  return recipes.reduce((acc, recipe) => {
    const categoryName = catDict[recipe.category_id] || 'Sin categoría';
    acc[categoryName] = acc[categoryName] || [];
    acc[categoryName].push(recipe);
    return acc;
  }, {});
};
