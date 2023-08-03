import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";


export const fetchGET = async ( path) => {
  const session = await getServerSession(authOptions);
  return await fetch(`${process.env.BACKEND_API_BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
    cache:"no-store"
  });
  
};

export const fetchGETPublic = async (path) => {
  return await fetch(`${process.env.BACKEND_API_BASE_URL}${path}`);
};

export const fetchPOST = async (path,body) => {
  const session = await getServerSession(authOptions);
    return await fetch(`${process.env.BACKEND_API_BASE_URL}${path}`, {
      method:"POST",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      },
    body:JSON.stringify(body)
  });
};

export const fetchPOSTOrder = async (path, body) => {
  const session = await getServerSession(authOptions);
  return await fetch(`${process.env.BACKEND_API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const doPOSTFormBody = async (path, formData) => {
  const session = await getServerSession(authOptions);
  return await fetch(`${process.env.BACKEND_API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};
export const doPUTFormBody = async (path, formData) => {
  const session = await getServerSession(authOptions);
  return await fetch(`${process.env.BACKEND_API_BASE_URL}${path}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};

export const checkSessionValidity = async (path,access_token) => {
  return await fetch(`${process.env.BACKEND_BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

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

export const doImageUpload = async (request) => {
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
