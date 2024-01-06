<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	let isNavigating: boolean = false;

	beforeNavigate(() => {
		isNavigating = true;
	});

	afterNavigate(() => {
		setTimeout(() => {
			isNavigating = false;
		}, 150);
	});
</script>

<div class="gradient-loader" class:show={isNavigating}></div>

<style lang="postcss">
	div {
		@apply fixed w-full top-0 left-0 h-1.5 opacity-0 -translate-x-full transition-all;
	}
	.show {
		@apply opacity-100 translate-x-0;
	}
	.gradient-loader {
		@apply bg-gradient-to-r from-blue-500 via-sky-500 to-blue-600;
		background-size: 200% 200%;
		animation: gradiant-move 1s infinite;
	}
	@keyframes gradiant-move {
		0% {
			background-position: left;
		}
		50% {
			background-position: right;
		}
		100% {
			background-position: left;
		}
	}
</style>
