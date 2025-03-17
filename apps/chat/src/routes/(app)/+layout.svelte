<script>
  import { page } from "$app/state";
  import Shell from "$lib/components/Shell.svelte";
  import { SvelteSet } from "svelte/reactivity";
  import { slide } from "svelte/transition";

  let { children } = $props();
  let editMode = $state.raw(false);
  let viewArchived = $state.raw(false);
  let replaysData = $state.raw([]);

  const replaySelection = $state.raw(new SvelteSet());

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const SECOND_MS = 1000;
  const MINUTE_MS = SECOND_MS * 60;
  const HOUR_MS = MINUTE_MS * 60;
  const DAY_MS = HOUR_MS * 24;
  const MONTH_MS = DAY_MS * 30;
  const YEAR_MS = DAY_MS * 365;

  const replays = $derived.by(() => {
    const now = Date.now();
    return replaysData?.map((row) => {
      const { id, prompt } = row;

      // Calculate relative time to display
      const parts = id.split("-");
      const highBitsHex = parts[0] + parts[1].slice(0, 4);
      const timestampInMilliseconds = parseInt(highBitsHex, 16);
      const date = new Date(timestampInMilliseconds);
      const diff = now - date;

      let created = "a moment ago";
      if (diff < MINUTE_MS) {
        created = rtf.format(-Math.round(diff / SECOND_MS), "seconds");
      } else if (diff < HOUR_MS) {
        created = rtf.format(-Math.round(diff / MINUTE_MS), "minutes");
      } else if (diff < DAY_MS) {
        created = rtf.format(-Math.round(diff / HOUR_MS), "hours");
      } else if (diff < MONTH_MS) {
        created = rtf.format(-Math.round(diff / DAY_MS), "days");
      } else if (diff < YEAR_MS) {
        created = rtf.format(-Math.round(diff / MONTH_MS), "months");
      } else if (diff >= YEAR_MS) {
        created = rtf.format(-Math.round(diff / YEAR_MS), "years");
      }

      let url = row.url;
      let hostname = row.url;
      try {
        // Shorten url for display
        const parsed = new URL(row.url);
        const { pathname } = parsed;

        hostname = parsed.hostname;
        url = pathname.length > 1 ? hostname + pathname : hostname;
      } catch (err) {
        console.warn(err);
      }

      return { id, prompt, url, hostname, date, created };
    });
  });

  async function archiveReplays(set) {
    const arr = Array.from(set);

    replaysData = replaysData.filter(({ id }) => !set.has(id));
    replaySelection.clear();

    await fetch(
      viewArchived ? "/api/replays/restore" : "/api/replays/archive",
      {
        method: "PUT",
        body: JSON.stringify(arr),
      },
    );
  }

  // TODO: support multiselect on shift-click
  function handleReplaySelection(event) {
    if (editMode) {
      const { id } = event.currentTarget;
      event.preventDefault();

      if (replaySelection.has(id)) {
        replaySelection.delete(id);
        return;
      }

      replaySelection.add(id);
    }
  }

  $effect(async () => {
    const controller = new AbortController();
    const { signal } = controller;

    const res = await fetch(
      viewArchived ? "/api/replays/archive" : "/api/replays",
      { signal },
    );
    const json = await res.json();
    replaysData = json.replays;

    return () => {
      controller.abort();
    };
  });
</script>

