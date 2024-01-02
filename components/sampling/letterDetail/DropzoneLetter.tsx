//@ts-nocheck

"use client"
import React from "react"
import { useDropzone } from "react-dropzone"
import { GiCancel } from "react-icons/gi"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Dropzone = ({ setUploadedFiles }) => {
  const [acceptedFiles, setAcceptedFiles] = React.useState([])
  const [isDraggedOver, setIsDraggedOver] = React.useState(false)

  const onDrop = React.useCallback(
    (droppedFiles) => {
      const newFiles = droppedFiles.filter(
        (file) =>
          !acceptedFiles.some((existingFile) => existingFile.path === file.path)
      )

      if (newFiles.length < droppedFiles.length) {
        // Display a toast for duplicate files
        toast.warning("Duplicate files detected and skipped.")
      }

      setAcceptedFiles([...acceptedFiles, ...newFiles])
      setUploadedFiles([...acceptedFiles, ...newFiles])
    },
    [acceptedFiles, setAcceptedFiles, setUploadedFiles]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDraggedOver(true),
    onDragLeave: () => setIsDraggedOver(false),
  })

  const handleCancelClick = (index) => {
    const updatedFiles = [...acceptedFiles]
    updatedFiles.splice(index, 1)
    setAcceptedFiles(updatedFiles)
    setUploadedFiles(updatedFiles)
  }

  const uploadedFilesList = acceptedFiles.map((file, index) => (
    <li key={file.path} className="flex">
      {index + 1}. {file.path}
      <span className="ml-2 justify-center flex items-center hover:cursor-pointer text-red-500">
        <GiCancel onClick={() => handleCancelClick(index)} />
      </span>
    </li>
  ))

  return (
    <div>
      {/* Drag and drop files area */}
      <div
        className={`h-32 rounded-lg grid place-items-center border-2 border-dashed border-dark_brown bg-light_brown bg-opacity-20 p-4 ${
          isDraggedOver ? "border-4 opacity-100 " : "opacity-80"
        }`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <p>
          Taruh File Anda di Sini atau <i>Click</i> untuk Memilih File
        </p>
      </div>

      <aside className="mt-4">
        <h4>Files Uploaded : </h4>
        <ul>{uploadedFilesList}</ul>
      </aside>
      {/* End of drag and drop files area */}
    </div>
  )
}

export default Dropzone
