import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const {
  R2_BUCKET_NAME: bucket,
  R2_PUBLIC_DOMAIN: domain,
  R2_ACCOUNT_ID: account,
  R2_ACCESS_KEY_ID: accessKeyId,
  R2_SECRET_ACCESS_KEY: secretAccessKey,
} = process.env;

if (!account || !accessKeyId || !secretAccessKey) {
  throw new Error("R2 credentials are missing from environment variables");
}

const r2 = new S3Client({
  endpoint: `https://${account}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId, secretAccessKey },
  region: "auto",
});

export async function uploadRender(key: string, buffer: Buffer) {
  await r2.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: "image/png",
      ACL: "public-read",
    }),
  );

  return `${domain}/${key}`;
}
