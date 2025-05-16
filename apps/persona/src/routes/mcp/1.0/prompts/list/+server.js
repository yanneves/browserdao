/** @type {import('./$types').RequestHandler} */
export function GET() {
  const data = {
    prompts: [
      {
        name: "persona-amelia-curie",
        description:
          "Assume the personality of Amelia Curie, Late 20s, Washington, DC",
      },
      {
        name: "persona-javier-castillo",
        description:
          "Assume the personality of Javier Castillo, Late 30s, Austin, TX",
      },
    ],
  };

  return new Response(JSON.stringify(data, null, 2));
}
