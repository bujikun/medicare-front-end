import { NextResponse } from "next/server";

const GET = async () => {
    const response = await fetch(`${process.env.BACKEND_API_BASE_URL}/products/shop`);
    const data = await response.json();
    if (response.ok) {
            return NextResponse.json(data);
    }
        return NextResponse.json({error:"Product Not Found"},{status:response.status,statusText:response.statusText});

}
export {GET}