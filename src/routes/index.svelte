<script>
        import { getStores, navigating, page, session, updated } from '$app/stores';
import { count } from './libs/stores';

        console.log($navigating);
        console.log($page);
        console.log($session);
        console.log($updated);


        $count = $count + 1;

</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

Ciao mamma

<a href="/test">Test</a>

Ciao 
    
<button class="btn btn-sm btn-primary">Ciao</button>