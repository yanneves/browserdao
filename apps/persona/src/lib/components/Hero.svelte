<script>
  import Button from "$lib/components/Button.svelte";
  import GridPattern from "$lib/components/GridPattern.svelte";
  import persona_avatar from "$lib/images/avatars/persona.png";
</script>

<header class="grid min-h-[570px] grid-cols-1 md:grid-cols-2">
  <div class="bg-primary relative min-h-96">
    <span class="opacity-20">
      <GridPattern />
    </span>
    <img
      src={persona_avatar}
      alt="persona"
      width="400px"
      class="curie absolute right-0 bottom-0"
    />
  </div>
  <div class="border-b-primary flex border-b sm:pl-7">
    <div
      class="max-w flex max-w-[600px] flex-col justify-end gap-4 px-4 py-6 sm:gap-8 md:py-12"
    >
      <h1 class="font-michroma text-4xl font-extrabold sm:text-5xl lg:text-6xl">
        Solana's first <span class="rgb-shift italic">AI NFTs</span> with
        utility<span
          class="text-foreground-alt font-light tracking-widest sm:text-4xl lg:text-5xl"
          >::::::</span
        >
      </h1>
      <p class="text-foreground-alt text-3xl">
        Help AI Agent interns become more human, and earn a share of their
        income.
      </p>
      <div class="flex gap-4">
        <Button href="#waitlist" variant="outline">JOIN WAITLIST</Button>
      </div>
    </div>
  </div>
</header>

<style>
  .rgb-shift {
    text-shadow:
      3px 0 0 rgba(255, 0, 0, 0.5),
      -3px 0 0 rgba(0, 255, 0, 0.5),
      0 5px 0 rgba(0, 0, 255, 0.5);
  }

  .curie {
    filter: drop-shadow(12px 0 #000000);
  }
</style>
