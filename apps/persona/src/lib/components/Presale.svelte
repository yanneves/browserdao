<script>
  import Button from "$lib/components/Button.svelte";
  import CheckIcon from "$lib/components/CheckIcon.svelte";
  import Container from "$lib/components/Container.svelte";
  import GridPattern from "$lib/components/GridPattern.svelte";
  import SectionHeading from "$lib/components/SectionHeading.svelte";
</script>

{#snippet Plan({ name, description, price, features, href, featured = false })}
  <div
    class={[
      "sm:rounded-5xl relative px-4 py-16 sm:px-10 md:py-12 lg:px-12",
      featured && "bg-orange-600 sm:shadow-lg",
    ]}
  >
    {#if featured}
      <div
        class="absolute inset-0 mask-[linear-gradient(white,transparent)] text-white/10"
      >
        <GridPattern x="50%" y="50%" />
      </div>
    {/if}
    <div class="relative flex flex-col">
      <h3
        class={[
          "mt-7 text-lg font-semibold tracking-tight",
          featured ? "text-white" : "text-zinc-100",
        ]}
      >
        {name}
      </h3>
      <p
        class={[
          "mt-2 text-lg tracking-tight",
          featured ? "text-white" : "text-zinc-400",
        ]}
      >
        {description}
      </p>
      <p class="font-display order-first flex font-bold">
        <span
          class={[
            "text-[1.75rem]/9",
            featured ? "text-orange-200" : "text-zinc-500",
          ]}
        >
          $
        </span>
        <span
          class={[
            "mt-1 ml-1 text-7xl tracking-tight",
            featured ? "text-white" : "text-zinc-100",
          ]}
        >
          {price}
        </span>
      </p>
      <div class="order-last mt-8">
        <ul
          role="list"
          class={[
            "-my-2 divide-y text-base tracking-tight",
            featured
              ? "divide-white/10 text-white"
              : "divide-zinc-200 text-zinc-100",
          ]}
        >
          {#each features as feature (feature)}
            <li class="flex py-2">
              <CheckIcon
                class={[
                  "h-8 w-8 flex-none",
                  featured ? "fill-white" : "fill-zinc-600",
                ]}
              />
              <span class="ml-4">{feature}</span>
            </li>
          {/each}
        </ul>
      </div>
      <Button
        {href}
        color={featured ? "white" : "zinc"}
        class="mt-8"
        aria-label={`Join waitlist with the ${name} plan for $${price}`}
      >
        Join waitlist
      </Button>
    </div>
  </div>
{/snippet}

<section
  id="presale"
  aria-labelledby="presale-title"
  class="scroll-mt-14 pt-16 pb-8 sm:scroll-mt-32 sm:pt-20 sm:pb-10 lg:pt-32 lg:pb-16"
>
  <Container>
    <SectionHeading number="4" id="presale-title">Presale</SectionHeading>
    <p
      class="font-display mt-8 text-5xl font-extrabold tracking-tight text-zinc-100 sm:text-6xl"
    >
      Pick your package
    </p>
    <p class="mt-4 max-w-xl text-lg tracking-tight text-zinc-400">
      “Everything Starts as a Square” is available in two different packages so
      you can pick the one that’s right for you.
    </p>
  </Container>
  <div class="mx-auto mt-16 max-w-5xl lg:px-6">
    <div
      class="md:rounded-6xl grid bg-zinc-950 sm:px-6 sm:pb-16 md:grid-cols-2 md:px-8 md:pt-16 lg:p-20"
    >
      {@render Plan({
        name: "Public",
        description: "The perfect starting point if you’re on a budget.",
        price: 0.5,
        href: "#waitlist",
        features: [
          "The 240-page ebook",
          "Figma icon templates",
          "Community access",
        ],
      })}
      {@render Plan({
        featured: true,
        name: "Whitelist",
        description: "Everything icon resource you could ever ask for.",
        price: 0.5,
        href: "#waitlist",
        features: [
          "The 240-page ebook",
          "Figma icon templates",
          "Over an hour of screencasts",
          "Weekly icon teardowns",
          "Community access",
        ],
      })}
    </div>
  </div>
</section>
