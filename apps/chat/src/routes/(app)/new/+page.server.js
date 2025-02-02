import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ request }) => {
  if (request.method === "GET") {
    redirect(303, "/");
  }
};

/** @satisfies {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const url = data.get("url");
    const prompt = data.get("prompt");

    return { url, prompt };
  },
};
