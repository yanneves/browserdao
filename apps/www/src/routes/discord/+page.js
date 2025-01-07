import { redirect } from "@sveltejs/kit";
import { PUBLIC_DISCORD_INVITE_KEY } from "$env/static/public";

export const load = () => {
  redirect(307, `https://discord.gg/${PUBLIC_DISCORD_INVITE_KEY}`);
};
