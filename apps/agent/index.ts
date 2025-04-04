import { v7 as uuidv7 } from "uuid";
import { WebSocketServer } from "ws";
import Agent from "./lib/agent.ts";
import db from "./lib/database.ts";
import { uploadRender } from "./lib/storage.ts";

const { PORT = 8080 } = process.env;

const server = new WebSocketServer({ port: +PORT });

server.on("connection", (stream) => {
  const agent = new Agent();

  stream.on("error", console.error);
  stream.on("close", agent.terminate);

  stream.on("message", async (message) => {
    try {
      const { type, payload } = JSON.parse(message.toString());

      switch (type) {
        case "launch": {
          const { session, prompt, url } = payload;
          const replay = uuidv7();

          const res = await db.query(
            `
              SELECT balance
              FROM accounts
              WHERE id = $1::uuid;
            `,
            [session],
          );

          const [account] = res.rows;
          if (account.balance <= 0) {
            console.warn("Insufficient balance to launch prompt");
            break;
          }

          // Create replay session in database to add events to
          await db.query(
            `
              INSERT INTO replays (id, account, prompt, url)
              VALUES($1::uuid, $2::uuid, $3::text, $4::text);
            `,
            [replay, session, prompt, url],
          );

          console.info(
            "Launch command received: ",
            JSON.stringify({ prompt, url }, null, 2),
          );

          agent.launch(prompt, url, { session, replay });
          break;
        }

        case "prompt": {
          const { session, prompt } = payload;

          const res = await db.query(
            `
              SELECT balance
              FROM accounts
              WHERE id = $1::uuid;
            `,
            [session],
          );

          const [account] = res.rows;
          if (account.balance <= 0) {
            console.warn("Insufficient balance to prompt");
            break;
          }

          console.info(
            "Prompt command received: ",
            JSON.stringify({ prompt }, null, 2),
          );

          agent.prompt(prompt);
          break;
        }

        case "interrupt":
          agent.interrupt();
          break;

        default:
          console.error(`Received unhandled message type: ${type}`);
      }
    } catch (err) {
      console.error(`Unable to parse ${message}: ${err}`);
    }
  });

  agent.on("prompt", async ({ meta, data }) => {
    const type = "prompt";
    const payload = { meta: {}, data };

    try {
      // Save event to replay session
      await db.query(
        `
          INSERT INTO replays_events (id, replay, type, payload)
          VALUES ($1::uuid, $2::uuid, $3::replays_events_type, $4::jsonb);
        `,
        [uuidv7(), meta.replay, type, payload],
      );
    } catch (err) {
      console.error("Error saving replay event: ", err);
    }
  });

  agent.on("agent", async ({ meta, data }) => {
    let balance = 0;

    try {
      // Subtract credit from account balance
      const res = await db.query(
        `
          UPDATE accounts
          SET balance = GREATEST(balance - 1, 0)
          WHERE id = $1::uuid
          RETURNING balance;
        `,
        [meta.session],
      );

      const [account] = res.rows;
      balance = account.balance;
    } catch (err) {
      console.error("Error updating account balance: ", err);
    }

    const type = "agent";
    const payload = { meta: { balance }, data };

    stream.send(JSON.stringify({ type, payload }));

    try {
      // Save event to replay session
      await db.query(
        `
          INSERT INTO replays_events (id, replay, type, payload)
          VALUES ($1::uuid, $2::uuid, $3::replays_events_type, $4::jsonb);
        `,
        [uuidv7(), meta.replay, type, payload],
      );
    } catch (err) {
      console.error("Error saving replay event: ", err);
    }
  });

  agent.on("render", async ({ meta, data: { buffer, base64string } }) => {
    const type = "render";

    stream.send(JSON.stringify({ type, payload: { base64string } }));

    try {
      // Upload render to object storage
      const key = uuidv7();
      const src = await uploadRender(key, buffer);
      const payload = { data: { src } };

      // Save event to replay session
      await db.query(
        `
          INSERT INTO replays_events (id, replay, type, payload)
          VALUES ($1::uuid, $2::uuid, $3::replays_events_type, $4::jsonb);
        `,
        [key, meta.replay, type, payload],
      );
    } catch (err) {
      console.error("Error saving replay event: ", err);
    }
  });
});
