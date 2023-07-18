import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const fetchGET = async ( path) => {
  const session = await getServerSession(authOptions);
  return await fetch(`${process.env.BACKEND_API_BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });
  
};
