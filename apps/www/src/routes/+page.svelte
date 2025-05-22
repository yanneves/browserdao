<script>
  import "@fontsource-variable/inter";
  import trackEvent from "$lib/utils/trackEvent";
  import CertificateAuthority from "../lib/components/CertificateAuthority.svelte";
</script>

<article
  class="flex min-h-full flex-col items-center gap-y-8 pt-16 pb-6 sm:pt-28"
>
  <CertificateAuthority mint="AYHXXJhuQ7m26QjSJwgynfDcy4BVDfxG4zjATmYXjswk" />
  <mark
    class="from-blaze-300 to-blaze-500 font-logo bg-transparent bg-linear-to-r bg-clip-text p-4 font-semibold text-transparent select-none"
    style="font-size: 25vmin; line-height: 1;"
  >
    WW<br class="sm:hidden" />W .
  </mark>
  <section
    class="z-10 flex flex-col items-center justify-around gap-x-8 gap-y-4 py-4 sm:flex-row"
  >
    <a
      href="/discord"
      class="text-blaze-300 hover:ring-blaze-300 focus:ring-blaze-300 flex w-full min-w-64 gap-x-4 rounded-md bg-zinc-700/70 px-3.5 py-2.5 text-sm font-semibold shadow-xs ring-2 ring-transparent hover:bg-zinc-700/30 focus:bg-zinc-700/30 focus:outline-hidden"
      onclick={() => trackEvent("Joined Discord")}
    >
      <i class="iconify-color logos--discord-icon size-7"></i>
      <span class="mx-auto text-lg">Join Discord</span>
    </a>
    <a
      href="/twitter"
      class="text-blaze-300 hover:ring-blaze-300 focus:ring-blaze-300 flex w-full min-w-64 gap-x-4 rounded-md bg-zinc-700/70 px-3.5 py-2.5 text-sm font-semibold shadow-xs ring-2 ring-transparent hover:bg-zinc-700/30 focus:bg-zinc-700/30 focus:outline-hidden"
      onclick={() => trackEvent("Followed Twitter")}
    >
      <i class="iconify-color logos--x size-7"></i>
      <span class="mx-auto text-lg">Follow @browserdao</span>
    </a>
  </section>
  <footer
    class="mt-auto flex flex-col items-center justify-center gap-y-px sm:gap-y-4"
  >
    <p class="z-10 flex items-center gap-x-1">
      <a
        href="/tokenomics"
        class="text-blaze-300 hover:ring-blaze-300 focus:ring-blaze-300 flex w-full gap-x-1 rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-xs ring-2 ring-transparent focus:outline-hidden"
        ><i class="iconify lucide--newspaper size-5"></i>
        <span class="mx-auto">Tokenomics</span></a
      >
    </p>
    <p>&copy; 2025 Browser.icu</p>
  </footer>
</article>
