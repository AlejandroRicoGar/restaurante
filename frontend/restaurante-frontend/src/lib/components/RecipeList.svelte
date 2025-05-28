<script>
    import { getRecipesGroupedByCategory } from '$lib/api.js';
    import { onMount } from 'svelte';
    import RecipeCard from './RecipeCard.svelte';
  
    let groupedRecipes = {};
    let error = null;
  
    async function load() {
      try {
        groupedRecipes = await getRecipesGroupedByCategory();
        error = null;
      } catch (err) {
        error = 'Error cargando recetas';
      }
    }
  
    onMount(load);
  </script>
  
  {#if error}
    <div class="text-red-500 text-center p-4">{error}</div>
  {:else}
  <div class="p-grid p-m-4 gap-4">
    {#each Object.entries(groupedRecipes) as [category, recipes]}
      <div class="p-col-12">
        <h2 class="text-2xl font-bold mb-4">{category}</h2>
        <div class="p-grid gap-4">
          {#each recipes as recipe}
            <div class="p-col-12 p-md-6 p-lg-4">
              <RecipeCard {recipe} />
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
  {/if}
  