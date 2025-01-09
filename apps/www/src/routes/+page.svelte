<script>
  import "@fontsource/inter";
  import trackEvent from "$lib/utils/trackEvent";
</script>

<article
  class="flex min-h-full flex-col items-center gap-y-8 pb-6 pt-24 sm:pt-48"
>
  <mark
    class="select-none bg-transparent bg-gradient-to-r from-blaze-300 to-blaze-500 bg-clip-text p-4 font-[Inter] font-semibold text-transparent"
    style="font-size: 25vmin; line-height: 1;"
  >
    WW<br class="sm:hidden" />W .
  </mark>
  <section
    class="z-10 flex flex-col items-center justify-around gap-x-8 gap-y-4 py-4 sm:flex-row"
  >
    <a
      href="/discord"
      class="flex w-full min-w-64 gap-x-4 rounded-md bg-zinc-700/70 px-3.5 py-2.5 text-sm font-semibold text-blaze-300 shadow-sm ring-2 ring-transparent hover:bg-zinc-700/30 hover:ring-blaze-300 focus:bg-zinc-700/30 focus:outline-none focus:ring-blaze-300"
      onclick={() => trackEvent("Joined Discord")}
    >
      <i class="iconify-color logos--discord-icon size-7"></i>
      <span class="mx-auto text-lg">Join Discord</span>
    </a>
    <a
      href="/twitter"
      class="flex w-full min-w-64 gap-x-4 rounded-md bg-zinc-700/70 px-3.5 py-2.5 text-sm font-semibold text-blaze-300 shadow-sm ring-2 ring-transparent hover:bg-zinc-700/30 hover:ring-blaze-300 focus:bg-zinc-700/30 focus:outline-none focus:ring-blaze-300"
      onclick={() => trackEvent("Followed Twitter")}
    >
      <i class="iconify-color logos--twitter size-7"></i>
      <span class="mx-auto text-lg">Follow @browserdao</span>
    </a>
  </section>
  <p class="mt-auto">&copy; 2025 $BROWSER DAO</p>
</article>
