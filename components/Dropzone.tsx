//@ts-nocheck

"use client";
import React from "react";
import { useDropzone } from "react-dropzone";
import { GiCancel } from "react-icons/gi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dropzone = ({ setUploadedFiles }) => {
  const [acceptedFiles, setAcceptedFiles] = React.useState([]);
  const [isDraggedOver, setIsDraggedOver] = React.useState(false);

  const onDrop = React.useCallback(
    (droppedFiles) => {
      const newFiles = droppedFiles.filter(
        (file) =>
          !acceptedFiles.some((existingFile) => existingFile.path === file.path)
      );

      if (newFiles.length < droppedFiles.length) {
        // Display a toast for duplicate files
        toast.warning("Duplicate files detected and skipped.");
      }

      setAcceptedFiles([...acceptedFiles, ...newFiles]);
      setUploadedFiles([...acceptedFiles, ...newFiles]);
    },
    [acceptedFiles, setAcceptedFiles, setUploadedFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDraggedOver(true),
    onDragLeave: () => setIsDraggedOver(false),
  });

  const handleCancelClick = (index) => {
    const updatedFiles = [...acceptedFiles];
    updatedFiles.splice(index, 1);
    setAcceptedFiles(updatedFiles);
    setUploadedFiles(updatedFiles);
  };

  const uploadedFilesList = acceptedFiles.map((file, index) => (
    <li key={file.path} className="flex">
      {index + 1}. {file.path}
      <span className="ml-2 justify-center flex items-center hover:cursor-pointer text-red-500">
        <GiCancel onClick={() => handleCancelClick(index)} />
      </span>
    </li>
  ));
  

  return (
    <div>
      {/* Drag and drop files area */}
      <div
        className={`mx-5 h-48 rounded-lg grid place-items-center border-2 border-dashed border-black bg-light_green ${
          isDraggedOver
            ? "border-4 border-dark_green opacity-100 "
            : "opacity-80"
        }`}
        {...getRootProps()}
      >
        <input name="files" type="" {...getInputProps()} />
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      </div>

      <aside className="m-5">
        <h4>Files Uploaded :  </h4>
        {uploadedFilesList.length === 0 && (
          <p className=" text-sm flex flex-row justify-center">Nothing files uploaded</p>
        )}
        <ul>{uploadedFilesList}</ul>
      </aside>
      {/* End of drag and drop files area */}
    </div>
  );
};

export default Dropzone;
