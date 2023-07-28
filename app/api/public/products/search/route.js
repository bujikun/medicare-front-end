import { NextResponse } from "next/server";

const POST = async (request) => {
  const queryString = await request.json();
  const response =  await fetch(
    `${process.env.BACKEND_API_BASE_URL}/products/search?q=${queryString}`
  );
    const data = await response.json();
    return NextResponse.json(data)
};
export { POST };
