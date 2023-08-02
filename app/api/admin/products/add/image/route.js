import { doPUTFormBody } from "@/lib/util";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Blob } from "buffer";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
const s3Client = new S3Client({});

const uploadImageToS3 = async (buffer, fileName, extension) => {
  const key = `${Date.now()}--${fileName}`;
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: `image/${extension}`,
  };

  const putCommand = new PutObjectCommand(params);
  await s3Client.send(putCommand);
  return key;
};

const POST = async (request) => {
  try {
    const formData = await request.formData();
    const image = await formData.get("image");
    if (!image) {
      return NextResponse.json(
        { error: "An  image file is required" },
        { status: 400, statusText: "Bad Request" }
      );
    }

    const mimeType = image.type;
    const extension = mimeType.split("/")[1];

    //read bytes
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    let fileName = uuid().concat(".").concat(extension);

    //use buffer and name to upload
    const s3buckObjectKey = await uploadImageToS3(buffer, fileName, extension);
    console.log("S3", fileName);
    const response = await doPUTFormBody("/products/image", {
      id: formData.get("id"),
      image_url: `${process.env.AWS_S3_BUCKET_URL}/${s3buckObjectKey}`,
    });
    // console.log("STATUS: ", response.status);
    if (!response.ok) {
      return NextResponse.json({ success: true, fileName });
    }
    return NextResponse.json({ success: false });
    //return NextResponse.json({ success: true, fileName });
  } catch (error) {
    console.error("Error uploading image", error);
    return NextResponse.json(
      { error: "Error uploading image" },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
};

export { POST };

// const data = await request.formData();
// const image = data.get("image");
// if (!data) {
//   throw new Error("no image uploaded");
// }
// const bytes = await image.arrayBuffer();
// const buffer = Buffer.from(bytes);
// const imageName = uuid();
// const path = join(process.cwd(), `/public/${imageName}.jpg`);
// writeFileSync(path, buffer);
// const response = await doPUTFormBody("/products/image", {
//   id: data.get("id"),
//   image_url: `${imageName}.jpg`,
// });
// console.log("STATUS: ", response.status);
// if (!response.ok) {
//   return NextResponse.json({ success: false });
// }
// return NextResponse.json({ success: true });
