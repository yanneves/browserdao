import { redirect } from "@sveltejs/kit";

export const load = () => {
  redirect(307, `https://x.com/intent/follow?screen_name=browserdao`);
};
