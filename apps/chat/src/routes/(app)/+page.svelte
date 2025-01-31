<script>
  import account from "$lib/stores/account.svelte.js";
  import { fade } from "svelte/transition";

  const { data } = $props();

  const numberStyle = new Intl.NumberFormat();
  account.balance = data.balance;

  let input = $state(null);
  let prompt = $state.raw("");

  let expanded = $state.raw(false);
  function expand() {
    expanded = true;
    requestAnimationFrame(() => input?.focus());
  }
</script>

<article
  class="grid h-full min-w-0 content-center gap-y-8 p-4 sm:max-h-[68rem]"
>
  <mark
    class="from-blaze-300 to-blaze-500 mx-auto bg-transparent bg-linear-to-r bg-clip-text text-5xl font-semibold text-transparent select-none"
  >
    WW<br />W .
  </mark>
  <h1
    class="text-text-200 relative flex flex-col items-center text-2xl font-medium"
  >
    <span>Welcome to $BROWSER DAO</span>
    <small class="text-base font-light"
      >Control the world wide web with AI</small
    >
  </h1>
  <form
    class="relative flex min-w-0 flex-col items-center gap-y-4"
    method="POST"
    action="/new"
    autocomplete="off"
  >
    <legend class="text-text-200 font-light">I want to explore:</legend>
    <input
      type="url"
      name="url"
      class="bg-bg-100 text-text-400 hover:ring-blaze-300 focus:ring-blaze-300 w-full rounded-full border-none px-6 py-4 ring-2 shadow-xs ring-transparent placeholder:text-gray-400 focus:outline-hidden"
      placeholder="Enter a link"
      required
    />
    <textarea name="prompt" class="hidden" value={prompt}></textarea>
    <div
      class="hover:ring-blaze-300 bg-bg-100 text-text-400 has-focus:ring-blaze-300 relative flex w-full flex-col justify-between ring-2 shadow-xs ring-transparent"
      class:rounded-full={!expanded}
      class:rounded-2xl={expanded}
    >
      {#if !expanded}
        <button
          type="button"
          class="w-full cursor-text px-6 py-4 text-left text-gray-400 focus:outline-hidden"
          onclick={expand}
          onfocus={expand}>Tell me what to do&hellip;</button
        >
      {/if}
      <p
        class="text-text-400 relative block max-h-64 max-w-full overflow-hidden overflow-y-auto break-words transition-[min-height] duration-100 ease-out focus:outline-hidden"
        class:h-0={!expanded}
        class:min-h-0={!expanded}
        class:min-h-32={expanded}
        class:px-6={expanded}
        class:py-4={expanded}
        contenteditable
        bind:textContent={prompt}
        bind:this={input}
      ></p>
      <div
        class="flex items-center justify-end gap-x-2 px-2.5 py-2"
        class:absolute={!expanded}
        class:top-0={!expanded}
        class:right-0={!expanded}
        class:h-full={!expanded}
      >
        {#if expanded}
          <button
            type="button"
            class="hover:ring-blaze-300 focus:ring-blaze-300 mr-auto flex items-center rounded-lg p-2 ring-2 ring-transparent focus:outline-hidden"
            in:fade={{ duration: 150 }}
          >
            <i class="iconify lucide--paperclip size-6"></i>
            <span class="sr-only">Add attachment</span>
          </button>
          <p class="text-sm text-gray-400" in:fade={{ duration: 150 }}>
            {numberStyle.format(account.balance)} credits
          </p>
          <button
            type="button"
            class="hover:ring-blaze-300 focus:ring-blaze-300 flex items-center rounded-lg p-2 ring-2 ring-transparent focus:outline-hidden"
            in:fade={{ duration: 150 }}
          >
            <i class="iconify lucide--mic size-6"></i>
            <span class="sr-only">Dictate</span>
          </button>
        {/if}
        <button
          type="submit"
          class="bg-blaze-400 flex cursor-pointer items-center p-2 text-white ring-4 ring-transparent hover:ring-white focus:ring-white focus:outline-hidden"
          class:rounded-full={!expanded}
          class:rounded-lg={expanded}
        >
          <i class="iconify lucide--send size-6"></i>
          <span class="sr-only">Go</span>
        </button>
      </div>
    </div>
  </form>
</article>
