import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export function getS3Client() {
  const region = process.env.AWS_REGION || "us-east-1";
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!accessKeyId || !secretAccessKey) return null;

  return new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

export async function uploadImageToS3(
  imageUrl: string,
  fileName: string
): Promise<string | null> {
  const bucketName = process.env.AWS_S3_BUCKET_NAME;
  const s3 = getS3Client();

  if (!s3 || !bucketName) return null;

  try {
    const res = await fetch(imageUrl);
    if (!res.ok) return null;

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = res.headers.get("content-type") || "image/jpeg";
    const key = `blog-media/${Date.now()}-${fileName}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      })
    );

    const region = process.env.AWS_REGION || "us-east-1";
    return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
  } catch (err: any) {
    console.warn("AWS S3 Upload notice:", err.message);
    return null;
  }
}
