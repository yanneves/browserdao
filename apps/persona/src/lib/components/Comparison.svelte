<script>
  import Container from "$lib/components/Container.svelte";
  import SectionHeading from "$lib/components/SectionHeading.svelte";
  import ComparisonChats from "./ui/ComparisonChats.svelte";
</script>

<section
  id="comparison"
  aria-labelledby="comparison-title"
  class="scroll-mt-14 py-16 sm:scroll-mt-32 sm:py-20 lg:py-32"
>
  <Container>
    <SectionHeading number="2" id="comparison-title">Comparison</SectionHeading>
    <p class="font-michroma mt-8 text-4xl tracking-tight">
      More in-depth analysis with persona
    </p>
    <!-- <p class="text-foreground-alt mt-4 text-lg tracking-tight">
      Learn how to design your very first icons in a series of screencasts that
      will teach you everything you need to know to go from beginner to pro in
      just over an hour.
    </p> -->
  </Container>
  <Container class="mt-16">
    <ComparisonChats />
  </Container>
</section>
