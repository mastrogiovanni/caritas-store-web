<script>
	import RequestType from "./components/RequestType.svelte";
import { newRequest } from "./libs/apis.request";

	let from;
	let to;
	let type;
	let notes;

	async function save() {
		await newRequest({ from, to, type, notes });
	}
</script>

<h1>Admin</h1>

Pagina di amministrazione: in questa

<p/>

<h2>Crea un Richiesta D'Ordine</h2>

<form>
	<div class="mb-3">
		<label for="from" class="form-label">Da</label>
		<input bind:value={from} type="date" class="form-control" id="from" aria-describedby="fromHelp" />
		<div id="fromHelp" class="form-text">Data di partenza</div>
	</div>
	<div class="mb-3">
		<label for="to" class="form-label">A</label>
		<input bind:value={to} type="date" class="form-control" id="to" aria-describedby="toHelp" />
		<div id="toHelp" class="form-text">Data di chiusura ordine</div>
	</div>
	<div class="mb-3">
		<label for="price" class="form-label">Note</label>
		<input
			bind:value={notes}
			type="text"
			class="form-control"
			id="notes"
			aria-describedby="notesHelp"
		/>
		<div id="notesHelp" class="form-text">Note</div>
	</div>
	<div class="mb-3">
		<RequestType id="type" bind:value={type} />
	</div>
	<button on:click|preventDefault={save} type="button" class="btn btn-primary">Save</button>
</form>

