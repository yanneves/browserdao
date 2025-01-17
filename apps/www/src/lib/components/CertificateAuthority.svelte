<script>
  let { mint } = $props();

  let copying = $state.raw(false);
  async function copyAddress(event) {
    const text = event.target.dataset?.addr;
    const type = "text/plain";
    const blob = new Blob([text], { type });
    const data = [new ClipboardItem({ [type]: blob })];
    await window?.navigator.clipboard.write(data);

    copying = true;
    setTimeout(() => (copying = false), 300);
  }
</script>

<p class="relative flex items-center gap-x-1 text-lg text-zinc-300">
  <small
    class="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 transition-opacity"
    class:opacity-100={copying}>Copied!</small
  >
  <i class="iconify size-5 lucide--rocket motion-safe:animate-pulse"></i>
  <button
    type="button"
    class="sr-only cursor-pointer rounded-md font-mono focus:outline-none focus:ring-1 focus:ring-blaze-300 sm:not-sr-only sm:px-1"
    data-addr={mint}
    onclick={copyAddress}>{mint}</button
  >
  <button
    type="button"
    data-addr={mint}
    class="cursor-pointer rounded-md px-1 focus:outline-none sm:hidden"
    onclick={copyAddress}
    >{mint.substring(0, 5)}...{mint.substring(mint.length - 4, mint.length)}
  </button>
</p>
