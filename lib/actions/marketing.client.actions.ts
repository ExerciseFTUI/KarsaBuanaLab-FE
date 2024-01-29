"use client";

import axios from "axios";

const apiBaseUrl = process.env.API_BASE_URL || "https://karsalab.netlabdte.com";

//Update Project file
export const updateProjectFile = async (id: string, files: any) => {
  var bodyFormData = new FormData();
  bodyFormData.append("_id", id);

  // Append each file to the FormData object
  for (let i = 0; i < files.length; i++) {
    bodyFormData.append("files", files[i]);
  }

  try {
    //Call API
    const response = await axios.put(
      `https://karsalab.netlabdte.com/projects/editFiles`,
      bodyFormData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    if (response.data.result) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    console.error(`Error update projectFile :`, error.message);
    return false;
  }
};
