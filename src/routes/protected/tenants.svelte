<!--
	Questa pagina è visibile solo all'amministratore
	Si può vedere la lista dei tenant
	Per ognuno andare alla pagina in cui vedere gli ordini correnti
	Si può aggiungere un tenant
	Si può eliminare un tenant
-->
<script>
    import { onMount } from "svelte";
	import { loadTenants, newTenant } from "./libs/apis.tenant";
	import { slide, fade } from 'svelte/transition';

    let tenants = []; 
	let adding = false;
	let name = undefined;

	async function _loadTenants() {
		tenants = await loadTenants();
	}

	async function _newTenant() {
		adding = false;
		await newTenant(name);
		await _loadTenants();
	}

    onMount(async () => {
		_loadTenants();
    })
</script>

<h1>Tenants</h1>

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
			<label for="name" class="form-label">Nome</label>
			<input
				bind:value={name}
				type="text"
				class="form-control"
				id="name"
				aria-describedby="nameHelp"
			/>
			<div id="nameHelp" class="form-text">Nome Tenant</div>
		</div>
		<button on:click|preventDefault={_newTenant} class="btn btn-primary">Aggiungi</button>
		<button on:click|preventDefault={() => { adding = false; name = undefined; }} type="submit" class="btn btn-secondary">Cancella</button>
	</form>
{/if}

<table class="table">
	<thead>
		<tr>
			<th scope="col">#</th>
			<th scope="col">Name</th>
            <!--
			<th scope="col">Last</th>
			<th scope="col">Handle</th>
            -->
		</tr>
	</thead>
	<tbody>
        {#each tenants as tenant}
		<tr>
			<th scope="row">{tenant._id}</th>
			<td>{tenant.name}</td>
            <!--
			<td>Otto</td>
			<td>@mdo</td>
            -->
		</tr>
        {/each}
	</tbody>
</table>
