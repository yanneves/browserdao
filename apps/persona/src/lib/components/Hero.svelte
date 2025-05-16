<script>
  import Button from "$lib/components/Button.svelte";
  import GridPattern from "$lib/components/GridPattern.svelte";
  import Model from "$lib/components/Model.svelte";

  // import StarRating from "$lib/components/StarRating.svelte";
</script>

<header class="overflow-hidden bg-orange-950 lg:bg-transparent lg:px-5">
  <div
    class="mx-auto grid max-w-6xl grid-cols-1 grid-rows-[auto_1fr] gap-y-16 pt-16 md:pt-20 lg:grid-cols-12 lg:gap-y-20 lg:px-3 lg:pt-20 lg:pb-36 xl:py-32"
  >
    <div class="relative flex items-end lg:col-span-5 lg:row-span-2">
      <div
        class="rounded-br-6xl absolute -top-20 right-1/2 -bottom-12 left-0 z-10 bg-orange-600 text-white/10 md:bottom-8 lg:-inset-y-32 lg:right-full lg:left-[-100vw] lg:-mr-40"
      >
        <GridPattern x="100%" y="100%" patternTransform="translate(112 64)" />
      </div>
      <Model
        class="relative z-10 mx-auto flex aspect-square w-64 rounded-2xl bg-zinc-950 md:w-80 lg:w-full lg:rounded-full"
      />
    </div>
    <!-- <div
      class="relative px-4 sm:px-6 lg:col-span-7 lg:pr-0 lg:pb-14 lg:pl-16 xl:pl-20"
    >
      <div
        class="hidden lg:absolute lg:-top-32 lg:right-[-100vw] lg:bottom-0 lg:left-[-100vw] lg:block lg:bg-orange-950"
      ></div>
      <figure
        class="relative mx-auto max-w-md text-center lg:mx-0 lg:text-left"
      >
        <div class="flex justify-center text-orange-600 lg:justify-start">
          <StarRating />
        </div>
        <blockquote class="mt-2">
          <p class="font-display text-xl font-medium text-zinc-100">
            “We need endorsement”
          </p>
        </blockquote>
        <figcaption class="mt-2 text-sm text-zinc-500">
          <strong class="font-semibold text-orange-600 before:content-['—_']">
            and an endorser
          </strong>, from somewhere
        </figcaption>
      </figure>
    </div> -->
    <div
      class="bg-zinc-950 pt-16 lg:col-span-7 lg:bg-transparent lg:pt-0 lg:pl-16 xl:pl-20"
    >
      <div class="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0">
        <h1
          class="font-display text-5xl font-extrabold text-zinc-100 sm:text-6xl lg:pt-16"
        >
          Solana's first AI NFTs with utility.
        </h1>
        <p class="mt-4 text-3xl text-zinc-400">
          Help AI Agent interns become more human, and earn a share of their
          income.
        </p>
        <div class="mt-8 flex gap-4">
          <Button href="#waitlist" color="blue">Join waitlist</Button>
          <Button href="/marketplace" variant="outline" color="blue">
            Browse marketplace
          </Button>
        </div>
      </div>
    </div>
  </div>
</header>
