<script>
  // import formatDate from '$lib/formatters/formatDate'

  let { title, date, children } = $props();
</script>

<pre>{date}</pre>

<section class="mt-16 pb-16 lg:mt-32">
  <nav class="relative mx-auto max-w-2xl lg:max-w-5xl">
    <a
      href="/news"
      aria-label="Go back to announcements"
      class="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-gray-800/5 ring-1 ring-gray-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-gray-700/50 dark:bg-gray-800 dark:ring-0 dark:ring-white/10 dark:hover:border-gray-700 dark:hover:ring-white/20"
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        class="h-4 w-4 stroke-gray-500 transition group-hover:stroke-gray-700 dark:stroke-gray-500 dark:group-hover:stroke-gray-400"
      >
        <path
          d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  </nav>
  <article class="mx-auto max-w-prose">
    <header class="flex flex-col">
      <h1
        class="mt-6 text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl dark:text-gray-100"
      >
        {title}
      </h1>
      <time
        dateTime={date}
        class="order-first flex items-center text-base text-gray-400 dark:text-gray-500"
      >
        <span class="h-4 w-0.5 rounded-full bg-gray-200 dark:bg-gray-500"
        ></span>
        <span class="ml-3">
          01 January 1970
          <!-- {formatDate(date)} -->
        </span>
      </time>
    </header>
    <section class="prose mt-8 dark:prose-invert">
      {@render children()}
    </section>
  </article>
</section>
