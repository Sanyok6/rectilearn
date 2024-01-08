<script lang="ts">
	import '../styles/main.scss';
	
	import NavBar from "./navbar.svelte";
	import ProgressBar from "./routeProgressBar.svelte";
</script>

<ProgressBar />

<NavBar />

<main class="h-[calc(100vh_-_var(--navbar-height))]">
	<slot />
</main>
