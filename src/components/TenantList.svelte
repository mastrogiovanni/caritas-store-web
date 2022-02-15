<script>
	import { loadTenant, loadTenants } from '../routes/libs/apis.tenant';
	import { onMount } from 'svelte';

	export let onTenant = (idTenant) => {};

	let tenants = [];
	let selected = -1;

	onMount(async () => {
		tenants = await loadTenants();
		if (tenants?.length > 0) {
			select(0);
		}
	});

	function select(index) {
		selected = index;
		onTenant(tenants[selected]._id);
	}
</script>

<div class="list-group">
	{#each tenants as tenant, i (tenant._id)}
		<a
			on:click|preventDefault={() => select(i)}
			href="#!"
			class="list-group-item list-group-item-action {i === selected ? 'active' : ''}"
			aria-current={i === selected}
		>
			{tenant.name}
		</a>
	{/each}
</div>
