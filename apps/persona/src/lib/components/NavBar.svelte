<script>
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";

  let navBarRef;
  let activeIndex = $state.raw(null);
  let mobileActiveIndex = $derived(activeIndex === null ? 0 : activeIndex);
  let open = $state.raw(false);

  const sections = [
    { id: "traits", title: "Traits" },
    { id: "comparison", title: "Comparison" },
    { id: "waitlist", title: "Waitlist" },
    { id: "creator", title: "Creator" },
  ];

  function updateActiveIndex() {
    if (!navBarRef) {
      return;
    }

    let newActiveIndex = null;
    let elements = sections
      .map(({ id }) => document.getElementById(id))
      .filter((el) => el !== null);
    let bodyRect = document.body.getBoundingClientRect();
    let offset = bodyRect.top + navBarRef.offsetHeight + 1;

    if (window.scrollY >= Math.floor(bodyRect.height) - window.innerHeight) {
      activeIndex = sections.length - 1;
      return;
    }

    for (let index = 0; index < elements.length; index++) {
      if (
        window.scrollY >=
        elements[index].getBoundingClientRect().top - offset
      ) {
        newActiveIndex = index;
      } else {
        break;
      }
    }

    activeIndex = newActiveIndex;
  }

  onMount(() => {
    if (browser) {
      updateActiveIndex();
    }
  });
</script>

<svelte:window onresize={updateActiveIndex} onscroll={updateActiveIndex} />

<div bind:this={navBarRef} class="font-michroma sticky top-0 z-50">
  <nav class="sm:hidden">
    <div
      class="relative flex items-center justify-between bg-zinc-950/95 px-4 py-3 shadow-sm [@supports(backdrop-filter:blur(0))]:bg-zinc-950/80 [@supports(backdrop-filter:blur(0))]:backdrop-blur-sm"
    >
      <span aria-hidden="true" class="text-primary font-michroma text-sm">
        {(mobileActiveIndex + 1).toString().padStart(2, "0")}
      </span>
      <span class="ml-4 text-base font-medium text-zinc-100">
        {sections[mobileActiveIndex].title}
      </span>
      <button
        type="button"
        class="p-2"
        aria-label="Toggle navigation menu"
        onclick={() => (open = !open)}
      >
        <svg
          class="h-6 w-6 stroke-zinc-100"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
    </div>

    {#if open}
      <div
        transition:slide
        class="absolute top-full right-0 left-0 bg-zinc-950/95 shadow-lg [@supports(backdrop-filter:blur(0))]:bg-zinc-950/80 [@supports(backdrop-filter:blur(0))]:backdrop-blur-sm"
      >
        {#each sections as section, sectionIndex (sectionIndex)}
          <a
            href="#{section.id}"
            class="flex items-center px-4 py-3 hover:bg-zinc-800/50"
            onclick={() => (open = false)}
          >
            <span class="text-primary font-michroma text-sm">
              {(sectionIndex + 1).toString().padStart(2, "0")}
            </span>
            <span class="ml-4 text-zinc-100">
              {section.title}
            </span>
          </a>
        {/each}
      </div>
    {/if}
  </nav>
  <div
    class="hidden sm:flex sm:h-32 sm:justify-center sm:border-b sm:border-zinc-200 sm:bg-zinc-950/95 sm:[@supports(backdrop-filter:blur(0))]:bg-zinc-950/80 sm:[@supports(backdrop-filter:blur(0))]:backdrop-blur-sm"
  >
    <ol
      role="list"
      class="mb-[-2px] grid auto-cols-[minmax(0,15rem)] grid-flow-col text-base font-medium text-zinc-100 [counter-reset:section]"
    >
      {#each sections as section, sectionIndex (sectionIndex)}
        <li key={section.id} class=" flex [counter-increment:section]">
          <a
            href={`#${section.id}`}
            class={[
              "flex w-full flex-col items-center justify-center border-b-2 before:mb-2 before:font-mono before:text-sm before:content-[counter(section,decimal-leading-zero)]",
              sectionIndex === activeIndex
                ? "text-primary before:text-primary border-primary bg-orange-50"
                : "border-transparent before:text-zinc-500 hover:bg-orange-50/40 hover:before:text-zinc-100",
            ]}
          >
            {section.title}
          </a>
        </li>
      {/each}
    </ol>
  </div>
</div>
