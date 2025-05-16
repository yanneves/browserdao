<script>
  import GridPattern from "$lib/components/GridPattern.svelte";
</script>

<footer class="relative pt-5 pb-20 sm:pt-14 sm:pb-32">
  <div
    class="absolute inset-x-0 top-0 h-32 mask-[linear-gradient(white,transparent)] text-zinc-100/10"
  >
    <GridPattern x="50%" />
  </div>
  <div class="relative text-center text-sm text-zinc-400">
    <p>Copyright &copy; {new Date().getFullYear()} Browser.icu</p>
    <p>All rights reserved.</p>
  </div>
</footer>
