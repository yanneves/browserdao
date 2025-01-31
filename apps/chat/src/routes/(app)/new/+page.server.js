export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const url = data.get("url");
    const prompt = data.get("prompt");

    return { url, prompt };
  },
};
