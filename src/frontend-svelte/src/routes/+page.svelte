<script lang="ts">
	// import Button from '$lib/components/button.svelte';
	import TypeWriter from '$lib/components/typeWriter.svelte';
	import { onMount } from 'svelte';
	import Footer from './footer.svelte';

	let video: HTMLVideoElement;
	let playing: boolean = false;

	$: {
		if (video) {
			if (playing) {
				video.play();
			} else {
				video.pause();
			}
		}
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('element-visible');
					}
				});
			},
			{ threshold: 1 }
		);

		document.querySelectorAll('.scale-in').forEach((elem) => observer.observe(elem));
	});
</script>

<svelte:head>
	<title>Rectilearn</title>
</svelte:head>

<!-- This is to prevent vite from purging the element-visible class,
	because it thinks that the class is unused -->
<span class="element-visible"></span>

<!-- Section1 (legacy name) -->
<section class="max-w-7xl min-h-100vh sm:min-h-80vh w-full ml-auto mr-auto">
	<div class="flex flex-col md:flex-row items-center gap-8 md:gap-36 py-20 md:py-28 mx-2 sm:mx-6 md:mx-10 lg:mx-6"><!-- ps-14 pe-14 ms-14 me-14 -->
		<!-- This gap-10 is crazy -->
		<div class="flex-[1] flex-col gap-5 md:gap-10">
			<div class="leading-none font-semibold font-3xl sm:font-4xl lg:font-6xl">
				<h1 id="main-title">With <span class="font-pacifico">Rectilearn</span>,</h1>
				<h2 class="text-4xl text-black dark:text-white">
					studying is more <span class="text-sky-400 font-semibold"
						><TypeWriter messages={['Fun', 'Efficient', 'Cooler', 'Exciting', 'Better', 'Easier']}/></span
					>
				</h2>
			</div>
			<p class="max-w-[28rem] sm:max-w-2xl text-gray-700 dark:text-gray-400 text-lg my-6 text-left">
				<span class="font-pacifico">Rectilearn</span> makes studying a little less ordinary with games that let you have fun while
				studying. But <span class="font-pacifico">Rectilearn</span> is not just another study game, unlike other study tools, it is
				<a href="https://github.com/Sanyok6/TWTcodejam-team-Rectifiers" class="underline">Open Source</a>, it is directed towards language learners, and it makes studying much more
				enjoyable.
			</p>
			<a href="/auth/signup">
				<button class="bg-blue-400 hover:bg-blue-500 px-6 py-2 rounded-full">Start learning</button>
			</a>
		</div>

		<div class="relative flex flex-[1] items-center justify-center w-full">
			<svg
				viewBox="0 0 578 440"
				focusable="false"
				class="h-[150%] w-full absolute text-blue-300 dark:text-blue-500 left-0 z-[-1] top-[-20%]"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				><path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
					fill="currentColor"
				></path></svg
			>
			<div class="relative flex flex-col h-full rounded-2xl shadow-2xl w-full overflow-hidden">
				<!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
				<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 z-10 translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] absolute text-white hover:bg-transparent hover:cursor-pointer"
				on:click={() => playing = true} style={playing ? "display: none" : ""}>
					<path 
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M28.9999 0.562988C13.3196 0.562988 0.562378 13.3202 0.562378 29.0005C0.562378 44.6808 13.3196 57.438 28.9999 57.438C44.6801 57.438 57.4374 44.6808 57.4374 29.0005C57.4374 13.3202 44.6801 0.562988 28.9999 0.562988ZM39.2223 30.272L23.5749 39.7247C23.3506 39.8591 23.0946 39.9314 22.8332 39.9342C22.5717 39.9369 22.3142 39.8701 22.0871 39.7406C21.86 39.611 21.6715 39.4234 21.5408 39.1969C21.4102 38.9705 21.3421 38.7133 21.3436 38.4519V19.5491C21.3421 19.2877 21.4102 19.0305 21.5408 18.8041C21.6715 18.5776 21.86 18.3899 22.0871 18.2604C22.3142 18.1308 22.5717 18.064 22.8332 18.0668C23.0946 18.0696 23.3506 18.1419 23.5749 18.2763L39.2223 27.729C39.4404 27.8619 39.6207 28.0486 39.7458 28.2713C39.8709 28.494 39.9366 28.7451 39.9366 29.0005C39.9366 29.2559 39.8709 29.507 39.7458 29.7297C39.6207 29.9523 39.4404 30.1391 39.2223 30.272Z"
						fill="currentColor">
					</path>
				</svg>
				<!-- svelte-ignore a11y-media-has-caption -->
				<!--  class="relative h-auto w-full p-10 rounded-[50px]" -->
				<video bind:this={video} class="flex-[1]" on:click={() => playing = false}>
					<source
						src="https://cdn.discordapp.com/attachments/563779252735180831/1156800111645556838/rectilearn.mp4"
						type="video/mp4"
					/>
					Your browser does not support the video tag.
				</video>
			</div>
		</div>
	</div>
