<script>
  import FilmGrain from "$lib/components/FilmGrain.svelte";
  import { sineInOut } from "svelte/easing";

  let { header, nav, main } = $props();
  let navDrawerOpen = $state.raw(false);

  function drawer(node, { delay = 0, duration = 150, easing = sineInOut }) {
    const existingTransform = getComputedStyle(node).transform.replace(
      "none",
      "",
    );

    return {
      delay,
      duration,
      easing,
      css: (t, u) => `transform: ${existingTransform} translateX(${u * -100}%)`,
    };
  }
</script>

<FilmGrain>
  <div class="bg-bg-50 h-full"></div>
</FilmGrain>

{#snippet sidebar()}
  <div
    class="bg-bg-50/20 ring-bg-50 flex grow flex-col gap-y-5 overflow-y-hidden ring-1 backdrop-blur-lg lg:bg-transparent lg:ring-0 lg:backdrop-blur-none"
  >
    <div class="flex h-16 shrink-0 items-center justify-end">
      {#if navDrawerOpen}
        <button
          type="button"
          class="flex items-center p-2"
          onclick={() => (navDrawerOpen = false)}
        >
          <span class="sr-only">Close sidebar</span>
          <i class="iconify material-symbols--close-rounded size-6"></i>
        </button>
      {/if}
    </div>
    <nav class="flex flex-1 flex-col overflow-y-hidden">
      {@render nav()}
    </nav>
  </div>
{/snippet}

<div class="mx-auto h-full max-w-7xl">
  {#if navDrawerOpen}
    <!-- Off-canvas menu for mobile -->
    <div class="relative z-50 lg:hidden" role="dialog" aria-modal="true">
      <div class="fixed inset-0 flex">
        <div
          class="relative mr-8 flex w-full max-w-xs flex-1 sm:max-w-sm"
          transition:drawer
        >
          {@render sidebar()}
        </div>
      </div>
    </div>
  {/if}

  <!-- Static sidebar for desktop -->
  <div
    class="lg:border-bg-200 hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-80 lg:flex-col lg:border-r"
  >
    {@render sidebar()}
  </div>

  <div class="h-full lg:pl-80">
    <div
      class="sticky top-0 z-40 flex h-16 items-center justify-between gap-x-8 px-4 shadow-xs lg:px-8"
    >
      <button
        type="button"
        class="flex items-center rounded-full p-2 text-white transition-opacity duration-150 ease-in focus:outline-hidden lg:hidden"
        class:opacity-0={navDrawerOpen}
        class:opacity-100={!navDrawerOpen}
        onclick={() => (navDrawerOpen = true)}
      >
        <span class="sr-only">Open sidebar</span>
        <i class="iconify material-symbols--chevron-right size-6"></i>
      </button>

      {@render header()}
    </div>

    <main class="mx-auto -mt-16 h-full max-w-sm">
      {@render main()}
    </main>
  </div>
</div>
