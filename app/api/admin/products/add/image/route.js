import { doPUTFormBody } from "@/lib/util";
import {writeFileSync } from "fs";
import { NextResponse } from "next/server";
import { join } from "path";
import { v4 as uuid } from "uuid";

const POST = async (request) => {
    const data = await request.formData();
    const image = data.get("image");
  if (!data) {
      throw new Error("no image uploaded");
  }
  const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const imageName = uuid();
  const path = join(process.cwd(), `/public/${imageName}.jpg`);
    writeFileSync(path, buffer);
    const response = await doPUTFormBody("/products/image", {
      id: data.get("id"),
      image_url: `${imageName}.jpg`,
    });
    console.log("STATUS: ",response.status);
  if (!response.ok) {
    return NextResponse.json({ success: false });
  }
  return NextResponse.json({ success: true});
};


export {POST}