<script>
  import GridPattern from "$lib/components/GridPattern.svelte";
  import SectionHeading from "$lib/components/SectionHeading.svelte";
</script>

<section
  id="creator"
  aria-labelledby="creator-title"
  class="relative scroll-mt-14 pt-8 pb-3 sm:scroll-mt-32 sm:pt-10 sm:pb-16 lg:pt-16"
>
  <div
    class="absolute inset-x-0 top-1/2 bottom-0 mask-[linear-gradient(transparent,white)] text-zinc-100/10"
  >
    <GridPattern x="50%" y="100%" />
  </div>
  <div class="relative mx-auto max-w-5xl pt-16 sm:px-6">
    <div class="sm:rounded-6xl bg-zinc-950 pt-px">
      <div
        class="relative mx-auto -mt-16 h-44 w-44 overflow-hidden rounded-full bg-zinc-800 md:float-right md:h-64 md:w-64 md:[shape-outside:circle(40%)] lg:mr-20 lg:h-72 lg:w-72"
      >
        <enhanced:img
          class="absolute inset-0 h-full w-full object-cover"
          src="$lib/images/avatars/author.png"
          alt="Creator bio"
          sizes="(min-width: 1024px) 18rem, (min-width: 768px) 16rem, 11rem"
        />
      </div>
      <div class="px-4 py-10 sm:px-10 sm:py-16 md:py-20 lg:px-20 lg:py-32">
        <SectionHeading number="5" id="creator-title">Creator</SectionHeading>
        <p
          class="font-michroma mt-8 text-5xl font-extrabold tracking-tight text-balance sm:text-6xl"
        >
          <span class="block text-orange-600">
            <span class="hidden sm:inline">My name is</span>
            Yann Eves –
          </span>
          the dev behind ‘Persona’.
        </p>
        <p class="text-foreground-alt mt-4 text-lg tracking-tight">
          I’ve spent over 15 years building for the web, serving tens of
          millions of users. In January 2025, we launched our AI Agent platform,
          and demand from the web2 space quickly surged. Today, I’m focused on
          helping shape an agentic web that moves beyond advertising and
          supports human progress.
        </p>
        <p class="mt-8">
          <a
            rel="me"
            href="https://x.com/yanniibesu"
            class="inline-flex items-center text-base font-medium tracking-tight text-zinc-100"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              class="h-10 w-10 fill-current"
            >
              <path
                d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8132L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z"
              />
            </svg>
            <span class="ml-4">Follow on X</span>
          </a>
        </p>
      </div>
    </div>
  </div>
</section>
