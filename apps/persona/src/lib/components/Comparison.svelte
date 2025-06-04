<script>
  import Container from "$lib/components/Container.svelte";
  import SectionHeading from "$lib/components/SectionHeading.svelte";
</script>

<section
  id="comparison"
  aria-labelledby="comparison-title"
  class="scroll-mt-14 py-16 sm:scroll-mt-32 sm:py-20 lg:py-32"
>
  <Container>
    <SectionHeading number="2" id="comparison-title">Comparison</SectionHeading>
    <p class="font-michroma mt-8 text-4xl tracking-tight">
      Better Results with Persona
    </p>
    <p class="text-foreground-alt mt-4 text-lg tracking-tight">
      Learn how to design your very first icons in a series of screencasts that
      will teach you everything you need to know to go from beginner to pro in
      just over an hour.
    </p>
  </Container>
  <Container class="mt-16">
    <ol role="list" class="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
      <li>
        <div
          class="relative flex h-44 items-center justify-center rounded-2xl px-6 shadow-lg"
        >
          <div class="flex overflow-hidden rounded-sm shadow-sm">
            <enhanced:img
              src="$lib/images/screencasts/strokes.svg"
              alt="Sample thumbnail"
            />
          </div>
        </div>
        <h3
          class="mt-8 text-base font-medium tracking-tight text-zinc-100 before:mb-2 before:block before:font-mono before:text-sm before:text-zinc-500 before:content-['No_persona_selected']"
        >
          Do research
        </h3>
        <p class="mt-2 text-sm text-zinc-400">
          This one misses something important.
        </p>
      </li>
      <li>
        <div
          class="relative flex h-44 items-center justify-center rounded-2xl px-6 shadow-lg"
          style="background-image: conic-gradient(from -49.8deg at 50% 50%, #7331FF 0deg, #00A3FF 59.07deg, #4E51FF 185.61deg, #39DBFF 284.23deg, #B84FF1 329.41deg, #7331FF 360deg);"
        >
          <div class="flex overflow-hidden rounded-sm shadow-sm">
            <enhanced:img
              src="$lib/images/screencasts/duotone.svg"
              alt="Sample thumbnail"
            />
          </div>
          <div
            class="absolute bottom-2 left-2 flex items-center rounded-lg bg-black/30 px-1.5 py-0.5 text-sm text-white [@supports(backdrop-filter:blur(0))]:bg-zinc-950/10 [@supports(backdrop-filter:blur(0))]:backdrop-blur-sm"
          >
            <svg
              aria-hidden="true"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 16 16"
              class="h-4 w-4 fill-current stroke-current"
            >
              <path d="M6.75 10.25v-4.5L10.25 8l-3.5 2.25Z" />
              <circle cx="8" cy="8" r="6.25" fill="none" />
            </svg>
            <span class="ml-2">Enhanced</span>
          </div>
        </div>
        <h3
          class="mt-8 text-base font-medium tracking-tight text-zinc-100 before:mb-2 before:block before:font-mono before:text-sm before:text-zinc-500 before:content-['Persona:_Crypto_expert']"
        >
          Do research (enhanced)
        </h3>
        <p class="mt-2 text-sm text-zinc-400">This is the better one.</p>
      </li>
    </ol>
  </Container>
</section>