<Shell>
  {#snippet header()}
    <button
      type="button"
      class="bg-blaze-400 ml-auto flex cursor-pointer items-center rounded-full px-8 py-2 text-black ring-4 ring-transparent hover:ring-black focus:ring-black focus:outline-hidden"
      >Connect</button
    >
  {/snippet}

  {#snippet nav()}
    <ul class="flex flex-1 flex-col overflow-y-hidden">
      <li class="flex flex-col gap-y-2 overflow-y-hidden py-1">
        <p class="text-text-200 flex items-center gap-x-1 px-4 font-light">
          <span class="mr-auto">{viewArchived ? "Archived" : "Recent"}</span>
          {#if editMode}
            <button
              type="button"
              class="focus:ring-blaze-300 text-blaze-300 cursor-pointer rounded-lg p-2 text-xs focus:ring-2 focus:outline-hidden"
              onclick={() => {
                editMode = false;
                replaySelection.clear();
              }}>Back</button
            >
            {#if replaySelection.size}
              <button
                type="button"
                class="focus:ring-blaze-300 cursor-pointer rounded-lg p-2 text-xs focus:ring-2 focus:outline-hidden"
                class:text-blaze-300={viewArchived}
                class:text-blaze-700={!viewArchived}
                onclick={() => archiveReplays(replaySelection)}
                >{viewArchived ? "Restore" : "Archive"} ({replaySelection.size})</button
              >
            {/if}
          {:else}
            {#if viewArchived}
              <button
                type="button"
                class="focus:ring-blaze-300 text-blaze-300 cursor-pointer rounded-lg p-2 text-xs focus:ring-2 focus:outline-hidden"
                onclick={() => (viewArchived = false)}>Back</button
              >
            {:else}
              <button
                type="button"
                class="text-blaze-700 focus:ring-blaze-300 flex cursor-pointer items-center rounded-lg p-2 focus:ring-2 focus:outline-hidden"
                onclick={() => (viewArchived = true)}
              >
                <span class="sr-only">View Archived</span>
                <i class="iconify lucide--archive size-4 shrink-0"></i>
              </button>
            {/if}
            <button
              type="button"
              class="text-blaze-300 focus:ring-blaze-300 flex cursor-pointer items-center rounded-lg p-2 focus:ring-2 focus:outline-hidden"
              onclick={() => (editMode = true)}
            >
              <span class="sr-only">Manage</span>
              <i class="iconify lucide--edit size-4 shrink-0"></i>
            </button>
          {/if}
        </p>
        <ul
          class="focus:ring-blaze-300 flex-1 space-y-2 overflow-y-auto pt-2 pb-1 focus:ring-2 focus:outline-hidden"
        >
          <li class="px-4">
            <a
              href="/"
              class="border-bg-200 bg-bg-100 text-text-200 hover:text-blaze-300 hover:border-blaze-300 focus:border-blaze-300 focus:text-blaze-300 flex items-center gap-x-4 rounded-2xl border-2 border-dashed p-4 text-sm focus:outline-hidden"
            >
              <i class="iconify material-symbols--add size-6"></i>
              Start new chat
            </a>
          </li>
          {#each replays as { id, prompt, url, hostname, date, created } (id)}
            <li class="px-4" out:slide={{ duration: 150 }}>
              <a
                {id}
                href="/replay/{id}"
                aria-current={page.params?.id === id ? "page" : null}
                class="text-text-200 focus:ring-blaze-300 hover:bg-bg-100 focus:bg-bg-100 aria-[current=page]:bg-bg-100 block rounded-2xl p-2 text-sm font-light focus:ring-2 focus:outline-hidden"
                onclick={handleReplaySelection}
              >
                <span class="flex items-center gap-x-4">
                  <span class="min-w-0 flex-1">
                    <span class="flex items-center justify-start gap-x-1">
                      <img
                        src="https://icons.duckduckgo.com/ip3/{hostname}.ico"
                        alt="{hostname} favicon"
                        class="size-4"
                      />
                      <span class="text-blaze-300 truncate">{url}</span>
                      <time
                        datetime={date.toISOString()}
                        class="ml-auto shrink-0 text-xs text-gray-400"
                        >{created}</time
                      >
                    </span>
                    <span class="line-clamp-2 text-xs">{prompt}</span>
                  </span>
                  {#if editMode}
                    <i
                      class="iconify text-blaze-300 size-4 shrink-0"
                      class:lucide--square-check-big={replaySelection.has(id)}
                      class:lucide--box-select={!replaySelection.has(id)}
                    ></i>
                  {/if}
                </span>
              </a>
            </li>
          {/each}
        </ul>
      </li>
      <li class="mt-auto flex justify-end px-4 py-8">
        <button
          type="button"
          class="ring-bg-200 hover:text-blaze-700 hover:ring-blaze-800 focus:text-blaze-700 focus:ring-blaze-800 text-text-200 flex cursor-pointer items-center gap-x-2 rounded-full px-4 py-2 text-sm ring-2 focus:outline-hidden"
        >
          <i class="iconify material-symbols--square-rounded size-3"></i>
          Stop All Chats
        </button>
      </li>
    </ul>
  {/snippet}

  {#snippet main()}
    {@render children()}
  {/snippet}
</Shell>
