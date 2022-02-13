<script>
	import { onMount } from 'svelte';
	import { deleteProduct, loadProducts, newProduct } from './libs/apis.products';
	import { slide, fade } from 'svelte/transition';

	let products = [];
	let adding = false;
	let name = undefined;
	let description = undefined;

	async function _loadProducts() {
		products = await loadProducts();
	}

	async function _deleteProduct(id) {
		await deleteProduct(id);
		await _loadProducts();
	}

	async function _newProduct() {
		adding = false;
		await newProduct({ name, description });
		await _loadProducts();
	}

	onMount(async () => {
		await _loadProducts();
	});
</script>

<h1>Products</h1>

<div class="d-flex flex-row-reverse bd-highlight">
	<div class="p-2 bd-highlight">
        {#if !adding}
		<button
			on:click|preventDefault={() => {
				adding = !adding;
			}}
			class="btn btn-primary">Aggiungi</button
		>
        {/if}
	</div>
</div>

{#if adding}
	<form transition:slide>
		<div class="mb-3">
			<label for="name" class="form-label">Name</label>
			<input
				bind:value={name}
				type="text"
				class="form-control"
				id="name"
				aria-describedby="nameHelp"
			/>
			<div id="nameHelp" class="form-text">Nome prodotto</div>
		</div>
		<div class="mb-3">
			<label for="description" class="form-label">Description</label>
			<input
				bind:value={description}
				type="text"
				class="form-control"
				id="description"
				aria-describedby="descriptionHelp"
			/>
			<div id="descriptionHelp" class="form-text">Breve descrizione.</div>
		</div>
		<button on:click|preventDefault={_newProduct} class="btn btn-primary">Aggiungi</button>
		<button on:click|preventDefault={() => { adding = false; name = undefined; description = undefined }} type="submit" class="btn btn-secondary">Cancella</button>
	</form>
{/if}

<table class="table">
	<thead>
		<tr>
			<th scope="col">#</th>
			<th>Name</th>
			<th>Description</th>
            <th></th>
		</tr>
	</thead>
	<tbody>
		{#each products as product (product._id)}
			<tr transition:fade>
				<th scope="row">{product._id}</th>
				<td>{product.name}</td>
				<td>{product.description}</td>
                <td><button on:click|preventDefault={() => { _deleteProduct(product._id) }} class="btn btn-small btn-danger">Delete</button></td>
			</tr>
		{/each}
	</tbody>
</table>
