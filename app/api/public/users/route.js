import { NextResponse } from "next/server";

const POST = async (request) => {
    const user = await request.json();
    const response = await fetch(`${process.env.BACKEND_API_BASE_URL}/users`, {
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user)
    });
    const data = await response.json();
    console.log(data);
    return NextResponse.json(data);
}
export {POST}