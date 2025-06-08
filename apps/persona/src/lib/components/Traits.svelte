<script>
  import Container from "$lib/components/Container.svelte";
  import SectionHeading from "$lib/components/SectionHeading.svelte";
  import image_amelia from "$lib/images/avatars/amelia.png?enhanced&w=124";
  import AvatarDotsBackground from "./AvatarDotsBackground.svelte";

  const contents = [
    {
      avatar_img: image_amelia,
      identity: {
        Name: "Amelia Curie",
        Age: "Late 20s",
        Gender: "Female",
        Location: "Washington, DC",
        Religion: "Agnostic",
      },
      psychology: {
        MBTI: "ENFP – The Campaigner",
        "Bartle Type": "Explorer",
        CVI: "Innovator/Builder",
        MMPI: {
          Creativity: "High",
          Anxiety: "Moderate",
        },
        TKI: "Collaborating",
      },
      value_map: {
        Needs: [
          "Excellent user experience across platforms",
          "Direct involvement in the creative and design process",
        ],
        Wants: [
          "Visually appealing and modern UI elements",
          "Thorough competitor analysis to drive design decisions",
        ],
        Values: [
          "Clear and consistent communication",
          "Well-documented style guides for team alignment",
        ],
        Fears: [
          "Creating a product that users find frustrating or ineffective",
          "Delivering a poorly received or low-quality design",
        ],
      },
      vocational: {
        Profession: "UI/UX Designer",
        "ONS Social Grade": "B – Middle management, professionals",
        "Employment Status": "Full-time employed at a digital agency",
        "Household Income": "~$85,000/year",
        "Marital Status": "Single",
        "Number of Children": 0,
      },
      success_criteria: [
        "Projects completed on time and within budget",
        "Users find the end product delightful and easy to use",
        "Design outcomes that earn recognition from peers and stakeholders",
      ],
    },
    {
      avatar_img: image_amelia,
      identity: {
        Name: "Javier Castillo",
        Age: "38",
        Gender: "Male",
        Location: "Austin, TX",
        Religion: "Catholic",
      },
      psychology: {
        MBTI: "ISTJ – The Logistician",
        "Bartle Type": "Achiever",
        CVI: "Builder/Innovator",
        MMPI: {
          Responsibility: "High",
          Anxiety: "Low",
        },
        TKI: "Compromising",
      },
      value_map: {
        Needs: ["Discover new techniques", "Stay updated on trends"],
        Wants: ["Insight into trending styles", "Competitive benchmarking"],
        Values: ["Craftsmanship", "Reliability", "Clarity in communication"],
        Fears: ["Producing outdated products", "Losing market relevance"],
      },
      vocational: {
        Profession: "Business Owner – Jewelry & Steel Craftsmanship",
        "ONS Social Grade": "B – Middle management, professionals",
        "Employment Status": "Self-employed",
        "Household Income": "~$120,000/year",
        "Marital Status": "Married",
        "Number of Children": 2,
      },
      success_criteria: [
        "Projects delivered on time and on budget",
        "Products align with current trends and customer expectations",
        "Designs are recognized for their quality and craftsmanship",
        "Customer satisfaction results in repeat business and referrals",
        "Business grows sustainably while maintaining creative integrity",
      ],
    },
    {
      avatar_img: image_amelia,
      identity: {
        Name: "Talia Nguyen",
        Age: "21",
        Gender: "Female",
        Location: "Boston, MA",
        Religion: "None",
      },
      psychology: {
        MBTI: "ISFP – The Adventurer",
        "Bartle Type": "Explorer",
        CVI: "Merchant/Innovator",
        MMPI: {
          Openness: "High",
          Anxiety: "Moderate",
        },
        TKI: "Accommodating",
      },
      value_map: {
        Needs: [
          "Better time management tools",
          "Help finding internships aligned with her major",
        ],
        Wants: [
          "Curated learning content based on interest",
          "Productivity aids like schedule automation",
        ],
        Values: [
          "Creative self-expression",
          "Flexibility and autonomy in learning",
          "Mentorship and peer connection",
        ],
        Fears: [
          "Wasting time on irrelevant courses",
          "Failing to stand out in competitive job markets",
        ],
      },
      vocational: {
        Profession: "Undergraduate Student (Media & Communication Major)",
        "ONS Social Grade": "E",
        "Employment Status": "Part-time café worker",
        "Household Income": "<$20,000/year (student-dependent)",
        "Marital Status": "Single",
        "Number of Children": 0,
      },
      success_criteria: [
        "Graduates on time with strong GPA",
        "Lands a creative internship or portfolio-worthy project",
        "Builds a network of industry contacts before graduation",
      ],
    },
    {
      avatar_img: image_amelia,
      identity: {
        Name: "Jordan Park",
        Age: "34",
        Gender: "Male",
        Location: "San Francisco, CA",
        Religion: "Spiritual but not religious",
      },
      psychology: {
        MBTI: "ENTJ – The Commander",
        "Bartle Type": "Achiever",
        CVI: "Builder/Merchant",
        MMPI: {
          Assertiveness: "High",
          Neuroticism: "Low",
        },
        TKI: "Competing",
      },
      value_map: {
        Needs: [
          "Clear marketing metrics and ROI visibility",
          "Automation for repetitive campaign tasks",
        ],
        Wants: ["Real-time competitor tracking", "Insightful trend forecasts"],
        Values: [
          "Strategic thinking and execution",
          "Data-backed decision-making",
          "Performance transparency",
        ],
        Fears: ["Wasting ad spend", "Falling behind emerging channels"],
      },
      vocational: {
        Profession: "Digital Marketing Strategist",
        "ONS Social Grade": "B",
        "Employment Status": "Employed at a mid-sized tech company",
        "Household Income": "~$120,000/year",
        "Marital Status": "Married",
        "Number of Children": 1,
      },
      success_criteria: [
        "Campaigns that exceed KPIs",
        "Rapid adaptation to new platforms (e.g., TikTok, Threads)",
        "Marketing seen as a growth engine, not just support",
      ],
    },
    {
      avatar_img: image_amelia,
      identity: {
        Name: "Ravi Menon",
        Age: "29",
        Gender: "Male",
        Location: "Seattle, WA",
        Religion: "Hindu",
      },
      psychology: {
        MBTI: "INTP – The Architect",
        "Bartle Type": "Thinker",
        CVI: "Innovator/Banker",
        MMPI: {
          "Problem-Solving": "High",
          "Social Need": "Low",
        },
        TKI: "Avoiding (until logically necessary)",
      },
      value_map: {
        Needs: [
          "Code quality and architecture oversight",
          "Time for focused, uninterrupted work",
        ],
        Wants: [
          "Access to cutting-edge tools and libraries",
          "Transparent issue tracking systems",
        ],
        Values: [
          "Elegance in problem-solving",
          "Documentation and reproducibility",
          "Technical autonomy",
        ],
        Fears: [
          "Tech debt and unscalable decisions",
          "Non-technical stakeholders driving technical scope",
        ],
      },
      vocational: {
        Profession: "Backend Software Engineer",
        "ONS Social Grade": "B",
        "Employment Status": "Employed at a cloud infrastructure startup",
        "Household Income": "~$105,000/year",
        "Marital Status": "Single",
        "Number of Children": 0,
      },
      success_criteria: [
        "Stable, performant systems",
        "Minimal bugs in production",
        "Peer respect for technical decisions",
      ],
    },
  ];

  let active_persona_data = $state(contents[0]);

  let current_persona = $state("Amelia Curie");
  let current_tab = $state("Identity");
  let isDropdownOpen = $state(false);
  let isPersonaDropdownOpen = $state(false);

  function SwitchPersona(name) {
    active_persona_data = contents.find(
      (persona) => persona.identity.Name === name,
    );
    current_persona = name;
  }

  function ChangeTab(name) {
    current_tab = name;
  }
