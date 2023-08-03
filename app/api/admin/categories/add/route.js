import { doPOSTFormBody } from "@/lib/util";
import { NextResponse } from "next/server";

const POST = async (request) => {
    const data = await request.json();
  const response = await doPOSTFormBody("/categories", data);
  console.log("DATA",data);
    if (!response.ok) {
      return  NextResponse.json({ success: false });
    }
  const saveCategory = await response.json();
    console.log("CATEGORY", saveCategory);

  return NextResponse.json({success:true,product:saveCategory});
}

const GET = async (request) => {
    return NextResponse.json({"greeting":"hello"})
};
export {POST,GET};