<script lang="ts">
    import type { HTMLButtonAttributes } from "svelte/elements";

    // export let isLoading: boolean | undefined = false;
    export const isLoading: boolean | undefined = false;

    interface $$Props extends HTMLButtonAttributes {
        isLoading?: boolean;
    }
</script>

<button on:click on:dblclick {...$$restProps}>
    <slot />
</button>

<style lang="scss">
    // Default button size is medium (md)
    button {
        @apply font-medium
        bg-blue-500  w-auto box-border text-base rounded-3xl
        px-3 py-2 text-black whitespace-nowrap text-ellipsis overflow-hidden
        flex items-center justify-center select-none;

        // color: hsl(0 calc(1 * 0%) 100% / 1);
        transition: background-color 0.17s ease, color 0.17s ease;

        &:hover {
            @apply bg-blue-600;
        }

        &:active {
            @apply bg-blue-700;
        }

        &.btn-lg {
            @apply  px-6 py-4 text-xl;
        }

        &.btn-xl {
            @apply  px-14 py-6 text-2xl;
        }

        &.btn-sm {
            @apply px-2 text-sm;
        }

        &.btn-xs {
            @apply px-2 text-xs;
        }
    }

    .btn-ghost {
        @apply bg-transparent text-blue-500 transition-shadow;
        box-shadow: 0px 0px 28px 14px #0ff;

        &:hover {
            background: rgba(255, 255, 255, 0.16);
        }

        &:active {
            box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
        }
    }

    .btn-destructive {
        @apply bg-red-500;

        &:hover {
            @apply bg-red-600;
        }
        &:active {
            @apply bg-red-700;
        }
    }

    .btn-dark {
        @apply bg-neutral-700;

        &:hover {
            @apply bg-neutral-800;
        }
        &:active {
            @apply bg-neutral-900;
        }
    }
</style>
