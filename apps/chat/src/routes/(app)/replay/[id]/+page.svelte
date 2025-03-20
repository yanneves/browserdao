<script>
  import { afterNavigate } from "$app/navigation";
  import { fade } from "svelte/transition";

  const { data } = $props();
  let render = $state.raw(null);
  let events = $state.raw([]);
  let chat = $state(null);

  let browserOpen = $state.raw(true);
  function toggleBrowser() {
    browserOpen = !browserOpen;
  }

  afterNavigate(async () => {
    render = null;
    events = [];

    const res = await fetch(`/api/replay/${data?.replay.id}/events`);
    const json = await res.json();

    render = json.render;
    events = json.events;

    chat?.scrollTo(0, chat?.scrollHeight);
  });
</script>

<article class="flex h-full flex-col gap-y-6 p-4">
  <div class="relative flex flex-col gap-y-6">
    <div class="rounded-2xl border border-gray-300">
      <div
        class="bg-bg-100 flex items-center justify-between gap-x-2 rounded-t-2xl border-b border-gray-400 px-2.5 py-2"
        class:rounded-b-2xl={!browserOpen}
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
          <span class="cursor-default truncate text-gray-500"
            >{data?.replay.url}</span
          >
        </div>
        <button
          type="button"
          class="bg-bg-50 ring-bg-200 hover:ring-blaze-300 focus:ring-blaze-300 flex cursor-pointer items-center rounded-full p-2 ring-2 transition-transform delay-50 duration-150 ease-in-out focus:outline-hidden {browserOpen
            ? 'absolute right-8 bottom-0 z-10 translate-y-1/2'
            : 'rotate-180'}"
          onclick={toggleBrowser}
        >
          <span class="sr-only">Toggle browser view</span>
          <i
            class="iconify lucide--chevron-up"
            class:size-5={browserOpen}
            class:size-4={!browserOpen}
          ></i>
        </button>
      </div>
      {#if browserOpen}
        <figure
          class="bg-bg-100 relative grid rounded-b-2xl transition-transform duration-150 ease-out empty:aspect-[16/10]"
        >
          {#if render}
            <img
              alt="Browser viewport displaying the agent's activity"
              class="h-full w-full rounded-b-2xl object-scale-down"
              src={render}
              in:fade={{ duration: 150 }}
            />
          {/if}
        </figure>
      {/if}
    </div>
  </div>

  <ul class="relative grow space-y-6 overflow-y-auto" bind:this={chat}>
    <li class="relative flex gap-x-2">
      <div class="relative flex size-6 shrink-0 items-center justify-center">
        <i class="iconify text-blaze-400 lucide--terminal size-4"></i>
      </div>
      <p
        class="overflow-hidden px-3 text-sm leading-6 break-words whitespace-break-spaces"
      >
        {data?.replay.prompt}
      </p>
    </li>
    {#each events as { id, type, payload } (id)}
      <li class="relative flex gap-x-2">
        {#if type === "prompt"}
          <div
            class="relative flex size-6 shrink-0 items-center justify-center"
          >
            <i class="iconify lucide--terminal text-blaze-400 size-4"></i>
          </div>
          <p
            class="overflow-hidden px-3 text-sm leading-6 break-words whitespace-break-spaces"
          >
            {payload.data.text}
          </p>
        {:else}
          <div
            class="relative flex size-6 shrink-0 items-center justify-center"
          >
            <i
              class="iconify"
              class:size-4={payload.data.status !== "live"}
              class:text-blaze-400={payload.data.status !== "live"}
              class:size-2={payload.data.status === "live"}
              class:text-gray-300={payload.data.status === "live"}
              class:lucide--badge={payload.data.status === "live"}
              class:lucide--badge-help={payload.data.status === "question"}
              class:lucide--badge-check={payload.data.status === "complete"}
              class:lucide--badge-alert={payload.data.status === "exhausted"}
              class:lucide--badge-x={payload.data.status === "quit"}
            ></i>
          </div>
          <p
            class="overflow-hidden px-3 text-sm leading-6 break-words whitespace-break-spaces"
          >
            {payload.data.thoughts}
          </p>
        {/if}
      </li>
    {:else}
      <li class="flex size-6 items-center justify-center">
        <i class="iconify svg-spinners--3-dots-move size-4 text-blaze-400"></i>
      </li>
    {/each}
  </ul>
</article>
