import EventEmitter from "node:events";
import Anthropic from "@anthropic-ai/sdk";
import {
  chromium,
  type Browser,
  type BrowserContext,
  type Page,
} from "playwright";
import * as cursors from "../assets/cursors.svg.ts";
import { withCachedPrompts } from "./claude-3-7-sonnet.utils.ts";

type LaunchOptions = {
  session: string;
  replay: string;
};

const MAX_STEPS = 512;
const WXGA_WIDTH = 1280;
const WXGA_HEIGHT = 800;

const model = "claude-3-7-sonnet-20250219";
const betas = ["computer-use-2025-01-24", "token-efficient-tools-2025-02-19"];

const tools: Anthropic.Beta.BetaToolComputerUse20250124[] = [
  {
    type: "computer_20250124",
    name: "computer",
    display_width_px: WXGA_WIDTH,
    display_height_px: WXGA_HEIGHT,
    cache_control: { type: "ephemeral" },
  },
];

const system = `
Operator is an autonomous browser agent that emulates a generic persona to interact with a website on behalf of the user. In lieu of explicit instruction, Operator navigates and explores the website to determine and pursue a sensible objective. Operator considers usability and accessibility of the website during the interaction and relays feedback to the user. As Operator, you will:

Use a mouse and keyboard to interact with a browser, and take screenshots.
* This is an interface to a browser application. You do not have access to the address bar or search. You must stay within the browser viewport.
* Some websites may take time to load or process actions. You may need to wait and take successive screenshots to see the results of your actions, e.g. if you click on a button and nothing happens, try taking another screenshot.
* Some websites may have more information 'below the fold', try scrolling and taking another screenshot. Make sure you scroll down to see everything before deciding something isn't available.
* The screen's resolution is {{ display_width_px }}x{{ display_height_px }}.
* Whenever you intend to move the cursor to click on an element, you should consult a screenshot to determine the coordinates of the element before moving the cursor.
* If you tried clicking on a button or link but it failed to load, even after waiting, try adjusting your cursor position so that the tip of the cursor visually falls on the element that you want to click.
* Make sure to click any buttons, links, icons, etc with the cursor tip in the center of the element. Don't click boxes on their edges unless asked.
* When using your computer function calls, they take a while to run and send back to you. Where possible/feasible, try to chain multiple of these calls all into one function calls request.
* Include a brief summary of any persistent cursor positioning issues encountered.

Mouse Cursor Position Validation:
* Before any click action, take a screenshot and verify:
    1. The cursor tip is visible in the screenshot
    2. The intended target element is clearly visible
    3. The cursor tip falls within the boundaries of the target element
    4. The cursor is not obscured by any overlays or tooltips
* If the cursor position appears incorrect:
    1. Take note of the element's visual boundaries
    2. Adjust the cursor position to the center of the element
    3. Take a new screenshot to confirm correct positioning
    4. Only proceed with the click if the position is verified
* For small or precise targets:
    1. Zoom in if necessary to ensure accurate positioning
    2. Aim for the center of clickable elements
    3. Avoid clicking on edges or borders
* If multiple attempts to position the cursor fail:
    1. Document the attempted positions
    2. Try alternative methods (tab navigation, keyboard shortcuts)
    3. Note this as a potential accessibility issue

Validation Process:
1. After each action, take a new screenshot
2. Verify the expected outcome occurred
3. Record any unexpected behaviors or failures
4. Document the steps taken to correct positioning issues
5. Only proceed when the current step is confirmed successful

Communication Guidelines:
* Limit replies to 280 characters
* Strictly substitute terms like:
    - "screenshot" to "look at"
    - "coordinates" to "on the screen"
* Avoid technical jargon unless specifically relevant to user responses
* Use clear, direct language inclusive to non-native English speakers
* Maintain professional detachment when faced with appeals to emotion

Task Completion:
* If the objective is successfully completed, end with \<complete>
* If the objective cannot be completed despite multiple attempts, end with \<quit>

If required to enter an email address use "agent@email.browser.icu", unless another is provided by the user.
`;

