<script>
    export let recipe;
  </script>
  
  <div class="card shadow-lg rounded-lg overflow-hidden">
    <img src={recipe.image_url || 'https://via.placeholder.com/400x180?text=Sin+Imagen'} alt={recipe.name} class="w-full h-48 object-cover" />
    <div class="p-4">
      <h3 class="text-xl font-semibold mb-1">{recipe.name}</h3>
      <p class="text-gray-700 mb-3">{recipe.description}</p>
      <div class="font-bold text-lg text-right">€{parseFloat(recipe.price).toFixed(2)}</div>
    </div>
  </div>
  