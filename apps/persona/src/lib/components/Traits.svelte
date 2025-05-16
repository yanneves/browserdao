<script>
  import Container from "$lib/components/Container.svelte";
  import SectionHeading from "$lib/components/SectionHeading.svelte";

  let isExpanded = $state.raw(false);

  const previewLimit = 2;
  const contents = {
    Identity: {
      Name: 1,
      Age: 15,
      Gender: 19,
      Location: 20,
      Religion: 21,
    },
    Psychology: {
      "Myers-Briggs Type Indicator (MBTI)": 21,
      "Bartle Type": 22,
      "Core Value Energy (CVI)": 26,
      "Minnesota Multiphasic Personality Inventory (MMPI)": 31,
      "Thomas–Kilmann Conflict Mode Instrument": 45,
    },
    "Value map": {
      Needs: 50,
      Wants: 57,
      Values: 66,
      Fears: 78,
    },
    Vocational: {
      Profession: 80,
      "ONS Social Grade": 82,
      "Employment status": 88,
      "Household income": 95,
      "Marital status": 96,
      "Number of children": 97,
    },
  };
</script>

<section
  id="traits"
  aria-labelledby="traits-title"
  class="scroll-mt-14 py-16 sm:scroll-mt-32 sm:py-20 lg:py-32"
>
  <Container>
    <SectionHeading number="1" id="traits-title">Traits</SectionHeading>
    <p
      class="font-display mt-8 text-4xl font-bold tracking-tight text-zinc-100"
    >
      These are the traits that make up a persona.
    </p>
    <ul class="mt-4 text-lg tracking-tight text-zinc-300">
      <li>(dice) traits can be randomly generated on use</li>
      <li>(range) traits can be set to a range of values</li>
    </ul>

    <ol
      role="list"
      class="mt-16 space-y-10 sm:space-y-16"
      data-expanded={isExpanded ? "" : undefined}
    >
      {#each Object.entries(contents).slice(0, isExpanded ? undefined : previewLimit) as [title, pages] (title)}
        <li>
          <h3
            class="font-display text-3xl font-bold tracking-tight text-zinc-100"
          >
            {title}
          </h3>
          <ol
            role="list"
            class="mt-8 divide-y divide-zinc-300/30 rounded-2xl bg-zinc-950 px-6 py-3 text-base tracking-tight sm:px-8 sm:py-7"
          >
            {#each Object.entries(pages) as [title, pageNumber] (pageNumber)}
              <li
                class="flex justify-between py-3"
                aria-label={`${title} on page ${pageNumber}`}
              >
                <span class="font-medium text-zinc-100" aria-hidden="true">
                  {title}
                </span>
                <span class="font-mono text-zinc-400" aria-hidden="true">
                  {pageNumber}
                </span>
              </li>
            {/each}
          </ol>
        </li>
      {/each}
    </ol>
    {#if !isExpanded}
      <div class="mt-10 flex justify-center">
        <button
          type="button"
          class="flex items-center text-base font-medium tracking-tight text-zinc-100 hover:text-zinc-300"
          onclick={() => (isExpanded = true)}
        >
          See more
          <svg aria-hidden="true" viewBox="0 0 24 24" class="ml-2 h-6 w-6">
            <path
              d="m17 14-5 5-5-5M12 18.5V5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    {/if}
  </Container>
</section>
