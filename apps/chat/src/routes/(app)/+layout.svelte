<script>
  import { page } from "$app/state";
  import Shell from "$lib/components/Shell.svelte";
  import { onMount } from "svelte";

  let { children } = $props();
  let replays = $state.raw([]);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const SECOND_MS = 1000;
  const MINUTE_MS = SECOND_MS * 60;
  const HOUR_MS = MINUTE_MS * 60;
  const DAY_MS = HOUR_MS * 24;
  const MONTH_MS = DAY_MS * 30;
  const YEAR_MS = DAY_MS * 365;

  onMount(async () => {
    const res = await fetch("/api/replays");
    const json = await res.json();

    const now = Date.now();
    replays = json.replays?.map((row) => {
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
      <li class="flex flex-col overflow-y-hidden">
        <p class="text-text-200 px-4 font-light">Recent</p>
        <ul class="mt-4 flex-1 space-y-2 overflow-y-auto pb-1">
          <li class="px-4">
            <a
              href="/"
              class="border-bg-200 bg-bg-100 text-text-200 hover:text-blaze-300 hover:border-blaze-300 focus:border-blaze-300 focus:text-blaze-300 flex items-center gap-x-4 rounded-2xl border-2 border-dashed p-4 text-sm focus:outline-hidden"
            >
              <i class="iconify material-symbols--add size-6"></i>
              Start new chat
            </a>
          </li>
          {#each replays?.slice(0, 20) as { id, prompt, url, hostname, date, created } (id)}
            <li class="px-4">
              <a
                href="/replay/{id}"
                aria-current={page.params?.id === id ? "page" : null}
                class="text-text-200 focus:ring-blaze-300 hover:bg-bg-100 focus:bg-bg-100 aria-[current=page]:bg-bg-100 flex h-32 gap-x-2 rounded-2xl p-2 text-sm font-light focus:ring focus:outline-hidden"
              >
                <img
                  src="https://screenshotof.com/{hostname}"
                  class="bg-bg-200 aspect-square rounded-2xl object-cover"
                  alt="Screenshot of {hostname}"
                />
                <span class="block min-w-0 space-y-2">
                  <span
                    class="text-blaze-300 flex min-w-0 items-center gap-x-1"
                  >
                    <img
                      src="https://icons.duckduckgo.com/ip3/{hostname}.ico"
                      alt="{hostname} favicon"
                      class="size-4"
                    />
                    <span class="truncate">{url}</span>
                  </span>
                  <time
                    datetime={date.toISOString()}
                    class="inline-block text-xs text-gray-400">{created}</time
                  >
                  <span class="line-clamp-3 text-xs">{prompt}</span>
                </span>
              </a>
            </li>
          {/each}
          {#each replays?.slice(20) as { id, prompt, url, date, created } (id)}
            <li class="px-4">
              <a
                href="/replay/{id}"
                aria-current={page.params?.id === id ? "page" : null}
                class="text-text-200 focus:ring-blaze-300 hover:bg-bg-100 focus:bg-bg-100 aria-[current=page]:bg-bg-100 block rounded-2xl p-2 text-sm font-light focus:ring focus:outline-hidden"
              >
                <span class="flex justify-between gap-x-1">
                  <span class="text-blaze-300 truncate">{url}</span>
                  <time
                    datetime={date.toISOString()}
                    class="shrink-0 text-xs text-gray-400">{created}</time
                  >
                </span>
                <span class="line-clamp-2 text-xs">{prompt}</span>
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
