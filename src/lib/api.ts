import axios from "axios";
import { getCookie } from "cookies-next/client";

export const setupAPIClient = () => {
  const token = getCookie("token");

  const api = axios.create({
    baseURL: process.env.NEXTAUTH_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return api;
};

export const api = setupAPIClient();
