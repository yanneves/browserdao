<script>
  import Comparison from "$lib/components/Comparison.svelte";
  import Creator from "$lib/components/Creator.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import Introduction from "$lib/components/Introduction.svelte";
  import NavBar from "$lib/components/NavBar.svelte";
  import Presale from "$lib/components/Presale.svelte";
  import Resources from "$lib/components/Resources.svelte";
  import Testimonial from "$lib/components/Testimonial.svelte";
  import Testimonials from "$lib/components/Testimonials.svelte";
  import Traits from "$lib/components/Traits.svelte";
  import Waitlist from "$lib/components/Waitlist.svelte";
  import avatarImage1 from "$lib/images/avatars/avatar-1.png?enhanced&width=48&height=48";
  import avatarImage2 from "$lib/images/avatars/avatar-2.png?enhanced&width=48&height=48";
</script>

<Hero />
<Introduction />
<NavBar />
<Traits />
<Testimonial
  id="testimonial-from-tommy-stroman"
  author={{
    name: "Tommy Stroman",
    role: "Front-end developer",
    image: avatarImage1,
  }}
>
  <p>
    “I didn’t know a thing about icon design until I read this book. Now I can
    create any icon I need in no time. Great resource!”
  </p>
</Testimonial>
<Comparison />
<Testimonial
  id="testimonial-from-gerardo-stark"
  author={{
    name: "Gerardo Stark",
    role: "Creator of Pandemicons",
    image: avatarImage2,
  }}
>
  <p>
    “I’ve tried to create my own icons in the past but quickly got frustrated
    and gave up. Now I sell my own custom icon sets online.”
  </p>
</Testimonial>
<Resources />
<Waitlist />
<Presale />
<Testimonials />
<Creator />
<Footer />
