<script>
    import { onMount } from "svelte";

    let orderRequest = undefined;

    let currentTenant = undefined
    
    onMount(async () => {
        const response = await fetch("http://localhost:3000/orderrequest");
        const orderRequest = await response.json();
        if (orderRequest) {
            

        }
    })
</script>

<h1>Orders</h1>

{#if orderRequest}

    <h2>Welcome {orderRequest}</h2>


{:else}

    Nessuna Richiesta Ordine al momento

{/if}