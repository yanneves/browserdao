<script>
  import Button from "$lib/components/Button.svelte";
  import Container from "$lib/components/Container.svelte";
  import Pattern from "$lib/components/Pattern.svelte";
</script>

<section
  id="waitlist"
  aria-label="Free preview"
  class="scroll-mt-14 bg-orange-600 sm:scroll-mt-32"
>
  <div class="overflow-hidden lg:relative">
    <Container
      size="md"
      class="relative grid grid-cols-1 items-end gap-y-12 py-20 lg:static lg:grid-cols-2 lg:py-28 xl:py-32"
    >
      <Pattern
        class="absolute -top-32 left-0 w-full sm:-top-5 sm:left-3/4 sm:ml-8 sm:w-auto md:left-2/3 lg:right-2 lg:left-auto lg:ml-0 xl:right-auto xl:left-2/3"
      />
      <div>
        <h2
          class="font-michroma text-5xl font-extrabold tracking-tight text-white sm:w-3/4 sm:text-6xl md:w-2/3 lg:w-auto"
        >
          Get early access to the presale
        </h2>
        <p class="mt-4 text-lg tracking-tight text-orange-200">
          Enter your email address and you’ll be kept informed for when the
          presale goes live to buy at the lowest floor price.
        </p>
      </div>
      <form class="lg:pl-16">
        <h3 class="text-base font-medium tracking-tight text-white">
          Get notified before everyone else&nbsp;
          <span aria-hidden="true">&rarr;</span>
        </h3>
        <div
          class="mt-4 sm:relative sm:flex sm:items-center sm:py-0.5 sm:pr-2.5"
        >
          <div class="relative sm:static sm:flex-auto">
            <input
              type="email"
              id="email-address"
              required
              aria-label="Email address"
              placeholder="Email address"
              class="peer relative z-10 w-full appearance-none bg-transparent px-4 py-2 text-base text-white placeholder:text-white/70 focus:outline-hidden sm:py-3"
            />
            <div
              class="absolute inset-0 border border-b-4 border-white/20 peer-focus:border-blue-300 peer-focus:bg-orange-500 peer-focus:ring-1 peer-focus:ring-blue-300"
            ></div>
          </div>
          <button
            type="submit"
            color="white"
            class="active:bg-primary mt-4 w-full cursor-pointer px-3 py-2 hover:bg-white hover:text-black active:text-white sm:relative sm:z-10 sm:mt-0 sm:w-auto sm:flex-none"
          >
            Remind me
          </button>
        </div>
      </form>
    </Container>
  </div>
</section>
