<script>
  import agent from "$lib/agent.svelte.js";
  import account from "$lib/stores/account.svelte.js";
  import browser from "$lib/stores/browser.svelte.js";
  import feed from "$lib/stores/feed.svelte.js";
  import { fade } from "svelte/transition";

  const { data, form } = $props();
  const { session } = data;

  let chat = $state(null);

  let prompt = $state.raw("");
  let launching = $state.raw(true);
  let prompting = $state.raw(true);

  $effect(() => {
    if (feed.status) {
      const { offsetHeight, scrollHeight, scrollTop } = chat;
      if (scrollHeight <= scrollTop + offsetHeight + 100) {
        chat?.scrollTo(0, scrollHeight);
      }
    }
  });

  $effect(() => {
    if (feed.status !== "idle") {
      launching = false;
    }
  });

  $effect(() => {
    if (feed.status !== "question") {
      prompting = false;
    }
  });

  const numberStyle = new Intl.NumberFormat();
  account.balance = data.balance;

  agent.launch(session, form.prompt, form.url);

  function send(event) {
    event.preventDefault();

    if (!prompt) {
      return;
    }

    prompting = true;
    agent.prompt(session, prompt);
  }

  // TODO: hook up to stop button
  // function cancel(event) {
  //   event?.preventDefault();
  //   agent.abort(session);
  // }
</script>

<article class="flex h-full flex-col gap-y-4 p-4">
  <div class="relative flex flex-col gap-y-6">
    <div class="rounded-2xl border border-gray-300">
      <div
        class="bg-bg-100 flex items-center justify-between gap-x-2 rounded-t-2xl border-b border-gray-400 px-2.5 py-2"
      >
        <aside class="flex justify-around space-x-1">
          <div class="h-2.5 w-2.5 rounded-full bg-gray-500"></div>
          <div class="h-2.5 w-2.5 rounded-full bg-gray-500"></div>
          <div class="h-2.5 w-2.5 rounded-full bg-gray-500"></div>
        </aside>
        <div
          class="bg-bg-50 mx-auto flex min-w-0 grow items-center gap-x-2 rounded-lg border border-gray-300 px-4 py-1"
        >
          <i class="iconify lucide--shield size-5 text-gray-500"></i>
          <span class="cursor-default truncate text-gray-500">{form.url}</span>
        </div>
      </div>
      <figure class="bg-bg-100 relative grid aspect-video rounded-b-2xl">
        {#if browser.render}
          <img
            alt="Browser viewport displaying the agent's activity"
            class="h-full w-full rounded-b-2xl object-scale-down"
            src={browser.render}
            in:fade={{ duration: 150 }}
          />
        {/if}
      </figure>
    </div>
  </div>

  <ul class="relative grow space-y-6 overflow-y-auto" bind:this={chat}>
    {#each feed.thoughts as { status, message }, i (i)}
      <li class="relative flex gap-x-2">
        <div class="relative flex size-6 shrink-0 items-center justify-center">
          <i
            class="iconify"
            class:size-4={status !== "live"}
            class:text-blaze-400={status !== "live"}
            class:size-2={status === "live"}
            class:text-gray-300={status === "live"}
            class:lucide--badge={status === "live"}
            class:lucide--badge-help={status === "question"}
            class:lucide--badge-check={status === "complete"}
            class:lucide--badge-alert={status === "exhausted"}
            class:lucide--badge-x={status === "quit"}
            class:lucide--terminal={status === "user"}
          ></i>
        </div>
        <p class="overflow-hidden px-3 text-sm leading-6 break-words">
          {message}
        </p>
      </li>
    {/each}
    {#if launching || feed.status === "thinking"}
      <li class="relative flex gap-x-2">
        <div class="relative flex size-6 shrink-0 items-center justify-center">
          <i class="iconify lucide--badge size-2 text-gray-300"></i>
        </div>
        <p class="flex items-center px-3">
          <span class="sr-only">Agent thinking</span>
          <i class="iconify text-blaze-400 svg-spinners--3-dots-bounce size-5"
          ></i>
        </p>
      </li>
    {/if}
  </ul>

  <form
    class="relative mt-auto flex min-w-0 flex-col items-center gap-y-4"
    onsubmit={send}
    autocomplete="off"
  >
    <textarea name="prompt" class="hidden" value={prompt}></textarea>
    <div
      class="hover:ring-blaze-300 bg-bg-100 text-text-400 has-focus:ring-blaze-300 relative flex w-full flex-col justify-between rounded-2xl ring-2 shadow-xs ring-transparent"
    >
      <p
        class="text-text-400 relative block h-28 max-w-full overflow-hidden overflow-y-auto px-6 py-4 break-words focus:outline-hidden"
        contenteditable
        bind:textContent={prompt}
      ></p>
      <div class="flex items-center justify-end gap-x-2 px-2.5 py-2">
        <button
          type="button"
          class="hover:ring-blaze-300 focus:ring-blaze-300 mr-auto flex items-center rounded-lg p-2 ring-2 ring-transparent focus:outline-hidden"
        >
          <i class="iconify lucide--paperclip size-6"></i>
          <span class="sr-only">Add attachment</span>
        </button>
        <p class="text-sm text-gray-400">
          {numberStyle.format(account.balance)} credits
        </p>
        <button
          type="button"
          class="hover:ring-blaze-300 focus:ring-blaze-300 flex items-center rounded-lg p-2 ring-2 ring-transparent focus:outline-hidden"
        >
          <i class="iconify lucide--mic size-6"></i>
          <span class="sr-only">Dictate</span>
        </button>
        <button
          type="submit"
          class="bg-blaze-400 flex cursor-pointer items-center rounded-lg p-2 text-white ring-4 ring-transparent hover:ring-white focus:ring-white focus:outline-hidden disabled:cursor-default"
          disabled={prompting || feed.status !== "question"}
        >
          <i
            class="iconify lucide--send size-6"
            class:lucide--send={!prompting}
            class:svg-spinners--gooey-balls-1={prompting}
          ></i>
          <span class="sr-only">Go</span>
        </button>
      </div>
    </div>
  </form>
</article>
