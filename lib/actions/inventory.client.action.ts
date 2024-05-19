"use client";

import axios from "axios";

const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:5000";

//Update Project file
export const addInventoryFile = async (id: string, files: any) => {
  console.log("hello World");

  var bodyFormData = new FormData();
  bodyFormData.append("inventoryId", id);

  // Append each file to the FormData object
  for (let i = 0; i < files.length; i++) {
    bodyFormData.append("files", files[i]);
  }

  console.log(bodyFormData);

  try {
    const response = await axios.post(
      `${apiBaseUrl}/inventory/add-file`,
      bodyFormData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    if (response.data.inventory) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    console.error(error?.response?.data);
    console.error(`Error update projectFile :`, error.message);
    return false;
  }
};
