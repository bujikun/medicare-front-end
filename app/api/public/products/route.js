import { NextResponse } from "next/server";

const GET = async () => {
    const response = await fetch(`${process.env.BACKEND_API_BASE_URL}/products/shop`);
    const data = await response.json();
    return NextResponse.json(data);
}
export {GET}