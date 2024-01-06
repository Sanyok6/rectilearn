<script lang="ts">
	import '../styles/main.scss';
	
	import NavBar from "./navbar.svelte";
	import ProgressBar from "./routeProgressBar.svelte";
</script>

<ProgressBar />

<NavBar />

<main class="h-[94%]">
	<slot />
</main>
