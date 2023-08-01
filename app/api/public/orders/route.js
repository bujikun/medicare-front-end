import { fetchPOST, fetchPOSTOrder } from "@/lib/util";
import { NextResponse } from "next/server";

const POST = async (request) => {
  const cart = await request.json();
  const response = await fetchPOSTOrder("/orders", cart);
  const data = await response.json();
  if (!response.ok) {
        return NextResponse.json({ status: "error", payload: data });
  }
    return NextResponse.json({ status: "success", payload: data });
};
export { POST };
