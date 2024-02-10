"use server";

import axios from "axios";
import { registerValidationType } from "../validations/RegisterValidation";
import getSessionServer from "./getSessionServer";

const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:5000";

export const register = async (data: registerValidationType) => {
  const session = await getSessionServer();

  //Only admin can register new user
  if (session?.user.role.toLowerCase() !== "admin") {
    return false;
  }

  try {
    const response = await axios.post(`${apiBaseUrl}/auth/register`, data);
    if (response.data) {
      return response.data;
    } else {
      return false;
    }
    // const response = null;
    // return false;
  } catch (error: any) {
    console.error(`Error register :`, error.message);
    console.error(`Error register :`, error.response.data);
    return false;
  }
};
