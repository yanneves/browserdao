import type Anthropic from "@anthropic-ai/sdk";

export const withCachedPrompts = (
  messages: Anthropic.Beta.BetaMessageParam[],
) => {
  const arr = structuredClone(messages);

  let breakpointsAvailable = 3;
  arr.toReversed().every((message) => {
    if (breakpointsAvailable <= 0) {
      return false;
    }

    const index = arr.indexOf(message);
    const { content } = arr[index];

    if (message.role === "user" && Array.isArray(content)) {
      content.toReversed().every((item) => {
        const subindex = content.indexOf(item);

        if (
          content[subindex].type === "thinking" ||
          content[subindex].type === "redacted_thinking"
        ) {
          return true;
        }

        // Mutates content item in original array
        content[subindex].cache_control = { type: "ephemeral" };

        breakpointsAvailable--;
        return false;
      });
    }

    return true;
  });

  return arr;
};
