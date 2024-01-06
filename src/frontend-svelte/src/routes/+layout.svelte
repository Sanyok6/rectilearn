<script lang="ts">
	import '../styles/main.scss';
	
	import NavBar from "./navbar.svelte";
	import ProgressBar from "./routeProgressBar.svelte";
</script>

<ProgressBar />

<NavBar />

<main>
	<slot />
</main>
