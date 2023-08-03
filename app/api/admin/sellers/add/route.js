import { doPOSTFormBody } from "@/lib/util";
import { NextResponse } from "next/server";

const POST = async (request) => {
  const data = await request.json();
  const response = await doPOSTFormBody("/sellers", data);
    if (!response.ok) {
      return  NextResponse.json({ success: false });
    }
  const savedSeller = await response.json();
  return NextResponse.json({success:true,product:savedSeller});
}

const GET = async (request) => {
    return NextResponse.json({"greeting":"hello"})
};
export {POST,GET};