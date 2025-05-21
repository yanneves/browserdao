<script>
  import CheckIcon from "$lib/components/CheckIcon.svelte";
  import Container from "$lib/components/Container.svelte";
</script>

<section id="introduction" aria-label="Introduction" class="py-16 sm:pb-20">
  <Container class="text-foreground/80 text-lg tracking-tight">
    <h2
      class="font-display text-foreground text-4xl font-medium tracking-tight"
    >
      “A breakthrough” synthetic user encoded as an NFT with a personality
      modeled by its owner.
    </h2>
    <p class="mt-4">
      Recent advancements in computer vision and reasoning have enabled an
      agentic web. Industries are competing to surface powerful AI Agents and
      join the knowledge graph through new protocols. These agents perform
      demonstrably better when synthesised with personality and intent.
    </p>
    <p class="mt-4">
      So we're creating an opportunity to share in revenue across this entire
      space.
    </p>
    <p class="mt-4"></p>
    <ul role="list" class="mt-8 space-y-3">
      {#each ["Gain valuable skills as you learn to train AI Agents", "No technical expertise required", "Receive a 2% - 8% distribution of revenue share from platforms", "Traits can be defined as static, dynamic, or inferred", "Works with leading platforms like Anthropic, OpenAI, Gemini, and DeepSeek"] as feature (feature)}
        <li class="flex">
          <CheckIcon class="fill-primary h-8 w-8 flex-none" />
          <span class="ml-4">{feature}</span>
        </li>
      {/each}
    </ul>
    <p class="mt-8">
      While one company could create and control their own pool of synthetic
      users, by crowdsourcing these personalities they will be more
      representative. We recognise the web3 community as an unrivalled workforce
      on the internet, which will be incentivised through leaderboards, skill
      development, and more importantly revenue share.
    </p>
    <p class="mt-10">
      <a
        href="#waitlist"
        class="text-primary hover:text-primary/80 text-base font-medium"
      >
        Get notified to buy at the lowest floor price&nbsp;
        <span aria-hidden="true">&rarr;</span>
      </a>
    </p>
  </Container>
</section>
