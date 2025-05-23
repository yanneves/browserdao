<script>
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  let navBarRef;
  let activeIndex = $state.raw(null);
  let mobileActiveIndex = $derived(activeIndex === null ? 0 : activeIndex);
  let open = $state.raw(false);

  const sections = [
    { id: "traits", title: "Traits" },
    { id: "comparison", title: "Comparison" },
    { id: "resources", title: "Resources" },
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

<div bind:this={navBarRef} class="sticky top-0 z-50">
  <nav class="sm:hidden">
    <div
      class={[
        "relative flex items-center px-4 py-3",
        !open &&
          "bg-zinc-950/95 shadow-sm [@supports(backdrop-filter:blur(0))]:bg-zinc-950/80 [@supports(backdrop-filter:blur(0))]:backdrop-blur-sm",
      ]}
    >
      {#if !open}
        <span aria-hidden="true" class="font-mono text-sm text-orange-600">
          {(mobileActiveIndex + 1).toString().padStart(2, "0")}
        </span>
        <span class="ml-4 text-base font-medium text-zinc-100">
          {sections[mobileActiveIndex].title}
        </span>
      {/if}
      <button
        type="button"
        class={[
          "-mr-1 ml-auto flex h-8 w-8 items-center justify-center",
          open && "relative z-10",
        ]}
        aria-label="Toggle navigation menu"
        onclick={() => (open = !open)}
      >
        {#if !open}
          <!-- Increase hit area -->
          <span class="absolute inset-0"></span>
        {/if}
        <svg
          aria-hidden="true"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          class="h-6 w-6 stroke-zinc-700"
        >
          <path
            d={open ? "M17 7 7 17M7 7l10 10" : "m15 16-3 3-3-3M15 8l-3-3-3 3"}
          />
        </svg>
      </button>
    </div>
    <div
      class="absolute inset-x-0 top-0 bg-zinc-950/95 py-3.5 shadow-sm [@supports(backdrop-filter:blur(0))]:bg-zinc-950/80 [@supports(backdrop-filter:blur(0))]:backdrop-blur-sm"
    >
      {#each sections as section, sectionIndex (sectionIndex)}
        <a
          href="#{section.id}"
          class="flex items-center px-4 py-1.5"
          onclick={() => (open = false)}
        >
          <span aria-hidden="true" class="font-mono text-sm text-orange-600">
            {(sectionIndex + 1).toString().padStart(2, "0")}
          </span>
          <span class="ml-4 text-base font-medium text-zinc-100">
            {section.title}
          </span>
        </a>
      {/each}
    </div>
    <div class="absolute inset-x-0 bottom-full z-10 h-4 bg-zinc-950"></div>
  </nav>
  <div
    class="hidden sm:flex sm:h-32 sm:justify-center sm:border-b sm:border-zinc-200 sm:bg-zinc-950/95 sm:[@supports(backdrop-filter:blur(0))]:bg-zinc-950/80 sm:[@supports(backdrop-filter:blur(0))]:backdrop-blur-sm"
  >
    <ol
      role="list"
      class="mb-[-2px] grid auto-cols-[minmax(0,15rem)] grid-flow-col text-base font-medium text-zinc-100 [counter-reset:section]"
    >
      {#each sections as section, sectionIndex (sectionIndex)}
        <li key={section.id} class="flex [counter-increment:section]">
          <a
            href={`#${section.id}`}
            class={[
              "flex w-full flex-col items-center justify-center border-b-2 before:mb-2 before:font-mono before:text-sm before:content-[counter(section,decimal-leading-zero)]",
              sectionIndex === activeIndex
                ? "border-blue-600 bg-orange-50 text-orange-600 before:text-orange-600"
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
