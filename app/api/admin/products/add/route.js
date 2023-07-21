import { doPOSTFormBody } from "@/lib/util";
import { log } from "console";
import { writeFile } from "fs";
import { NextResponse } from "next/server";
import { join } from "path"
import {v4 as uuid} from "uuid"

const POST = async (request) => {
    const data = await request.json();
    //IMAGE UPLOAD
    // const image = data.get("image");
    // console.log("FORM DATA",formData);
    // if (!image) {
    //     throw new Error("no image uploaded");
    // }
    // const bytes = await image.arrayBuffer();
    // const buffer = Buffer.from(bytes);
    // const path = join(process.cwd(), uuid())
    // await writeFile(path, buffer);
    // console.log("New file:",path);
    const response = await doPOSTFormBody("/products", data);
    if (!response.ok) {
      return  NextResponse.json({ success: false });
    }
    const savedProduct = await response.json();
  return NextResponse.json({success:true,product:savedProduct});
}

const GET = async (request) => {
    return NextResponse.json({"greeting":"hello"})
};
export {POST,GET};