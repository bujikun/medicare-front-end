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

export const fetchGETPublic = async (path) => {
  return await fetch(`${process.env.BACKEND_API_BASE_URL}${path}`);
};

export const fetchPOST = async (path,body) => {
  const session = await getServerSession(authOptions);
    return await fetch(`${process.env.BACKEND_API_BASE_URL}${path}`, {
      method:"POST",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      },
    body:JSON.stringify(body)
  });
};

export const fetchPOSTOrder = async (path, body) => {
  const session = await getServerSession(authOptions);
  return await fetch(`${process.env.BACKEND_API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const doPOSTFormBody = async (path, formData) => {
  const session = await getServerSession(authOptions);
  return await fetch(`${process.env.BACKEND_API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};
export const doPUTFormBody = async (path, formData) => {
  const session = await getServerSession(authOptions);
  return await fetch(`${process.env.BACKEND_API_BASE_URL}${path}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};

export const checkSessionValidity = async (path,access_token) => {
  return await fetch(`${process.env.BACKEND_BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
