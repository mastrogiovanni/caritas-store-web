<script>
    import { onMount } from "svelte";
    import * as moment from 'moment';
    import { orderForTenantAndRequest, upsertOrder } from "./libs/api.orders";
    import { currentRequest } from "./libs/apis.request";
    import { loadProducts } from "./libs/apis.products";
    import TenantList from "./components/TenantList.svelte";
    import { session } from "$app/stores";

    let orderRequest = undefined;
    let currentTenant = $session.id;
    let orders = [];
    let products = [];
    
    onMount(async () => {
        orderRequest = await currentRequest();
        // await reloadData();
        onTenant($session.id);
    })

    async function reloadData() {
        if (orderRequest) {
            orders = await orderForTenantAndRequest(currentTenant, orderRequest._id);
            products = (await loadProducts()).map(item => {
                const list = orders.filter(order => order.product === item._id)
                if (list && list.length > 0) {
                    return {
                        ...item,
                        quantity: list[0].quantity,
                        newQuantity: list[0].quantity
                    }
                }
                return {
                    ...item,
                    quantity: 0,
                    newQuantity: 0
                }
            })
        }
    }

    function onTenant(id) {
        currentTenant = id;
        reloadData();
    }

    function needsSave() {
        return products.filter(item => parseFloat(item.quantity) !== parseFloat(item.newQuantity)).length > 0;
    }

    async function save() {
        for (let product of products.filter(item => { return parseFloat(item.quantity) !== parseFloat(item.newQuantity) })) {
            await upsertOrder(currentTenant, orderRequest._id, product._id, product.newQuantity);
            product.quantity = product.newQuantity;
        }
        products = products;
    }

    let needSave = false;

    $: needSave = needsSave();

</script>

<h1>Ordini</h1>

<!--
<TenantList onTenant={onTenant} />
-->

<p/>

{#if orderRequest}

    <h2>Ultimo ordine da compilare: {moment(new Date(orderRequest.from)).format("MMM Do")} - {moment(new Date(orderRequest.to)).format("MMM Do")}</h2>
    {#if orderRequest.notes}    
    <small>{orderRequest.notes}</small>
    {/if}

    <div class="d-flex flex-row-reverse bd-highlight">
        <div class="p-2 bd-highlight">
            <button
                on:click|preventDefault={save}
                class="btn btn-primary" disabled={!needSave}>Salva</button
            >
        </div>
    </div>

    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th>Product</th>
                <th colspan="2">Quantity</th>
            </tr>
        </thead>
        <tbody>
            {#each products as product (product._id)}
                <tr>
                    <th scope="row">{product._id}</th>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td><input on:change={() => { needSave = needsSave() }} type="text" name={product._id} bind:value={product.newQuantity} ></td>
                </tr>
            {/each}
        </tbody>
    </table>

{:else}

    Nessuna Richiesta Ordine al momento

{/if}