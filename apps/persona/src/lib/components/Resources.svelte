<script>
  import Container from "$lib/components/Container.svelte";
  import SectionHeading from "$lib/components/SectionHeading.svelte";
</script>

<section
  id="resources"
  aria-labelledby="resources-title"
  class="scroll-mt-14 py-16 sm:scroll-mt-32 sm:py-20 lg:py-32"
>
  <Container>
    <SectionHeading number="3" id="resources-title">Resources</SectionHeading>
    <p
      class="font-display mt-8 text-4xl font-bold tracking-tight text-zinc-100"
    >
      Tools and resources you can use to get started even faster and progress
      even further.
    </p>
    <p class="mt-4 text-lg tracking-tight text-zinc-300">
      Design assets, icon teardowns, and a community of fellow icon designers
      where you can ask questions, get feedback, and accelerate your learning.
    </p>
  </Container>
  <Container size="lg" class="mt-16">
    <ol
      role="list"
      class="-mx-3 grid grid-cols-1 gap-y-10 lg:grid-cols-3 lg:text-center xl:-mx-12 xl:divide-x xl:divide-zinc-400/20"
    >
      <li
        class="grid auto-rows-min grid-cols-1 items-center gap-8 px-3 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-1 xl:px-12"
      >
        <div
          class="relative h-48 overflow-hidden rounded-2xl shadow-lg sm:h-60 lg:h-40"
        >
          <div
            class="absolute inset-0 flex items-center justify-center bg-[radial-gradient(#2C313D_35%,#000)]"
          >
            <enhanced:img
              src="$lib/images/resources/figma.svg"
              alt="Thumbnail"
            />
          </div>
        </div>
        <div>
          <h3 class="text-base font-medium tracking-tight text-zinc-100">
            Figma icon templates
          </h3>
          <p class="mt-2 text-sm text-zinc-400">
            Perfectly structured templates for quickly designing new icons at
            dozens of common sizes.
          </p>
        </div>
      </li>
      <li
        class="grid auto-rows-min grid-cols-1 items-center gap-8 px-3 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-1 xl:px-12"
      >
        <div
          class="relative h-48 overflow-hidden rounded-2xl shadow-lg sm:h-60 lg:h-40"
        >
          <div class="absolute inset-0 flex items-center justify-center">
            <enhanced:img
              class="absolute inset-0 h-full w-full object-cover"
              src="$lib/images/resources/abstract-background.png"
              alt="Background"
              sizes="(min-width: 1280px) 21rem, (min-width: 1024px) 33vw, (min-width: 768px) 19rem, (min-width: 640px) 50vw, 100vw"
            />
            <enhanced:img
              class="relative"
              src="$lib/images/resources/video-player.svg"
              alt="Thumbnail"
            />
          </div>
        </div>
        <div>
          <h3 class="text-base font-medium tracking-tight text-zinc-100">
            Weekly icon teardowns
          </h3>
          <p class="mt-2 text-sm text-zinc-400">
            Weekly videos where we dissect and recreate beautiful icons we find
            on the web.
          </p>
        </div>
      </li>
      <li
        class="grid auto-rows-min grid-cols-1 items-center gap-8 px-3 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-1 xl:px-12"
      >
        <div
          class="relative h-48 overflow-hidden rounded-2xl shadow-lg sm:h-60 lg:h-40"
        >
          <div
            class="absolute inset-0 flex items-center justify-center bg-[#6366F1]"
          >
            <enhanced:img src="$lib/images/resources/discord.svg" alt="" />
          </div>
        </div>
        <div>
          <h3 class="text-base font-medium tracking-tight text-zinc-100">
            Community of icon designers
          </h3>
          <p class="mt-2 text-sm text-zinc-400">
            A private Discord server where you can get help and give feedback on
            each others' work.
          </p>
        </div>
      </li>
    </ol>
  </Container>
</section>
