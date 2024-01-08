"use client";
import React, { useState } from "react";
import Dropzone from "@/components/Dropzone";
import EditProjectBaseData from "@/components/forms/EditProjectBaseData";
import { MdOpenInNew } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isCancelled, setIsCancelled] = useState(false);
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    // Log the uploaded files to the console
    console.log("Uploaded Files:", uploadedFiles);

    // TODO: Implement the logic to submit uploadedFiles to the server
    if (uploadedFiles.length > 0) {
      // For demonstration purposes, show a success message using toastify
      toast.success("Files submitted successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      // If no files are uploaded, show an error message
      toast.error("Please upload files before submitting.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // TODO: Change this arrays use the uploaded files from API
  const buttonNames = ["Surat Pemerintah", "Super Semar 212"];

  return (
    <>
    {isCancelled && (
        <div className="modal-overlay fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="modal-content bg-white rounded-lg border-2 p-8">
            <p className="text-center text-xl font-bold mb-4">
              Are you sure you want to cancel the project?
            </p>
            <form>
              <label htmlFor="reason" className="block mb-2">
                Reason:
              </label>
              <input
                type="text"
                id="reason"
                name="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                required
              />
              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => setIsCancelled(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}  // You can replace this with your actual cancel logic
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className=" w-fit flex justify-between items-center">

        {/* Left Card for general information project */}
        <EditProjectBaseData />
        {/* End of Left Card for general information project */}

        {/* Right Card for Dropzone */}
        <Card
          className={`w-[48rem] overflow-auto h-[36rem] custom-scrollbar flex flex-col justify-between mx-4`}
        >
          <div>
            <CardHeader>
              <CardTitle className="text-base font-bold">
                Detailed Files
              </CardTitle>
            </CardHeader>

            {/* Based spreadsheet files */}
            <div className="mx-5">
              <h1 className=" font-semibold mb-2 "> Based Files </h1>
              <div className=" grid grid-cols-2 gap-4 justify-center items-center">
                <a
                  href="#"
                  className="bg-light_green items-center justify-between rounded-lg px-5 py-3 hover:bg-dark_green hover:text-white font-medium flex"
                >
                  Formulir Permohonan Pengajuan <MdOpenInNew />
                </a>
                <a
                  href="#"
                  className="bg-light_green items-center justify-between rounded-lg px-5 py-3 hover:bg-dark_green hover:text-white font-medium flex"
                >
                  KUPTK <MdOpenInNew />
                </a>
                <a
                  href="#"
                  className="bg-light_green items-center justify-between rounded-lg px-5 py-3 hover:bg-dark_green hover:text-white font-medium flex"
                >
                  Surat Penawaran <MdOpenInNew />
                </a>
              </div>
            </div>
            {/* End of Based spreadsheet files */}

            {/* Uploaded files */}
            <div className="mx-5 mt-5">
              <h1 className="font-semibold mb-2">Another Files</h1>
              <div className="grid grid-cols-2 gap-4 justify-center items-center">
                {buttonNames.map((buttonName, index) => (
                  <a
                    key={index}
                    href="#"
                    className="bg-light_green items-center justify-between rounded-lg px-5 py-3 hover:bg-dark_green hover:text-white font-medium flex"
                  >
                    {buttonName} <MdOpenInNew />
                  </a>
                ))}
              </div>
            </div>
            {/* End of Uploaded files */}

            {/* Spreadsheet untuk jadwal sampling */}
            <div className="mx-5 mt-5">
              <h1 className="font-semibold mb-2">Schedule Sampling</h1>
              <div className="grid grid-cols-2 gap-4 justify-center items-center">
                <a
                  href="#"
                  className="bg-light_green items-center justify-between rounded-lg px-5 py-3 hover:bg-dark_green hover:text-white font-medium flex"
                >
                  Jadwal Sampling <MdOpenInNew />
                </a>
                <div className="grid grid-cols-2 gap-4 justify-center items-center">
                  <button className=" bg-ghost_brown text-white px-5 py-3 hover:bg-light-green rounded-lg text-base font-semibold ">Acc</button>
                  <button className=" bg-red-400 hover:bg-red-500 px-5 py-3 text-white rounded-lg text-base font-semibold ">Revisi</button>
                </div>
              </div>
            </div>
            {/* End of Spreadsheet untuk jadwal sampling */}

            {/* Drag and drop files area */}
            <h1 className=" font-semibold mx-5 mt-5 "> Upload Files </h1>
            <Dropzone setUploadedFiles={setUploadedFiles} />
            {/* End of Drag and drop files area */}
          </div>

          {/* Button for submit */}
          <div className="m-5 flex justify-center items-center  ">
            <button
              onClick={handleSubmit}
              className=" bg-light_green rounded-lg px-5 py-3 hover:bg-dark_green hover:text-white font-medium"
            >
              {" "}
              Submit{" "}
            </button>
          </div>
          {/* End Button for submit */}

          {/* Cancelled Project */}
          <div className="mx-5 my-5 justify-center items-center flex ">
            <hr />
            <button onClick={() => setIsCancelled(true)} className=" bg-red-400 hover:bg-red-500 font-bold text-lg text-white rounded-lg py-3 w-full">Cancel Project</button>
          </div>
          {/* End of Cancelled Project */}
        </Card>
        {/* End of Right Card for Dropzone */}
      </div>
    </>
  );
}
