import { getAuthSession } from "./auth";
import axios from "axios";

export const fetchProtected = async () => {
  const session = await getAuthSession();

  const res = await axios.get("https://your-api.com/protected", {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  return res.data;
};
