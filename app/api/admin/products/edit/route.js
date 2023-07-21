import { doPUTFormBody } from "@/lib/util";
import { NextResponse } from "next/server";

const POST = async (request) => {
  const data = await request.json();
    const response = await doPUTFormBody("/products", data);
    if (!response.ok) {
      return  NextResponse.json({ success: false });
    }
  return NextResponse.json({ success: true });
}

const GET = async (request) => {
    return NextResponse.json({"greeting":"hello"})
};
export {POST,GET};