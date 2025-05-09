import data from "./submissions.json";

// CREATE TABLE submissions (
//   id SERIAL PRIMARY KEY,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   wallet_address VARCHAR(44) NOT NULL, -- SOL wallet max length 44 chars
//   twitter_handle VARCHAR(15) NOT NULL, -- Twitter handle max length of 15
//   round_number SMALLINT CHECK (round_number IN (1, 2, 3)) NOT NULL,
//   review_pass BOOLEAN, -- Pass or fail flag for reviewer
//   review_note TEXT -- Additional notes from the reviewer
// );

/** @satisfies {import('./$types').Actions} */
export const load = async () => {
  const submissions = data.map((row) => ({
    created: row.created_at,
    wallet: row.wallet_address,
    handle: row.twitter_handle,
    round: row.round_number,
    review: {
      pass: row.review_pass,
      note: row.review_note,
    },
  }));

  return { submissions };
};
