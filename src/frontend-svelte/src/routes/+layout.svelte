<script lang="ts">
	import '../styles/main.scss';
	
	import NavBar from "./navbar.svelte";
</script>

<NavBar />

<main class="h-[94%]">
	<slot />
</main>
