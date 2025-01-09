<script>
  import { onMount } from "svelte";

  // Constants
  const COUNTDOWN_FROM = "2025-01-16";
  const SECOND = 1000;
  const MINUTE = SECOND * 60;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;

  let days = $state.raw(null);
  let hours = $state.raw(null);
  let minutes = $state.raw(null);
  let seconds = $state.raw(null);

  let timer;

  const handleCountdown = async () => {
    const end = new Date(COUNTDOWN_FROM);
    const now = new Date();
    const distance = +end - +now;

    if (distance > 0) {
      days = Math.floor(distance / DAY);
      hours = Math.floor((distance % DAY) / HOUR);
      minutes = Math.floor((distance % HOUR) / MINUTE);
      seconds = Math.floor((distance % MINUTE) / SECOND);

      setTimeout(handleCountdown, SECOND);
    }
  };

  onMount(() => {
    handleCountdown();
    return () => clearTimeout(timer);
  });
</script>

<div class="mx-auto flex h-24 w-full max-w-5xl items-center bg-white md:h-36">
  <div class="flex flex-col items-center justify-center gap-1 md:gap-2">
    <input
      type="text"
      class="w-full bg-transparent text-center font-mono text-2xl font-medium text-black md:text-4xl lg:text-6xl xl:text-7xl"
      value={days}
      disabled
    />
    <span class="text-zinc-500 md:text-lg lg:text-2xl">days</span>
  </div>
  <div class="flex flex-col items-center justify-center gap-1 md:gap-2">
    <input
      type="text"
      class="w-full bg-transparent text-center font-mono text-2xl font-medium text-black md:text-4xl lg:text-6xl xl:text-7xl"
      value={hours}
      disabled
    />
    <span class="text-zinc-500 md:text-lg lg:text-2xl">hours</span>
  </div>
  <div class="flex flex-col items-center justify-center gap-1 md:gap-2">
    <input
      type="text"
      class="w-full bg-transparent text-center font-mono text-2xl font-medium text-black md:text-4xl lg:text-6xl xl:text-7xl"
      value={minutes}
      disabled
    />
    <span class="text-zinc-500 md:text-lg lg:text-2xl">minutes</span>
  </div>
  <div class="flex flex-col items-center justify-center gap-1 md:gap-2">
    <input
      type="text"
      class="w-full bg-transparent text-center font-mono text-2xl font-medium text-black md:text-4xl lg:text-6xl xl:text-7xl"
      value={seconds}
      disabled
    />
    <span class="text-zinc-500 md:text-lg lg:text-2xl">seconds</span>
  </div>
</div>
