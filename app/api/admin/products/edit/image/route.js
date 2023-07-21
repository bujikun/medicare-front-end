import { doPUTFormBody } from "@/lib/util";
import { log } from "console";
import { writeFile, writeFileSync } from "fs";
import { NextResponse } from "next/server";
import { join } from "path";
import { v4 as uuid } from "uuid";

const POST = async (request) => {
    const data = await request.formData();
    const image = data.get("image");
 // IMAGE UPLOAD
  if (!data) {
      throw new Error("no image uploaded");
  }
  const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const imageName = uuid();
  const path = join(process.cwd(), `/public/imgs/${imageName}.jpg`);
    writeFileSync(path, buffer);
    const response = await doPUTFormBody("/products/image", {
      id: data.get("id"),
      image_url: `/imgs/${imageName}.jpg`,
    });
    console.log("STATUS: ",response.status);
  if (!response.ok) {
    return NextResponse.json({ success: false });
  }
    //const savedProduct = await response.json();
    //console.log(savedProduct);
  return NextResponse.json({ success: true});
};


export {POST}