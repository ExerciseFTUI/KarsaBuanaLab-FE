"use client"
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { GiCancel } from 'react-icons/gi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const Dropzone = () => {
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (droppedFiles) => {
            const newFiles = droppedFiles.filter((file) => !acceptedFiles.some((existingFile) => existingFile.path === file.path));
            
            if (newFiles.length < droppedFiles.length) {
                // Display a toast for duplicate files
                toast.warning('Duplicate files detected and skipped.');
            }
            
            setAcceptedFiles([...acceptedFiles, ...newFiles]);
        }
    });
    const [isDraggedOver, setIsDraggedOver] = useState(false);

    const handleDragEnter = () => {
        setIsDraggedOver(true);
    };

    const handleDragLeave = () => {
        setIsDraggedOver(false);
    };

    const handleCancelClick = (index) => {
        const updatedFiles = [...acceptedFiles];
        updatedFiles.splice(index, 1);
        setAcceptedFiles(updatedFiles);
    };

    const files = acceptedFiles.map((file, index) => (
        <li key={file.path} className='flex'>
            {index + 1}. {file.path}
            <span className='ml-2 justify-center flex items-center hover:cursor-pointer text-red-500'>
                <GiCancel onClick={() => handleCancelClick(index)} />
            </span>
        </li>
    ));

    return (
        <Card className={`w-[48rem] overflow-auto h-[36rem] custom-scrollbar flex flex-col justify-between mx-4`}>
            <div>
                <CardHeader>
                    <CardTitle className="text-base font-bold">Upload your files</CardTitle>
                </CardHeader>

                {/* Drag and drop files area */}
                <div
                    className={`m-5 h-48 rounded-lg grid place-items-center bg-light_green ${
                        isDraggedOver ? 'border-4 border-dashed border-dark_green opacity-100 ' : 'opacity-80'
                    }`}
                    {...getRootProps({
                        onDragEnter: handleDragEnter,
                        onDragLeave: handleDragLeave,
                        onDrop: handleDragLeave,  // Handle the drop event
                    })}
                >
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>

                <aside className='m-5'>
                    <h4>Files Uploaded : </h4>
                    <ul>{files}</ul>
                </aside>
            </div>

            {/* Button for submit */}
            <div className='m-5 flex justify-center items-center  '>
                <button className=' bg-light_green rounded-lg px-5 py-3 hover:bg-dark_green hover:text-white font-medium'> Submit </button>
            </div>
        </Card>
    );
};

export default Dropzone;