</script>

<section
  id="traits"
  aria-labelledby="traits-title"
  class="scroll-mt-14 pt-16 sm:scroll-mt-32 sm:pt-20 lg:pt-32"
>
  <Container class="space-y-6">
    <SectionHeading number="1" id="traits-title">Traits</SectionHeading>
    <p class="font-michroma mt-8 text-4xl tracking-tight">
      These are the traits that make up a persona.
    </p>
    <ul class="mt-4 text-lg tracking-tight">
      <li>
        <span class="text-foreground-alt font-michroma mr-1 italic">(dice)</span
        > traits can be randomly generated on use
      </li>
      <li>
        <span class="text-foreground-alt font-michroma mr-1 italic"
          >(range)</span
        > traits can be set to a range of values
      </li>
    </ul>

    <div class="showcase mt-12 space-y-4">
      <!-- mobile persona switcher -->
      <div class="sm:hidden">
        <button
          type="button"
          class="border-primary flex w-full items-center gap-4 border pr-4"
          onclick={() => (isPersonaDropdownOpen = !isPersonaDropdownOpen)}
        >
          <enhanced:img
            class="ring-primary w-20 ring"
            alt={`Current Persona: ${current_persona}`}
            src={active_persona_data.avatar_img}
          />
          <span class="text-primary font-michroma flex-1 text-left text-lg"
            >{current_persona}</span
          >
          <i
            class={`iconify ${isPersonaDropdownOpen ? "lucide--chevron-up" : "lucide--chevron-down"} text-primary size-5`}
          ></i>
        </button>

        {#if isPersonaDropdownOpen}
          <div class="mt-2 divide-y border">
            {#each contents as persona (persona.identity.Name)}
              {#if persona.identity.Name !== current_persona}
                <button
                  type="button"
                  class="hover:bg-foreground-alt/20 flex w-full items-center"
                  onclick={() => {
                    SwitchPersona(persona.identity.Name);
                    isPersonaDropdownOpen = false;
                  }}
                >
                  <enhanced:img
                    class="w-20 border-r grayscale"
                    alt={`Switch to ${persona.identity.Name}`}
                    src={persona.avatar_img}
                  />
                  <span class="font-michroma px-4">{persona.identity.Name}</span
                  >
                </button>
              {/if}
            {/each}
          </div>
        {/if}
      </div>

      <!-- desktop persona switcher -->
      <div class="hidden gap-4 sm:flex">
        {#each contents as persona (persona.identity.Name)}
          <button
            type="button"
            class="relative"
            onclick={() => SwitchPersona(persona.identity.Name)}
            aria-labelledby={`label-${persona.identity.Name}`}
          >
            <AvatarDotsBackground
              class={`absolute top-0 right-0 -z-10 block h-24 w-24 ${current_persona === persona.identity.Name ? "text-primary" : "text-foreground-alt opacity-40"}`}
            />
            <enhanced:img
              class={current_persona === persona.identity.Name
                ? "ring-primary pointer-events-none ring"
                : "ring-foreground-alt cursor-pointer opacity-40 ring grayscale hover:opacity-70"}
              alt={`One of our Personas, ${persona.identity.Name}`}
              src={persona.avatar_img}
            />
            {#if current_persona === persona.identity.Name}
              <div class="bg-primary absolute top-0 left-0 h-3 w-3"></div>
            {:else}
              <div
                class="border-foreground-alt absolute top-0 left-0 h-3 w-3 border-r border-b opacity-40"
              ></div>
            {/if}
          </button>
        {/each}
      </div>

      <div class="border-foreground border">
        <p class="font-michroma hidden p-4 sm:block">
          {active_persona_data.identity.Name}
        </p>

        <!-- mobile dropdown -->
        <div class="border-t border-b sm:hidden">
          <button
            type="button"
            class="bg-foreground flex w-full items-center justify-between p-4 text-black"
            onclick={() => (isDropdownOpen = !isDropdownOpen)}
          >
            <span class="font-medium">{current_tab}</span>
            <i
              class={`iconify ${isDropdownOpen ? "lucide--chevron-up" : "lucide--chevron-down"} size-5 text-black`}
            ></i>
          </button>

          {#if isDropdownOpen}
            <div class="border-t">
              {#each ["Identity", "Psychology", "Value Map", "Vocational", "Success Criteria"] as tab (tab)}
                {#if tab !== current_tab}
                  <button
                    type="button"
                    class="hover:bg-foreground-alt/20 block w-full p-4 text-left"
                    onclick={() => {
                      ChangeTab(tab);
                      isDropdownOpen = false;
                    }}
                  >
                    {tab}
                  </button>
                {/if}
              {/each}
            </div>
          {/if}
        </div>

        <!-- desktop tabs -->
        <div class="hidden grid-cols-5 divide-x border-t border-b sm:grid">
          {#each ["Identity", "Psychology", "Value Map", "Vocational", "Success Criteria"] as tab (tab)}
            <button
              type="button"
              onclick={() => ChangeTab(tab)}
              class={`p-2 font-medium ${
                current_tab === tab
                  ? "bg-foreground pointer-events-none text-black"
                  : "hover:bg-foreground-alt/20 cursor-pointer"
              }`}
            >
              {tab}
            </button>
          {/each}
        </div>

        <div class="p-4">
          {#if current_tab === "Identity"}
            <ul class="divide-foreground-alt divide-y">
              {#each Object.entries(active_persona_data.identity) as [key, value] (key)}
                <li class="flex items-center justify-between py-4">
                  <p class="text-foreground-alt">{key}</p>
                  <p class="font-medium">{value}</p>
                </li>
              {/each}
            </ul>
          {/if}
          {#if current_tab === "Psychology"}
            <ul class="divide-foreground-alt divide-y">
              {#each Object.entries(active_persona_data.psychology) as [key, value] (key)}
                {#if key === "MMPI"}
                  <li class="flex items-center justify-between py-4">
                    <p class="text-foreground-alt">{key}</p>
                    <p class="font-medium">-</p>
                  </li>
                  {#each Object.entries(active_persona_data.psychology.MMPI) as [mmpi_key, mmpi_value] (mmpi_key)}
                    <li class="ml-4 flex items-center justify-between py-4">
                      <p class="text-foreground-alt">{mmpi_key}</p>
                      <p class="font-medium">{mmpi_value}</p>
                    </li>
                  {/each}
                {:else}
                  <li class="flex items-center justify-between py-4">
                    <p class="text-foreground-alt">{key}</p>
                    <p class="font-medium">{value}</p>
                  </li>
                {/if}
              {/each}
            </ul>
          {/if}
          {#if current_tab === "Value Map"}
            <ul class="divide-foreground-alt divide-y">
              {#each Object.keys(active_persona_data.value_map) as trait (trait)}
                <li class="py-4">
                  <p class="text-foreground-alt">{trait}</p>
                </li>
                {#each active_persona_data.value_map[trait] as subtrait (subtrait)}
                  <li class="ml-4 py-4">
                    <p>{subtrait}</p>
                  </li>
                {/each}
              {/each}
            </ul>
          {/if}
          {#if current_tab === "Vocational"}
            <ul class="divide-foreground-alt divide-y">
              {#each Object.entries(active_persona_data.vocational) as [key, value] (key)}
                <li class="flex items-center justify-between py-4">
                  <p class="text-foreground-alt">{key}</p>
                  <p class="font-medium">{value}</p>
                </li>
              {/each}
            </ul>
          {/if}
          {#if current_tab === "Success Criteria"}
            <ul class="divide-foreground-alt divide-y">
              {#each active_persona_data.success_criteria as trait, i (trait)}
                <li class="flex items-center justify-between py-4">
                  <p class="font-medium">{i + 1}. {trait}</p>
                </li>
              {/each}
            </ul>
          {/if}
        </div>
      </div>
    </div>
  </Container>
</section>
