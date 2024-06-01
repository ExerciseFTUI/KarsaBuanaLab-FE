"use server";

import axios from "axios";
import { registerValidationType } from "../validations/RegisterValidation";
import getSessionServer from "./getSessionServer";
import { revalidatePath } from "next/cache";

const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:5000";

export const register = async (data: registerValidationType) => {
  const session = await getSessionServer();

  //Only admin can register new user
  if (session?.user.role.toLowerCase() !== "admin") {
    return false;
  }

  try {
    const response = await axios.post(
      `${apiBaseUrl}/auth/register`, 
      // `http://localhost:8080/auth/register`,
      data);
    if (response.data) {
      revalidatePath("/admin");
      return response.data;
    } else {
      return false;
    }

  } catch (error: any) {
    console.error(`Error register :`, error.message);
    console.error(`Error register :`, error.response.data);
    return false;
  }
};

export const updateUser = async (_id: string, user: registerValidationType) => {
  const session = await getSessionServer();

  //Only admin can update user
  if (session?.user.role.toLowerCase() !== "admin") {
    return false;
  }

  try {
    const response = await axios.post(
      `${apiBaseUrl}/auth/updateUser`, 
      // `http://localhost:8080/auth/updateUser`,
      {
        _id,
        user
      }
      );
    if (response.data) {
      revalidatePath("/admin");
      return response.data;
    } else {
      return false;
    }
  } catch (error: any) {
    console.error(`Error update :`, error.message);
    console.error(`Error update :`, error.response.data);
    return false;
  }
}