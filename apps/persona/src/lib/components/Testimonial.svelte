<script>
  import Container from "$lib/components/Container.svelte";
  import GridPattern from "$lib/components/GridPattern.svelte";
  import StarRating from "$lib/components/StarRating.svelte";

  let { id, author, children } = $props();
</script>

<aside
  {id}
  aria-label={`Testimonial from ${author.name}`}
  class="relative bg-zinc-900 py-16 sm:py-32"
>
  <div class="text-zinc-100/10">
    <GridPattern x="50%" patternTransform="translate(0 80)" />
  </div>
  <Container size="xs" class="relative">
    <figure>
      <div class="flex text-zinc-100 sm:justify-center">
        <StarRating />
      </div>
      <blockquote
        class="font-display mt-10 text-4xl font-medium tracking-tight text-zinc-100 sm:text-center"
      >
        {@render children?.()}
      </blockquote>
      <figcaption class="mt-10 flex items-center sm:justify-center">
        <div class="overflow-hidden rounded-full bg-zinc-800">
          <enhanced:img
            class="h-12 w-12 object-cover"
            src={author.image}
            alt="Profile of testimonial author"
          />
        </div>
        <div class="ml-4">
          <div class="text-base/6 font-medium tracking-tight text-zinc-100">
            {author.name}
          </div>
          <div class="mt-1 text-sm text-zinc-400">{author.role}</div>
        </div>
      </figcaption>
    </figure>
  </Container>
</aside>
