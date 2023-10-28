"use client"
import React, { useState } from 'react';
import Dropzone from "@/components/Dropzone";
import EditProjectBaseData from "@/components/forms/EditProjectBaseData";
import { MdOpenInNew } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
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

    const handleSubmit = () => {
        // Log the uploaded files to the console
        console.log("Uploaded Files:", uploadedFiles);

        // TODO: Implement the logic to submit uploadedFiles to the server
        if (uploadedFiles.length > 0) {
            // For demonstration purposes, show a success message using toastify
            toast.success('Files submitted successfully!', {
                position: toast.POSITION.TOP_RIGHT,
            });
        } else {
            // If no files are uploaded, show an error message
            toast.error('Please upload files before submitting.', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    // TODO: Change this arrays use the uploaded files from API
    const buttonNames = [
    "Surat Pemerintah",
    "Super Semar 212"
    ];

    return (
        <div className=" w-fit flex justify-between items-center">
            {/* Left Card for general information project */}
            <EditProjectBaseData/>
            {/* End of Left Card for general information project */}

            {/* Right Card for Dropzone */}
            <Card className={`w-[48rem] overflow-auto h-[36rem] custom-scrollbar flex flex-col justify-between mx-4`}>
                <div>
                    <CardHeader>
                        <CardTitle className="text-base font-bold">Detailed Files</CardTitle>
                    </CardHeader>

                    {/* Based spreadsheet files */}
                    <div className="mx-5">
                        <h1 className=" font-semibold mb-2 "> Based Files </h1>
                        <div className=" grid grid-cols-2 gap-4 justify-center items-center">
                            <a 
                                href="#" 
                                className="bg-light_green items-center justify-between rounded-lg px-5 py-3 hover:bg-dark_green hover:text-white font-medium flex" >
                                Formulir Permohonan Pengajuan <MdOpenInNew/> 
                            </a>
                            <a  
                                href="#" 
                                className="bg-light_green items-center justify-between rounded-lg px-5 py-3 hover:bg-dark_green hover:text-white font-medium flex" >
                                KUPTK <MdOpenInNew/> 
                            </a>
                            <a  
                                href="#" 
                                className="bg-light_green items-center justify-between rounded-lg px-5 py-3 hover:bg-dark_green hover:text-white font-medium flex" >
                                Surat Penawaran <MdOpenInNew/> 
                            </a>
                        </div>
                    </div>
                    {/* End of Based spreadsheet files */}
                    
                    {/* Uploaded files */}
                    <div className="mx-5 mt-5">
                        <h1 className="font-semibold mb-2">Another Files</h1>
                        <div className="grid grid-cols-2 gap-4 justify-center items-center">
                            {buttonNames.map((buttonName, index) => (
                                <a key={index} href="#" className="bg-light_green items-center justify-between rounded-lg px-5 py-3 hover:bg-dark_green hover:text-white font-medium flex">
                                    {buttonName} <MdOpenInNew />
                                </a>
                            ))}
                        </div>
                    </div>
                    {/* End of Uploaded files */}

                    {/* Drag and drop files area */}
                    <h1 className=" font-semibold mx-5 mt-5 "> Upload Files </h1>
                    <Dropzone setUploadedFiles={setUploadedFiles}/>
                    {/* End of Drag and drop files area */}
                    
                </div>
                
                {/* Button for submit */}
                <div className='m-5 flex justify-center items-center  '>
                    <button onClick={handleSubmit} className=' bg-light_green rounded-lg px-5 py-3 hover:bg-dark_green hover:text-white font-medium'> Submit </button>
                </div>
                {/* End Button for submit */}
            </Card>
            {/* End of Right Card for Dropzone */}

        </div>
    )
}