const ai = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default class Agent extends EventEmitter {
  private _browser: Browser | null = null;
  private _browserContext: BrowserContext | null = null;
  private _page: Page | null = null;

  private _session: string = "";
  private _replay: string = "";
  private _interrupted = false;

  private _messages: Anthropic.Beta.BetaMessageParam[] = [];

  private _cursorPositionX = -1;
  private _cursorPositionY = -1;

  constructor() {
    super();

    // Prepare browser session
    this.newPage();
  }

  async ready(): Promise<Page> {
    return new Promise((resolve) => {
      const resolvePage = () => {
        if (this._page) {
          return resolve(this._page);
        }

        setTimeout(resolvePage, 300);
      };

      resolvePage();
    });
  }

  async newPage() {
    this._browser?.removeAllListeners("disconnected", {
      behavior: "ignoreErrors",
    });

    this._browser = await (process.env.BROWSER_WS_URL
      ? chromium.connect(process.env.BROWSER_WS_URL)
      : chromium.launch());

    this._browser.on("disconnected", () => {
      console.info("Browser disconnected");
    });

    this._browserContext = await this._browser.newContext({
      viewport: {
        width: WXGA_WIDTH,
        height: WXGA_HEIGHT,
      },
      geolocation: { latitude: 51.509865, longitude: -0.118092 }, // London, UK
      permissions: ["geolocation"],
      reducedMotion: "reduce",
    });

    return (this._page = await this._browserContext.newPage());
  }

  dispatch(type: string, data: string | object) {
    this.emit(type, {
      data,
      meta: {
        session: this._session,
        replay: this._replay,
      },
    });
  }

  async cursor(page: Page, [x, y]: [number, number] | number[] = []) {
    if (Number.isFinite(x) && Number.isFinite(y)) {
      this._cursorPositionX = x;

      this._cursorPositionY = y;

      const interactive = await page
        .getByRole("link", { disabled: false })
        .or(page.getByRole("button", { disabled: false }))
        .or(page.getByRole("checkbox", { disabled: false }))
        .or(page.getByRole("combobox", { disabled: false }))
        .all();

      const locators = await Promise.all(
        interactive.map(async (locator) => ({
          locator,
          rect: await locator.boundingBox(),
        })),
      );

      const hoverable =
        locators.findIndex(({ rect }) => {
          if (!rect?.y || !rect?.x || !rect?.height || !rect?.width) {
            return false;
          }

          const left = rect.x;
          const right = rect.x + rect.width;

          const top = rect.y;
          const bottom = rect.y + rect.height;

          return x >= left && x <= right && y >= top && y <= bottom;
        }) > -1;

      await page.evaluate(
        ({ cursors, x, y, hoverable }) => {
          const id = "gadabout-cursor";
          const cursor =
            document.getElementById(id) || document.createElement("aside");
          cursor.id = id;
          cursor.setAttribute(
            "style",
            `pointer-events: none; position: absolute; z-index: 99999999; left: ${x}px; top: ${y}px;`,
          );
          cursor.innerHTML = hoverable ? cursors.hand : cursors.arrow;
          document.body.appendChild(cursor);
        },
        { cursors, x, y, hoverable },
      );

      await page.mouse.move(x, y);
      await this.screenshot(page);
    }

    return [this._cursorPositionX, this._cursorPositionY];
  }

  async screenshot(page: Page) {
    const buffer = await page.screenshot({ caret: "initial" });
    const base64string = buffer.toString("base64");

    this.dispatch("render", { buffer, base64string });

    return base64string;
  }

  async step(page: Page, count = 1): Promise<void> {
    let terminate = false;

    if (count > MAX_STEPS) {
      const message = `Exceeded maximum number of steps [${MAX_STEPS}]`;

      console.info(`${message}\n`);
      this.dispatch("agent", { status: "exhausted", thoughts: message });
      return;
    }

    try {
      const completion = await ai.beta.messages.create({
        model,
        betas,
        tools,
        system,
        max_tokens: 5120,
        thinking: { type: "enabled", budget_tokens: 1024 },
        messages: withCachedPrompts(this._messages),
      });

      console.log(JSON.stringify(completion, null, 2));

      if (completion.usage) {
        const tokens =
          completion.usage.input_tokens + completion.usage.output_tokens;

        const cacheTokens =
          (completion.usage.cache_creation_input_tokens || 0) +
          (completion.usage.cache_read_input_tokens || 0);

        const cost =
          completion.usage.input_tokens * (300 / 1000000) +
          completion.usage.output_tokens * (1500 / 1000000) +
          (completion.usage.cache_creation_input_tokens || 0) *
            (375 / 1000000) +
          (completion.usage.cache_read_input_tokens || 0) * (30 / 1000000);

        console.info(
          `Tokens used: ${tokens} i/o (${cacheTokens} r/w) ~${cost.toFixed(3)}¢\n`,
        );
      }

      if (this._interrupted) {
        console.warn("Agent interrupted mid-flight");
        return;
      }

      if (completion.stop_reason !== "tool_use") {
        const [res] = completion.content;

        let thoughts: string | undefined;
        if (res?.type === "text") {
          thoughts = res.text;
        }

        let status = "question";
        if (thoughts?.includes("<complete>")) {
          status = "complete";
        } else if (thoughts?.includes("<quit>")) {
          status = "quit";
        }

        this.dispatch("agent", { status, thoughts });
        return;
      }

      const content: Anthropic.Beta.BetaContentBlockParam[] = [];

      try {
        await Promise.all(
          completion.content.map(async (res) => {
            if (res.type == "text") {
              const { text } = res;

              let status = "live";
              if (text.includes("<complete>")) {
                status = "complete";
              } else if (text.includes("<quit>")) {
                status = "quit";
              }

              if (status !== "live") {
                // TODO: this is too spaghetti
                terminate = true;
              }

              this.dispatch("agent", { status, thoughts: text });
            }

            if (res.type == "tool_use") {
              type ComputerToolUseBlockInput = {
                action: string;
                coordinate?: number[];
                duration?: number;
                scroll_amount?: number;
                scroll_direction?: "up" | "down" | "left" | "right";
                start_coordinate?: number[];
                text?: string;
              };

              const input = res.input as ComputerToolUseBlockInput;
              const [x, y] = await this.cursor(
                page,
                input.start_coordinate || input.coordinate,
              );

              switch (input.action) {
                // `wait`: Wait for a specified duration (in seconds).
                case "wait": {
                  if (!input.duration) {
                    break;
                  }

                  await delay(input.duration * 1000);
                  content.push({ type: "tool_result", tool_use_id: res.id });
                  break;
                }

                // `screenshot`: Take a screenshot of the screen.
                case "screenshot": {
                  const screenshot = await this.screenshot(page);

                  content.push({
                    type: "tool_result",
                    tool_use_id: res.id,
                    content: [
                      {
                        type: "image",
                        source: {
                          // TODO: move to url image source
                          type: "base64",
                          media_type: "image/png",
                          data: screenshot,
                        },
                      },
                    ],
                  });

                  break;
                }

                // `key`: Press a key or key-combination on the keyboard.
                //   - This supports xdotool's `key` syntax.
                //   - Examples: "a", "Return", "alt+Tab", "ctrl+s", "Up", "KP_0" (for the numpad 0 key).
                case "key": {
                  if (!input.text) {
                    break;
                  }

                  // TODO: support multiple keys delimited with spaces, e.g. "BackSpace BackSpace BackSpace"
                  let key = input.text;

                  // TODO: abstract this in a more extensive lookup library
                  const lookup = [
                    ["Space", " "],
                    ["Tab", "Tab"],
                    ["Escape", "Escape"],
                    ["Enter", "Enter"],
                    ["Return", "Enter"],
                    ["Linefeed", "Enter"],
                    ["BackSpace", "Backspace"],
                    ["Clear", "Clear"],
                    ["Delete", "Delete"],
                    ["Page_Up", "PageUp"],
                    ["Page_Down", "PageDown"],
                    ["End", "End"],
                    ["Home", "Home"],
                    ["Up", "ArrowUp"],
                    ["Right", "ArrowRight"],
                    ["Down", "ArrowDown"],
                    ["Left", "ArrowLeft"],
                  ];

                  lookup.every(([xkey, uikey]) => {
                    if (key.includes(xkey)) {
                      key = uikey;
                      return false;
                    }

                    return true;
                  });

                  try {
                    await page.keyboard.press(key);
                    await page.waitForLoadState("domcontentloaded");
                    await this.screenshot(page);

                    content.push({ type: "tool_result", tool_use_id: res.id });
                  } catch {
                    const err = `Unsuccessful key press using "${key}"`;
                    console.error(err);
                    content.push({
                      type: "tool_result",
                      tool_use_id: res.id,
                      content: err,
                      is_error: true,
                    });
                  }

                  break;
                }

                // `type`: Type a string of text on the keyboard.
                case "type": {
                  if (!input.text) {
                    break;
                  }

                  await page.keyboard.type(input.text, { delay: 80 });
                  await this.screenshot(page);

                  content.push({ type: "tool_result", tool_use_id: res.id });

                  break;
                }

                // `mouse_move`: Move the cursor to a specified (x, y) pixel coordinate on the screen.
                case "mouse_move": {
                  if (!x || !y) {
                    break;
                  }

                  content.push({ type: "tool_result", tool_use_id: res.id });

                  break;
                }

                // `left_mouse_down`: Press the left mouse button.
                case "left_mouse_down": {
                  await page.mouse.down({ button: "left" });
                  await page.waitForLoadState("domcontentloaded");
                  content.push({ type: "tool_result", tool_use_id: res.id });
                  break;
                }

                // `left_mouse_up`: Release the left mouse button.
                case "left_mouse_up": {
                  await page.mouse.up({ button: "left" });
                  await page.waitForLoadState("domcontentloaded");
                  content.push({ type: "tool_result", tool_use_id: res.id });
                  break;
                }

                // TODO: add support for key combination with input.text
                // `left_click`: Click the left mouse button.
                case "left_click":
                // `right_click`: Click the right mouse button.
                case "right_click":
                // `middle_click`: Click the middle mouse button.
                case "middle_click":
                // `double_click`: Double-click the left mouse button.
                case "double_click":
                // `triple_click`: Triple-click the left mouse button.
                case "triple_click": {
                  let button: "left" | "right" | "middle" = "left";
                  if (input.action === "right_click") {
                    button = "right";
                  } else if (input.action === "middle_click") {
                    button = "middle";
                  }

                  await page.mouse.down({ button });
                  await page.mouse.up({ button });

                  if (input.action === "double_click") {
                    await page.mouse.down({ button });
                    await page.mouse.up({ button });
                  }

                  if (input.action === "triple_click") {
                    await page.mouse.down({ button });
                    await page.mouse.up({ button });
                    await page.mouse.down({ button });
                    await page.mouse.up({ button });
                  }

                  await page.waitForLoadState("domcontentloaded");

                  await delay(2000);
                  await this.screenshot(page);

                  content.push({ type: "tool_result", tool_use_id: res.id });

                  break;
                }

                // `left_click_drag`: Click and drag the cursor from `start_coordinate` to a specified (x, y) pixel coordinate on the screen.
                case "left_click_drag": {
                  if (!input.coordinate) {
                    break;
                  }

                  const [targetX, targetY] = input.coordinate;

                  await page.mouse.move(x, y);
                  await page.mouse.down();
                  // Move the cursor twice to more reliably trigger dragover event where applicable
                  await page.mouse.move(
                    targetX * Math.random() * 0.2 + 0.9,
                    targetY * Math.random() * 0.2 + 0.9,
                  );
                  await page.mouse.move(targetX, targetY);
                  await page.mouse.up();
                  await page.waitForLoadState("domcontentloaded");
                  await this.screenshot(page);

                  content.push({ type: "tool_result", tool_use_id: res.id });

                  break;
                }

                // `scroll`: Scroll the screen in a specified direction by a specified amount of clicks of the scroll wheel, at the specified (x, y) pixel coordinate. DO NOT use PageUp/PageDown to scroll.
                case "scroll": {
                  if (!input.scroll_amount || !input.scroll_direction) {
                    break;
                  }

                  const clicks =
                    input.scroll_direction === "down" ||
                    input.scroll_direction === "right"
                      ? input.scroll_amount
                      : -input.scroll_amount;

                  const deltaX =
                    input.scroll_direction === "left" ||
                    input.scroll_direction === "right"
                      ? 60 * clicks
                      : 0;
                  const deltaY =
                    input.scroll_direction === "up" ||
                    input.scroll_direction === "down"
                      ? 100 * clicks
                      : 0;

                  await page.mouse.wheel(deltaX, deltaY);
                  await delay(1000);

                  await page.waitForLoadState("domcontentloaded");
                  await this.screenshot(page);

                  content.push({ type: "tool_result", tool_use_id: res.id });

                  break;
                }

                // `cursor_position`: Get the current (x, y) pixel coordinate of the cursor on the screen.
                case "cursor_position": {
                  content.push({
                    type: "tool_result",
                    tool_use_id: res.id,
                    content: [{ type: "text", text: `(${x}, ${y})` }],
                  });

                  break;
                }

                // no match
                default: {
                  const message = `Action "${input.action}" not currently supported.`;

                  content.push({
                    type: "tool_result",
                    tool_use_id: res.id,
                    is_error: true,
                    content: [{ type: "text", text: message }],
                  });

                  console.error(message);
                  break;
                }
              }
            }
          }),
        );

        if (!content.length) {
          return;
        }

        // Reflect assistant output
        this._messages.push({
          role: "assistant",
          content: completion.content,
        });

        this._messages.push({ role: "user", content });
      } catch (err) {
        console.error(err);
        return;
      }

      if (terminate) {
        return;
      }

      return this.step(page, count + 1);
    } catch (err: any) {
      // Failure in loop, likely rate limit exceeded, wait and retry
      console.error(`Encountered ${err?.status ?? "Unknown"} error, retrying:`);
      console.error(err?.error.error);

      await delay(1500);
      return this.step(page, count);
    }
  }

  async prompt(prompt: string) {
    this._interrupted = false;

    const page = await this.ready();

    if (this._interrupted) {
      console.info("Prompt interrupted");
      return;
    }

    this._messages.push({
      role: "user",
      content: [{ type: "text", text: prompt }],
    });

    this.dispatch("prompt", { text: prompt });

    await this.step(page);
  }

  async launch(
    prompt: string,
    url: string,
    { session, replay }: LaunchOptions,
  ) {
    // TODO: move session and replay to constructor
    this._session = session;
    this._replay = replay;
    this._interrupted = false;

    const page = await this.ready();

    await page.goto(url, { waitUntil: "domcontentloaded" });

    // TODO: build a smarter delay / wait logic that checks for interrupt command
    await delay(2000);

    if (this._interrupted) {
      console.info("Launch interrupted");
      return;
    }

    const screenshot = await this.screenshot(page);
    this._messages = [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: "image/png",
              data: screenshot,
            },
          },
          { type: "text", text: "Screenshot of the landing page." },
          { type: "text", text: prompt },
        ],
      },
    ];

    return this.step(page);
  }

  async interrupt() {
    this._interrupted = true;
  }

  async terminate() {
    this._interrupted = true;
    this._replay = "";
    this._messages = [];

    await this._browserContext?.close();
    await this._browser?.close();

    this._browser = null;
    this._browserContext = null;
    this._page = null;
  }
}