</section>

<!-- Section2 (legacy name) -->
<section class="mt-20">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 1200 120"
		class="w-full rotate-180 translate-y-[1px] overflow-hidden leading-[0]"
		preserveAspectRatio="none"
		><path
			d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z"
			class="fill-[#95c2ea] dark:fill-[#1c5f97]"
		></path></svg
	>
	<div class="grid place-items-center w-full bg-[#95c2ea] dark:bg-[#1c5f97] pt-14 pb-40">
		<div class="flex flex-col gap-24">
			<div class="feature-point scale-in">
				<svg
					class="fill-orange-600"
					stroke-width="0"
					viewBox="0 0 24 24"
					focusable="false"
					role="presentation"
					xmlns="http://www.w3.org/2000/svg"
					><path fill="none" d="M0 0h24v24H0V0z"></path><path
						d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm0 12H4V6h5.17l2 2H20v10zm-8-4h2v2h2v-2h2v-2h-2v-2h-2v2h-2z"
					></path></svg
				>
				<span>Easily create or import study sets</span>
			</div>
			<div class="feature-point scale-in">
				<svg
					class="fill-yellow-600"
					stroke-width="0"
					viewBox="0 0 16 16"
					focusable="false"
					role="presentation"
					xmlns="http://www.w3.org/2000/svg"
					><path
						d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"
					></path></svg
				>
				<span>5 different game modes</span>
			</div>
			<div class="feature-point scale-in">
				<svg
					class="text-green-600"
					stroke="currentColor"
					stroke-width="2"
					viewBox="0 0 24 24"
					stroke-linecap="round"
					stroke-linejoin="round"
					focusable="false"
					role="presentation"
					xmlns="http://www.w3.org/2000/svg"
					><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline
						points="22 4 12 14.01 9 11.01"
					></polyline></svg
				>
				<span>Make sure you know the right answer</span>
			</div>
			<div class="feature-point scale-in">
				<svg
					class="fill-sky-600"
					stroke="currentColor"
					fill="currentColor"
					stroke-width="0"
					viewBox="0 0 1024 1024"
					focusable="false"
					role="presentation"
					xmlns="http://www.w3.org/2000/svg"
					><path
						d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
					></path><path
						d="M719.4 499.1l-296.1-215A15.9 15.9 0 0 0 398 297v430c0 13.1 14.8 20.5 25.3 12.9l296.1-215a15.9 15.9 0 0 0 0-25.8zm-257.6 134V390.9L628.5 512 461.8 633.1z"
					></path></svg
				>
				<span>Play, learn, and have fun</span>
			</div>
			<div class="feature-point scale-in">
				<svg
					stroke="currentColor"
					class="fill-purple-600"
					fill="currentColor"
					stroke-width="0"
					viewBox="0 0 24 24"
					focusable="false"
					role="presentation"
					xmlns="http://www.w3.org/2000/svg"
					><path
						d="M19.864 8.465a3.505 3.505 0 0 0-3.03-4.449A3.005 3.005 0 0 0 14 2a2.98 2.98 0 0 0-2 .78A2.98 2.98 0 0 0 10 2c-1.301 0-2.41.831-2.825 2.015a3.505 3.505 0 0 0-3.039 4.45A4.028 4.028 0 0 0 2 12c0 1.075.428 2.086 1.172 2.832A4.067 4.067 0 0 0 3 16c0 1.957 1.412 3.59 3.306 3.934A3.515 3.515 0 0 0 9.5 22c.979 0 1.864-.407 2.5-1.059A3.484 3.484 0 0 0 14.5 22a3.51 3.51 0 0 0 3.19-2.06 4.006 4.006 0 0 0 3.138-5.108A4.003 4.003 0 0 0 22 12a4.028 4.028 0 0 0-2.136-3.535zM9.5 20c-.711 0-1.33-.504-1.47-1.198L7.818 18H7c-1.103 0-2-.897-2-2 0-.352.085-.682.253-.981l.456-.816-.784-.51A2.019 2.019 0 0 1 4 12c0-.977.723-1.824 1.682-1.972l1.693-.26-1.059-1.346a1.502 1.502 0 0 1 1.498-2.39L9 6.207V5a1 1 0 0 1 2 0v13.5c0 .827-.673 1.5-1.5 1.5zm9.575-6.308-.784.51.456.816c.168.3.253.63.253.982 0 1.103-.897 2-2.05 2h-.818l-.162.802A1.502 1.502 0 0 1 14.5 20c-.827 0-1.5-.673-1.5-1.5V5c0-.552.448-1 1-1s1 .448 1 1.05v1.207l1.186-.225a1.502 1.502 0 0 1 1.498 2.39l-1.059 1.347 1.693.26A2.002 2.002 0 0 1 20 12c0 .683-.346 1.315-.925 1.692z"
					></path></svg
				>
				<span>Studying done right!</span>
			</div>
		</div>
	</div>
	<div style="width:100%;overflow:hidden;line-height:0">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1200 120"
			preserveAspectRatio="none"
			height="100"
			width="100%"
			><path
				d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
				class="fill-[#95c2ea] dark:fill-[#1c5f97]"
			></path></svg
		>
	</div>
