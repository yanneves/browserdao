<script>
  import Container from "$lib/components/Container.svelte";
  import avatarImage3 from "$lib/images/avatars/avatar-3.png?enhanced&width=48&height=48";
  import avatarImage4 from "$lib/images/avatars/avatar-4.png?enhanced&width=48&height=48";
  import avatarImage5 from "$lib/images/avatars/avatar-5.png?enhanced&width=48&height=48";
  import avatarImage6 from "$lib/images/avatars/avatar-6.png?enhanced&width=48&height=48";
  import avatarImage7 from "$lib/images/avatars/avatar-7.png?enhanced&width=48&height=48";
  import avatarImage8 from "$lib/images/avatars/avatar-8.png?enhanced&width=48&height=48";
  import avatarImage9 from "$lib/images/avatars/avatar-9.png?enhanced&width=48&height=48";
  import avatarImage10 from "$lib/images/avatars/avatar-10.png?enhanced&width=48&height=48";
  import avatarImage11 from "$lib/images/avatars/avatar-11.png?enhanced&width=48&height=48";

  let isExpanded = $state.raw(false);

  const previewLimit = 2;
  const testimonials = [
    [
      {
        content:
          "Mira’s teaching style is second to none. Everything was easy to follow every step of the way.",
        author: {
          name: "Antonio Littel",
          role: "Frontend Developer",
          image: avatarImage3,
        },
      },
      {
        content:
          "Even though I was excited to learn, I was pessimistic that I wouldn’t actually ever get good enough to design my own icons. I was wrong — this book is all I needed.",
        author: {
          name: "Lynn Nolan",
          role: "Growth Marketer",
          image: avatarImage4,
        },
      },
      {
        content:
          "I’ve been employed as a professional icon designer for years and still learned tons of new tricks that have made my work even better",
        author: {
          name: "Krista Prosacco",
          role: "Professional Designer",
          image: avatarImage9,
        },
      },
    ],
    [
      {
        content:
          "I run an ecommerce store selling rare vintage gummy bears and could never find a good gummy bear icon. Now I can design my own in minutes.",
        author: {
          name: "Cameron Considine",
          role: "Entrepreneur",
          image: avatarImage7,
        },
      },
      {
        content:
          "The complete package is worth it for the weekly teardown videos alone. I’ve learned so much watching Mira take apart other icons and recreate them from scratch.",
        author: {
          name: "Regina Wisoky",
          role: "Design Student",
          image: avatarImage11,
        },
      },
      {
        content:
          "I didn’t expect to find a lot of value in the community but now I’m in there for at least an hour every day picking up tips from other designers.",
        author: {
          name: "Vernon Cummerata",
          role: "UI Engineer",
          image: avatarImage8,
        },
      },
    ],
    [
      {
        content:
          "I couldn’t believe how fast Mira moved in Figma compared to my own workflow. I’m designing icons more accurately in half the time with the shortcuts I learned from her videos.",
        author: {
          name: "Steven Hackett",
          role: "Bootcamp Instructor",
          image: avatarImage5,
        },
      },
      {
        content:
          "I never thought I would enjoy designing icons but using the ideas in this book, it’s become a great way for me to relax while still being creative.",
        author: {
          name: "Carla Schoen",
          role: "Startup Founder",
          image: avatarImage10,
        },
      },
      {
        content:
          "All I can say is wow — this is easily the best icon design resource I’ve ever encountered.",
        author: {
          name: "Leah Kiehn",
          role: "Creative Director",
          image: avatarImage6,
        },
      },
    ],
  ];
</script>

{#snippet Testimonial(author, content)}
  <figure class="rounded-4xl p-8 shadow-md ring-1 ring-zinc-900/5">
    <blockquote>
      <p
        class="text-lg tracking-tight text-zinc-100 before:content-['“'] after:content-['”']"
      >
        {content}
      </p>
    </blockquote>
    <figcaption class="mt-6 flex items-center">
      <div class="overflow-hidden rounded-full bg-zinc-950">
        <enhanced:img
          class="h-12 w-12 object-cover"
          src={author.image}
          alt="Profile of testimonial author"
        />
      </div>
      <div class="ml-4">
        <div class="text-base/6 font-medium tracking-tight text-zinc-100">
          {author.name}
        </div>
        <div class="mt-1 text-sm text-zinc-400">{author.role}</div>
      </div>
    </figcaption>
  </figure>
{/snippet}

<section class="py-8 sm:py-10 lg:py-16">
  <Container class="text-center">
    <h2 class="font-display text-4xl font-bold tracking-tight text-zinc-100">
      Some words of encouragement from our personas&hellip;
    </h2>
    <p class="mt-4 text-lg tracking-tight text-zinc-400">
      We asked a range of our pilot personas what they think of this project.
      Here's what they had to say about the opportunity to find themselves on
      the agentic web.
    </p>
  </Container>
  <div class="group mt-16" data-expanded={isExpanded ? "" : undefined}>
    <ul
      role="list"
      class="mx-auto grid max-w-2xl grid-cols-1 gap-8 px-4 lg:max-w-7xl lg:grid-cols-3 lg:px-8"
    >
      {#each testimonials.map((column) => column[0]) as testimonial, testimonialIndex (testimonialIndex)}
        <li class="lg:hidden">
          {@render Testimonial(testimonial.author, testimonial.content)}
        </li>
      {/each}
      {#each testimonials as column, columnIndex (columnIndex)}
        <li
          key={columnIndex}
          class="hidden group-data-expanded:list-item lg:list-item"
        >
          <ul role="list">
            {#each column.slice(0, isExpanded ? undefined : previewLimit) as testimonial, testimonialIndex (testimonialIndex)}
              <li
                class={[
                  testimonialIndex === 0 && "hidden lg:list-item",
                  testimonialIndex === 1 && "lg:mt-8",
                  testimonialIndex > 1 && "mt-8",
                ]}
              >
                {@render Testimonial(testimonial.author, testimonial.content)}
              </li>
            {/each}
          </ul>
        </li>
      {/each}
    </ul>
    {#if !isExpanded}
      <div class="mt-10 flex justify-center">
        <button
          type="button"
          class="flex items-center text-base font-medium tracking-tight text-zinc-100 hover:text-zinc-300"
          onclick={() => (isExpanded = true)}
        >
          Read more testimonials
          <svg aria-hidden="true" viewBox="0 0 24 24" class="ml-2 h-6 w-6">
            <path
              d="m17 14-5 5-5-5M12 18.5V5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    {/if}
  </div>
</section>
