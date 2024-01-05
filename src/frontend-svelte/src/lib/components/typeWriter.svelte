<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	export let messages: string[];
	export let typingSpeed = 300;

	let isDeletingChars = false;
	let typedChar = '';
	let messageIndex = 0;
	let charIndex = 0;

	let typewriter: number; // for setInterval/clearInterval


	const doTyping = () => {
		const string = messages[messageIndex];

		const char = string[charIndex];

		if (typedChar === string) {
			isDeletingChars = true;
		}
		if (!isDeletingChars) {
			typedChar += char;
			charIndex++;
		} else if (!typedChar && charIndex == string.length) {
			charIndex = 0;
			messageIndex = messageIndex >= messages.length - 1 ? 0 : (messageIndex + 1);
			isDeletingChars = false;
		} else {
			typedChar = typedChar.slice(0, -1);
		}
	};

	onMount(() => {
		typewriter = setInterval(doTyping, typingSpeed)
	});

	onDestroy(() => {
		clearInterval(typewriter);
	});
</script>

{typedChar}<span id="typewriter-cursor">|</span>

<style lang="postcss">
	#typewriter-cursor {
		animation: typewriter-cursor-animation 900ms infinite;
	}

	@keyframes typewriter-cursor-animation {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