</section>

<!-- Section3 (legacy name) -->
<section class="scale-in min-h-[40vh] mt-40">
	<div class="ml-auto mr-auto w-full py-16 md:py-24">
		<div class="flex flex-col gap-8 md:gap-10">
			<div class="flex flex-col gap-4 md:gap-5 items-center">
				<h3 class="text-center text-4xl font-semibold text-blue-400 max-w-md">
					Ready to start learning smarter?
				</h3>
				<p class="max-w-2xl text-center text-xl mt-7 mb-10 dark:text-[#CBD5E0]">
					Level up your learning journey with the best studying tool in existence! Create your account for
					free!
				</p>
			</div>
			<div class="flex flex-row gap-3 justify-center">
				<a href="/auth/signup" class="p-[1em] rounded-[20px] text-2xl text-blue-600 dark:text-blue-400 shadow-[0px_0px_28px_14px_#0ff]">
					Start learning
				</a>
			</div>
		</div>
	</div>
</section>

<Footer />

<style lang="scss">
	section {
		@apply min-h-[80dvh] flex flex-col items-center;
	}

	#main-title {
		@apply inline-block text-6xl mt-2 mb-6 relative;

		&::after {
			@apply w-full h-[25%] absolute bg-blue-500 left-0 z-[-1] bottom-1;
			content: '';
		}
	}

	.feature-point {
		@apply flex gap-5 items-center text-4xl;
	}

	.feature-point > svg {
		height: 4rem;
		width: 4rem;
	}

	.scale-in {
		@apply scale-0 transition-transform;
	}

	.element-visible {
		@apply scale-100;
	}
</style>
