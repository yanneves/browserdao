<script>
  import CheckIcon from "$lib/components/CheckIcon.svelte";
  import Container from "$lib/components/Container.svelte";
</script>

<section id="introduction" aria-label="Introduction" class="py-16 sm:pb-20">
  <Container class="text-lg tracking-tight text-zinc-300">
    <p class="font-display text-4xl font-bold tracking-tight text-zinc-100">
      “A breakthrough” synthetic user encoded as an NFT with a personality
      modeled by its owner.
    </p>
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
          <CheckIcon class="h-8 w-8 flex-none fill-orange-500" />
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
        class="text-base font-medium text-orange-600 hover:text-orange-800"
      >
        Get notified to buy at the lowest floor price&nbsp;
        <span aria-hidden="true">&rarr;</span>
      </a>
    </p>
  </Container>
</section>
