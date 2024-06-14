"use client";

import axios from "axios";

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

//Update Project file
export const addInventoryFile = async (id: string, files: any) => {
  console.log(id);
  console.log(files);

  var bodyFormData = new FormData();
  bodyFormData.append("inventoryId", id);

  // Append each file to the FormData object
  for (let i = 0; i < files.length; i++) {
    bodyFormData.append("files", files[i]);
  }

  console.log(bodyFormData.get("inventoryId"));
  console.log(bodyFormData.get("files"));

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

//Update Project file
export const deleteProjectFile = async (id: string, file_id: string) => {
  const body = {
    inventoryId: id,
    fileId: file_id,
  };

  console.log(body);

  try {
    const response = await axios.post(
      `${apiBaseUrl}/inventory/delete-file`,
      body
    );
    if (response.data.message == "File deleted successfully") {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    console.error(error.response.data);
    console.error(`Error delete projectFile :`, error.message);
  }
};
