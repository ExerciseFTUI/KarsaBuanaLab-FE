//@ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useToast } from "@/components/ui/use-toast";

const DropzoneSample = ({ setUploadedFiles, type }) => {
    const [isDraggedOver, setIsDraggedOver] = useState(false);
    const { toast } = useToast();

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
    } = useDropzone({    
        maxFiles: 1,
        // buat template file harus .xls atau .xlsx kalo JSA boleh bebas
        accept: type.toLowerCase() === 'template' ? {
            'application/vnd.ms-excel': ['.xls'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : ['.xlsx']
        } : undefined,
    });

    const uploadedFilesList = acceptedFiles.map((file) => (
        <li key={file.path}>
            1. {file.path.length > 30 ? `${file.path.substring(0, 28)}...` : file.path}
        </li>
    ));

    useEffect(() => {
        setUploadedFiles(acceptedFiles);
    }, [acceptedFiles, setUploadedFiles]);

    useEffect(() => {
        // Error toast kalo uploade dua file
        if (fileRejections && fileRejections.length > 0) {
            // Error toast kalo upload selain .xls di template file sample
            if (type.toLowerCase() === "template" && fileRejections[0].errors[0].code === "file-invalid-type") {
                toast({
                    title: "Invalid file type",
                    variant: "destructive",
                    description: "Please upload an Excel file (.xls or .xlsx)",
                });
            } else{
                toast({
                    title: "Ooops, Something wrong!",
                    variant: "destructive",
                    description: "You can only upload 1 file",
                });
            }
        }
    }, [fileRejections, toast]);

    return (
        <div className="py-3">
            {/* Drag and drop files area */}
            <div
                className={`h-20 rounded-lg hover:cursor-pointer grid place-items-center border-2 border-dashed border-black bg-light_green ${
                    isDraggedOver ? "border-2 border-dark_green opacity-100 " : "opacity-80"
                }`}
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                <p className="mx-3">Drag &apos;n&apos; drop some files here, or click to select files</p>
            </div>

            <aside className="mt-3">
                <h4>File Uploaded : </h4>
                {acceptedFiles.length === 0 && (
                    <p className="text-sm flex flex-row justify-center py-3">Nothing file uploaded</p>
                )}
                <ul className="w-full overflow-x-clip">{uploadedFilesList}</ul>
            </aside>
            {/* End of drag and drop files area */}
        </div>
    );
};

export default DropzoneSample;
