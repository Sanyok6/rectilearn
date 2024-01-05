<script lang="ts">
</script>

<header>
	<a class="nav-title" href="/">Rectilearn</a>

	<div class="ml-auto">
		<div class="flex gap-4 md:gap-9 font-semibold">
			<a href="/auth/login" class="hover-underline">Login</a>
			<a href="/auth/signup" class="hover-underline">Signup</a>
		</div>
	</div>
</header>

<style lang="scss">
	header {
		@apply flex items-center z-[10000] shadow-neutral-800 
               shadow-sm px-8 h-[var(--navbar-height)] max-h-[var(--navbar-height)];

		background: rgba(0, 0, 0, 0.5);
	}

	.nav-title {
		@apply font-pacifico text-xl;
	}
</style>
