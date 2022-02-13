<!--
    In this page a tenant can modify an order for a given oreder request
-->
<script context="module">
	import { loadRequest } from '../libs/apis.request';
	import { loadTenant } from '../libs/apis.tenant';

    /** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch, session, stuff }) {
        const { tenant, request } = params;
		const tenantItem = await loadTenant(tenant);
		const requestItem = await loadRequest(request);
        return {
			props: {
                request: requestItem,
				tenant: tenantItem
            }
		};

	}
</script>

<script>
	export let request;
	export let tenant;
</script>

<h1>Welcome {tenant.name} [ {request.from} - {request.to} ]</h1>

Ciao