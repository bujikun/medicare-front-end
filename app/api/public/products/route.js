import { NextResponse } from "next/server";

const GET = async () => {
    const response = await fetch(`${process.env.BACKEND_API_BASE_URL}/api/v1/products/shop`);
    const data = await response.json();
    console.log(data);
    return NextResponse.json({"hello":"hello"});
}

export {GET}