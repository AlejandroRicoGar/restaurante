<script>
    import { createRecipe, updateRecipe, getCategories, getRecipeById } from '$lib/api.js'
    import { onMount } from 'svelte'
    
    export let onSuccess = () => {}
    export let recipeToEdit = null
  
    let categories = []
    let error = ''
    let successMessage = ''
    let loading = false
  
    // Datos del formulario
    let formData = {
      name: '',
      description: '',
      price: '',
      category_id: '',
      image_url: ''
    }
  
    // Cargar categorías y datos de edición
    onMount(async () => {
      categories = await getCategories()
      if (recipeToEdit) {
        const recipe = await getRecipeById(recipeToEdit)
        formData = { 
          ...recipe,
          price: recipe.price.toString(),
          category_id: recipe.category_id.toString()
        }
      }
    })
  
    // Validaciones
    const validateForm = () => {
      error = ''
      if (!formData.name.trim()) error = 'El nombre es requerido'
      else if (!/^\d+(\.\d{1,2})?$/.test(formData.price)) error = 'Precio inválido (ej: 12.50)'
      else if (parseFloat(formData.price) <= 0) error = 'El precio debe ser mayor que 0'
      else if (formData.image_url && !/^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i.test(formData.image_url))
        error = 'URL de imagen inválida'
      else if (!formData.category_id) error = 'Selecciona una categoría'
      
      return !error
    }
  
    // Envío del formulario
    const handleSubmit = async () => {
      if (!validateForm()) return
      
      loading = true
      try {
        const data = {
          ...formData,
          price: parseFloat(formData.price),
          category_id: parseInt(formData.category_id)
        }
  
        if (recipeToEdit) {
          await updateRecipe(recipeToEdit, data)
          successMessage = '✅ Receta actualizada correctamente'
        } else {
          await createRecipe(data)
          successMessage = '✅ Receta creada correctamente'
        }
  
        setTimeout(() => {
          onSuccess()
          successMessage = ''
          if (!recipeToEdit) formData = { name: '', description: '', price: '', category_id: '', image_url: '' }
        }, 1500)
        
      } catch (err) {
        error = recipeToEdit 
          ? '❌ Error actualizando la receta' 
          : '❌ Error creando la receta'
      } finally {
        loading = false
      }
    }
  </script>
  
  <form on:submit|preventDefault={handleSubmit} class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
    <h2 class="text-2xl font-bold mb-4">
      {recipeToEdit ? '✏️ Editar Receta' : '🍴 Nueva Receta'}
    </h2>
  
    {#if error}
      <div class="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>
    {/if}
  
    {#if successMessage}
      <div class="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">{successMessage}</div>
    {/if}
  
    <div class="space-y-4">
      <!-- Nombre -->
      <div>
        <label for="name" class="block text-gray-700 mb-1 font-medium">Nombre*</label>
        <input
          id="name"
          bind:value={formData.name}
          class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Nombre de la receta"
          required
        />
      </div>
  
      <!-- Descripción -->
      <div>
        <label for="description" class="block text-gray-700 mb-1 font-medium">Descripción</label>
        <textarea
          id="description"
          bind:value={formData.description}
          class="w-full p-2 border rounded h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Descripción detallada..."
        ></textarea>
      </div>
  
      <!-- Precio -->
      <div>
        <label for="price" class="block text-gray-700 mb-1 font-medium">Precio*</label>
        <input
          id="price"
          type="number"
          step="0.01"
          bind:value={formData.price}
          class="w-full p-2 border rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="Ej: 12.50"
          required
        />
      </div>
  
      <!-- Categoría -->
      <div>
        <label for="category_id" class="block text-gray-700 mb-1 font-medium">Categoría*</label>
        <select
          id="category_id"
          bind:value={formData.category_id}
          class="w-full p-2 border rounded bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="" disabled>Seleccionar categoría</option>
          {#each categories as category}
            <option value={category.id}>{category.name}</option>
          {/each}
        </select>
      </div>
  
      <!-- Imagen -->
      <div>
        <label for="image_url" class="block text-gray-700 mb-1 font-medium">URL de la imagen</label>
        <input
          id="image_url"
          type="url"
          bind:value={formData.image_url}
          class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://ejemplo.com/imagen.jpg"
        />
      </div>
  
      <!-- Botones -->
      <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1.5rem;">
        <button
          type="button"
          on:click={() => onSuccess()}
          style="padding: 0.6rem 1.5rem; background: #888; color: #fff; border: none; border-radius: 4px; font-size: 1rem; cursor: pointer;"
          disabled={loading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          style="padding: 0.6rem 1.5rem; background: #2563eb; color: #fff; border: none; border-radius: 4px; font-size: 1rem; cursor: pointer;"
          disabled={loading}
        >
          {#if loading}
            ⌛ {recipeToEdit ? 'Guardando...' : 'Crear Receta'}
          {:else}
            {recipeToEdit ? 'Guardar Cambios' : 'Crear Receta'}
          {/if}
        </button>
      </div>      
    </div>
  </form>
  