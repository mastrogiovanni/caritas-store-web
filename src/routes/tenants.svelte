<!--
	Questa pagina è visibile solo all'amministratore
	Si può vedere la lista dei tenant
	Per ognuno andare alla pagina in cui vedere gli ordini correnti
	Si può aggiungere un tenant
	Si può eliminare un tenant
-->
<script>
    import { onMount } from "svelte";
import { loadTenants } from "./libs/apis.tenant";

    let tenants = []; 

    onMount(async () => {
		tenants = await loadTenants();
    })
</script>

<h1>Tenants</h1>

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
			<th scope="row">1</th>
			<td>{tenant.name}</td>
            <!--
			<td>Otto</td>
			<td>@mdo</td>
            -->
		</tr>
        {/each}
	</tbody>
</table>
