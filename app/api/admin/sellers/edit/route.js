import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const POST = async (request) => {
    const { id, name } = await request.json();
    const session = await getServerSession(authOptions);
  const response = await fetch(
    `${process.env.BACKEND_API_BASE_URL}/sellers/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json-patch+json",
      },
      body: JSON.stringify([
        {
          op: "replace",
          path: "/name",
          value: name,
        },
      ]),
    }
  );
    if (response.ok) {
       return NextResponse.json({ success: "success" }, { status: 200 });
 }
  return NextResponse.json({ error: "failed" },{status:500});
};
export { POST };
