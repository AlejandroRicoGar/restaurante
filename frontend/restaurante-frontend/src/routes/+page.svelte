<script>
    import RecipeList from '$lib/components/RecipeList.svelte';
    import RecipeForm from '$lib/components/RecipeForm.svelte';
    
    let showForm = false;
    let selectedRecipeId = null;
  
    function handleSuccess() {
      showForm = false;
      selectedRecipeId = null;
    }
  </script>
  
  <main class="relative">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-center mb-8 flex items-center justify-center gap-3">
        <span role="img" aria-label="Restaurante">🍴</span> Restaurante
      </h1>
  
      <RecipeList />
  
      <div class="flex justify-center mt-8">
        <button 
          on:click={() => showForm = true}
          class="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all text-lg tracking-wide ring-2 ring-blue-100 hover:ring-blue-300"
        >
          <span class="mr-2">➕</span> Nueva Receta
        </button>
      </div>
  
      {#if showForm}
        <!-- Añadido z-index y posición fixed al nivel raíz -->
        <div class="fixed inset-0 bg-black/50 z-[999] grid place-items-center p-4">
          <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl relative">
            <button 
              class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              on:click={() => showForm = false}
            >×</button>
            <RecipeForm onSuccess={handleSuccess} recipeToEdit={selectedRecipeId} />
          </div>
        </div>
      {/if}
    </div>
  </main>
  
  <style>
    .container {
      max-width: 1100px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }
  </style>
  