<script>
	import { onMount } from 'svelte';
	import { deleteProduct, loadProducts, newProduct } from './libs/apis.products';
	import { slide, fade } from 'svelte/transition';
	import Retailers from './components/Retailers.svelte';
import Retailer from './components/Retailer.svelte';

	let products = [];
	let adding = false;
	let name = undefined;
	let description = undefined;
	let category = undefined;
	let retailer = undefined;
	let price = undefined;
	let unity = undefined;
	let orderType = undefined;

	async function _loadProducts() {
		products = await loadProducts();
	}

	async function _deleteProduct(id) {
		await deleteProduct(id);
		await _loadProducts();
	}

	async function _newProduct() {
		adding = false;
		await newProduct({ 
			name, 
			description,
			category,
			retailer,
			price,
			unity,
			orderType
		});
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
		<div class="row">
			<div class="col">
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
		
				<div class="mb-3">
					<label for="category" class="form-label">Category</label>
					<input
						bind:value={category}
						type="text"
						class="form-control"
						id="category"
						aria-describedby="categoryHelp"
					/>
					<div id="categoryHelp" class="form-text">Categoria Merceologica</div>
				</div>
			</div>
			<div class="col">
				<div class="mb-3">
					<Retailers id="retailer" bind:value={retailer}></Retailers>
				</div>
		
				<div class="mb-3">
					<label for="price" class="form-label">Prezzo</label>
					<input
						bind:value={price}
						type="text"
						class="form-control"
						id="price"
						aria-describedby="priceHelp"
					/>
					<div id="priceHelp" class="form-text">Prezzo</div>
				</div>
		
				<div class="mb-3">
					<label for="price" class="form-label">Unità</label>
					<input
						bind:value={unity}
						type="text"
						class="form-control"
						id="unity"
						aria-describedby="unityHelp"
					/>
					<div id="unityHelp" class="form-text">Unità di misura</div>
				</div>
		
				<div class="mb-3">
					<label for="orderTytpe" class="form-label">Tipo di Ordine</label>
					<select bind:value={orderType} id="orderTytpe" aria-describedby="orderTytpeHelp" class="form-select" aria-label="Tipo Ordine">
						<option selected>-</option>
						<option value="weekly">Settimanale</option>
						<option value="monthly">Mensile</option>
						<option value="all">Entrambi</option>
					</select>
				</div>				
			</div>
		</div>

		<button on:click|preventDefault={_newProduct} class="btn btn-primary">Aggiungi</button>
		<button on:click|preventDefault={() => { adding = false; name = undefined; description = undefined }} type="submit" class="btn btn-secondary">Cancella</button>
	</form>
{/if}

<table class="table table-striped table-bordered">
	<thead>
		<tr>
			<th scope="col">#</th>
			<th>Nome</th>
			<th>Descrizione</th>
			<th>Categoria</th>
			<th>Fornitore</th>
			<th>Prezzo Unitario</th>
			<th>Unità</th>
			<th>Tipo Ordine</th>
            <th></th>
		</tr>
	</thead>
	<tbody>
		{#each products as product (product._id)}
			<tr transition:fade>
				<th scope="row">{product._id}</th>
				<td>{product.name}</td>
				<td>{product.description}</td>
				<td>{product.category || ''}</td>
				<td><Retailer id={product.retailer} /></td>
				<td>{product.price || ''}</td>
				<td>{product.unity || ''}</td>
				<td>{product.orderType || ''}</td>
                <td><button on:click|preventDefault={() => { _deleteProduct(product._id) }} class="btn btn-small btn-danger">Delete</button></td>
			</tr>
		{/each}
	</tbody>
</table>
