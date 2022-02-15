<script>
    import { onMount } from "svelte";
    import { allRequests } from "./libs/apis.request";
    import * as moment from 'moment';

    let requests = [];
    let selected = -1;

    onMount(async () => {
        requests = await allRequests();
        if (requests && requests.length > 0) {
            select(0);
        }
    })

    function select(index) {
        selected = index;
		// onTenant(tenants[selected]._id);
    }

</script>

<h1>Order Request</h1>

<p>
    Qui troviamo un report dei prodotti finora scelti
</p>

<div class="list-group">
	{#each requests as request, i (request._id)}
		<a
			on:click|preventDefault={() => select(i)}
			href="#!"
			class="list-group-item list-group-item-action {i === selected ? 'active' : ''}"
			aria-current={i === selected}
		>
            {moment(new Date(request.from)).format("MMM Do")} 
            - 
            {moment(new Date(request.to)).format("MMM Do")}
		</a>
	{/each}
</div>

<p />


