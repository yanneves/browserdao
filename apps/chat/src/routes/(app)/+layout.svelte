<script>
  import Shell from "$lib/components/Shell.svelte";

  // eslint-disable-next-line svelte/valid-prop-names-in-kit-pages
  let { children } = $props();
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
    <ul class="flex flex-1 flex-col gap-y-7">
      <li>
        <div class="text-text-200 text-xs/6 font-semibold">Recent</div>
        <ul class="-mx-2 mt-2 space-y-1">
          <li>
            <a
              href="/view/:id"
              class="group text-text-200 hover:text-blaze-300 focus:ring-blaze-300 focus:text-blaze-300 flex gap-x-3 rounded-lg p-2 text-sm/6 font-semibold focus:ring focus:outline-hidden"
            >
              <span
                class="text-text-200 border-bg-200 flex size-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium group-hover:text-white"
                >B</span
              >
              <span class="truncate">...</span>
            </a>
          </li>
        </ul>
      </li>
      <li class="mt-auto flex justify-end py-4">
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
