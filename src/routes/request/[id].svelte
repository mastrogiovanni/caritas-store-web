<script context="module">
    /** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch, session, stuff }) {

        const { id } = params;

        console.log(id);

        /*
		const response = await fetch(`https://cms.example.com/article/${params.slug}.json`);

		return {
			status: response.status,
			props: {
				article: response.ok && (await response.json())
			}
		};
        */

        return {
			// status: response.status,
			props: {
                id
            }
		};

	}
</script>

<script>
    import { getStores, navigating, page, session, updated } from '$app/stores';

    console.log($navigating);
    console.log($page);
    console.log($session);
    console.log($updated);

    import { count } from '../libs/stores';

    /*
    session.set({
        ...$session,
        stocazzo: "Tutt'uno"
    })
    */

    export let id;
</script>

<h1>Request ID detail - {id}, {$count}</h1>