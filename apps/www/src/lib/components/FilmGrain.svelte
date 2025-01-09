<script>
  const { children } = $props();
</script>

<aside class="film-grain pointer-events-none absolute inset-0">
  {@render children()}
</aside>

<style>
  .film-grain {
    mask-type: luminance;
    mask: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PScwIDAgNDAwIDQwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4NCiAgPGZpbHRlciBpZD0nbm9pc2VGaWx0ZXInPg0KICAgIDxmZVR1cmJ1bGVuY2UgDQogICAgICB0eXBlPSdmcmFjdGFsTm9pc2UnIA0KICAgICAgYmFzZUZyZXF1ZW5jeT0nMS4xJyANCiAgICAgIG51bU9jdGF2ZXM9JzYnIA0KICAgICAgc3RpdGNoVGlsZXM9J3N0aXRjaCcvPg0KICA8L2ZpbHRlcj4NCiAgDQogIDxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbHRlcj0ndXJsKCNub2lzZUZpbHRlciknLz4NCjwvc3ZnPg==);
  }

  /* Decoded SVG: */
  /* <svg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'>
    <filter id='noiseFilter'>
      <feTurbulence
        type='fractalNoise'
        baseFrequency='1.1'
        numOctaves='6'
        stitchTiles='stitch'/>
    </filter>
    
    <rect width='100%' height='100%' filter='url(#noiseFilter)'/>
  </svg> */
</style>
