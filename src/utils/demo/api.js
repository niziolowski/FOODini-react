import axios from "axios";
import data from "./template-data";
export const resetAccount = async (token) => {
  try {
    const res = await axios.post(
      "https://x8ki-letl-twmt.n7.xano.io/api:as7xy9qf/reset-account",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
