"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FC, useState } from "react";
import Dropzone from "@/components/Dropzone";

interface DocumentTabProps {
  uploadedFiles: any;
  setUploadedFiles: any;
}

const DocumentTab: FC<DocumentTabProps> = ({
  uploadedFiles,
  setUploadedFiles,
}) => {
  // const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleSubmit = () => {
    // TODO: Implement your logic to submit uploadedFiles to the server

    if (uploadedFiles.length > 0) {
      // For demonstration purposes, show a success message using toastify
      alert("Files submitted successfully!");
      // toast.success("Files submitted successfully!", {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    } else {
      // If no files are uploaded, show an error message
      // toast.error("Please upload files before submitting.", {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      alert("Files Failed to Submit");
    }
  };

  return (
    <>
      {/* Right Card for Dropzone */}
      <Card
        className={`max-w-[38rem] overflow-auto h-[36rem] custom-scrollbar flex flex-col justify-between`}
      >
        <div>
          <CardHeader>
            <CardTitle>Upload Document</CardTitle>
            <CardDescription>
              Upload your document here. After saving, it&apos;ll be saved to
              the database.
            </CardDescription>
          </CardHeader>

          {/* Drag and drop files area */}
          <Dropzone setUploadedFiles={setUploadedFiles} />
        </div>

        {/* Button for submit */}
        {/* <div className="m-5 flex justify-center items-center  ">
          <button
            onClick={handleSubmit}
            className=" bg-light_green rounded-lg px-5 py-3 hover:bg-dark_green hover:text-white font-medium"
          >
            {" "}
            Submit{" "}
          </button>
        </div> */}
      </Card>
      {/* End of Right Card for Dropzone */}
    </>
  );
};

export default DocumentTab;
