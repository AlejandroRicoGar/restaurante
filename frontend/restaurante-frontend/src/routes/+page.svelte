<script>
  import RecipeList from '$lib/components/RecipeList.svelte';
  import RecipeForm from '$lib/components/RecipeForm.svelte';
  
  let showForm = false;

  function handleSuccess() {
    showForm = false;
  }
</script>

<main>
  <div class="container">
    <h1>🍴 Restaurante</h1>
    <RecipeList />
    
    <button on:click={() => showForm = true}>➕ Nueva Receta</button>

    {#if showForm}
      <div class="modal-overlay">
        <div class="modal">
          <button on:click={() => showForm = false}>×</button>
          <RecipeForm onSuccess={handleSuccess} />
        </div>
      </div>
    {/if}
  </div>
</main>

<style>
  .container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 1rem;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
  }
  
  .modal {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    position: relative;
    width: 90%;
    max-width: 600px;
  }
</style>
